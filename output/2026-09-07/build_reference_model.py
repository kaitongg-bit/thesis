from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
# Definitions are task-specific proposals. C/I/U/O are layers, not source codes.
raw_nodes = [
('C01','Context','Degree of platform dependence','平台依赖程度','完成日常事务需要该平台的范围；以具体服务清单和替代路径评估','R06','a,b,e'),
('C02','Context','Cost of alternative arrangements','替代安排的成本','切换服务涉及的金钱、时间、关系与可达性成本；分类记录而不强制合成分数','R06,R04','a,b,e'),
('C03','Context','Intensity of required digital use','学校或工作要求使用的强度','被要求使用的任务频次、后果及拒绝空间','R21','a,b,e,n'),
('C04','Context','Degree of time pressure','时间压力程度','具体任务的截止时间、可用时间与参与者描述','R11,R12','a,e,n'),
('C05','Context','Access to practical resources','可用实践资源的程度','设备、付费服务、知识支持及无障碍条件；以相关案例记录','R04,R22','a,b,e'),
('C06','Context','Availability of social negotiation','与他人讨论和协商的机会','能与朋友、家人、同事讨论／调整安排的机会及对方角色','R03,R04,R24','a,e,n'),
('I01','Interface','Salience of efficiency and outcomes','效率与结果的显著程度','文案、排序、奖励是否优先呈现速度／完成量；记录可见证据','R02,R07','b,e,j'),
('I02','Interface','Intensity of commercial steering','商业引导的强度','默认选项、阻碍取消、诱导性文案等具体机制；复杂本身不算操控','R08','b,e,j'),
('I03','Interface','Visibility of selection criteria','选择标准的可见程度','能否看到推荐、排序和服务选择的依据及其限制','R07,R15','b,e,j'),
('I04','Interface','Visibility of human AI contributions','人机贡献的可见程度','能否区分用户提出、系统建议、共同修改的内容','R09,R12','b,e,j'),
('I05','Interface','Availability of correction and revocation','纠正和撤回的可获得性','是否能修改、拒绝、暂停、撤回；实际可操作而不仅有说明','R23,R13','b,e,j'),
('I06','Interface','Exposure to a model viewpoint','接触模型特定立场的程度','模型某立场出现的频次与偏向；使用实际输出记录','R10','b,e,j'),
('I07','Interface','Clarity of delegation boundaries','委托边界的清晰程度','任务范围、授权期限、须确认事项和影响对象是否明确','R13,R23','b,e,j'),
('I08','Interface','Diversity of offered future scenarios','界面提供的未来情境多样性','是否提供不同目标和生活安排，而不仅是同一效率目标的变体','R14,R19','b,e,j'),
('I09','Interface','Availability of reflective opportunities','反思机会的可获得性','比较、解释理由、修改规则和讨论的机会；另记是否被使用及负担','R07,R11','b,e,j'),
('I10','Interface','Traceability of decision processes','决策过程的可追溯程度','证据来源、用户操作与修订历史可否重建；不是要求展示模型隐藏思维链','R12,R23','b,e,j'),
('I11','Interface','Extent of task automation','任务自动化程度','系统独立完成的行动及判断范围；按任务描述','R05,R13','b,e,j'),
('U01','User','Perceived benefit of assistance','感知协助收益的程度','节省时间、降低负担、提高可达性等由参与者解释','R05,R12','a,e,n'),
('U02','User','Level of relevant prior experience','相关先前经验的水平','使用及辨识同类机制的经历；不能仅用使用年数替代理解','R24','a,e,n'),
('U03','User','Confidence in AI for the task','对 AI 完成该任务的信心','针对当前任务解释信心依据；不等同信心与真实准确率','R12','a,e,n'),
('U04','User','Task specific self confidence','任务相关自信程度','参与者认为自己能判断和完成任务的程度及依据','R12,R03','a,e,n'),
('U05','User','Willingness to invest cognitive effort','投入思考的意愿','是否愿意核验／比较及其理由；区分意愿和客观可用时间','R11','a,e,n'),
('U06','User','Recognition of value tradeoffs','识别价值取舍的程度','能否解释获益、成本、受影响者与替代解释','R07,R24','a,e,n'),
('U07','User','Perceived personal contribution','感知个人贡献的程度','自述提出、判断、编辑与承担责任的部分；与行为记录对照','R09','a,e,n'),
('U08','User','Preferred degree of participation','期望参与程度','针对具体任务与节点的委托／参与偏好；不作为好坏等级','R04,R05','a,d,n'),
('U09','User','Ability to articulate alternatives','表达替代安排的能力','能否提出可理解的不同规则、目标、关系或拒绝方案','R02,R07,R19','a,e,n'),
('U10','User','Degree of critical engagement','实际批判性投入程度','核验来源、比较证据、修改目标或反驳系统的具体行为','R11,R12','a,b,e'),
('O01','Outcome','Fit of actual and preferred participation','实际参与与期望参与的匹配程度','将某次真实参与路径与该情境中的期望比较；不是自主的全部定义','R04,R05','a,d,n'),
('O02','Outcome','Strength of psychological ownership','心理归属感的强度','对成果属于自己的体验及原因；不等同知识测试或法律作者权','R09','a,e,n'),
('O03','Outcome','Degree of viewpoint shift','观点偏移的程度','比较任务前后表达；方向是否不受欢迎需另问，不能预设','R10','a,e,j'),
('O04','Outcome','Capability to accomplish valued tasks','完成所重视任务的能力','是否完成参与者重视的任务、完成质量及所需支持','R05','a,b,e'),
('O05','Outcome','Practical negotiability of arrangements','实际协商和改变安排的可能程度','在现实约束下能否提出、实施及撤回安排；记录可行／部分可行／受阻及理由','R04,R22,R23','a,d,n'),
]
keys={'I03','I04','I07','I09'}
nodes=[dict(id=a,layer=b,label=c,zh=d,assessment=e,concept_sources=f.split(','),source_routes=g.split(','),key=a in keys,current_value='not yet assessed') for a,b,c,d,e,f,g in raw_nodes]
# Arrow = proposed direction; association = no causal claim; unknown = unanswered.
# + and - are endpoint values in the proposed statement, not moral valence.
raw_edges=[
('C01','C02','+/-','A','R06','arrow','平台依赖高时，替代成本可能较高。此处应为 +/+；由校验后的值修正。'),
('C02','O05','+/-','A','R06,R04','arrow','替代成本高时，实际改变安排的空间可能较低。'),
('C03','C01','+/+','A','R21,R06','arrow','组织要求较强时，对指定平台的依赖可能更高。'),
('C03','O05','+/-','A','R21','arrow','组织要求较强时，个人改变安排的空间可能更低。'),
('C04','U05','+/-','A','R11,R12','arrow','时间紧张时，投入额外思考的意愿可能较低。'),
('C05','O05','+/+','A','R04,R22','arrow','资源可得较高时，实际协商或改变安排可能更可行。'),
('C06','U09','+/+','A','R03,R24','arrow','讨论与协商机会较多时，表达其他安排的能力可能较强。'),
('C06','O05','+/+','A','R03,R04','arrow','可与受影响他人协商时，改变共同安排可能更可行。'),
('I01','I03','+/-','A','R02,R07','arrow','强调效率和结果时，选择标准可能被弱化；不是所有高效界面如此。'),
('I01','U01','+/+','A','R05','arrow','效率和结果的突出呈现可能增强感知收益；也可能只是宣传。'),
('I02','O05','+/-','A','R08','arrow','商业引导特别是退出障碍较强时，调整安排可能更难。'),
('I03','U06','-/ -','A','R07','arrow','选择标准可见性较低时，识别相关取舍可能较难。'),
('I04','U07','+/+','A','R09','arrow','人机贡献更可辨识时，参与者可能更能确认自己的投入；方向依内容而异。'),
('I04','U06','+/+','A','R07,R09','arrow','分工更可见时，参与者可能更能解释相关取舍。'),
('I05','O05','+/+','A','R23,R13','arrow','纠正撤回选项真正可用时，实际协商空间可能较高。'),
('I05','O01','+/+','A','R23','arrow','可修改安排时，实际参与更可能接近期望；仍受资源约束。'),
('I06','O03','+/+','A','R10','arrow','接触倾向性模型建议较多，可能引起较大观点偏移；迁移实验结论。'),
('I07','U06','+/+','A','R13,R23','arrow','委托边界清楚时，更容易识别责任与价值取舍。'),
('I07','O01','+/+','A','R13,R23','arrow','边界清楚时，实际参与可能更符合情境期望；需看能否改变。'),
('I08','U09','+/+','A','R14,R19','arrow','提供不同未来安排可能帮助表达其他可能；也可能限制想象。'),
('I09','U06','-/ -','A','R07','arrow','缺少反思机会时，某些取舍较难进入讨论。'),
('I09','U10','+/+','A','R11','arrow','反思环节可能增加核验与比较；并非强制摩擦越多越好。'),
('I09','U01','+/-','A','R11','arrow','反思环节增多可能降低便利感，体现介入的代价。'),
('I10','U10','+/+','A','R12,R23','arrow','可追溯的来源和修订记录可能支持具体核验。'),
('I10','U07','+/+','A','R09,R12','arrow','修订记录较清楚时，个人贡献可能更容易被识别。'),
('I11','O04','+/+','A','R05','arrow','任务适配时，高自动化可能扩展完成任务的能力。'),
('I11','U01','+/+','A','R05,R13','arrow','自动完成相关任务可能提高感知收益；错误与监督成本需另记。'),
('U01','U08','+/-','A','R05','arrow','感知收益较高时，可能偏好较少直接参与；也可能更愿参与更高层判断。'),
('U02','U06','+/+','A','R24','arrow','相关经验可能支持识别取舍，亦可能形成未经核验的经验解释。'),
('U03','U10','+/-','A','R12','association','AI 信心与较少批判性投入的关联；不画因果箭头。'),
('U04','U10','+/+','A','R12','association','任务自信与更多批判性投入的关联；不画因果箭头。'),
('U05','U10','+/+','A','R11','arrow','投入思考的意愿可能影响对反思机制的使用。'),
('U06','U09','+/+','A','R07','arrow','辨认出取舍可能帮助说出其他安排。'),
('U07','O02','+/+','A','R09','association','感知贡献与心理归属的可能关联；不用相关性替代因果性。'),
('U09','O05','+/+','A','R04,R07','arrow','能表达替代安排可能是协商资源，但不足以改变制度限制。'),
('O05','O01','+/+','A','R04,R23','arrow','安排可协商时，参与匹配可能较高；偏好与公共影响仍需反思。'),
('U10','O04','+/+','A','R11,R12','arrow','相关核验投入可能帮助完成所重视任务；也可能占用时间。'),
('C04','U08','+/-','A','R12','arrow','时间压力较高时可能更偏好委托；方向随任务而变。'),
('C05','O04','+/+','A','R04,R05','arrow','资源可用性可能支持完成所重视的任务。'),
('I02','I03','+/-','A','R08','arrow','特定隐蔽商业引导可能降低选择依据的可见性。'),
('I07','I05','+/+','A','R13,R23','association','边界清楚与可撤回可能同时出现，但可只具备其中一个。'),
('U02','U04','+/+','A','R03','association','先前经验可能与任务自信有关，并非等同真实能力。'),
('I11','O01','?','?','R05','unknown','自动化与参与匹配没有预定方向，不能画成技术演进必然失控。'),
('U08','O01','?','?','R04,R05','unknown','偏好参与较高不代表匹配较高；须与实际参与对照。'),
('O02','O04','?','?','R09,R12','unknown','觉得成果属于自己与实际理解／完成能力的关系需调查。'),
('U06','O05','?','?','R22,R24','unknown','已识别问题是否足以改变安排？结构条件可能阻断。'),
('I08','U08','?','?','R14,R19','unknown','不同未来叙事怎样改变参与偏好，方向与持续性未知。'),
('U03','O02','?','?','R09,R12','unknown','信任 AI 与成果归属感的关系未知，避免跨文献拼接。'),
]
raw_edges[0]=('C01','C02','+/+','A','R06','arrow','平台依赖较高时，替代安排的成本可能较高。')
edges=[]
for i,(s,t,values,status,refs,kind,statement) in enumerate(raw_edges,1):
 edges.append(dict(id=f'L{i:02}',source=s,target=t,values=values.replace(' ',''),status=status,refs=refs.split(','),kind=kind,statement=statement,scope='Hypothesis for proposed study; cited source has its own population and task.'))
