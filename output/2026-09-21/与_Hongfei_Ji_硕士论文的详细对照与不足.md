# 与 Hongfei Ji 2024 MSCD Thesis 的详细对照

参考论文：Hongfei Ji, *Just an Error? Prototyping Embodied Experiences of LLM Hallucinations*，CMU Master of Science in Computational Design, Spring 2024。

## 先说结论

这篇论文和我的项目在研究形式上很接近，但研究问题并不相同。

共同形式是：两者都用 Research through Design 研究一个难以直接表达的数字技术经验；都选择三个 probes；都希望通过具体体验让参与者说出平时难以说清的感受；最终都不只交三个原型，而要从设计过程、参与者反应和跨原型比较中形成研究发现。

最大的区别是：Ji 的论文始终围绕一个相对明确的研究对象——LLM hallucination。三个原型只是这个对象的三种解释和三种媒介。我的论文目前同时涉及 super apps、AI chat 和 AI agents，又分别讨论 living、knowing 和 acting。如果缺少统一的分析结构，老师很容易认为这是三个相关但分开的项目。

我的项目目前不是“想法不够”。真正不足的是从大想法到可执行研究之间的中间层：文献缺口、precedent 分析标准、统一概念框架、原型迭代记录、study protocol、分析方法和从材料到贡献的证据链。

## 1. 这篇论文实际完成了什么

它的正文结构很清楚：

| 部分 | 页码 | 完成的工作 |
|---|---:|---|
| Abstract / Introduction | 13–17 | 定义问题、提出两个 RQ、介绍三个原型、预告发现和贡献 |
| Background | 19–52 | 技术文献、algorithmic experience、multimodality、speculative design、八个 precedents、两轮个人实验 |
| Research Questions and Hypothesis | 53–58 | 把文献和实验整理成三个工作框架 |
| Methodology | 59–86 | 说明 RtD 立场、三个原型的 intention、concept、技术、批评与迭代，以及 pilot protocol |
| Evaluation | 87–99 | 六名参与者、观察、访谈、workshop、affinity diagram、quotes、跨原型反思和 design insights |
| Conclusion / Limitations | 101–104 | 两项贡献、样本和原型限制、未来改进 |
| Appendices | 111–113 | 研究流程、访谈问题和 participatory design outcome |

它看起来像一篇完成度较高的硕士论文，不只是因为有 116 页，而是因为读者可以沿着一条路径检查作者的研究：

> literature and precedents → working framework → probe decisions → critique and iteration → participant material → comparison → design insights → limitations

## 2. 相似之处

| Ji 的论文 | 我的论文 |
|---|---|
| LLM hallucination 是抽象、难以直接观察的算法经验 | human-system roles 和 systems shaping life 是抽象、难以直接表达的关系 |
| 三个 probes 探索 empathy、serendipity、alchemy | 三个 probes 探索 living、knowing、acting |
| 使用 speculative / provocative experiences | 使用 Trojan Horse、反转和 reflective friction |
| 观察参与者怎样 recognize、interpret、relate | 观察参与者怎样察觉系统安排、联系后果、表达希望的角色 |
| 从 probe failures 和 participant responses 形成 design insights | 计划从选择、修改、注释和访谈形成 situated design considerations |
| 不把 prototype 当成商业产品 | 不把 prototype 当成最终解决方案 |

因此，这篇论文能成为我的结构参考，尤其可以参考它怎样记录原型的发展和失败。但它不能成为内容模板，因为它讨论的是一种算法现象，而我讨论的是跨三种系统安排的人与系统角色。

## 3. 她做得比我目前完整的地方

### 3.1 她有一个固定研究对象

她的三个原型差异很大：voice assistant、chatbot、XR brainstorming environment。但每一个都必须回答同一个问题：人怎样 recognize、interpret 和 relate to LLM hallucination。

我目前有统一主题 human-system roles，但三个 probe 的直接问题还不完全一致：

