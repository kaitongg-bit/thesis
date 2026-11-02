import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ensureServer} from './service.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const [command,...argv]=process.argv.slice(2);
const flag=name=>argv.indexOf(name)<0?undefined:argv[argv.indexOf(name)+1];
async function inputLine(){
  process.stdout.write('READY_FOR_JSON_ON_STDIN\n');
  if(process.stdin.isTTY)process.stdin.setRawMode(true);
  process.stdin.setEncoding('utf8');process.stdin.resume();
  return new Promise((resolve,reject)=>{
    let value='',finished=false;
    const finish=error=>{
      if(finished)return;finished=true;
      process.stdin.off('data',consume);process.stdin.pause();
      if(process.stdin.isTTY)process.stdin.setRawMode(false);
      if(error){reject(error);return;}
      try{resolve(JSON.parse(value.trim()));}catch{reject(new Error('JSON格式无效'));}
    };
    const consume=chunk=>{
      if(chunk.includes('\u0003')){finish(new Error('已取消'));return;}
      value+=chunk;
      if(Buffer.byteLength(value)>1_000_000){finish(new Error('内容过大'));return;}
      if(value.includes('\n')||value.includes('\r'))finish();
    };
    process.stdin.on('data',consume);
    process.stdin.on('end',()=>finish(value.trim()?undefined:new Error('没有输入JSON')));
  });
}
try {
  if(!['create','read','patch','link'].includes(command))throw new Error('使用 create（JSON stdin）、read/link --id 编号 或 patch --id 编号 --expected-revision 数字');
  const id=flag('--id');
  if(command!=='create'&&!/^[a-zA-Z0-9_-]{1,80}$/.test(id||''))throw new Error('请提供 --id 编号');
  let input;
  if(command==='create'||command==='patch')input=await inputLine();
  let revision;
  if(command==='patch'){
    revision=Number(flag('--expected-revision'));
    if(!Number.isInteger(revision)||revision<0)throw new Error('需要有效版本号');
  }
  const {url}=await ensureServer(root);
  const endpoint=command==='create'?'/api/sessions':`/api/sessions/${id}`;
  let options={};
  if(command==='create')options={method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({alias:input.alias??'',focus:input.focus??'',initialOps:input.ops??[]})};
  if(command==='patch')options={method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({expectedRevision:revision,actor:'ai',ops:input.ops})};
  const res=await fetch(`${url}${endpoint}`,options);const data=await res.json();if(!res.ok)throw new Error(`${res.status}: ${data.error}`);
  console.log(JSON.stringify(command==='read'?data:{ok:true,id:data.id,revision:data.revision,entries:data.entries.length,url:`${url}/?session=${data.id}`},null,2));
}catch(e){console.error(e.message);process.exitCode=1;}
