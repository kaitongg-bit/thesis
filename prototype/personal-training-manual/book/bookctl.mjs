import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const [command,...argv]=process.argv.slice(2);
const flag=name=>argv.indexOf(name)<0?undefined:argv[argv.indexOf(name)+1];
async function inputLine(){
  process.stdout.write('READY_FOR_JSON_ON_STDIN\n');
  if(process.stdin.isTTY)process.stdin.setRawMode(true);
  process.stdin.setEncoding('utf8');process.stdin.resume();
  return new Promise((resolve,reject)=>{let value='';const consume=chunk=>{
    if(chunk.includes('\u0003')){reject(new Error('已取消'));process.stdin.pause();return;}
    value+=chunk;
    if(value.length>1_000_000){reject(new Error('内容过大'));process.stdin.pause();return;}
    if(value.includes('\n')||value.includes('\r')){process.stdin.off('data',consume);process.stdin.pause();
      if(process.stdin.isTTY)process.stdin.setRawMode(false);
      try{resolve(JSON.parse(value.trim()));}catch{reject(new Error('JSON格式无效'));}}
  };process.stdin.on('data',consume);process.stdin.on('end',()=>{if(!value.trim())reject(new Error('没有输入JSON'));});});
}
try {
  const {url}=JSON.parse(await fs.readFile(path.join(root,'.runtime/server.json'),'utf8'));
  if(!/^http:\/\/127\.0\.0\.1:\d+$/.test(url))throw new Error('本地服务地址无效');
  const id=flag('--id');if(!/^[a-zA-Z0-9_-]{1,80}$/.test(id||''))throw new Error('请提供 --id 编号');
  if(!['read','patch'].includes(command))throw new Error('使用 read --id 编号 或 patch --id 编号 --expected-revision 数字');
  let options={};
  if(command==='patch') {const revision=Number(flag('--expected-revision'));if(!Number.isInteger(revision)||revision<0)throw new Error('需要有效版本号');
    const data=await inputLine();options={method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({expectedRevision:revision,actor:'ai',ops:data.ops})};}
  const res=await fetch(`${url}/api/sessions/${id}`,options);const data=await res.json();if(!res.ok)throw new Error(`${res.status}: ${data.error}`);
  console.log(JSON.stringify(command==='read'?data:{ok:true,id:data.id,revision:data.revision,entries:data.entries.length},null,2));
}catch(e){console.error(e.message);process.exitCode=1;}