- *Evil PM Simulator* 容易变成对商业平台和 dark patterns 的批评；
- *Epistemic Illusion* 容易变成对 AI 依赖或知识所有权的研究；
- *Cyber-Utopia Persona Quiz* 容易变成 agent delegation 和 edge cases 的研究。

如果三者只共享一句“systems shape us”，还不够。它们必须使用同一套分析问题。

建议把跨三个 probes 的统一分析框架固定为：

1. **Identify the system arrangement**：参与者看到系统在怎样参与？
2. **Connect it to a lived consequence**：它对生活、认识或行动造成什么后果？
3. **Articulate the preferred roles**：参与者希望自己和系统各自扮演什么角色？为什么？

这其实已经存在于我的 Measurable Success Criterion 中，但目前它只出现在 Impact Model，还没有真正成为文献结构、原型设计、访谈问题和分析 codebook 的共同骨架。

### 3.2 她的文献回顾会产生设计决定

Ji 不只罗列文章。她用固定问题比较八个 precedents，例如：

- 作品怎样把概念变成可以体验的形式？
- 是否重新解释了原概念？
- interaction 是研究媒介还是产品功能？
- 有没有 audience response？

我的文献目前更像“这篇支持 Reference Model 的哪根箭头”。这对 DRM 作业有用，但不足以支持完整 thesis。

我需要增加一个 precedent matrix，并对每个相关项目用同一套问题分析：

1. 它研究哪种 human-system relationship？
2. 它如何把抽象关系变成一个可体验的 moment？
3. 参与者在体验中可以做什么，而不是只看什么？
4. 研究者收集了什么材料？
5. 作品怎样避免把参与者引向预设答案？
6. 结果是 findings、framework、design implications，还是作品本身？

### 3.3 她在正式原型前做了 hands-on experiments

Ji 在完整三个 probes 之前先用 API 做小实验，观察 hallucination 怎样出现，再由实验形成工作框架。这个过程让她的 prototypes 看起来是从材料研究中长出来的。

我的三个 probes 目前主要来自概念推理和个人观察。缺少前期材料：

- super-app feature audit；
- Chinese Gen Z 的短访谈或 digital routine mapping；
- AI chat 的 contribution-trace walkthrough；
- agent rules 和 edge cases 的快速 card sorting；
- 对“living, knowing, acting”分类是否真的有意义的初步测试。

这些不一定要变成大型 field study，但至少要有一轮 formative inquiry，证明三个 probes 不是只从我的理论兴趣中直接跳出来的。

### 3.4 她记录了每个 prototype 的 intention、concept、making、critique 和 iteration

每个原型不只写“用户怎么玩”。她写了：为什么选这个媒介、想让什么变得可感受、技术怎样实现、别人怎样批评、下一版改了什么。

我的当前材料主要是概念描述。还缺：

- version 0 / 1 / 2 的变化；
- 每个关键互动背后的研究假设；
- 为什么这个媒介适合这个问题；
- 失败的路径和被放弃的决定；
- 原型实际记录哪些数据；
- 原型怎样避免 usability problem 淹没研究问题。

### 3.5 她有可检查的研究流程

她明确写了六名参与者、三组 pair session、think-aloud、30 分钟体验、semi-structured interview、workshop、JSON logs 和 affinity diagram。Appendix 还保留了 protocol。

我的方法目前只有“choices, revisions, annotations, observations and interviews”。这还不是一个能执行的 protocol。需要确定：

- 招募标准和排除标准；
- Chinese Gen Z 的年龄或出生年份定义；
- 是每人体验三个 probes，还是不同人体验不同 probe；
- 顺序是否 counterbalance；
- 每个 probe 多久；
- 哪些问题在体验前问，哪些体验后问；
- 什么会被录屏、录音和存储；
- 怎样 debrief Trojan Horse 的反转；
- 怎样处理退出和删除数据；
- 怎样从原始材料形成 codes、themes 和 cross-case comparison。

### 3.6 她把失败也写成研究材料

