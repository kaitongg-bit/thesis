import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';

const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function cli(script,args,input){return new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,[script,...args],{stdio:['pipe','pipe','pipe']});
  let stdout='',stderr='';child.stdout.on('data',d=>stdout+=d);child.stderr.on('data',d=>stderr+=d);
  child.on('error',reject);child.on('close',code=>{if(code!==0){reject(new Error(stderr));return;}
    try{resolve(JSON.parse(stdout.replace('READY_FOR_JSON_ON_STDIN\n','')));}catch(error){reject(error);}});
  child.stdin.end(input===undefined?'':JSON.stringify(input)+'\n');
});}
test('new session boots its server, creates real pages, and updates the same isolated book',async()=>{
  const temp=await fs.mkdtemp(path.join(os.tmpdir(),'ptm-session-flow-'));
  const app=path.join(temp,'book'),skill=path.join(temp,'skill');let pid;
  try{
    await fs.mkdir(app);await fs.mkdir(path.join(skill,'scripts'),{recursive:true});
    for(const file of ['bookctl.mjs','service.mjs','server.mjs','store.mjs'])await fs.copyFile(path.join(source,file),path.join(app,file));
    await fs.copyFile(path.join(source,'../skills/personal-training-manual/scripts/book.mjs'),path.join(skill,'scripts/book.mjs'));
    await fs.writeFile(path.join(skill,'local-book.json'),JSON.stringify({bookRoot:app}));
    const script=path.join(skill,'scripts/book.mjs');
    const entry={id:'E1',type:'memory',title:'虚构：整理售后流程',body:'合成测试人物做了一个供同事试用的表单。',origin:'participant',status:'reported',sourceIds:[],relatedIds:[]};
    const created=await cli(script,['create'],{alias:'合成测试',focus:'我积累了什么',ops:[{type:'upsertEntry',entry}]});
    pid=JSON.parse(await fs.readFile(path.join(app,'.runtime/server.json'),'utf8')).pid;
    assert.equal(created.entries,1);assert.equal(created.revision,1);assert.ok(created.url.endsWith(`/?session=${created.id}`));
    const read=await cli(script,['read','--id',created.id]);assert.equal(read.entries[0].title,entry.title);
    const changed=await cli(script,['patch','--id',created.id,'--expected-revision','1'],{ops:[{type:'upsertEntry',entry:{...entry,body:'合成测试：同事试用后，他又做了修改。'}}]});
    assert.equal(changed.id,created.id);assert.equal(changed.revision,2);
    const linked=await cli(script,['link','--id',created.id]);assert.equal(linked.url,created.url);
    const second=await cli(script,['create'],{ops:[]});assert.notEqual(second.id,created.id);
    assert.equal((await cli(script,['read','--id',second.id])).entries.length,0);
    await assert.rejects(cli(script,['patch','--id',created.id,'--expected-revision','1'],{ops:[{type:'setFocus',focus:'过期覆盖'}]}),/409/);
    assert.equal((await cli(script,['read','--id',created.id])).focus,'我积累了什么');
  }finally{
    if(pid){try{process.kill(pid,'SIGTERM');}catch{}}
    await fs.rm(temp,{recursive:true,force:true});
  }
});
