import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export const TYPES = ['memory', 'skill', 'loop', 'tool', 'value', 'question', 'next', 'custom'];
export const STATUSES = ['reported', 'participant_proposed', 'unconfirmed', 'accepted', 'revised', 'open'];
export class StoreError extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
const check = (condition, message, status) => { if (!condition) throw new StoreError(message, status); };
const string = (v, limit = 12000) => typeof v === 'string' && v.length <= limit;
const validId = id => typeof id === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(id);
export function validate(book) {
  check(book?.schemaVersion === 1 && validId(book.id), '记录格式或编号无效');
  check(Number.isInteger(book.revision) && book.revision >= 0, '记录版本无效');
  check(string(book.title, 160) && string(book.focus, 3000) && string(book.alias, 80), '说明书信息过长或无效');
  check(Array.isArray(book.entries) && book.entries.length <= 250 && Array.isArray(book.sources) && book.sources.length <= 500, '条目数量无效');
  const sources = new Set();
  for (const s of book.sources) {
    check(validId(s.id) && !sources.has(s.id) && string(s.label, 300) && string(s.excerpt, 5000), '引文格式无效');
    sources.add(s.id);
  }
  const ids = new Set();
  for (const e of book.entries) {
    check(validId(e.id) && !ids.has(e.id) && TYPES.includes(e.type), '书页编号或类型无效'); ids.add(e.id);
    check(string(e.title, 200) && e.title.trim() && string(e.body) && e.body.trim(), '请给书页写上标题和内容');
    check(['participant', 'ai_suggestion'].includes(e.origin) && STATUSES.includes(e.status), '书页来源或确认状态无效');
    check(Array.isArray(e.sourceIds) && e.sourceIds.every(id => sources.has(id)), '书页引用了不存在的来源');
    check(Array.isArray(e.relatedIds) && e.relatedIds.every(validId), '关联格式无效');
    check(e.origin !== 'ai_suggestion' || !['reported', 'participant_proposed'].includes(e.status), 'AI建议不能标成本人讲述');
  }
  for (const e of book.entries) check(e.relatedIds.every(id => ids.has(id) && id !== e.id), '书页关联不存在或指向自身');
  return book;
}
export function applyOperations(original, expectedRevision, actor, ops) {
  check(expectedRevision === original.revision, '记录刚刚有了新变化，请重新读取后再修改。', 409);
  check(['participant', 'ai'].includes(actor) && Array.isArray(ops) && ops.length > 0 && ops.length <= 40, '更新格式无效');
  const book = structuredClone(original);
  for (const op of ops) {
    if (op.type === 'addSource') {
      check(op.source && validId(op.source.id), '来源编号无效');
      const old = book.sources.find(s => s.id === op.source.id);
      check(!old || JSON.stringify(old) === JSON.stringify(op.source), '已有引文不能被悄悄改写；请使用新编号');
      if (!old) book.sources.push(op.source);
    } else if (op.type === 'upsertEntry') {
      const e = op.entry; check(e && validId(e.id), '书页编号无效');
      const index = book.entries.findIndex(x => x.id === e.id);
      const old = book.entries[index];
      if (actor === 'ai') {
        check(!old || !['accepted', 'revised'].includes(old.status), '这页已经由本人认可或改写，请另提建议，保留原页。', 409);
        check(['reported', 'participant_proposed', 'unconfirmed', 'open'].includes(e.status), '本人确认状态由书页中的明确操作设置');
      }
      const entry = { id: e.id, type: e.type, title: e.title, body: e.body, origin: e.origin, status: e.status,
        sourceIds: e.sourceIds || [], relatedIds: e.relatedIds || [], updatedAt: new Date().toISOString() };
      if (index < 0) book.entries.push(entry); else book.entries[index] = entry;
    } else if (op.type === 'editEntry') {
      check(actor === 'participant', '改写操作需要本人操作');
      const e = book.entries.find(x => x.id === op.id); check(e, '找不到这页', 404);
      e.title = op.title; e.body = op.body; e.status = 'revised'; e.updatedAt = new Date().toISOString();
    } else if (op.type === 'setStatus') {
      check(actor === 'participant' && ['accepted', 'open'].includes(op.status), '确认操作无效');
      const e = book.entries.find(x => x.id === op.id); check(e, '找不到这页', 404);
      e.status = op.status; e.updatedAt = new Date().toISOString();
    } else if (op.type === 'deleteEntry') {
      check(actor === 'participant' || (string(op.userRequest, 2000) && op.userRequest.trim().length > 2), '在聊天中删除内容需要本人明确提出');
      const e = book.entries.find(x => x.id === op.id); check(e, '找不到这页', 404);
      const removedSources = new Set(e.sourceIds);
      book.entries = book.entries.filter(x => x.id !== op.id).map(x => ({ ...x,
        relatedIds: x.relatedIds.filter(id => id !== op.id), sourceIds: x.sourceIds.filter(id => !removedSources.has(id)) }));
      book.sources = book.sources.filter(s => !removedSources.has(s.id));
    } else if (op.type === 'setFocus') {
      check(string(op.focus, 3000), '问题过长'); book.focus = op.focus;
    } else throw new StoreError('无法识别的更新动作');
  }
  book.revision++; book.updatedAt = new Date().toISOString();
  return validate(book);
}

export class BookStore {
  constructor(directory) { this.directory = directory; this.queue = Promise.resolve(); }
  file(id) { check(validId(id), '编号无效'); return path.join(this.directory, `${id}.json`); }
  async read(id) {
    try { return validate(JSON.parse(await fs.readFile(this.file(id), 'utf8'))); }
    catch (e) { if (e.code === 'ENOENT') throw new StoreError('找不到这份说明书', 404); throw e; }
  }
  async create({alias = '', focus = ''} = {}) {
    const now = new Date().toISOString();
    const book = validate({ schemaVersion: 1, id: randomUUID(), title: '我的个人训练说明书', alias, focus,
      revision: 0, createdAt: now, updatedAt: now, sources: [], entries: [] });
    await fs.mkdir(this.directory, {recursive:true});
    await fs.writeFile(this.file(book.id), JSON.stringify(book, null, 2), {flag:'wx', mode:0o600}); return book;
  }
  update(id, revision, actor, ops) {
    const work = this.queue.catch(() => {}).then(async () => {
      const updated = applyOperations(await this.read(id), revision, actor, ops);
      const target = this.file(id), temporary = `${target}.${randomUUID()}.tmp`;
      try { await fs.writeFile(temporary, JSON.stringify(updated, null, 2), {mode:0o600}); await fs.rename(temporary, target); }
      finally { await fs.unlink(temporary).catch(() => {}); }
      return updated;
    }); this.queue = work; return work;
  }
}