data=dict(title='Initial Reference Model: Negotiating Digital World-Making',date='2026-09-07',nodes=nodes,edges=edges,key_factors=sorted(keys),evidence_note='All local values are unassessed. A = proposed or transferred relationship, not an established finding about Chinese Gen Z. ? = relation or direction unknown.')
(ROOT/'reference_model_data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))

lines=['flowchart LR']
for layer,name in [('Context','CONTEXT AND CONSTRAINTS'),('Interface','INTERFACE ARRANGEMENTS'),('User','USER INTERPRETATION AND PARTICIPATION'),('Outcome','EXPERIENCED OUTCOMES')]:
 lines.append(f'  subgraph {layer}["{name}"]')
 lines.append('    direction TB')
 for n in nodes:
  if n['layer']==layer:
   label=n['label'].replace(' and ',' and<br/>')
   k='<br/>KEY FACTOR' if n['key'] else ''
   lines.append(f'    {n["id"]}(["{n["id"]}<br/>{label}{k}"])')
 lines.append('  end')
for e in edges:
 refs=','.join(r.replace('R','') for r in e['refs'])
 label=f'{e["id"]} [{e["status"]};{refs}] {e["values"]}'
 connector={'arrow':'-->', 'association':'---', 'unknown':'-.-'}[e['kind']]
 lines.append(f'  {e["source"]} {connector}|"{label}"| {e["target"]}')
lines += ['  classDef key fill:#fff1ad,stroke:#8a5900,stroke-width:3px,color:#202020;', '  classDef context fill:#f1f3f5,stroke:#92979d,color:#202020;', '  classDef outcome fill:#dceee8,stroke:#447562,color:#202020;', '  class '+','.join(sorted(keys))+' key;', '  class '+','.join(n['id'] for n in nodes if n['layer']=='Context')+' context;', '  class '+','.join(n['id'] for n in nodes if n['layer']=='Outcome')+' outcome;']
(ROOT/'initial-reference-model.mmd').write_text('\n'.join(lines)+'\n')

intro='''# Initial Reference Model 详细规划

本模型用于论文 draft 与 A2 作业讨论。它包含 32 个因素、48 条关系，其中 6 条为未知关系；其余 42 条中，37 条为有方向的假设、5 条为不宣称因果的关联假设。四层分别是情境条件、界面安排、用户理解和参与、经验结果。这不是经统计验证的因果模型。

## 怎么读这张大图

所有本项目人群的当前值仍待调查。气泡只写属性，不在气泡里写“低自主”“糟糕界面”等结论。边上的 +/+、+/-、-/- 表示该条假设描述的高低值组合，不是好坏，也不意味着可以反向推出相反命题。L01 等是关系编号，R06 等是参考文献编号。

箭头表示本研究提出的影响方向；无箭头实线表示关联假设；无箭头点线表示未知关系。黄色且标 KEY FACTOR 的节点是优先研究与介入点。灰色情境节点是本项目会记录、但通常无法通过原型直接改变的因素。绿色为结果因素，不代表已经测得改善。

[A;06] 表示参照 R06 形成的迁移／理论启发假设。它不等于 R06 已证明本地箭头。没有可核查原始经验记录时，不用 [E] 装饰连线；没有做过自己的研究时，不用 [O]。后续有实际记录后再替换或并列标签。

## 为什么比七节点草图更完整

增加了平台依赖、替代成本、组织要求、资源和社交协商等条件，防止把结构问题归因于个人意识；分别记录理解、贡献、归属与实际能力，避免概念合并；保留便利收益与自动化赋能，允许反向材料；将自动化与参与匹配画成未知关系，阻止旧版线性衰退结论进入模型。

图的规模服务于解释。它不要求把全部 32 个因素在一项硕士研究中量化检验。核心采集集中在四个关键因素及其邻近关系；情境因素用来解释差异、发现边界和修订模型。

## 因素登记表

下表“来源路径”使用作业 a–n 的字母，表示现有来源或后续采集路径，不表示已经完成田野。所有属性均可定性评估；无必要时不建立未经验证的综合量表。

'''
parts=[intro]
for layer,zh in [('Context','情境与现实约束'),('Interface','界面安排'),('User','用户理解与参与'),('Outcome','经验结果')]:
 parts += [f'### {zh}\n','| ID | 气泡英文 | 中文与评估方式 | 概念来源／来源路径 |\n|---|---|---|---|']
 for n in nodes:
  if n['layer']==layer:
   parts.append(f'| {n["id"]}{" ★" if n["key"] else ""} | {n["label"]} | {n["zh"]}；{n["assessment"]} | {", ".join(n["concept_sources"])}；{", ".join(n["source_routes"])} |')
 parts.append('')
parts += ['## 关系登记表\n','凡跨人群、产品、任务或从理论转换而来的关系都保留 A。来源只支持其提出的依据，不表示本项目已建立因果证据。完整句子比箭头更重要。\n','| ID | 关系 | 端点值 | 图中证据标记 | 假设／待调查问题 |\n|---|---|---|---|']
for e in edges:
 symbol={'arrow':'→','association':'—','unknown':'⋯'}[e['kind']]
 parts.append(f'| {e["id"]} | {e["source"]} {symbol} {e["target"]} | {e["values"]} | [{e["status"]};{",".join(e["refs"])}] | {e["statement"]} |')
parts += ['''
## 四个 Key Factors 的介入理由

| 节点 | 为什么可以由探针直接介入 | 不能承诺什么 |
|---|---|---|
| I03 选择标准可见性 | 模拟器可以让排名、指标和利益选择显性化 | 玩家看见后就能改变真实平台 |
| I04 人机贡献可见性 | 推理探针可以记录提出、核验和修改的分工 | 可见性必然增加归属感或理解 |
| I07 委托边界清晰性 | 未来探针可以允许设定并修改授权边界 | 所有真实 agent 都支持同样控制 |
| I09 反思机会可获得性 | 三个探针都能提供解释、比较、拒绝和重写规则的入口 | 每个人必须投入同样的认知努力 |

I05 纠正撤回也是重要因素，但本项目主要在原型中探索其经验；不能宣称改进了参与者日常使用的真实系统。它可在后续 Impact Model 中成为直接支持措施的一部分。

## 三个局部模型的阅读路径

**日常生活与平台优先级：**C03 → C01 → C02 → O05；I02 → I03 → U06 → U09 → O05。把平台利益、可见性与现实退出条件同时保留。优先关系 L01–L04、L11–L12、L33、L35、L40。

**知识形成与共创：**I04 → U07 — O02；I10 → U10 → O04；U03 — U10、U04 — U10；I06 → O03。这里有三种不同结果：归属、实际任务能力和观点变化。优先关系 L13、L17、L24–L25、L30–L31、L34、L37、L45。

**未来与委托：**I07 → U06 → U09 → O05；I05 → O01；C06 → O05；I11 ⋯ O01。未来情境的多样性帮助提问，但它是否改变参与偏好仍未知。优先关系 L08、L15–L19、L20、L36、L43–L44、L47。

这三部分是共同网络的局部展开，不是三个互相断开的新理论，也不是研究流程图。

## a 到 n 的来源覆盖与缺口

| 作业列项 | 本项目怎么对应 | 本轮状态 |
|---|---|---|
| a Field research | 情境访谈与具体任务观察 | 计划，尚未完成 |
| b Observations | 版本化界面走查、参与者操作 | 尚未作为正式研究采集；旧稿插图不能自动算新证据 |
| c Your participation | 研究者本人使用与设计经历 | 可作为位置性材料，需补具体事件记录 |
| d Assumptions | 本模型 A 关系及工作定义 | 已显性登记 |
| e Literature | 配套 24 条文献 | 已核对不同程度的原文／摘要／书目，逐条说明 |
| f Published statements | 把文献具体论断连到关系编号 | 已列支持范围，正式提交需继续补关键页码 |
| g Empirical research | R09–R12、R21 等不同方法的经验研究 | 已区分原情境和迁移假设 |
| h Previous projects | 旧 game plan 的作品构想与先例 | 只有计划，不是已完成的原型评估 |
| i Previous experience | 本人中国数字生活及产品工作经验 | 不代替全体 Gen Z，尚待整理可追溯实例 |
| j Investigations | 本轮文献核对，后续版本化产品研究 | 文献核对完成初轮；产品调查待做 |
| k Prototypes | 三个探针的设计与试测 | 当前为设计方案，不能标已验证效果 |
| l Questions | RQ1–RQ3 及六条未知关系 | 已明确 |
| m Hypotheses | L01–L42 的迁移和关联假设 | 已明确，未证实 |
| n Stakeholder statements | 参与者、老师或相关从业者的情境陈述 | 老师反馈仅为选题背景，参与者数据未采集 |

a–n 是可使用的来源例子，不是必须编造十四类证据的要求。尚未做的部分写“计划／待采集”，比把图填满伪证据更完整。

## 保留反例与不确定性

已识别问题但无法离开平台；高度自动化同时具有高控制；愿意委托而且任务完成得更好；理解充分但不追求成果归属；有归属感却不能解释推理；更详细的解释增加负担；用户早已形成有价值的应对方式。这些都是需要主动寻找的材料，不能按“未被唤醒”排除。

## 与 Impact Model 的边界

此图不包含“探针实施 → 觉醒”的预期效果链。后续 Impact Model 可复制相关节点，另加探针机制和预期改变，并明确介入时间与证据。原型中发生的变化与现实平台关系是否变化，需要不同证据；本次短期 RtD 不承诺长期因果改善。

## 用于作业第七问的 Pluriverse 反思

Escobar’s pluriverse challenges both the outcome criteria and the structure of my initial model. Rather than defining improvement as universally greater individual control, I need to ask whose priorities determine what counts as a desirable technological relationship. Participants may value assistance, shared responsibility, independent understanding, or refusal differently, and these priorities may be shaped by unequal access to alternatives. I therefore treat the model as revisable: participants should be able to challenge its factors, identify missing actors, and propose outcomes that I have not anticipated. This does not mean that every stated preference is unconstrained or that adding more interface options realizes a pluriverse. It means using the model and probes to make the conditions of different relationships discussable while acknowledging the limits of a small, researcher-led study.

## Miro 排版方案

主区域是一张包含全部节点与关系编号的英文大图；配套三个局部说明、Key Factor 说明、图例与 R 编号文献索引。保留节点可编辑性与代码来源。讲解时先读一条具体路径，再展开条件和反例；不要求老师从几十条交叉线中自行猜出论文论点。
''']
(ROOT/'Initial_Reference_Model_详细规划.md').write_text('\n'.join(parts))

assert len(nodes)==32 and len(edges)==48
assert all(e['source'] in {n['id'] for n in nodes} and e['target'] in {n['id'] for n in nodes} for e in edges)
assert len(set(n['id'] for n in nodes))==len(nodes)
assert all(1 <= int(r[1:]) <= 24 for e in edges for r in e['refs'])
print(json.dumps({'nodes':len(nodes),'edges':len(edges),'key_factors':sorted(keys),'unknown':sum(e['kind']=='unknown' for e in edges),'associations':sum(e['kind']=='association' for e in edges)},ensure_ascii=False))
