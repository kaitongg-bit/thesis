import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const SKILL_DIR = "/Users/gktnbjl/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations";
const workspaceDir = "/Users/gktnbjl/Documents/ChatGPT/thesis";
const TMP_DIR = path.join(workspaceDir, ".codex-build/a4-presentation-v3");
const FINAL_PPTX = path.join(workspaceDir, "output/pptx/A4_Research_Question_Presentation_v5.pptx");
const RUNTIME_PYTHON = "/Users/gktnbjl/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);

await fs.mkdir(TMP_DIR, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const W = 1280;
const H = 720;
const FONT = "Arial";
const C = {
  paper: "#F6F1E8",
  ink: "#16243A",
  teal: "#1E5A67",
  tealLight: "#DDEBEA",
  blue: "#7BA6B3",
  coral: "#D8664A",
  coralLight: "#F2DDD6",
  mustard: "#D3A23B",
  mustardLight: "#F2E7C9",
  white: "#FFFFFF",
  gray: "#5C6874",
  line: "#C8D0CE",
  darkPanel: "#22334A",
};

const presentation = Presentation.create({ slideSize: { width: W, height: H } });

function shape(slide, geometry, position, fill = "none", lineFill = "none", lineWidth = 0, radius = 0) {
  return slide.shapes.add({
    geometry,
    position,
    fill,
    line: { style: "solid", fill: lineFill, width: lineWidth },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function text(slide, value, position, opts = {}) {
  const box = shape(slide, "textbox", position, opts.fill ?? "none", opts.lineFill ?? "none", opts.lineWidth ?? 0, opts.radius ?? 0);
  box.text = value;
  box.text.style = {
    typeface: FONT,
    fontSize: opts.fontSize ?? 24,
    bold: opts.bold ?? false,
    italic: opts.italic ?? false,
    color: opts.color ?? C.ink,
    alignment: opts.align ?? "left",
    verticalAlignment: opts.valign ?? "top",
    autoFit: opts.autoFit ?? "shrinkText",
    wrap: "square",
    lineSpacing: opts.lineSpacing ?? 1.05,
    insets: opts.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return box;
}

function line(slide, left, top, width, height, color = C.line, lineWidth = 2) {
  return slide.shapes.add({
    geometry: "line",
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: color, width: lineWidth },
  });
}

function header(slide, title, number) {
  text(slide, title, { left: 64, top: 42, width: 1070, height: 48 }, { fontSize: 31, bold: true });
  text(slide, String(number).padStart(2, "0"), { left: 1156, top: 47, width: 60, height: 34 }, { fontSize: 18, bold: true, color: C.coral, align: "right" });
  line(slide, 64, 104, 1152, 0, C.line, 1.2);
}

function notes(slide, value) {
  slide.speakerNotes.textFrame.setText(value);
}

// 1. Cover
{
  const s = presentation.slides.add();
  s.background.fill = C.paper;
  shape(s, "rect", { left: 0, top: 0, width: 24, height: H }, C.coral);
  text(s, "ONE DAY. MANY INVISIBLE DECISIONS.", { left: 88, top: 58, width: 590, height: 32 }, { fontSize: 18, bold: true, color: C.teal });
  text(s, "An Ordinary Day,\nAlready Designed.", { left: 88, top: 126, width: 720, height: 170 }, { fontSize: 55, bold: true, lineSpacing: 0.92 });

  text(s, "ARE YOU READY FOR", { left: 868, top: 88, width: 320, height: 38 }, { fontSize: 24, bold: true, color: C.teal, align: "center" });
  text(s, "IT?", { left: 866, top: 132, width: 324, height: 156 }, { fontSize: 116, bold: true, color: C.coral, align: "center", valign: "middle" });
  text(s, "information technology?\nthe system around me?\nthe future already planned?", { left: 884, top: 300, width: 290, height: 104 }, { fontSize: 18, color: C.gray, align: "center", lineSpacing: 1.14 });

  shape(s, "roundRect", { left: 88, top: 408, width: 1102, height: 150 }, C.teal, "none", 0, 18);
  text(s, "Do I know what ‘it’ is?", { left: 122, top: 450, width: 298, height: 56 }, { fontSize: 25, bold: true, color: C.white, align: "center", valign: "middle" });
  line(s, 448, 436, 0, 94, C.blue, 1.5);
  text(s, "Do I have a say in defining it?", { left: 478, top: 447, width: 314, height: 62 }, { fontSize: 23, bold: true, color: C.white, align: "center", valign: "middle" });
  line(s, 812, 436, 0, 94, C.blue, 1.5);
  text(s, "Can I change my role?", { left: 850, top: 450, width: 298, height: 56 }, { fontSize: 25, bold: true, color: C.white, align: "center", valign: "middle" });

  text(s, "Chinese Gen Z between super apps and agentic AI", { left: 92, top: 606, width: 760, height: 40 }, { fontSize: 23, bold: true, color: C.ink });
  text(s, "MSCD Pre-Thesis   Fall 2026", { left: 902, top: 612, width: 286, height: 30 }, { fontSize: 16, color: C.gray, align: "right" });
  notes(s, `About 50 seconds.\n\nThe word IT is intentional. It means information technology, but it also means the unnamed thing that already surrounds an ordinary day. Do I really know what it is doing? Do I have a say in defining its place in my life? Can I change the role it gives me? My topic is not one moment of human-AI collaboration. I want to study an ordinary day in the digital life of adult Chinese Gen Z. Paying, communicating, travelling, learning, and working already pass through super apps. Generative AI now joins thinking, while emerging agents begin to act. I want to understand whether people can see this accumulated relationship and describe the relationship they would rather have.`);
}

// 2. A day as the unit of inquiry
{
  const s = presentation.slides.add();
  s.background.fill = C.paper;
  header(s, "The object of study is a day, not one isolated task", 2);
  const items = [
    { x: 70, label: "WAKE", detail: "messages", color: C.teal },
    { x: 250, label: "MOVE", detail: "map and pay", color: C.teal },
    { x: 430, label: "LEARN", detail: "search and AI", color: C.coral },
    { x: 610, label: "WORK", detail: "write and decide", color: C.coral },
    { x: 790, label: "ACT", detail: "delegate steps", color: C.mustard },
    { x: 970, label: "REST", detail: "feeds and chat", color: C.teal },
  ];
  line(s, 100, 316, 1030, 0, C.line, 5);
  for (const item of items) {
    shape(s, "ellipse", { left: item.x + 40, top: 280, width: 72, height: 72 }, item.color);
    text(s, item.label, { left: item.x, top: 205, width: 150, height: 34 }, { fontSize: 18, bold: true, color: item.color, align: "center" });
    text(s, item.detail, { left: item.x, top: 382, width: 150, height: 50 }, { fontSize: 19, color: C.ink, align: "center" });
  }
  shape(s, "roundRect", { left: 116, top: 492, width: 1048, height: 118 }, C.tealLight, "none", 0, 18);
  text(s, "Each interaction looks small. Together, they form a way of living.", { left: 154, top: 521, width: 972, height: 58 }, { fontSize: 31, bold: true, color: C.ink, align: "center", valign: "middle" });
  notes(s, `About 65 seconds.\n\nA large amount of research studies one clear interaction, such as writing with AI, drawing with a robot, or making one decision. Those studies are important. My unit of inquiry is different. I follow the accumulated relationship across an ordinary day. A person may wake up inside a messaging platform, use a map and payment system, search or write with AI, and later ask a system to complete several steps. Each interaction seems small. Together, they may shape habits, attention, language, expectations, and what feels necessary. This gives the three probes one shared object instead of making them three separate technology projects.`);
}

// 3. Research question
{
  const s = presentation.slides.add();
  s.background.fill = C.teal;
  text(s, "MAIN RESEARCH QUESTION", { left: 72, top: 48, width: 560, height: 36 }, { fontSize: 18, bold: true, color: C.mustardLight });
  text(s, "How do adult Chinese Gen Z notice and explain the ways digital infrastructures and emerging AI shape an ordinary day in their lives, and what current and preferred roles do they describe for themselves and these systems?", { left: 72, top: 124, width: 1120, height: 340 }, { fontSize: 37, bold: true, color: C.white, lineSpacing: 1.02 });
  line(s, 72, 512, 1120, 0, C.blue, 2);
  text(s, "CURRENT", { left: 72, top: 552, width: 210, height: 30 }, { fontSize: 18, bold: true, color: C.mustardLight });
  text(s, "What role am I already playing?", { left: 72, top: 590, width: 430, height: 50 }, { fontSize: 23, color: C.white });
  text(s, "PREFERRED", { left: 646, top: 552, width: 210, height: 30 }, { fontSize: 18, bold: true, color: C.coralLight });
  text(s, "What role would I rather play?", { left: 646, top: 590, width: 430, height: 50 }, { fontSize: 23, color: C.white });
  notes(s, `About 60 seconds.\n\nThis is my revised research question. I use notice because some effects may already feel normal and may be hard to name. Explain means that participants connect a system to a concrete part of their own day. I then compare two kinds of roles. The current role is what the person and the system already do. The preferred role is what the participant would rather keep, share, refuse, or change. I am not asking participants to reach one correct conclusion. They may welcome a system in one scene, feel trapped in another, or change their view during the session.`);
}

// 4. Why now
{
  const s = presentation.slides.add();
  s.background.fill = C.paper;
  header(s, "Why this question feels urgent now", 4);
  text(s, "MATURE PLATFORM DEPENDENCE", { left: 76, top: 148, width: 475, height: 34 }, { fontSize: 18, bold: true, color: C.teal });
  shape(s, "roundRect", { left: 76, top: 196, width: 476, height: 300 }, C.tealLight, "none", 0, 18);
  text(s, "Many daily activities already depend on the same platforms, accounts, and social networks.", { left: 112, top: 232, width: 404, height: 104 }, { fontSize: 28, bold: true, color: C.ink, align: "center", valign: "middle" });
  text(s, "Leaving can carry a practical or social cost.", { left: 116, top: 390, width: 396, height: 60 }, { fontSize: 22, color: C.teal, align: "center" });
  text(s, "RAPID AGENTIC CHANGE", { left: 728, top: 148, width: 475, height: 34 }, { fontSize: 18, bold: true, color: C.coral });
  shape(s, "roundRect", { left: 728, top: 196, width: 476, height: 300 }, C.coralLight, "none", 0, 18);
  text(s, "AI is moving from one reply to longer tasks, tool use, parallel agents, and real-world context.", { left: 764, top: 232, width: 404, height: 124 }, { fontSize: 28, bold: true, color: C.ink, align: "center", valign: "middle" });
  text(s, "Its role is changing faster than everyday language for discussing it.", { left: 764, top: 390, width: 404, height: 74 }, { fontSize: 22, color: C.coral, align: "center" });
  shape(s, "roundRect", { left: 244, top: 548, width: 792, height: 88 }, C.mustardLight, "none", 0, 18);
  text(s, "Why is this here?   What can it read?   Can I refuse it?", { left: 280, top: 572, width: 720, height: 40 }, { fontSize: 27, bold: true, color: C.ink, align: "center" });
  notes(s, `About 85 seconds.\n\nThe urgency comes from two changes happening together. First, China already has mature platform infrastructures. Leaving a platform can mean losing access to relationships, payment, work, or services. Second, AI is entering these systems while agentic technology is moving from one answer to longer tasks, tool use, parallel agents, and context sensing. I recently saw public reactions to WeChat AI features framed through basic questions: Why is this here? What can it read? Can I turn it off? Tencent stated that its AI Search used public information rather than private user data, but the reaction still matters. It shows that an AI layer can enter a necessary system before people understand its purpose or role.\n\nSources: IT之家, July 2, 2025, on reactions to WeChat AI Search and Tencent's response. OpenAI, How agents are transforming work, June 25, 2026. Google Research, Towards a science of scaling agent systems, January 28, 2026.`);
}

// 5. Existing work and specific contribution
{
  const s = presentation.slides.add();
  s.background.fill = C.paper;
  header(s, "The relationship is not new. The unit of inquiry is different.", 5);
  text(s, "ESTABLISHED RESEARCH", { left: 74, top: 146, width: 470, height: 34 }, { fontSize: 18, bold: true, color: C.gray });
  text(s, "Human-AI collaboration\nTrust and reliance\nBlack boxes and explainability\nAgency and control\nWriting, education, robotics", { left: 74, top: 210, width: 500, height: 260 }, { fontSize: 26, color: C.ink, lineSpacing: 1.18 });
  line(s, 624, 144, 0, 444, C.line, 2);
  text(s, "THIS STUDY ADDS", { left: 692, top: 146, width: 470, height: 34 }, { fontSize: 18, bold: true, color: C.coral });
  text(s, "One cohort", { left: 692, top: 210, width: 200, height: 34 }, { fontSize: 24, bold: true, color: C.coral });
  text(s, "Adult Chinese Gen Z", { left: 926, top: 210, width: 270, height: 34 }, { fontSize: 23, color: C.ink });
  text(s, "One scale", { left: 692, top: 286, width: 200, height: 34 }, { fontSize: 24, bold: true, color: C.teal });
  text(s, "An accumulated day", { left: 926, top: 286, width: 270, height: 34 }, { fontSize: 23, color: C.ink });
  text(s, "Three cuts", { left: 692, top: 362, width: 200, height: 34 }, { fontSize: 24, bold: true, color: C.mustard });
  text(s, "Routine, knowledge, action", { left: 926, top: 362, width: 270, height: 58 }, { fontSize: 23, color: C.ink });
  text(s, "One comparison", { left: 692, top: 457, width: 210, height: 34 }, { fontSize: 24, bold: true, color: C.coral });
  text(s, "Current and preferred roles", { left: 926, top: 457, width: 270, height: 58 }, { fontSize: 23, color: C.ink });
  shape(s, "roundRect", { left: 168, top: 604, width: 944, height: 64 }, C.tealLight, "none", 0, 16);
  text(s, "The claim is specific. It does not depend on pretending that nobody studied human-technology relationships before.", { left: 206, top: 621, width: 868, height: 34 }, { fontSize: 21, bold: true, color: C.ink, align: "center" });
  notes(s, `About 75 seconds.\n\nThe human-technology relationship is not a new topic. There is already important work on collaboration, trust, black boxes, explainability, agency, control, writing, education, and robotics. I should not claim that I ask a question nobody asked before. My contribution is more specific. I study one bounded group in a platform-heavy context. I use the accumulated day as the scale instead of one task. I make three cuts through that day: routine, knowledge, and action. Then I compare the roles participants experience now with the roles they would prefer. This is a clearer and more defensible contribution than saying I start earlier than existing research.\n\nRelated sources include Plantin and de Seta (2019) on WeChat as infrastructure, and Amershi et al. (2019) on guidelines for human-AI interaction.`);
}

// 6. Three probes
{
  const s = presentation.slides.add();
  s.background.fill = C.paper;
  header(s, "Three cuts through the same ordinary day", 6);
  const cards = [
    { x: 62, number: "01", label: "EVERYDAY CONDITIONS", title: "Evil PM\nSimulator", body: "How platform choices become routines, requirements, and normal expectations", color: C.teal, bg: C.tealLight },
    { x: 448, number: "02", label: "KNOWLEDGE-MAKING", title: "Epistemic\nIllusion", body: "How AI joins searching, interpreting, writing, and judging", color: C.coral, bg: C.coralLight },
    { x: 834, number: "03", label: "ACTING", title: "Cyber-Utopia\nPersona Quiz", body: "How a system moves from giving an answer to carrying out steps", color: C.mustard, bg: C.mustardLight },
  ];
  for (const card of cards) {
    text(s, card.number, { left: card.x, top: 140, width: 56, height: 38 }, { fontSize: 23, bold: true, color: card.color });
    text(s, card.label, { left: card.x + 62, top: 145, width: 270, height: 30 }, { fontSize: 16, bold: true, color: card.color });
    shape(s, "roundRect", { left: card.x, top: 198, width: 350, height: 360 }, card.bg, "none", 0, 18);
    text(s, card.title, { left: card.x + 28, top: 234, width: 294, height: 92 }, { fontSize: 31, bold: true, color: C.ink, align: "center", valign: "middle" });
    line(s, card.x + 48, 348, 254, 0, card.color, 2);
    text(s, card.body, { left: card.x + 34, top: 381, width: 282, height: 132 }, { fontSize: 22, color: C.ink, align: "center", valign: "middle" });
  }
  text(s, "The probes sample a larger relationship. They do not claim to cover every part of life.", { left: 168, top: 614, width: 944, height: 44 }, { fontSize: 23, bold: true, color: C.teal, align: "center" });
  notes(s, `About 90 seconds.\n\nThe three probes are not three separate technology studies. Each one cuts into a different part of the same larger relationship. Evil PM Simulator explores how product and platform choices can become everyday conditions for other people. Epistemic Illusion explores how AI enters knowledge-making and how participants understand their own contribution. Cyber-Utopia Persona Quiz explores the movement from advice toward action. It asks how people imagine a system carrying out steps as situations become more personal or uncertain. These three cuts do not represent every part of life. They give the project enough difference for comparison while keeping one shared question.\n\nMethod sources: Zimmerman, Forlizzi, and Evenson (2007); Gaver (2012); Boehner et al. (2007).`);
}

// 7. What participants do
{
  const s = presentation.slides.add();
  s.background.fill = C.paper;
  header(s, "What happens in a probe session", 7);
  const stages = [
    { x: 56, n: "1", title: "EXPERIENCE", body: "Enter a concrete situation", color: C.teal },
    { x: 292, n: "2", title: "NOTICE", body: "Point out what feels normal or strange", color: C.coral },
    { x: 528, n: "3", title: "EXPLAIN", body: "Connect it to a real part of the day", color: C.mustard },
    { x: 764, n: "4", title: "COMPARE", body: "Describe current and preferred roles", color: C.teal },
    { x: 1000, n: "5", title: "CHALLENGE", body: "Disagree, revise, or reject the probe", color: C.coral },
  ];
  for (let i = 0; i < stages.length; i += 1) {
    const st = stages[i];
    if (i < stages.length - 1) line(s, st.x + 96, 240, 140, 0, C.line, 4);
    shape(s, "ellipse", { left: st.x + 44, top: 194, width: 92, height: 92 }, st.color);
    text(s, st.n, { left: st.x + 44, top: 213, width: 92, height: 50 }, { fontSize: 31, bold: true, color: C.white, align: "center", valign: "middle" });
    text(s, st.title, { left: st.x, top: 327, width: 180, height: 30 }, { fontSize: 17, bold: true, color: st.color, align: "center" });
    text(s, st.body, { left: st.x, top: 376, width: 180, height: 106 }, { fontSize: 20, color: C.ink, align: "center", valign: "middle" });
  }
  shape(s, "roundRect", { left: 145, top: 548, width: 990, height: 94 }, C.coralLight, "none", 0, 18);
  text(s, "Success means a participant can trace an influence and describe a relationship.\nIt does not require fear, resistance, or a request for more control.", { left: 190, top: 567, width: 900, height: 58 }, { fontSize: 24, bold: true, color: C.ink, align: "center", valign: "middle" });
  notes(s, `About 80 seconds.\n\nThe sessions will be semi-structured. A participant first experiences a concrete situation. I then ask what felt normal, strange, useful, or uncomfortable. The participant connects the situation to a real part of their day and describes the roles that exist now. Then I ask what relationship they would prefer. Finally, they can disagree with the probe, revise their answer, or reject the way I framed the issue. Success does not mean that a participant becomes afraid of technology or asks for more control. It means they can trace an influence, explain their position, and give evidence for a current or preferred relationship.`);
}

// 8. Outputs
{
  const s = presentation.slides.add();
  s.background.fill = C.ink;
  text(s, "What may remain after the probes", { left: 64, top: 45, width: 1050, height: 48 }, { fontSize: 31, bold: true, color: C.white });
  text(s, "08", { left: 1156, top: 49, width: 60, height: 34 }, { fontSize: 18, bold: true, color: C.coralLight, align: "right" });
  line(s, 64, 107, 1152, 0, "#425067", 1.2);

  const outputs = [
    { y: 157, n: "01", title: "A map of role tensions across an ordinary day", color: C.tealLight },
    { y: 267, n: "02", title: "Patterns between current and preferred roles", color: C.coralLight },
    { y: 377, n: "03", title: "An annotated portfolio of the three probes", color: C.mustardLight },
    { y: 487, n: "04", title: "Design questions for AI entering everyday infrastructure", color: C.tealLight },
  ];
  outputs.forEach((o) => {
    text(s, o.n, { left: 72, top: o.y, width: 60, height: 38 }, { fontSize: 22, bold: true, color: o.color });
    text(s, o.title, { left: 150, top: o.y - 2, width: 550, height: 72 }, { fontSize: 26, bold: true, color: C.white });
  });

  shape(s, "roundRect", { left: 772, top: 154, width: 430, height: 426 }, C.darkPanel, "none", 0, 18);
  text(s, "WHAT THIS IS USEFUL FOR", { left: 810, top: 194, width: 350, height: 32 }, { fontSize: 18, bold: true, color: C.coralLight });
  text(s, "Showing where people cannot explain a system's role\n\nShowing where current and preferred relationships do not match\n\nGiving later studies a situated point of comparison", { left: 810, top: 260, width: 350, height: 250 }, { fontSize: 23, color: C.white, lineSpacing: 1.12 });
  text(s, "The result is situated knowledge, not a universal rule", { left: 182, top: 632, width: 916, height: 36 }, { fontSize: 21, bold: true, color: C.blue, align: "center" });
  notes(s, `About 75 seconds.\n\nThe project should leave more than the statement that people want control. I expect four connected outputs. The first is a map of role tensions across an ordinary day. The second compares roles that participants experience now with roles they would prefer. The third is an annotated portfolio that explains what each probe revealed and what it failed to reveal. The fourth is a set of design questions for systems entering everyday infrastructure. For designers, the value is evidence about where a system's role becomes unclear and where current and preferred relationships do not match. For later researchers, the study offers a situated point of comparison as agentic technology develops. The result remains tied to this participant group and context.`);
}

for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const s = presentation.slides.items[i];
  const preview = await presentation.export({ slide: s, format: "png", scale: 1 });
  await fs.writeFile(path.join(TMP_DIR, `preview-${i + 1}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const stagingDir = path.join(workspaceDir, ".codex-finalizer/a4-presentation-v3");
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

await finalizePresentation({
  explicitTotalSlideCount: 8,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: [FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "A4_Research_Question_Presentation_v5.validation.json"),
});

console.log(FINAL_PPTX);
