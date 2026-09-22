# 三篇核心文献导读：Plantin、Amershi、Gaver

这份笔记不是三篇论文的普通摘要。它围绕我的论文回答三个问题：

1. 为什么中国语境重要？
2. 现有的人机交互原则已经研究了什么，我还可以研究什么？
3. Research through Design 最后能够产出什么知识？

## 先看三篇怎样连起来

| 文献 | 它帮我回答什么 | 在论文中的位置 |
|---|---|---|
| Plantin & de Seta (2019) | 为什么微信不只是一件工具，而可以成为日常基础设施？ | 中国语境、super-app probe、ways of living |
| Amershi et al. (2019) | 已有 human-AI design guidelines 覆盖了哪些界面问题？ | 文献缺口、AI chat 和 agent probes 的对照基础 |
| Gaver (2012) | RtD 为什么不一定产出普适理论？三个原型怎样共同构成知识？ | 方法、研究产出、annotated portfolio |

三篇合起来形成一条逻辑：

> 中国的数字平台可能已经成为生活基础设施；现有 HAI 原则主要帮助设计者检查具体、可观察的交互问题；我的 RtD 项目进一步用三个有关联的 probes，研究参与者怎样理解人和系统在生活、认识和行动中的角色。

这是一条目前可以使用的工作性论证。它还不是最终的 literature gap。正式论文需要继续检查是否已有研究直接连接了中国 Gen Z、平台基础设施、生成式 AI、agent delegation 和 human-system roles。

---

## 1. Plantin & de Seta：为什么“中国”不是一个人口标签

### 文献信息

Plantin, J.-C., & de Seta, G. (2019). *WeChat as infrastructure: The techno-nationalist shaping of Chinese digital platforms*. Chinese Journal of Communication, 12(3), 257–273.

### 一句话读懂

微信从一个通信平台扩张成了具有基础设施特征的系统：它规模大、连接许多服务，并且在人们的社会生活中变得难以缺少。

### 作者真正做了什么

作者没有简单地说“微信功能很多”。他们区分了 platform 和 infrastructure：

- **Platform** 依靠用户参与、第三方开发、模块和 API 来扩张。
- **Infrastructure** 具有大规模、普遍使用和关键性。人们的其他活动开始依赖它。
- 微信把两者结合起来：它允许公众号、小程序和支付等服务生长，同时把越来越多的信息和活动留在自己的生态里。
- 这种发展不是单纯由产品设计造成的。商业目标、中国互联网发展、国家政策、支付系统和社会组织一起参与了它的形成。

作者用一个很具体的判断说明 infrastructure：当一个人没有微信时，联系家人、支付、打车、参加学校或社区活动都会变困难。重点不是“这个 app 很方便”，而是其他生活流程已经按照它的存在重新组织。

### 它怎样支持我的论文

它支持我说：

> In China, a super app can become part of the conditions of everyday life, rather than remaining one optional tool among others.

它也帮助我改正 *Evil PM Simulator* 的重点。这个 probe 不应只讨论弹窗、广告和 dark patterns。它更重要的问题是：

> 一个 app 怎样通过功能整合、网络效应、机构采用和缺少替代方案，逐渐变成人们必须学习和适应的生活环境？

玩家扮演 PM 时，不只是“设计坏功能”。玩家应该看见，每增加支付、群组、购物、小程序、身份和公共服务，平台就更接近基础设施，用户离开的实际成本也变高。

### 它不能替我证明什么

- 它没有研究 Chinese Gen Z 这个群体。
- 它没有研究生成式 AI 或 AI agents。
- 它不能证明所有中国人都依赖微信到同样程度。
- 它主要解释平台怎样基础设施化，没有直接回答用户希望自己和系统各自扮演什么角色。
- 文章使用的材料早于目前的生成式 AI 环境，所以我需要把它作为历史和结构基础，而不是当成对今天所有现象的完整说明。

### 阅读时优先看

1. Abstract 和 Introduction 中丢失手机的案例。
2. “WeChat: From Platform to Infrastructure”。
3. Official Accounts、Mini Programs 和 WeChat Pay 的分析。
4. Conclusion 中作者对“中国模式”不能被普适化的提醒。

### 读完后我应该能回答

1. 一个产品具有什么特征时，开始像 infrastructure？
2. 为什么“离不开微信”不只是个人使用习惯？
3. *Evil PM Simulator* 应该呈现哪些结构力量，而不只是坏界面？

---

## 2. Amershi et al.：别人已经提出过哪些 human-AI 原则

### 文献信息

Amershi, S., Weld, D., Vorvoreanu, M., et al. (2019). *Guidelines for Human-AI Interaction*. Proceedings of CHI 2019.

