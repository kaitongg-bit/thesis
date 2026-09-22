import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const SKILL_DIR = "/Users/gktnbjl/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations";
const workspaceDir = "/Users/gktnbjl/Documents/ChatGPT/thesis";
const TMP_DIR = path.join(workspaceDir, ".codex-build/a4-presentation");
const FINAL_PPTX = path.join(workspaceDir, "output/pptx/A4_Research_Question_Presentation_v2.pptx");
const RUNTIME_PYTHON = "/Users/gktnbjl/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";

const { finalizePresentation } = await import(
  pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href,
);

await fs.mkdir(TMP_DIR, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const W = 1280;
const H = 720;
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
  charcoal: "#2E3742",
};
const FONT = "Arial";

const presentation = Presentation.create({
  slideSize: { width: W, height: H },
});

function addShape(slide, geometry, position, fill = "none", lineFill = "none", lineWidth = 0, radius = 0) {
  return slide.shapes.add({
    geometry,
    position,
    fill,
    line: { style: "solid", fill: lineFill, width: lineWidth },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function addText(slide, text, position, opts = {}) {
  const shape = addShape(slide, "textbox", position, opts.fill ?? "none", opts.lineFill ?? "none", opts.lineWidth ?? 0, opts.radius ?? 0);
  shape.text = text;
  shape.text.style = {
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
  return shape;
}

function addLine(slide, left, top, width, height, color = C.line, lineWidth = 2) {
  return slide.shapes.add({
    geometry: "line",
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: color, width: lineWidth },
  });
}

function addHeader(slide, title, number) {
  addText(slide, title, { left: 64, top: 42, width: 1050, height: 48 }, { fontSize: 31, bold: true });
  addText(slide, String(number).padStart(2, "0"), { left: 1156, top: 47, width: 60, height: 34 }, { fontSize: 18, bold: true, color: C.coral, align: "right" });
  addLine(slide, 64, 104, 1152, 0, C.line, 1.2);
}

function setNotes(slide, text) {
  slide.speakerNotes.textFrame.setText(text);
}

// Slide 1
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addShape(slide, "rect", { left: 0, top: 0, width: 24, height: H }, C.coral, "none", 0);
  addText(slide, "Human-System Roles\nin the Digital Lives\nof Chinese Gen Z", { left: 88, top: 104, width: 780, height: 265 }, { fontSize: 52, bold: true, lineSpacing: 0.9 });
  addText(slide, "Research question presentation", { left: 92, top: 400, width: 500, height: 40 }, { fontSize: 22, color: C.teal, bold: true });
  addLine(slide, 92, 464, 500, 0, C.blue, 3);
  addText(slide, "SUPER APPS", { left: 92, top: 493, width: 170, height: 30 }, { fontSize: 17, bold: true, color: C.gray });
  addText(slide, "AI CHAT", { left: 286, top: 493, width: 130, height: 30 }, { fontSize: 17, bold: true, color: C.gray });
  addText(slide, "AI AGENTS", { left: 437, top: 493, width: 150, height: 30 }, { fontSize: 17, bold: true, color: C.gray });
  addText(slide, "MSCD Pre-Thesis   Fall 2026", { left: 92, top: 624, width: 430, height: 30 }, { fontSize: 16, color: C.gray });
  addShape(slide, "ellipse", { left: 948, top: 160, width: 176, height: 176 }, C.teal, "none", 0);
  addShape(slide, "ellipse", { left: 1008, top: 286, width: 136, height: 136 }, C.mustard, "none", 0);
  addShape(slide, "ellipse", { left: 900, top: 348, width: 112, height: 112 }, C.coral, "none", 0);
  setNotes(slide, `About 45 seconds.\n\nMy topic began with a simple feeling. I often think of an app as a tool that I choose to use. But after using the same systems every day, I also learn their rules and start to treat their way of organizing life as normal. I want to understand this relationship more clearly. I focus on adult Chinese Gen Z because this group grew up with rapidly changing platforms and is now meeting generative AI and AI agents as adults. My project asks how people understand their own role when digital systems become more involved in daily routines, thinking, and action.`);
}

// Slide 2
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "The three-step research structure", 2);

  const rows = [
    { y: 148, n: "01", label: "TOPIC", color: C.teal, bg: C.tealLight, text: "Adult Chinese Gen Z and their relationship with digital systems" },
    { y: 316, n: "02", label: "UNKNOWN", color: C.coral, bg: C.coralLight, text: "How people define their role when systems shape routines, join knowledge work, or act for them" },
    { y: 484, n: "03", label: "SIGNIFICANCE", color: C.mustard, bg: C.mustardLight, text: "How role expectations change across different forms of system involvement" },
  ];
  for (const row of rows) {
    addShape(slide, "roundRect", { left: 84, top: row.y, width: 1112, height: 126 }, row.bg, "none", 0, 18);
    addText(slide, row.n, { left: 112, top: row.y + 25, width: 92, height: 62 }, { fontSize: 43, bold: true, color: row.color, valign: "middle" });
    addText(slide, row.label, { left: 226, top: row.y + 23, width: 230, height: 34 }, { fontSize: 18, bold: true, color: row.color });
    addText(slide, row.text, { left: 226, top: row.y + 55, width: 900, height: 58 }, { fontSize: 24, color: C.ink, valign: "middle" });
  }
  setNotes(slide, `About 55 seconds.\n\nI used the three-step structure from The Craft of Research. First, I name the topic. I am studying adult Chinese Gen Z and digital systems. Second, I identify what I do not yet understand. I want to know how people define their own role when a system becomes involved in different ways. Third, I explain why the question matters to an audience. The larger issue is whether our expectations of a human role change when a system shapes a routine, joins knowledge work, or acts for a person. This step prevents the project from becoming only a collection of observations about apps.\n\nSource: Booth, Colomb, Williams, Bizup, and FitzGerald, The Craft of Research, 5th ed., Chapters 3 and 4.`);
}

