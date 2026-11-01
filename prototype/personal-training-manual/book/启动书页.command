#!/bin/zsh
cd -- "$(dirname -- "$0")" || exit 1
if command -v node >/dev/null 2>&1; then
  ptm_node="$(command -v node)"
else
  ptm_node="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
fi
"$ptm_node" launch.mjs