### 一句话读懂

作者把二十多年的人机交互建议整理成 18 条可以检查的设计原则，并通过多轮研究让这些原则更清楚、更容易用于产品评估。

### 18 条原则的大结构

作者按照互动发生的时间，把原则分为四组：

1. **Initially**：让用户知道系统能做什么、做得多好。
2. **During interaction**：根据当前情境行动，提供相关信息，符合社会规范，并避免放大偏见。
3. **When wrong**：允许用户忽略、调用、纠正系统，并说明系统为什么这样做。
4. **Over time**：处理记忆、个性化、反馈、全局控制和系统能力更新。

这篇文章很重要，因为它提醒我：解释、纠正、拒绝、反馈和全局控制并不是我的新发现。我的论文不能把“增加撤回按钮”包装成全新的理论贡献。

### 这篇文献自己的边界

作者有意选择了能够通过查看界面来评估的、具体可观察的 guidelines。他们甚至排除了“build trust”这样的宽泛原则。作者也承认，一般原则和特定领域之间存在取舍，有些系统需要更专门的原则。

这正好帮助我区分两个研究层级：

- Amershi 等人主要问：一个 AI 功能在互动中应该怎样表现？
- 我的论文主要问：当系统从功能变成生活基础设施、知识参与者或行动代理者时，人怎样理解自己和系统各自的角色？

我的研究不是反对这 18 条原则。它要以这些原则为基础，研究一个更靠近生活关系和具体文化环境的问题。

### 它怎样影响三个 probes

#### Evil PM Simulator

这篇文章对非 AI 的 super-app probe 不是主要理论来源。不过，它提醒我不能把“透明”和“控制”当成没有前人研究的新想法。

#### Epistemic Illusion

AI 是否解释答案、是否允许纠正，只是一个层面。probe 更应该观察：参与者是否知道哪些判断来自自己、哪些来自 AI；他们怎样理解自己在知识形成中的角色。

#### Cyber-Utopia Persona Quiz

允许修改或撤回 agent 行动仍然重要，但不是研究终点。probe 应该进一步问：面对亲密关系、职业选择或生活变化时，参与者希望 agent 是提醒者、建议者、筛选者，还是代表自己行动的 delegate？为什么？

### 它不能替我证明什么

- 它没有研究中国 Gen Z。
- 它没有研究 super apps 作为基础设施。
- 它的重点是 AI usability guidelines，不是完整的人生关系或社会结构理论。
- 它不能直接证明我的三个分析类别 living、knowing、acting 是正确或完整的。

### 阅读时优先看

1. Introduction 和 Related Work：作者怎样整理已有研究。
2. Table 1：18 条 guidelines。
3. 四阶段的整理和验证方法。
4. Discussion & Future Work：generality 与 specialization 的取舍，以及作者为什么只选可通过界面检查的原则。

### 读完后我应该能回答

1. 哪些我以为的新原则其实已经存在？
2. “提供控制功能”和“协商人机角色”有什么区别？
3. 我的研究怎样建立在已有 guidelines 上，而不是重新发明它们？

---

## 3. Gaver：RtD 最后究竟产出什么

### 文献信息

Gaver, W. (2012). *What Should We Expect from Research through Design?* Proceedings of CHI 2012, 937–946.

### 一句话读懂

RtD 的价值不一定是形成一条放到所有情境都成立的理论。它可以通过具体设计及其注释，产出具有情境、能够启发后续设计的知识。

### 三个最重要的概念

#### 1. Provisional, contingent, and aspirational

设计研究产生的理论通常是：

- **provisional**：暂时的，以后可以修改；
- **contingent**：依赖具体条件和情境；
- **aspirational**：表达一种希望实现的可能，而不只是描述已经存在的事实。

这意味着我不需要声称三个 probes 能推出一套普适的人机关系定律。但我必须清楚说明：发现在哪些参与者、哪些情境和哪些设计选择下产生。

#### 2. Artefact as a theory nexus

原型不是理论之外的装饰。设计者选择展示什么、隐藏什么、何时制造冲突、让参与者做什么，这些决定本身已经表达了设计者对问题的理解。

因此，我需要把每个 probe 背后的假设写出来。例如：

- 为什么 *Evil PM Simulator* 让用户变成 PM？
- 为什么 *Epistemic Illusion* 在最后阶段中断 AI？
- 为什么 *Cyber-Utopia Persona Quiz* 让 agent 准确执行一条在复杂生活中显得不足的规则？

如果不说明这些选择，原型只剩故事；如果只写理论而不展示原型细节，理论又会失去具体依据。

#### 3. Annotated portfolio

Annotated portfolio 不是把三张截图放在一起。它需要同时呈现：

