# Impact Model v2（中文版）

这张图有 **一个 Key Factor、三个 supports**。这是合理的：三个作品采用不同机制，但都希望作用于同一个核心问题。六边形写的是每个 support 的功能；作品名称放在功能后，方便课堂辨认。

```mermaid
flowchart LR
  subgraph supports["三个拟议设计支持"]
    h1{{"通过视角转换支持察觉超级应用的基础设施塑造：Evil PM Simulator"}}
    h2{{"通过依赖与中断支持反思 AI 参与知识形成：Epistemic Illusion"}}
    h3{{"通过边缘情境部署支持反思 agent 委托：Cyber-Utopia Persona Quiz"}}
  end

  subgraph immediate["各探针预期引出的具体察觉"]
    i1(["察觉平台如何组织日常生活流程"])
    i2(["察觉 AI 如何参与知识形成"])
    i3(["察觉预先设定的委托规则在真实生活情境中的限度"])
  end

  key(["察觉数字系统如何塑造生活、认识与行动方式：唯一 Key Factor"])
  measurable(["把具体系统安排与实际生活后果联系起来的能力：可测成功因素"])
  success(["在具体情境中清晰说明自己希望与数字系统建立何种关系：成功因素"])

  h1 -->|"提高 A"| i1
  h2 -->|"提高 A"| i2
  h3 -->|"提高 A"| i3
  i1 -->|"提高 A"| key
  i2 -->|"提高 A"| key
  i3 -->|"提高 A"| key
  key -->|"提高 A"| measurable
  measurable -->|"提高 A"| success

  classDef support fill:#FFE0C2,stroke:#FF9E42,stroke-width:2px
  classDef immediate fill:#C2E5FF,stroke:#3DADFF
  classDef key fill:#FFECBD,stroke:#FFC943,stroke-width:2px
  classDef factor fill:#CDF4D3,stroke:#66D575

  class h1,h2,h3 support
  class i1,i2,i3 immediate
  class key key
  class measurable,success factor
```

`A` 是 assumption（设计假设）；在 DRM 图中可写成 `[A]`。为兼容 Miro Mermaid 的版本，预览代码显示为 `A`。
