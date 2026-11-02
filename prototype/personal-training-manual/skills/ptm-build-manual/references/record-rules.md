# Record rules and flexible template · 0.3

## Minimal record model

The participant-facing output is an editable local book when authorized, with Markdown available for chat-only use and export. The following fields guide its content; the book protocol defines the actual update operations.

| Record | Minimum useful fields | Meaning |
| --- | --- | --- |
| Session | participant-chosen alias; date; current question; permitted save location | A selected record of this conversation, with no real name required |
| Episode (`E1`, etc.) | short title; participant's account; relevant context; selected source excerpt or chat-turn description | A reported experience, not externally verified history |
| Interpretation (`I1`, etc.) | proposed wording; linked episode(s); who proposed it; current confirmation status; conditions or unresolved points | A person's current understanding or an explicitly tentative AI suggestion |
| Priority/question | participant's wording; related episode/interpretation if any; optional next experiment | Something they care about or still want to understand |
| Revision | which entry changed; participant-requested change; current wording | Enough to continue accurately, with no obligation to retain deleted private text |

Source excerpts are optional if the person does not want quotations stored. Preserve their account in participant-approved wording instead, and identify it as a paraphrase. Describe provenance as accurately as the saved material allows. Do not claim a quotation is verified if the originating message is no longer available. A question or future direction proposed by the AI is also a suggestion; distinguish it from the participant's own question or goal.

## Confirmation language

- `本人讲述` — an episode or phrase reported by the person.
- `本人提出的理解` — the person themselves offered this interpretation.
- `AI提出·待确认` — a hypothesis from the AI.
- `本人认可` — explicit agreement with that particular interpretation.
- `本人改写` — the person supplied/revised the wording.
- `暂时开放` — unresolved or intentionally left incomplete.

Do not automatically infer agreement with multiple entries from a single ambiguous response. If the scope matters, clarify at the next appropriate review point. Do not ask the person to certify historical accuracy or “correctly” understand themselves.

## Template

Book prose should be concrete and personally readable. The interface supplies provenance and status labels; repeating “AI提出·待确认” inside each body adds noise. A useful open question conveys the remaining uncertainty better than a paragraph of methodological limitations. Keep technical research cautions in researcher-facing notes. These presentation choices do not remove grounding or participant control.

Use relevant parts only. All explanatory text below is template guidance to replace or omit, not facts about a participant.

```markdown
# 我的个人训练说明书

称呼：〈可选化名〉  日期：〈本次日期〉

## 我现在想弄清楚
〈本人提出的问题〉

## 仍在影响我的经历 · Memory
### E1 〈事件标题〉
本人讲述：〈选定的事件和当时条件〉
来源：〈经同意保留的短引文，或标明为转述〉
仍说不清：〈如有〉

## 我逐渐学会的做法 · Skill
### I1 〈自己的名称〉
当前理解：〈一句有具体内容的描述〉
关联经历：E1
提出者及状态：〈本人提出的理解 / AI提出·待确认 / 本人认可 / 本人改写〉
适用条件与代价：〈若已谈到〉

## 我常出现的做事方式 · Loop
〈保留被本人认出的模式及其情境，或省略本节〉

## 我能借助的东西 · Tool
〈工具、他人的帮助、关系与其他资源，或省略本节〉

## 今天仍在乎的事
〈包括收入、关系、学习、创造、休息等本人实际表达的内容〉

## 关于 AI 与工作的当前想法
〈分清具体使用经验、担心和设想；相关时才写〉

## 暂时开放的问题
〈尚无结论也可以带走〉

## 我愿意尝试的下一步
〈仅在本人想做并认可时加入，也可省略〉
```

## Before handing over

Check that every interpretation has a traceable basis or is clearly identified as a question; that rejected labels did not return; that the document preserves relevant tensions and contributions; that omitted categories are not treated as faults; and that the person can tell which wording remains provisional. This is a content check, not a psychological assessment.