- 每个设计的具体细节；
- 设计背后的问题、价值和判断；
- 三个作品之间共同和不同的概念；
- 参与者的反应怎样支持、修改或反驳最初想法。

Gaver 强调，portfolio 保留每个设计的特殊性，同时让读者看见连接它们的主题。对我的论文来说，共同主题是 human-system roles；三个不同切口是 living、knowing、acting。

### 它怎样支持我的最终产出

我的最终产出可以由四层组成：

1. 三个经过迭代的 probes；
2. 每个 probe 的设计理由、关键互动和参与者反应；
3. 跨三个 probes 的比较：系统角色、人类角色、塑造机制、冲突时刻和参与者希望的关系；
4. 从比较中形成的 situated findings、修订模型和 design considerations。

这样，最后的设计思考不是从访谈句子直接跳出来的，也不是我在研究前已经决定好的口号。读者可以沿着“设计决定—参与者经验—分析—设计思考”检查我是怎样得到它的。

### 它不能替我证明什么

- Gaver 没有说只要做了原型就是研究。
- Annotated portfolio 不能代替清楚的数据收集和分析说明。
- “知识具有情境”不表示研究可以不严谨。
- 这篇文章不能替我证明 probes 一定会让参与者反思；这仍然是需要研究的假设。

### 阅读时优先看

1. 开头关于 RtD 理论特点的概括。
2. “The Nature of Design Theory”。
3. “Design Examples and Theory”。
4. “Annotated Portfolios”及 Conclusion。

### 读完后我应该能回答

1. 为什么我的最终产出不只是三个 prototypes？
2. 三个 prototypes 为什么必须作为一个 portfolio 阅读？
3. 我需要怎样记录设计决定和参与者反应，才能让结果可信？

---

## 4. 三篇文献共同形成的研究位置

### 已有研究告诉我的

- 数字平台可以通过规模、服务整合、网络效应和社会采用成为基础设施。
- HAI 已经有大量关于能力说明、情境、解释、纠正、反馈和控制的原则。
- RtD 可以通过具体设计和 annotated portfolio 形成有情境的设计知识。

### 我的项目仍然要问的

- 成年中国 Gen Z 怎样描述自己与这些系统的角色关系？
- 当系统分别作为生活基础设施、知识参与者和行动代理者时，这种描述有什么不同？
- 哪些经验无法被“透明度更高”或“增加控制按钮”充分说明？
- 三个 probes 会让哪些隐性的期待、矛盾和例外变得可以讨论？

### 暂时可用的 literature-gap 表述

> Existing research explains how platforms such as WeChat can become infrastructure and offers general guidelines for usable human-AI interaction. However, these bodies of work do not fully explain how adult Chinese Gen Z understand their own role, and the role of digital systems, across everyday living, knowing, and acting. This project uses three connected design probes to study this question through concrete situations and to develop situated design considerations.

注意：这一段目前应称为 **working gap**。在完成更广的文献综述前，不要写成“no previous study has...”。

## 5. 用在论文和课堂里的简单英文

### 为什么中国重要

> China is not only the location of my participants. In China, platforms such as WeChat connect communication, payment, services, information, and institutions. This makes the Chinese context useful for studying what happens when a digital system becomes part of everyday infrastructure.

### 和已有 human-AI guidelines 的区别

> Existing guidelines already discuss explanation, correction, feedback, and control. My project builds on this work, but studies a wider question: how people understand the role a system should have in their lives, and the role they want to keep for themselves.

### RtD 最后产出什么

> The three probes are not only tools for collecting comments. Together, they form an annotated portfolio. The design details, participant responses, and comparison across the probes will support situated findings and design considerations.

## 6. 建议的阅读顺序

如果只有 90 分钟：

1. 30 分钟读 Plantin 的 Introduction、“From Platform to Infrastructure”和 Conclusion。
2. 25 分钟读 Amershi 的 Table 1 和 Discussion & Future Work。
3. 35 分钟读 Gaver 的“Design Examples and Theory”“Annotated Portfolios”和 Conclusion。

每读一篇，只写三条笔记：

1. 它让我能够有依据地说什么？
2. 它没有回答我的哪个问题？
3. 它要求我怎样修改一个 probe 或研究方法？

## 原文链接

- [Plantin & de Seta — WeChat as infrastructure](https://researchonline.lse.ac.uk/id/eprint/91520/1/Plantin_WeChat-as-infrastructure.pdf)
- [Amershi et al. — Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf)
- [Gaver — What Should We Expect from Research through Design?](https://research.gold.ac.uk/14818/7/WHAT%20SHOULD%20WE%20EXPECT%20AAM.pdf)
