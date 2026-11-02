const $ = id => document.getElementById(id);
const labels = {memory:['MEMORY','仍在影响我的经历'],skill:['SKILL','我逐渐学会的做法'],loop:['LOOP','我常出现的做事方式'],tool:['TOOL','我借助的工具与支持'],value:['WHAT MATTERS','今天仍在乎的事'],question:['OPEN QUESTIONS','暂时开放的问题'],next:['WHAT IS NEXT','我愿意试一试'],custom:['NOTES','我想留下的其他事']};
const statuses={reported:'本人讲述',participant_proposed:'本人提出的理解',unconfirmed:'AI 提出 · 待确认',accepted:'本人认可',revised:'本人改写',open:'暂时开放'};
let book, demo=true, spread=0, pages=[], editingId=null, editingRevision=0, deletingId=null, config, polling=false;
let newIds=new Set();
function el(tag, cls, text) {const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
function button(text, handler, cls=''){const b=el('button',cls,text);b.type='button';b.addEventListener('click',handler);return b;}
function toast(text){$('toast').textContent=text;$('toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').hidden=true,4300);}
async function api(url,options){const response=await fetch(url,options);const data=await response.json();if(!response.ok){const error=new Error(data.error||'暂时没有连接上');error.status=response.status;throw error;}return data;}
function buildPages(){pages=[{cover:'left'},{cover:'right'}];const order=Object.keys(labels);const sorted=[...book.entries].sort((a,b)=>order.indexOf(a.type)-order.indexOf(b.type));for(const e of sorted)pages.push({entry:e});if(pages.length%2)pages.push({blank:true});}
function navigate(to){spread=Math.max(0,Math.min(to,Math.ceil(pages.length/2)-1));render();}
function goEntry(id){const index=pages.findIndex(p=>p.entry?.id===id);if(index>=0)navigate(Math.floor(index/2));$('contents').hidden=true;}
function render(){
  buildPages();spread=Math.min(spread,Math.ceil(pages.length/2)-1);
  renderPage($('left-page'),pages[spread*2],spread*2);
  renderPage($('right-page'),pages[spread*2+1],spread*2+1);
  $('previous').disabled=spread===0;$('next').disabled=(spread+1)*2>=pages.length;
  $('page-indicator').textContent=`${String(spread*2+1).padStart(2,'0')} — ${String(spread*2+2).padStart(2,'0')}`;
  $('mode').textContent=demo?'虚构示例':'我的说明书';
  $('new-book').textContent=demo?'开始我的说明书':'另开一本';
  $('book-label').textContent=book.alias?`${book.alias} · 一份仍在书写的记录`:'一份仍在书写的记录';
  $('bottom-hint').textContent=demo?'这是虚构示例，不会接收你的聊天更新。自己的书页会由体验聊天自动创建。':'本机保存 · 这是一份可带走的初稿。你可以直接改写，或在聊天里继续补充。';
  $('connect-chat').textContent=demo?'试一次书页更新':'在 Codex 中接着聊';
  const list=$('contents-list');list.replaceChildren(button('封面与眼前的问题',()=>{navigate(0);$('contents').hidden=true;},'contents-list-item'));
  for(const p of pages){if(!p.entry)continue;const b=button('',()=>goEntry(p.entry.id),'contents-list-item');b.append(el('small','',labels[p.entry.type][1]),document.createTextNode(p.entry.title));list.append(b);}
}
function renderPage(target,page,index){
  target.replaceChildren();target.classList.remove('changed');target.scrollTop=0;
  if(page.cover==='left'){
    const cover=el('div','cover');cover.append(el('p','edition',demo?'A FICTIONAL EDITION / 虚构示例':'A PERSONAL EDITION / 持续书写'));
    const h=el('h1','','我的\n个人训练\n说明书');h.style.whiteSpace='pre-line';cover.append(h,el('div','cover-en','PERSONAL\nTRAINING MANUAL'));
    cover.append(el('div','cover-bottom',demo?'这里的故事是虚构的。\n你可以先翻阅，再试着写下自己的版本。':'关于我怎样走到这里，\n以及此刻还想留下什么。'));cover.lastChild.style.whiteSpace='pre-line';target.append(cover);
  }else if(page.cover==='right'){
    const wrap=el('div','cover-right');wrap.append(el('p','small-label','从眼前的一个问题开始'),el('h2','focus-title',book.focus||'最近，有什么想弄清楚的？'));
    wrap.append(el('p','opening-copy',book.entries.length?'有些经历慢慢连在了一起，\n有些地方还没有想好。\n这本说明书，可以继续写。':'从一件还记得的事开始聊。\n当一些东西值得留下，\n新的书页就会出现在这里。'));wrap.lastChild.style.whiteSpace='pre-line';
    wrap.append(el('p','pencil','先留下现在的理解。'));if(!demo)wrap.append(button('改写眼前的问题',()=>openEditor('__focus'),'source-toggle'));target.append(wrap);
  }else if(page.blank){const blank=el('div','empty-page');blank.append(el('p','small-label','TO BE CONTINUED'),el('h2','','这一页，留给以后'),el('p','','也许下一次讲起一件事，\n你会想起另一种说法。'));blank.lastChild.style.whiteSpace='pre-line';target.append(blank);
  }else{
    const e=page.entry;const [en,cn]=labels[e.type];target.append(el('div','page-top',`${en} / ${cn}`),el('h2','',e.title),el('p','body-copy',e.body));
    if(e.sourceIds.length){const quote=el('div','source-quote');quote.hidden=true;
      for(const id of e.sourceIds){const s=book.sources.find(x=>x.id===id);if(s){quote.append(el('div','',s.excerpt||'这段内容以转述方式保留。'),el('small','',s.label));}}
      const toggle=button('看它从哪里来',()=>{quote.hidden=!quote.hidden;toggle.textContent=quote.hidden?'看它从哪里来':'收起这段讲述';},'source-toggle');target.append(toggle,quote);
    }
    if(e.relatedIds.length){const related=el('div','related-list');for(const id of e.relatedIds){const other=book.entries.find(x=>x.id===id);if(other)related.append(button(`也连着：${other.title}`,()=>goEntry(id),'related-link'));}target.append(related);}
    target.append(el('span',`status ${e.status==='unconfirmed'?'draft':''}`,statuses[e.status]));
    const actions=el('div','page-actions');actions.append(button('改写',()=>openEditor(e.id)));
    if(e.status==='unconfirmed'||e.status==='open')actions.append(button('这句话像我',()=>mutate([{type:'setStatus',id:e.id,status:'accepted'}]).then(()=>toast('留下了你认可的说法')).catch(handleError)));
    if(e.status!=='open')actions.append(button('暂时留着',()=>mutate([{type:'setStatus',id:e.id,status:'open'}]).then(()=>toast('先保留一个开放的理解')).catch(handleError)));
    actions.append(button('继续聊这一页',()=>connect(e)));
    actions.append(button('删除',()=>{deletingId=e.id;$('delete-dialog').showModal();},'delete'));target.append(actions);
    if(newIds.has(e.id))target.classList.add('changed');
  }
  target.append(el('span','folio',String(index+1).padStart(2,'0')));
}
function handleError(error){toast(error.message);}
async function mutate(ops,expectedRevision=book.revision){
  if(demo){const copy=structuredClone(book);for(const op of ops){const e=copy.entries.find(x=>x.id===op.id);
    if(op.type==='editEntry'){e.title=op.title;e.body=op.body;e.status='revised';}
    if(op.type==='setStatus')e.status=op.status;
    if(op.type==='setFocus')copy.focus=op.focus;
    if(op.type==='deleteEntry'){const ids=new Set(e.sourceIds);copy.entries=copy.entries.filter(x=>x.id!==op.id).map(x=>({...x,relatedIds:x.relatedIds.filter(id=>id!==op.id),sourceIds:x.sourceIds.filter(id=>!ids.has(id))}));copy.sources=copy.sources.filter(s=>!ids.has(s.id));}
  }copy.revision++;book=copy;}else{
    book=await api(`/api/sessions/${book.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({expectedRevision,actor:'participant',ops})});
  }render();
}
function openEditor(id){editingId=id;editingRevision=book.revision;const focus=id==='__focus';const e=book.entries.find(x=>x.id===id);
  $('edit-title').value=focus?'我现在想弄清楚':e.title;$('edit-title').disabled=focus;$('edit-body').value=focus?book.focus:e.body;$('edit-error').textContent='';$('editor').showModal();}
$('edit-form').addEventListener('submit',async event=>{event.preventDefault();const ops=editingId==='__focus'?[{type:'setFocus',focus:$('edit-body').value.trim()}]:[{type:'editEntry',id:editingId,title:$('edit-title').value.trim(),body:$('edit-body').value.trim()}];
  try{await mutate(ops,editingRevision);$('editor').close();toast(demo?'示例中的改写已呈现':'这次改写已保存');}catch(e){$('edit-error').textContent=e.status===409?'记录在你编辑时有了新变化。你的文字仍保留在这里，请先复制，关闭后查看新版本。':e.message;}});
$('new-form').addEventListener('submit',async event=>{event.preventDefault();const submit=event.submitter;submit.disabled=true;
  try{book=await api('/api/sessions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({alias:$('new-alias').value.trim(),focus:$('new-focus').value.trim()})});demo=false;spread=0;localStorage.setItem('ptm-current',book.id);history.replaceState({},'',`?session=${book.id}`);$('new-dialog').close();render();$('sync-state').textContent='书页已准备好，等待聊天中的整理';connect();}catch(e){$('new-error').textContent=e.message;}finally{submit.disabled=false;}});
function promptFor(entry){return `请使用 $personal-training-manual，带我体验书页式个人训练说明书。${entry?`我想接着聊这一页：${entry.title}（${entry.id}）。`:''}\n我同意将选定内容保存在这份本地说明书中，研究使用另行确认。\n请先读取 ${config.protocol}，按其中的同步方法读取并更新我的这份记录。\n书页编号：${book.id}\n同步工具：${config.cli}\n请只读取这份记录和机制文件，勿读取论文、其他聊天或其他参与者资料。\n先从我在封面提出的问题与当前想法展开；当形成值得留下的一小段理解时，再更新书页。请把AI的解释保留为待确认，沿用我在页面上的改写。`;}
async function connect(entry){
  if(demo){
    if(book.entries.some(e=>e.id==='DEMO-NEW')){goEntry('DEMO-NEW');toast('这是一段虚构演示；自己的说明书通过 Codex 整理更新。');return;}
    $('sync-state').textContent='正在模拟一次整理…';await new Promise(resolve=>setTimeout(resolve,800));
    book.entries.push({id:'DEMO-NEW',type:'custom',title:'刚刚，多了一种说法',body:'“把事情理顺”与“照顾所有人的情绪”，也许可以分开理解。\n\n这是一条虚构的更新，用来演示：聊天中的一小段整理，怎样变成可以回看的书页。',origin:'ai_suggestion',status:'unconfirmed',sourceIds:['S1'],relatedIds:['E1']});newIds=new Set(['DEMO-NEW']);render();goEntry('DEMO-NEW');$('sync-state').textContent='一次虚构更新 · 新书页已出现';return;
  }
  config ||= await api('/api/config');$('connect-title').textContent=entry?'接着聊这一页':'在聊天里接着写';$('connect-help').textContent='如果正在进行体验，回到原聊天继续说就好。下面的说明用于换到另一段聊天时接续这本书。';$('chat-prompt').value=promptFor(entry);$('connect-dialog').showModal();
}
$('copy-prompt').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('chat-prompt').value);toast('已复制，发到 Codex 新聊天即可');}catch{$('chat-prompt').select();toast('请手动复制选中的文字');}});
$('confirm-delete').addEventListener('click',async()=>{try{await mutate([{type:'deleteEntry',id:deletingId}]);$('delete-dialog').close();toast('这页及它的引文和关联已移除');}catch(e){handleError(e);}});
$('previous').addEventListener('click',()=>navigate(spread-1));$('next').addEventListener('click',()=>navigate(spread+1));
$('new-book').addEventListener('click',()=>{$('new-error').textContent='';$('new-dialog').showModal();});
$('contents-button').addEventListener('click',()=>$('contents').hidden=!$('contents').hidden);$('close-contents').addEventListener('click',()=>$('contents').hidden=true);
$('connect-chat').addEventListener('click',()=>connect().catch(handleError));
for(const b of document.querySelectorAll('[data-close]'))b.addEventListener('click',()=>$(b.dataset.close).close());
document.addEventListener('keydown',event=>{if(document.querySelector('dialog[open]')||['INPUT','TEXTAREA'].includes(event.target.tagName))return;if(event.key==='ArrowRight')navigate(spread+1);if(event.key==='ArrowLeft')navigate(spread-1);});
$('export').addEventListener('click',()=>{
  const lines=[`# ${book.title}`,demo?'\n虚构示例材料':'',`\n我现在想弄清楚：${book.focus}`];
  for(const p of pages){if(!p.entry)continue;const e=p.entry;lines.push(`\n## ${labels[e.type][1]}：${e.title}\n\n${e.body}\n\n状态：${statuses[e.status]}`);for(const id of e.sourceIds){const s=book.sources.find(x=>x.id===id);if(s)lines.push(`\n来源（${s.label}）：${s.excerpt||'转述记录'}`);}}
  const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'}));const a=el('a');a.href=url;a.download='我的个人训练说明书.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('说明书已导出为可继续修改的文字文件');
});
async function poll(){if(demo||polling||document.hidden)return;polling=true;try{const updated=await api(`/api/sessions/${book.id}`);if(updated.revision!==book.revision){const old=book;newIds=new Set(updated.entries.filter(e=>!old.entries.some(x=>x.id===e.id&&x.body===e.body&&x.title===e.title)).map(e=>e.id));book=updated;if(!old.entries.length&&book.entries.length)spread=1;render();$('sync-state').textContent='刚刚有新的整理 · 已同步';toast(newIds.size?'书页有了新的内容':'书页已按新的说法更新');}else $('sync-state').textContent=book.entries.length?`已保存 ${book.entries.length} 条内容 · 等待下一次整理`:'书页已创建 · 还没有写入内容';}catch{$('sync-state').textContent='暂时断开连接 · 当前书页仍可阅读';}finally{polling=false;}}
async function start(){const id=new URLSearchParams(location.search).get('session');try{if(id&&/^[a-zA-Z0-9_-]{1,80}$/.test(id)){book=await api(`/api/sessions/${id}`);demo=false;if(book.entries.length)spread=1;}else{book=await api('/api/demo');demo=true;}render();$('sync-state').textContent=demo?'虚构示例 · 尚未连接任何体验聊天':`已载入 ${book.entries.length} 条内容 · 本机书页`;setInterval(poll,1400);}catch(e){$('left-page').append(el('h2','','暂时没能翻开这本书'),el('p','body-copy',e.message));$('right-page').append(button('先看虚构示例',()=>location.assign('/'),'outline'));}}
start();