// Slide 3
{
  const slide = presentation.slides.add();
  slide.background.fill = C.teal;
  addText(slide, "MAIN RESEARCH QUESTION", { left: 72, top: 48, width: 560, height: 36 }, { fontSize: 18, bold: true, color: C.mustardLight });
  addText(slide,
    "How do adult Chinese Gen Z understand and negotiate the roles of people and digital systems when super apps shape everyday routines, generative-AI chat participates in knowledge work, and emerging AI agents act on a user’s behalf?",
    { left: 72, top: 126, width: 1120, height: 360 },
    { fontSize: 36, bold: true, color: C.white, lineSpacing: 1.02 },
  );
  addLine(slide, 72, 526, 1120, 0, C.blue, 2);
  addText(slide, "UNDERSTAND", { left: 72, top: 560, width: 200, height: 32 }, { fontSize: 19, bold: true, color: C.mustardLight });
  addText(slide, "How participants describe the current roles", { left: 72, top: 596, width: 430, height: 48 }, { fontSize: 21, color: C.white });
  addText(slide, "NEGOTIATE", { left: 646, top: 560, width: 200, height: 32 }, { fontSize: 19, bold: true, color: C.coralLight });
  addText(slide, "How they accept, question, resist, or revise them", { left: 646, top: 596, width: 500, height: 48 }, { fontSize: 21, color: C.white });
  setNotes(slide, `About 60 seconds.\n\nThis is my current research question. The word understand refers to how participants describe the role that already exists. What do they think the system is doing, and what do they think they are doing? The word negotiate is broader than a formal negotiation. It includes accepting a role, questioning it, resisting it, or changing it. I am not starting with the claim that technology always reduces agency. A participant may welcome assistance in one situation and reject it in another. The research question leaves space for useful dependence, discomfort, mixed feelings, and counterexamples.`);
}

