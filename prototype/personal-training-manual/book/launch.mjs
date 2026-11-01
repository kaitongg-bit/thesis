import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
const root=path.dirname(fileURLToPath(import.meta.url));
async function running(){try{const state=JSON.parse(await fs.readFile(path.join(root,'.runtime/server.json'),'utf8'));if(!/^http:\/\/127\.0\.0\.1:\d+$/.test(state.url))return null;const res=await fetch(`${state.url}/api/health`,{signal:AbortSignal.timeout(1000)});const data=await res.json();return data.app==='ptm-book'&&data.instanceId===state.instanceId?state:null;}catch{return null;}}
let state=await running();
if(!state){const child=spawn(process.execPath,[path.join(root,'server.mjs')],{cwd:root,detached:true,stdio:'ignore'});child.unref();for(let i=0;i<40;i++){await new Promise(r=>setTimeout(r,150));state=await running();if(state)break;}}
if(!state){console.error('未能启动本地书页，请运行 node server.mjs 查看问题。');process.exitCode=1;}else{console.log(`书页已打开：${state.url}`);if(process.platform==='darwin')spawn('open',[state.url],{stdio:'ignore'}).unref();}
