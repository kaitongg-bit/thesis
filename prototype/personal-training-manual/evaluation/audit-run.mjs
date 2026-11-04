import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Read-only integrity checks. These do not evaluate reflective usefulness.
const runRoot = process.argv[2];
if (!runRoot || !path.isAbsolute(runRoot)) throw new Error('Provide an absolute evaluation directory.');
const root = fs.realpathSync(runRoot);
function resolveLocal(relative) {
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(root + path.sep)) throw new Error('Evaluation path escapes its directory.');
  const real = fs.realpathSync(resolved);
  if (!real.startsWith(root + path.sep)) throw new Error('Evaluation symlink escapes its directory.');
  return real;
}
const readJson = relative => JSON.parse(fs.readFileSync(resolveLocal(relative), 'utf8'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
function treeDigest(relative) {
  const base = resolveLocal(relative), items = [];
  function walk(directory) {
    for (const name of fs.readdirSync(directory).sort()) {
      const filename = path.join(directory, name);
      const stat = fs.lstatSync(filename);
      if (stat.isSymbolicLink()) throw new Error('Snapshot must not contain symlinks.');
      if (stat.isDirectory()) walk(filename);
      else items.push([path.relative(base, filename), digest(fs.readFileSync(filename))]);
    }
  }
  walk(base);
  return {files: items.length, sha256: digest(JSON.stringify(items))};
}
const manifest = readJson('run.json'), errors = [], snapshots = [], transcripts = [];
for (const snapshot of manifest.snapshots) {
  try {
    const actual = treeDigest(snapshot.path);
    snapshots.push({label: snapshot.label, ...actual});
    if (actual.sha256 !== snapshot.sha256) errors.push(`Snapshot changed: ${snapshot.label}`);
  } catch (error) { errors.push(`${snapshot.label}: ${error.message}`); }
}
for (const corpus of manifest.corpora) {
  try {
    if (digest(fs.readFileSync(resolveLocal(corpus.path))) !== corpus.sha256) errors.push(`Corpus changed: ${corpus.path}`);
  } catch (error) { errors.push(`${corpus.path}: ${error.message}`); }
}
for (const run of manifest.runs) {
  try {
    const cases = readJson(run.corpus), target = cases.find(item => item.id === run.caseId);
    if (!target) throw new Error('Unknown case ID');
    const transcript = readJson(run.transcript), messages = transcript.messages;
    if (transcript.caseId !== target.id) throw new Error('Transcript case ID mismatch');
    if (!Array.isArray(messages) || messages.length !== target.turns.length * 2) throw new Error('Missing or extra messages');
    const inputNotes = [];
    for (let index = 0; index < target.turns.length; index++) {
      const user = messages[index * 2], expected = target.turns[index];
      if (user.role !== 'user' || typeof user.content !== 'string') throw new Error(`Invalid input at turn ${index + 1}`);
      if (user.content !== expected) {
        if (run.allowTrailingLineBreaks === true && user.content.replace(/[\r\n]+$/, '') === expected.replace(/[\r\n]+$/, '')) {
          inputNotes.push({turn: index + 1, difference: 'Terminal line break only; raw transcript preserved.'});
        } else throw new Error(`Input differs at turn ${index + 1}`);
      }
      const reply = messages[index * 2 + 1];
      if (reply.role !== 'assistant' || typeof reply.content !== 'string' || !reply.content.trim()) throw new Error(`Missing reply at turn ${index + 1}`);
    }
    transcripts.push({file: run.transcript, variant: run.variant, caseId: run.caseId, replies: target.turns.length, sha256: digest(fs.readFileSync(resolveLocal(run.transcript))), inputNotes});
  } catch (error) { errors.push(`${run.transcript}: ${error.message}`); }
}
console.log(JSON.stringify({integrityPassed: errors.length === 0, snapshots, transcripts, errors, scope: 'File integrity and fixed-input identity only; not a semantic score or proof of no leakage.'}, null, 2));
if (errors.length) process.exitCode = 1;