论文最值得学的一段不是漂亮原型，而是 pp. 93–99 的 comparative reflection。她连续使用：

> What I thought / expected → What they did → Why

参与者把 privacy leak 看成普通 glitch；看不懂 visualization；学习 Quest 的负担盖过 hallucination；workshop 也没有产生作者期待的词汇。作者没有删掉这些失败，而是据此形成 design insights。

我的研究也需要提前建立这种写法。否则 Trojan Horse probes 很容易只留下“参与者觉得有趣，也产生了反思”的成功故事。

## 4. 这篇论文自身也有明显不足

它达到硕士论文的完成度，但不表示方法和论证都很强。

### 4.1 Research gap 有时说得过大

作者写“current research has shed no light”，但她的 review 并不足以证明整个研究领域完全没有相关工作。我的论文不要写“no one has studied...”。可以写：

> Existing work addresses parts of this problem, but it does not yet fully explain...

而且这只能作为 working gap，直到完成更广的 review。

### 4.2 两个 RQ 包含太多动作

她的第一个问题同时包含 interpret、recognize、relate，第二个问题又包含 designers、user insights、embodied media 和 methodologies。后面的章节虽然勉强接住了，但问题本身较拥挤。

我的 RQ 也有类似风险：`understand and negotiate`、`their own role and the role of systems`、`living, knowing and acting`、三种技术都放在一个句子里。它在概念上成立，但还需要 2–3 个 sub-RQs 把实际分析拆开。

### 4.3 样本高度偏向设计内部人员

六名参与者全部是 MSCD students/alumni，熟悉 LLM 和设计研究。这个样本适合 pilot 和 design critique，却不能代表一般用户。作者自己在 p. 103 承认样本太小、人口构成太窄。

我的参与者如果全部来自设计学院，会削弱 “Chinese Gen Z everyday life” 的主张。我需要至少让参与者在职业、AI 使用程度、城市经历或 super-app 依赖上有差异，并清楚说明这是 purposive sample，不代表全部中国 Z 世代。

### 4.4 Probe usability 干扰了研究对象

参与者花很多精力学习装置和 Quest，反而没有精力理解 hallucination。作者承认 collected feedback 很多变成了 usability feedback。

这对我非常重要。我的游戏如果规则、世界观和反转太复杂，参与者最后只会评论：

- 游戏好不好玩；
- AI 为什么突然消失；
- quiz 选项不合理；
- 我没看懂怎样操作。

因此三个 probes 不需要追求同等规模或同等技术炫技。它们应该追求同等清楚的研究 moment。

### 4.5 参与者材料到 design insights 的分析不够透明

作者说使用 affinity diagram，但没有完整展示 codebook、编码步骤、研究者怎样处理矛盾材料，也没有第二位研究者检查解释。大量 quotes 很有价值，但 findings 到 insights 之间仍较依赖作者判断。

我的论文需要更清楚地留下 evidence trail：

> raw action or quote → initial code → theme → cross-probe comparison → revised model or design consideration

### 4.6 有些 contribution claim 超过现有证据

作者称自己扩展了 algorithm experience prototyping methodology，但实际只有六名 insider participants 和三个仍有严重 usability 问题的 probes。这个说法有启发性，却不算被强力验证。

我的论文也应避免把结果叫作一套新的 universal framework。更合适的是：

> a situated account, an annotated probe portfolio, a revised working model, and design considerations for further testing

## 5. 对照之后，我目前最明显的不足

### A. 核心概念还没有完成可分析定义

我使用 human-system roles、agency、living、knowing、acting、shape、negotiate 等词，但还没有说明研究材料里出现什么，才算这些概念真的出现了。

例如，“协商角色”至少可能包括：

- 指认系统现在承担的角色；
- 指认自己现在承担的角色；
- 说明这种分配带来的好处、负担或后果；
- 维护、拒绝或重新定义这种分配；
- 说明判断依赖的具体情境和价值。

