import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const target=process.argv.includes('--skills-dir')?process.argv[process.argv.indexOf('--skills-dir')+1]:path.join(os.homedir(),'.codex/skills');
if(!target||!path.isAbsolute(target))throw new Error('请提供明确的绝对 skills 路径');
for(const name of ['personal-training-manual','ptm-explore-experience','ptm-work-and-values','ptm-repair-conversation','ptm-build-manual']){
  const destination=path.join(target,name);
  await fs.cp(path.join(root,'../skills',name),destination,{recursive:true});
}
await fs.writeFile(path.join(target,'personal-training-manual/local-book.json'),JSON.stringify({bookRoot:root},null,2),{mode:0o600});
console.log('五个引导 skills 和本机书页位置已配置。新聊天中使用 $personal-training-manual 即可开始。');
