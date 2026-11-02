import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';

const here=path.dirname(fileURLToPath(import.meta.url));
try {
  let root;
  try {root=JSON.parse(await fs.readFile(path.join(here,'../local-book.json'),'utf8')).bookRoot;}
  catch(error){if(error.code!=='ENOENT')throw error;root=path.resolve(here,'../../../book');}
  if(typeof root!=='string'||!path.isAbsolute(root))throw new Error('书页位置配置无效');
  const cli=path.join(root,'bookctl.mjs');await fs.access(cli);
  const child=spawn(process.execPath,[cli,...process.argv.slice(2)],{stdio:'inherit'});
  child.on('error',error=>{console.error(error.message);process.exitCode=1;});
  child.on('exit',code=>{process.exitCode=code??1;});
}catch(error){console.error(`书页工具未就绪：${error.message}。内容尚未保存，请先在聊天中保留初稿。`);process.exitCode=1;}