这些需要进入 codebook，而不是只停留在摘要中。

### B. Chinese Gen Z 仍缺少文献和方法上的理由

Plantin 可以支持“中国的平台基础设施很特殊”，但不能支持“Chinese Gen Z 是一个特殊群体”。目前 Chinese Gen Z 更像招募边界，而不是已被论证的分析变量。

有两个选择：

1. 把它诚实地写成 **a situated study with adult Chinese Gen Z participants**，不声称发现是由“世代特征”造成；
2. 如果一定要论证 Gen Z 特殊，就需要加入 digital upbringing、mobile internet、education、work pressure 和 generational media practices 的文献，并说明为什么不需要与其他年龄组比较。

在硕士项目时间内，第一个选择更稳。

### C. 三种系统不是同一种证据状态

- Super apps 是参与者已经生活其中的基础设施。
- Generative-AI chat 是使用程度差异很大的当前工具。
- AI agents 是部分现实、部分推测的未来安排。

三者不能假装是完全平行的现状，也不能写成所有人都会经历的直线技术进化。研究设计需要分别标注：lived experience、current uneven practice、speculative encounter。

### D. 当前 Key Factor 和 RQ 有轻微冲突

RQ 问参与者怎样理解和协商角色，是开放的探索。Impact Model 的 Key Factor 是提高 recognition，听起来更像希望 probes 教会参与者看见问题。

这两个目标可以共存，但必须分开：

- **Research aim**：理解参与者怎样描述和协商角色；
- **Intervention hypothesis**：probes 可能让隐含关系更容易被表达；
- **Research success**：获得丰富、具体、包括反对意见的材料；
- **Participant outcome**：部分参与者可能产生新的 recognition，但这不是必须出现的正确答案。

否则老师会继续问：这是研究，还是教育参与者？

### E. 三个 probes 还没有形成真正的 portfolio grammar

它们现在共享主题，但缺少一致的比较维度。每个 probe 都应该记录同样六项内容：

1. 当前 system role；
2. 当前 human role；
3. 让这种角色分配出现的 system arrangement；
4. 对参与者造成的 consequence；
5. 参与者同意、矛盾或拒绝的 moment；
6. 参与者希望的 role arrangement 和理由。

只有这样，三个作品最后才能比较，而不是分别写三个案例总结。

### F. 目前缺少真实设计和研究证据

Reference Model、Impact Model、摘要和大纲已经比早期清楚很多，但它们仍是研究计划。距离完整 thesis 最大的工作量在：

- precedent review；
- formative inquiry；
- prototypes 的制作与迭代；
- pilot；
- final study；
- systematic analysis；
- 失败、反例与修改记录。

这不是文字润色能补上的部分。

## 6. 三个 probes 各自最需要补什么

### Evil PM Simulator

目前优势：它最有中国日常语境，也最接近“工具变成生活条件”的大问题。

需要补：

- 不只呈现广告和 KPI，还要呈现 bundling、network effects、institutional adoption、data enclosure 和 lack of alternatives；
- 让玩家看到每个产品决定怎样改变用户日常，而不是只看到 revenue 上升；
- 记录玩家何时觉得某项设计“必要”“正常”“太过分”以及理由；
- 结尾不要只揭露玩家做了坏事，而要让其描述平台、机构、PM 和用户各自有什么选择或没有选择。

### Epistemic Illusion

目前优势：体验 moment 清楚，容易产生可讨论的中断。

需要补：

- 说明 AI 中断为什么能研究 knowledge role，而不是人为制造挫折；
- 保留 contribution trace，让参与者指出哪一步来自自己、AI 或共同修改；
- 比较理解、核验、信任、心理所有感和责任，不要把它们混成“依赖”；
- 考虑中断前后的解释任务，而不只是是否猜对凶手；
- 接受参与者认为 AI 协作很成功、并未失去理解的反例。

### Cyber-Utopia Persona Quiz

目前优势：最直接触及“系统替我行动时，它是什么角色”。

需要补：

