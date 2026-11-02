# Local book-page synchronization · prototype 0.3

Read this when local book saving is authorized, whether creating a new book or using an explicitly supplied one. Follow the conversation contract and record rules. This is a local companion display; it does not read Codex chat history and no additional model API is used. The agent itself selects and writes material through the utility.

## Participant scope

Use only the book created for this conversation or an explicitly supplied session ID, mechanism resources, and the local utility. Do not list other session files or attach to a globally recent book. Separate research use remains separately agreed. Explain a failure briefly without pretending the book was updated.

If the person withdraws permission to save or asks to keep the rest in chat, stop book writes. Do not delete earlier records unless they request that too.

## Create and open a new book automatically

The installed host skill contains `scripts/book.mjs`. Resolve its absolute path beside that skill's `SKILL.md`. It locates the configured local application without reading personal records, starts its local server if necessary, and supports `create`, `read`, `patch` and `link`.

After local-saving permission and enough material for first pages, run:

```text
node /absolute/path/personal-training-manual/scripts/book.mjs create
```

Use a retained terminal session (`exec_command` with `tty: true` and a short yield). On `READY_FOR_JSON_ON_STDIN`, send one JSON line with `write_stdin`. Its fields are `alias` (optional, may be empty), `focus` (the participant's current question) and `ops` (the actual operation objects described below).

Use `addSource` and `upsertEntry` objects as below for the first meaningful pages. The initial operations are validated and saved together before success; an invalid draft does not create an empty book. Keep personal wording out of shell arguments and temporary files. Output contains `ok`, the new `id`, `revision`, entry count and exact session `url`. Keep that ID in the current conversation. Never reuse another participant's ID, a demo or a synthetic test record.

Open the returned URL using an available browser tool, preferring the in-app browser. Reuse a demo tab if appropriate; preserve existing personal books by using a new tab. Mark the user-facing book as a deliverable when the tool requires it. Do not ask the participant to copy connection information. If automatic opening is unavailable, provide the exact clickable URL and say so; a successful save is distinct from a successful page opening. Never claim an unobserved browser result.

If a create command succeeded, reuse its ID rather than creating another book because browser opening failed. If the result is lost or uncertain, stop and resolve it; do not repeatedly create duplicates. The `link --id SESSION_ID` command returns the current server URL after checking that book exists. No transcript is automatically imported from elsewhere.

## Read the current book

Use the installed helper, or the utility path explicitly supplied by the participant:

```text
node /absolute/path/personal-training-manual/scripts/book.mjs read --id SESSION_ID
```

The command checks local runtime metadata, starts the local service if needed, and prints the authorized JSON record. It includes `revision`, `entries`, and selected `sources`. Read before each update because the participant can edit the page between chat turns. If the helper fails, keep the draft in chat, report that it has not been saved, and resolve the failure rather than asking the participant to recreate the connection manually.

## Write a meaningful small update

Update when there is something worth retaining or the participant requests it. Let conversation remain primary; do not create a new page for every answer. Preserve existing participant edits. New interpretations remain tentative. You may update existing unconfirmed suggestions with the latest account; an accepted or participant-revised page must stay intact, with a new related suggestion proposed if needed.

Run:

```text
node /absolute/path/personal-training-manual/scripts/book.mjs patch --id SESSION_ID --expected-revision N
```

Use a retained terminal session (`exec_command` with `tty: true`, short initial yield). It displays `READY_FOR_JSON_ON_STDIN`. Send one newline-terminated JSON object using `write_stdin`. Its input is not echoed. Do not put participant content in shell arguments or a new temporary file. Wait for the success response before saying the book changed.

Input form:

```json
{"ops":[
  {"type":"addSource","source":{"id":"S1","label":"关于某个事件的本人讲述","excerpt":"仅放本人同意保留的原话；也可为空并标明转述"}},
  {"type":"upsertEntry","entry":{"id":"E1","type":"memory","title":"事件自己的名称","body":"准确且适量的本人叙述","origin":"participant","status":"reported","sourceIds":["S1"],"relatedIds":[]}},
  {"type":"upsertEntry","entry":{"id":"I1","type":"skill","title":"一个尚待讨论的联系","body":"根据真实叙述提出的暂时理解","origin":"ai_suggestion","status":"unconfirmed","sourceIds":["S1"],"relatedIds":["E1"]}}
]}
```

This is a format example, not a participant record to write verbatim. IDs must be unique within the book. Add referenced sources first; relationships can refer to entries in the same successful update. Keep source excerpts optional and selective. The updater accepts only bounded record operations, validates references, and serializes writes.

### Entry fields

- `type`: `memory`, `skill`, `loop`, `tool`, `value`, `question`, `next`, or `custom`.
- `title`, `body`: participant-facing language, with no Markdown formatting needed in the body; paragraphs can use newlines.
- `origin`: `participant` for reported events or the person's own interpretation; `ai_suggestion` for AI-generated interpretations and questions.
- New AI-origin entries use `unconfirmed` or `open`. Participant-origin entries may use `reported`, `participant_proposed` or `open`.
- `sourceIds`: references to selected saved sources. `relatedIds`: references to other saved entries, such as a memory that supports a suggestion.
- `setFocus` with a `focus` string changes the cover's current question when that reflects the participant's stated change of focus.

In this first book implementation, the page's explicit “这句话像我” and “改写” operations set the protected accepted/revised states. The AI utility cannot assign those states. If the participant endorses a sentence in chat, follow their meaning in the conversation; do not falsely claim the page's confirmation status has changed. They may mark a page when useful; do not require confirmation after each entry.

## Conflicts, correction, and deletion

- A `409` means the book changed or a protected page would be overwritten. Read again; incorporate the participant's version. Do not repeatedly retry the old update or overwrite their edits.
- Correct an unconfirmed suggestion by updating it. A rejected interpretation must not return under a synonym.
- If the participant explicitly requests removing a page in chat, use `{"type":"deleteEntry","id":"ENTRY_ID","userRequest":"the participant's explicit deletion request"}`. Only use this when actually requested. The utility removes that page, its saved source excerpts, and those source/entry links elsewhere, without retaining an old version. Other pages' wording remains; discuss separately if they want related wording removed too.
- Never promise to delete Codex history or provider records. Local book editing affects this book only.
- Do not manually edit `data/sessions/*.json` or impersonate a browser participant to bypass the utility's protections.

## Conversation and page language

After a successful update, a short natural remark such as “我把这段经历先留在书页里了，你可以随时改” is sufficient if mentioning the update helps. Do not expose JSON, revision numbers, commands, or routing labels in ordinary reflection. User-requested technical explanations are fine.

The page polls the local record approximately every 1.4 seconds. It shows new material after a successful write, not token-by-token chat streaming. No past conversation is automatically imported. Native Codex tool calls and permission notices may remain visible in its interface; do not claim this is an independent chat application.