// Slide 4
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Three forms of system involvement", 4);

  const cols = [
    { x: 66, w: 354, top: "EVERYDAY ROUTINES", system: "Super apps", verb: "shape", detail: "Payment, communication, services, work", color: C.teal, bg: C.tealLight, code: "LIVING" },
    { x: 463, w: 354, top: "KNOWLEDGE WORK", system: "Generative-AI chat", verb: "participates", detail: "Searching, writing, interpretation, judgement", color: C.coral, bg: C.coralLight, code: "KNOWING" },
    { x: 860, w: 354, top: "DELEGATED ACTION", system: "AI agents", verb: "acts", detail: "Planning, deciding, and doing something for a user", color: C.mustard, bg: C.mustardLight, code: "ACTING" },
  ];
  for (const col of cols) {
    addText(slide, col.top, { left: col.x, top: 139, width: col.w, height: 34 }, { fontSize: 17, bold: true, color: col.color, align: "center" });
    addShape(slide, "roundRect", { left: col.x, top: 190, width: col.w, height: 292 }, col.bg, "none", 0, 18);
    addText(slide, col.system, { left: col.x + 24, top: 225, width: col.w - 48, height: 56 }, { fontSize: 28, bold: true, color: C.ink, align: "center", valign: "middle" });
    addText(slide, col.verb, { left: col.x + 84, top: 302, width: col.w - 168, height: 46 }, { fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", fill: col.color, radius: 18 });
    addText(slide, col.detail, { left: col.x + 32, top: 378, width: col.w - 64, height: 68 }, { fontSize: 20, color: C.charcoal, align: "center", valign: "middle" });
    addText(slide, col.code, { left: col.x, top: 516, width: col.w, height: 40 }, { fontSize: 18, bold: true, color: col.color, align: "center" });
  }
  addText(slide, "The shared question", { left: 70, top: 594, width: 250, height: 30 }, { fontSize: 18, bold: true, color: C.gray });
  addText(slide, "What role does the person want to keep, share, or delegate?", { left: 316, top: 588, width: 880, height: 42 }, { fontSize: 26, bold: true, color: C.ink, align: "right" });
  setNotes(slide, `About 75 seconds.\n\nThe project compares three bounded forms of system involvement. A super app can shape an everyday routine because communication, payment, services, and work may pass through the same system. Generative-AI chat can participate in knowledge work by helping a person search, write, interpret, or judge. An AI agent may go further and act for a person. I use living, knowing, and acting as comparison labels. They do not mean that the thesis covers all of human life. Across the three cases, I repeat the same question. What role does the participant want to keep, do together with the system, or delegate?`);
}

// Slide 5
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Why the Chinese context matters", 5);

  const center = addShape(slide, "ellipse", { left: 475, top: 235, width: 330, height: 220 }, C.teal, "none", 0);
  center.text = "Shared digital\ninfrastructure";
  center.text.style = { typeface: FONT, fontSize: 27, bold: true, color: C.white, alignment: "center", verticalAlignment: "middle", autoFit: "shrinkText", insets: { top: 10, right: 20, bottom: 10, left: 20 } };

  const nodes = [
    { x: 93, y: 170, w: 260, h: 86, label: "Communication", color: C.tealLight },
    { x: 88, y: 455, w: 270, h: 86, label: "Work and institutions", color: C.coralLight },
    { x: 928, y: 170, w: 258, h: 86, label: "Payment and shopping", color: C.mustardLight },
    { x: 930, y: 455, w: 250, h: 86, label: "Travel and services", color: C.tealLight },
  ];
  for (const n of nodes) {
    const s = addShape(slide, "roundRect", { left: n.x, top: n.y, width: n.w, height: n.h }, n.color, "none", 0, 18);
    s.text = n.label;
    s.text.style = { typeface: FONT, fontSize: 22, bold: true, color: C.ink, alignment: "center", verticalAlignment: "middle", autoFit: "shrinkText", insets: { top: 6, right: 10, bottom: 6, left: 10 } };
    slide.shapes.connect(center, s, {
      kind: "straight",
      line: { style: "solid", fill: C.blue, width: 2 },
      head: { type: "triangle", width: "sm", length: "sm" },
    });
  }
  addText(slide, "Using the system may depend on friends, employers, merchants, and public services", { left: 236, top: 600, width: 808, height: 55 }, { fontSize: 25, bold: true, color: C.ink, align: "center" });
  setNotes(slide, `About 60 seconds.\n\nThe Chinese context matters because highly integrated platforms connect activities that may appear separate in another setting. Communication, payment, shopping, work, travel, and services can depend on the same account and device. This means participation is not always a simple personal preference. Friends, employers, merchants, and institutions can make a system practically necessary. I will still avoid treating all Chinese Gen Z as one group. The study is qualitative and bounded. Its value comes from examining how participants describe role expectations inside this particular digital environment.\n\nSource: Plantin, J.-C., and de Seta, G. (2019). WeChat as infrastructure: The techno-nationalist shaping of Chinese digital platforms.`);
}

