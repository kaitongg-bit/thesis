import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import os from 'node:os';
import {BookStore, StoreError} from './store.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const instanceId=randomUUID();
const store = new BookStore(path.join(root, 'data/sessions'));
const resources = new Map([['/', ['public/index.html','text/html; charset=utf-8']], ['/book.css',['public/book.css','text/css']], ['/viewport.css',['public/viewport.css','text/css']],
  ['/book.js',['public/book.js','text/javascript']], ['/api/demo',['demo.json','application/json; charset=utf-8']]]);
const send = (res, status, value) => { res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}); res.end(JSON.stringify(value)); };
async function body(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw new StoreError('需要 JSON 内容',415);
  let data=''; for await (const chunk of req) { data+=chunk; if (Buffer.byteLength(data)>1_000_000) throw new StoreError('内容过大',413); }
  try { return JSON.parse(data); } catch {throw new StoreError('JSON格式无效');}
}
const server = http.createServer(async (req,res) => {
  try {
    const host=req.headers.host;
    if (host!==`127.0.0.1:${server.address().port}`) throw new StoreError('仅接受本机访问',403);
    const origin=req.headers.origin;
    if (origin && origin!==`http://${host}`) throw new StoreError('拒绝跨站请求',403);
    const url=new URL(req.url,`http://${host}`), endpoint=url.pathname;
    if(req.method==='GET' && resources.has(endpoint)) {
      const [file,type]=resources.get(endpoint); res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',
        'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'"});
      res.end(await fs.readFile(path.join(root,file)));return;
    }
    if(req.method==='GET' && endpoint==='/api/health') {send(res,200,{ok:true,app:'ptm-book',instanceId,version:'0.2'});return;}
    if(req.method==='GET' && endpoint==='/api/config') {send(res,200,{cli:path.join(root,'bookctl.mjs'),protocol:path.join(os.homedir(),'.codex/skills/ptm-build-manual/references/book-sync.md')});return;}
    if(req.method==='POST' && endpoint==='/api/sessions') { const data=await body(req); send(res,201,await store.create(data));return; }
    const match=endpoint.match(/^\/api\/sessions\/([a-zA-Z0-9_-]{1,80})$/);
    if(match && req.method==='GET') {send(res,200,await store.read(match[1]));return;}
    if(match && req.method==='PATCH') {
      const data=await body(req); send(res,200,await store.update(match[1],data.expectedRevision,data.actor,data.ops));return;
    }
    send(res,404,{error:'找不到这个页面'});
  } catch(e) {send(res,e.status||500,{error:e.status?e.message:'本地服务遇到问题，请保留当前内容后重试。'});}
});
server.listen(Number(process.env.PTM_PORT||0),'127.0.0.1',async()=>{
  const url=`http://127.0.0.1:${server.address().port}`;
  await fs.mkdir(path.join(root,'.runtime'),{recursive:true});
  await fs.writeFile(path.join(root,'.runtime/server.json'),JSON.stringify({url,pid:process.pid,instanceId}));
  console.log(`Personal Training Manual · 本地书页\nLocal: ${url}\n仅监听本机。示例内容为虚构，不会读取 Codex 聊天。`);
});
for(const signal of ['SIGTERM','SIGINT']) process.on(signal,()=>server.close(()=>process.exit(0)));
