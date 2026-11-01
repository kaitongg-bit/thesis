# Personal Training Manual / 个人训练说明书

A thesis research prototype combining guided reflection in Codex with a local, editable book-page display. The “trained by the world” metaphor connects experiences, learned approaches, recurring habits and sources of support through **Memory, Skill, Loop and Tool**. The manual also leaves room for priorities, questions and participant-defined categories.

This is an early design prototype. The sample content and engineering checks use synthetic material. Human-participant evaluation and relevant professional review remain future research work.

![Book-page preview](book/preview-pages.png)

## Run locally

Requires Node.js 20 or later; no application dependencies or separate model API key are needed. The reflection conversation runs in the user's existing Codex environment and uses its applicable allowance.

```sh
cd prototype/personal-training-manual
node book/server.mjs
```

Open the `Local` address printed by the server. On macOS, `book/启动书页.command` also starts the local service and opens the page.

The opening book is a clearly marked fictional sample. It supports page turning, source excerpts, related-page navigation, editing, acceptance, leaving a question open, deletion and Markdown export. Sample changes are temporary.

## Connect a Codex conversation

Copy the five directories inside `skills/` into your own Codex skills directory (`~/.codex/skills/`), preserving any unrelated existing skills. The required directories are:

- `personal-training-manual`
- `ptm-explore-experience`
- `ptm-work-and-values`
- `ptm-repair-conversation`
- `ptm-build-manual`

In the local page, choose **开始我的说明书**, read the local storage explanation, and create a book if you want one. Copy its generated start message into a new Codex conversation. This authorizes the selected local book and tells Codex how to use the synchronization utility.

At meaningful points in the conversation, the manual skill can write selected material through `book/bookctl.mjs`. The page checks for updates approximately every 1.4 seconds. It does not read the Codex conversation stream or automatically import earlier chats.

## Records and controls

Personal books are stored only in `book/data/sessions/`, which is ignored by Git. Local runtime information is under `book/.runtime/`, also ignored. The server binds to `127.0.0.1`; there is no public deployment or multi-user account system.

The updater checks revision conflicts, provenance links and protected participant edits. A page explicitly accepted or rewritten in the browser cannot be silently replaced by an AI update. Deleting a page removes its saved excerpts and cross-links, without creating an old-version backup; other page wording and platform chat history are unaffected.

Only prototype source, mechanism notes and clearly marked synthetic examples belong in this repository. Separate research use of any participant material requires its own authorization and institutional process.

## Check the implementation

```sh
cd book
node --test tests/store.test.mjs
```

The tests cover protected edits, revision conflicts, source validation, deletion, concurrent updates and record-path boundaries. They do not establish clinical suitability or reflective effectiveness.

To stop the locally running service:

```sh
node book/stop.mjs
```

## Design and research notes

- [Start using the mechanism](00_开始使用.md)
- [Conversation mechanism](01_机制设计.md)
- [Sources and design decisions](02_文献依据与设计决策.md)
- [Test scenarios](03_测试情境与验收.md)
- [Pilot-study plan](04_先导试用与研究记录.md)
- [Mechanism check record](05_本轮检查记录.md)
- [Book-page guide](06_书页原型_使用说明.md)
- [Book-page check record](07_书页原型_检查记录.md)

The mechanisms adapt ideas from prior reflective-interaction and career/narrative research; see the source notes for attribution and evidence limits. Skills are guidance for a model, not a guarantee that every future response follows the intended behavior.
