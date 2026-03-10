export interface Project {
  slug: string;
  title: string;
  title_zh?: string;
  subtitle: string;
  subtitle_zh?: string;
  description: string;
  description_zh?: string;
  tags: string[];
  status: string;
  status_zh?: string;
  problem?: string;
  problem_zh?: string;
  solution?: string;
  solution_zh?: string;
  impact?: string[];
  impact_zh?: string[];
  role?: string;
  role_zh?: string;
  links?: { label: string; url: string }[];
  stack?: string;
}

export const projects: Project[] = [
  {
    slug: "arolsen-archives",
    title: "Arolsen Archives",
    subtitle: "AI for Holocaust Document Digitization",
    subtitle_zh: "AI 大屠杀文件数字化",
    description:
      "Used AI to digitize 30 million Nazi persecution records. 40x faster. 2 patents.",
    description_zh: "用 AI 数字化纳粹迫害档案，效率提升 40 倍，获两项专利。",
    tags: ["LayoutLM", "CRF", "OCR", "NLP"],
    status: "Accenture · V360 Innovation Award",
    status_zh: "埃森哲 · V360 全球创新奖",
    problem:
      "The Arolsen Archives hold the world's largest collection of documents on Nazi persecution — 110 million digital objects, part of UNESCO's Memory of the World. Before AI, each document was indexed independently by three volunteers and verified by an archivist. Four people, one hour, four documents. At that rate, digitizing everything would take decades.",
    problem_zh:
      "阿罗尔森档案馆保存着世界上最大的纳粹迫害文件集——1.1 亿份数字化档案，已被列入联合国教科文组织《世界记忆名录》。在引入 AI 之前，每份文件需由三名志愿者独立建立索引，再由档案专家核实。四个人，一小时，处理四份文件。以这种速度，完成全部数字化工作将需要数十年。",
    solution:
      "An AI solution using OCR, LayoutLM, and CRF models to automatically extract structured information — names, dates, birthplaces, religions — from documents that were particularly difficult for humans: multi-row prisoner lists, faded handwriting, camp-specific abbreviations.",
    solution_zh:
      "基于 OCR、LayoutLM 和 CRF 模型的 AI 方案，自动从文件中提取结构化信息——姓名、日期、出生地、宗教信仰——尤其针对人工处理最为困难的部分：多行囚犯名册、模糊手写体、集中营特有缩写。",
    impact: [
      "40x productivity increase (4 → 160 documents/hour)",
      "160,000+ names indexed, 18,000+ documents extracted, 60,000+ clustered",
      "99% AI confidence on 'religion' field",
      "950+ Accenture volunteers across 70+ cities, 6 continents",
      "V360 Global Innovation Award · 2 NLP patents",
      "Covered by Nasdaq, BusinessWire; project part of UNESCO program",
    ],
    impact_zh: [
      "生产效率提升 40 倍（每小时处理 4 → 160 份文件）",
      "已索引超过 16 万个姓名，提取 1.8 万余份文件，聚类 6 万余份",
      "「宗教」字段 AI 置信度达 99%",
      "覆盖 70 余个城市、6 大洲的 950 余名埃森哲志愿者",
      "V360 全球创新奖 · 2 项 NLP 专利",
      "获 Nasdaq、BusinessWire 报道；项目纳入联合国教科文组织计划",
    ],
    role: "Part of an 8-person team working under a tech lead. Responsible for technical communication with the Arolsen Archives team and contributing to the document classification pipeline. The coordination role — making sure 8 people across multiple workstreams delivered coherent results — was as important as the code.",
    role_zh:
      "8 人团队成员，负责与阿罗尔森档案馆的技术对接，以及文件分类流水线的研发。协调工作——确保 8 人跨多个工作流交付一致成果——与编码同等重要。",
    links: [
      {
        label: "Accenture Case Study",
        url: "https://www.accenture.com/us-en/case-studies/public-service/arolsen-archives",
      },
      { label: "Arolsen Archives", url: "https://arolsen-archives.org" },
      {
        label: "Nasdaq Coverage",
        url: "https://www.nasdaq.com/press-release/arolsen-archives-everynamecounts-project-uses-artificial-intelligence-to-help-uncover",
      },
    ],
  },
  {
    slug: "kevin",
    title: "Kevin",
    subtitle: "AI Marketing Intelligence Agent",
    subtitle_zh: "AI 营销智能 Agent",
    description:
      'An AI agent serving 500+ brands. Most users treat it like a talking Excel.',
    description_zh: "服务 500 余家品牌的 AI Agent，大多数用户把它当会说话的 Excel 用。",
    tags: ["LangGraph", "Multi-Agent", "RAG", "Qwen"],
    status: "Production · KAWO",
    status_zh: "生产环境 · KAWO",
    problem:
      "Kevin is the AI layer of KAWO, a social media management platform serving 500+ global enterprise brands. It answers marketing questions, monitors competitors, and generates reports.",
    problem_zh:
      "Kevin 是 KAWO 的 AI 层——KAWO 是一个服务 500 余家全球企业品牌的社交媒体管理平台。它负责回答营销问题、监测竞争对手并生成报告。",
    solution:
      "Multi-agent system built on LangGraph + Alibaba Qwen series with RAG pipeline for marketing data retrieval and a new data architecture with significant accuracy improvements on complex queries.",
    solution_zh:
      "基于 LangGraph + 阿里云通义千问系列构建的多 Agent 系统，配备营销数据检索 RAG 流水线，以及针对复杂查询的新数据架构，显著提升了准确率。",
    impact: [
      "Serving 500+ global enterprise brands",
      "Significant accuracy improvements on complex queries",
      "Deep Agent with sandbox under development",
    ],
    impact_zh: [
      "服务全球 500 余家企业品牌",
      "复杂查询准确率显著提升",
      "带沙箱的深度 Agent 正在开发中",
    ],
    role: "Built and optimized the RAG retrieval and agent architecture. Proactively conducted product evaluation: analyzed customer conversations, identified usage patterns, proposed strategic pivot from Q&A to automated result delivery. Driving product direction alongside (and sometimes ahead of) the product team.",
    role_zh:
      "负责构建和优化 RAG 检索与 Agent 架构。主动开展产品评估：分析客户对话、识别使用模式、提出从问答模式向自动化结果交付的战略转型建议。与产品团队共同（有时甚至提前）推动产品方向。",
    stack: "LangGraph · Qwen · RAG · Python · React",
  },
  {
    slug: "hi-time-hi-money",
    title: "hi-time & hi-money",
    subtitle: "Personal Productivity Tools",
    subtitle_zh: "个人效率工具",
    description:
      "Tools I built to organize my own life — turning the messy parts into structured text that AI can work with.",
    description_zh:
      "为整理自己生活而做的工具——把混乱的部分变成结构化文本，让 AI 能够处理。",
    tags: ["Next.js", "React", "AI"],
    status: "Live · Side Projects",
    status_zh: "上线中 · 个人项目",
    problem:
      "Time, money, decisions. If it can be written down, it can be processed.",
    problem_zh: "时间、金钱、决策。能写下来的，都能被处理。",
    solution:
      "hi-time: A personal time management tool. Started as something I needed, became a playground for AI feature experiments. hi-money: A personal finance tracker. Built to learn full-stack development and explore Text-to-SQL.",
    solution_zh:
      "hi-time：个人时间管理工具。起初是为了满足自己的需求，后来成为 AI 功能实验的游乐场。hi-money：个人财务追踪工具。在学习全栈开发的过程中搭建，同时探索 Text-to-SQL。",
    stack: "Next.js · React · Vercel · Google Calendar API · Express",
    links: [
      { label: "hi-time", url: "#" },
      { label: "hi-money", url: "#" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
