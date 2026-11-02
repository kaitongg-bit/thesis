import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';

export async function runningServer(root) {
  try {
    const state = JSON.parse(await fs.readFile(path.join(root, '.runtime/server.json'), 'utf8'));
    if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(state.url)) return null;
    const response = await fetch(`${state.url}/api/health`, {signal: AbortSignal.timeout(1000)});
    const health = await response.json();
    return response.ok && health.app === 'ptm-book' && health.instanceId === state.instanceId ? {...state,version:health.version} : null;
  } catch { return null; }
}

export async function ensureServer(root) {
  const existing = await runningServer(root);
  if (existing) {
    if(existing.version!=='0.3')throw new Error('旧版书页服务仍在运行，请先用本项目的 stop.mjs 停止，再重新执行本次操作；尚未创建新书。');
    return existing;
  }
  await fs.access(path.join(root, 'server.mjs'));
  const child = spawn(process.execPath, [path.join(root, 'server.mjs')], {
    cwd: root, detached: true, stdio: 'ignore'
  });
  let spawnError;
  child.on('error', error => { spawnError = error; });
  child.unref();
  for (let attempt = 0; attempt < 40; attempt++) {
    if (spawnError) throw spawnError;
    await new Promise(resolve => setTimeout(resolve, 150));
    const state = await runningServer(root);
    if (state) return state;
  }
  throw new Error('书页服务未能启动；聊天可继续，内容暂未保存。请检查本地服务后重试。');
}