- 先明确 3–4 类 agent role，例如 reminder、advisor、filter、delegate；
- 每个 edge case 必须严格执行参与者原先的规则，不能为了反转而让 agent 违规；
- 情境需要来自真实或 formative interviews，而不是只靠设计者想象；
- 记录参与者为什么保留、修改或拒绝规则；
- 分析改变来自情境信息不足、关系价值、责任、风险，还是规则本身表达不清。

## 7. 建议采用的研究主线

### Master RQ

> **How do adult Chinese Gen Z understand and negotiate their own role, and the role of digital systems, across everyday living, knowing, and acting in the context of super apps, generative-AI chat, and emerging AI agents?**

### 建议的三个 sub-RQs

1. **How do participants identify the role taken by a digital system in each probe?**
2. **How do they connect that role to consequences for everyday living, knowing, or acting?**
3. **How do they maintain, question, or redefine the roles they want for themselves and the system?**

这三个 sub-RQs 比按三个技术分别写三个问题更好，因为它们让每个 probe 接受同一套分析。技术差异成为比较对象，而不是把论文拆成三个项目。

## 8. 建议的 study 结构

### Formative phase

- 对 super-app 日常流程做 mapping 或 diary interview；
- 对 AI chat 使用做 contribution walkthrough；
- 用 agent role cards 和 edge-case cards 做快速讨论；
- 用结果修改三个 probes。

### Pilot phase

- 每个 probe 先找 2–3 人；
- 主要测试研究 moment 是否清楚，不急着形成 findings；
- 记录 instruction、学习负担、误解、被引导感和访谈问题是否有效；
- 每轮保存 version、critique、change 和 reason。

### Main study

- 使用 purposive sample，让 AI 使用程度和生活背景有一定差异；
- 如果每个人体验三个 probes，需要改变顺序，减少 order effect；
- 每个 probe 后做短 debrief，最后做 cross-probe mapping；
- 收集操作记录、think-aloud、选择理由、修改、访谈和 researcher notes；
- Trojan Horse 反转后进行完整 debrief，并允许参与者反对研究框架。

### Analysis

先在每个 probe 内分析，再跨 probes 比较。可以用 deductive 和 inductive 混合编码：

- system role；
- human role；
- system arrangement；
- consequence；
- acceptance / tension / refusal；
- preferred relationship；
- Chinese contextual condition；
- unexpected theme or counterexample。

## 9. 最终 thesis 应该达到的证据链

最终每条 design consideration 都应该能被追溯：

> literature or formative material  
> → probe design decision  
> → participant action or statement  
> → code and theme  
> → comparison across probes  
> → revised model or situated design consideration

例如不能只写：

> Designers should make system roles visible.

而要写成：

> 在哪些 probe 情境里，参与者没有意识到系统角色？什么 interaction moment 让它变得可说？参与者是否因此希望改变角色？有没有人不同意？这个发现在哪些条件下成立？

## 10. 优先级：现在最应该补的五件事

1. 把统一的三步分析框架写进 RQ、每个 probe、访谈和 codebook。
2. 建立 12–20 个相关 precedents 的对照矩阵，而不是继续单篇积累摘要。
3. 做小规模 formative inquiry，让三个原型的情境来自参与者生活材料。
4. 为三个 probes 分别写 intention、research assumption、interaction moment、data captured 和 debrief。
5. 建立版本和证据日志，从现在开始保留 critique、失败、修改理由和反例。

## 最后的判断

Ji 的论文目前比我的项目完整很多，因为它已经走完“做、试、分析、反思、写成贡献”的全过程。我的项目在概念野心和社会情境上可能更大，但现在仍主要处于 research framing 和 planning 阶段。

我不需要模仿她的 XR 技术量或 116 页长度。真正应该达到的“水平”是：每个概念有文献来源，每个原型选择有研究理由，每个 finding 有参与者材料，每个 design consideration 可以追溯到分析过程，而且失败和限制被诚实保留。