// Slide 6
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Relation to existing human-AI research", 6);

  addText(slide, "A DEFINED TASK", { left: 78, top: 144, width: 470, height: 36 }, { fontSize: 18, bold: true, color: C.gray });
  addText(slide, "How can a person work better with AI in one activity?", { left: 78, top: 193, width: 475, height: 90 }, { fontSize: 31, bold: true, color: C.ink });
  addText(slide, "Common responses", { left: 78, top: 325, width: 220, height: 30 }, { fontSize: 18, bold: true, color: C.teal });
  addText(slide, "Explanation\nCorrection\nFeedback\nUser control", { left: 78, top: 370, width: 320, height: 160 }, { fontSize: 25, color: C.charcoal, lineSpacing: 1.2 });

  addShape(slide, "rect", { left: 620, top: 126, width: 3, height: 480 }, C.line, "none", 0);

  addText(slide, "THIS THESIS", { left: 686, top: 144, width: 440, height: 36 }, { fontSize: 18, bold: true, color: C.coral });
  addText(slide, "What role should a system have across different parts of life?", { left: 686, top: 193, width: 500, height: 90 }, { fontSize: 31, bold: true, color: C.ink });
  addText(slide, "Questions before a feature decision", { left: 686, top: 325, width: 420, height: 30 }, { fontSize: 18, bold: true, color: C.coral });
  addText(slide, "What is already normal?\nWhat does the person keep?\nWhat can be shared?\nWhat can be delegated?", { left: 686, top: 370, width: 480, height: 190 }, { fontSize: 25, color: C.charcoal, lineSpacing: 1.16 });

  addText(slide, "The project builds on existing guidance and studies an earlier role question", { left: 182, top: 624, width: 916, height: 40 }, { fontSize: 22, bold: true, color: C.teal, align: "center" });
  setNotes(slide, `About 70 seconds.\n\nA large amount of human-AI research already studies collaboration in a defined task. It also provides useful guidance about explanation, correction, feedback, and user control. I do not claim to invent these principles. My project asks an earlier question. Before deciding which feature to add, how does a person understand the role that a system already has? What does the person want to keep, share, or delegate? The contribution is the comparison of this role question across three forms of system involvement and within the Chinese context.\n\nSource: Amershi, S., et al. (2019). Guidelines for Human-AI Interaction. CHI 2019.`);
}

// Slide 7
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Research through Design and three probes", 7);

  const probes = [
    { x: 64, n: "01", title: "Evil PM\nSimulator", label: "ROUTINE", question: "How do platform choices become normal parts of daily life?", color: C.teal, bg: C.tealLight },
    { x: 450, n: "02", title: "Epistemic\nIllusion", label: "KNOWLEDGE", question: "Which parts of thinking feel like mine, shared, or produced by AI?", color: C.coral, bg: C.coralLight },
    { x: 836, n: "03", title: "Cyber-Utopia\nPersona Quiz", label: "ACTION", question: "Where does delegation feel helpful, risky, or inappropriate?", color: C.mustard, bg: C.mustardLight },
  ];
  for (const p of probes) {
    addText(slide, p.n, { left: p.x, top: 142, width: 62, height: 42 }, { fontSize: 24, bold: true, color: p.color });
    addText(slide, p.label, { left: p.x + 68, top: 148, width: 230, height: 30 }, { fontSize: 17, bold: true, color: p.color });
    addShape(slide, "roundRect", { left: p.x, top: 198, width: 350, height: 354 }, p.bg, "none", 0, 18);
    addText(slide, p.title, { left: p.x + 28, top: 232, width: 294, height: 94 }, { fontSize: 31, bold: true, color: C.ink, align: "center", valign: "middle" });
    addLine(slide, p.x + 48, 346, 254, 0, p.color, 2);
    addText(slide, p.question, { left: p.x + 32, top: 376, width: 286, height: 132 }, { fontSize: 22, color: C.charcoal, align: "center", valign: "middle" });
  }
  addText(slide, "The probes create situations for explanation, disagreement, and revision", { left: 158, top: 606, width: 964, height: 46 }, { fontSize: 25, bold: true, color: C.ink, align: "center" });
  setNotes(slide, `About 95 seconds.\n\nI will use Research through Design and develop three connected probes. Evil PM Simulator places the participant in the role of a product manager. It shows how platform decisions can become part of another person’s routine and eventually feel normal or necessary. Epistemic Illusion uses an AI-assisted detective task. It asks participants to trace which parts of the reasoning came from them, from the system, or from their interaction. Cyber-Utopia Persona Quiz asks participants to define what an AI agent may do in simple and sensitive situations. The system should follow the participant’s rule so that the research can examine how the participant later revises that rule. These probes are research situations. They invite explanation, disagreement, and revision rather than teaching one correct view of technology.\n\nSources: Zimmerman, Forlizzi, and Evenson (2007), Research through Design as a Method for Interaction Design Research in HCI. Gaver (2012), What Should We Expect from Research through Design?`);
}

