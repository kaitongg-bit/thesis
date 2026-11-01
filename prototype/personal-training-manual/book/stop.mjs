import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
try{const state=JSON.parse(await fs.readFile(path.join(root,'.runtime/server.json'),'utf8'));if(!/^http:\/\/127\.0\.0\.1:\d+$/.test(state.url))throw new Error('服务地址无效');const data=await(await fetch(`${state.url}/api/health`,{signal:AbortSignal.timeout(1200)})).json();if(data.app!=='ptm-book'||data.instanceId!==state.instanceId)throw new Error('服务身份不匹配，未停止其他进程');process.kill(state.pid,'SIGTERM');console.log('本地书页服务已停止，说明书文件仍保留。');}catch(e){console.log(`未停止服务：${e.message}`);}