// Slide 8
{
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addText(slide, "Expected contribution and feedback", { left: 64, top: 45, width: 1050, height: 48 }, { fontSize: 31, bold: true, color: C.white });
  addText(slide, "08", { left: 1156, top: 49, width: 60, height: 34 }, { fontSize: 18, bold: true, color: C.coralLight, align: "right" });
  addLine(slide, 64, 107, 1152, 0, "#425067", 1.2);

  addText(slide, "POSSIBLE OUTCOMES", { left: 72, top: 152, width: 470, height: 32 }, { fontSize: 18, bold: true, color: C.mustardLight });
  const outcomes = [
    ["01", "Situated findings from adult Chinese Gen Z"],
    ["02", "A revised model of human-system roles"],
    ["03", "Design considerations grounded in the three arrangements"],
  ];
  outcomes.forEach(([n, t], i) => {
    const y = 220 + i * 112;
    addText(slide, n, { left: 72, top: y, width: 54, height: 42 }, { fontSize: 22, bold: true, color: C.coralLight });
    addText(slide, t, { left: 144, top: y - 2, width: 440, height: 70 }, { fontSize: 25, bold: true, color: C.white });
  });
  addText(slide, "These outcomes will remain tied to the participant group and context", { left: 72, top: 574, width: 520, height: 58 }, { fontSize: 20, color: C.blue });

  addShape(slide, "roundRect", { left: 664, top: 152, width: 536, height: 470 }, "#22334A", "none", 0, 18);
  addText(slide, "FEEDBACK I NEED", { left: 704, top: 194, width: 430, height: 32 }, { fontSize: 18, bold: true, color: C.coralLight });
  addText(slide, "1", { left: 704, top: 270, width: 42, height: 42 }, { fontSize: 29, bold: true, color: C.mustardLight });
  addText(slide, "Does the comparison across the three arrangements feel coherent?", { left: 760, top: 260, width: 386, height: 100 }, { fontSize: 25, bold: true, color: C.white });
  addLine(slide, 704, 388, 440, 0, "#425067", 1.2);
  addText(slide, "2", { left: 704, top: 430, width: 42, height: 42 }, { fontSize: 29, bold: true, color: C.mustardLight });
  addText(slide, "Which boundary of the participant group needs a clearer definition?", { left: 760, top: 420, width: 386, height: 110 }, { fontSize: 25, bold: true, color: C.white });
  setNotes(slide, `About 70 seconds.\n\nI expect the project to produce three main outcomes. First, it will produce situated findings about how adult Chinese Gen Z participants describe human and system roles. Second, I will use the findings to revise the initial role model. Third, I will develop design considerations grounded in the three arrangements. These will not be universal rules for every user or culture. They will show what the participant material supports and where the limits remain. At this stage, I would especially like feedback on two points. Does the comparison across the three arrangements feel coherent? And which boundary of the participant group needs a clearer definition?`);
}

// Export previews from the authored presentation.
for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const slide = presentation.slides.items[i];
  const preview = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(TMP_DIR, `preview-${i + 1}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const requirements = {
  explicitTotalSlideCount: 8,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
};
const fontPolicy = { basis: "design", families: [FONT] };
const expectedSlideSizeEmu = "12192000,6858000";

const stagingDir = path.join(workspaceDir, ".codex-finalizer/a4-presentation");
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", expectedSlideSizeEmu,
    "--validate-heading-fit",
  ],
  requiredNativeTableOwnerSlides: [],
  fontPolicy,
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "A4_Research_Question_Presentation_v2.validation.json"),
});

console.log(FINAL_PPTX);
