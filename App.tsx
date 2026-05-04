import { useState, useRef, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const ME = {
  name: "Orion · AJ",
  email: "orion@zerogrid.com",
  status: "online",
  avatar: "🧠",
  mood: "ΔK < 0 — building systems that survive contact with reality",
};

const CONTACTS = [
  {
    id: "zerogrid",
    name: "Zero Grid",
    email: "zerogrid@portfolio.msn",
    status: "online",
    avatar: "⬡",
    mood: "Constitutional transparency for universities",
    category: "project",
    color: "#5b9bd5",
    url: "https://fmporion.figma.site/",
    messages: [
      { from: "bot", text: "Zero Grid is the complete FMP submission website." },
      { from: "bot", text: "Thesis in story mode, the framework, the evidence, glossary, witnesses, and closing invitation." },
      { from: "bot", text: "Click 'View Project' below to explore it." },
    ],
    links: [{ label: "View Project →", url: "https://fmporion.figma.site/" }],
  },
  {
    id: "survey",
    name: "Survey Results",
    email: "survey@portfolio.msn",
    status: "online",
    avatar: "📊",
    mood: "Primary research · surveys · observations",
    category: "project",
    color: "#7FB800",
    url: "https://zero-survey.figma.site/",
    messages: [
      { from: "bot", text: "Primary research conducted with students, tutors, parents, gig economy workers, and professional services participants." },
      { from: "bot", text: "Contains survey results, observations, and research evidence." },
    ],
    links: [{ label: "Open Survey →", url: "https://zero-survey.figma.site/" }],
  },
  {
    id: "materialisation",
    name: "3D University Grid",
    email: "materialisation@portfolio.msn",
    status: "away",
    avatar: "🏛️",
    mood: "Ravensbourne ground floor · 3D system materialisation",
    category: "project",
    color: "#FFB900",
    url: "https://materilization.figma.site/",
    messages: [
      { from: "bot", text: "A real-time 3D grid of the ground floor of Ravensbourne University." },
      { from: "bot", text: "The Zero Grid system materialised into physical space." },
    ],
    links: [{ label: "Open 3D Grid →", url: "https://materilization.figma.site/" }],
  },
  {
    id: "continuity",
    name: "Continuity",
    email: "continuity@portfolio.msn",
    status: "away",
    avatar: "🧭",
    mood: "The story in the grid",
    category: "project",
    color: "#E81123",
    url: "https://continuity.figma.site/",
    messages: [
      { from: "bot", text: "Enter the 3D grid and move through the testimony." },
      { from: "bot", text: "Each coordinate is a year. The story is navigated, not read." },
    ],
    links: [{ label: "Open Continuity →", url: "https://continuity.figma.site/" }],
  },
  {
    id: "assist",
    name: "Assist University",
    email: "assist@portfolio.msn",
    status: "online",
    avatar: "🎓",
    mood: "Student and staff lens",
    category: "project",
    color: "#9b59b6",
    url: "https://assistuniversity.figma.site/",
    messages: [
      { from: "bot", text: "The university lens view." },
      { from: "bot", text: "Students and staff navigate campus resources, welfare, and visibility from their own position." },
    ],
    links: [{ label: "Open Assist University →", url: "https://assistuniversity.figma.site/" }],
  },
];

const PROTOTYPES = [
  { name: "Survey Results", icon: "📊", url: "https://zero-survey.figma.site/", type: "Research" },
  { name: "Zero Grid Website", icon: "⬡", url: "https://fmporion.figma.site/", type: "FMP Website" },
  { name: "3D University Grid", icon: "🏛️", url: "https://materilization.figma.site/", type: "3D Grid" },
  { name: "Continuity", icon: "🧭", url: "https://continuity.figma.site/", type: "Story Grid" },
  { name: "Zero Platform", icon: "⚡", url: "https://zero2026.figma.site/", type: "Gig Economy" },
  { name: "Assist University", icon: "🎓", url: "https://assistuniversity.figma.site/", type: "Student Lens" },
];

const STATUS_COLORS = {
  online: "#7FB800",
  away: "#FFB900",
  busy: "#E81123",
  offline: "#A0A0A0",
};

const CV = {
  name: "AJ Orion",
  title: "UX/UI Designer · Systems Thinker · Practitioner-Researcher",
  email: "orion@zerogrid.com",
  location: "London, UK",
  education: [
    { degree: "BSc (Hons) UX/UI Design", institution: "Ravensbourne University", year: "2025", grade: "92% on major projects" },
    { degree: "BSc (Hons) Computer Science", institution: "Middlesex University London", year: "2014" },
  ],
  experience: [
    { role: "Senior Night Controller", company: "London Private Hire Industry", period: "16 years", detail: "5000+ drivers · 2,500,000+ rides · 700+ Uber passenger interviews" },
    { role: "UX/UI Designer & Researcher", company: "Self-directed / Academic", period: "2025–present", detail: "Zero Grid, OurSpace, System Atlas, 2Ride platform" },
    { role: "Entertainment Production", company: "Miami Beach Studios", period: "Freelance", detail: "Electrical, lighting, sound engineering" },
  ],
  skills: ["UX/UI Design", "React / TypeScript", "Supabase", "Three.js / R3F", "Systems Architecture", "Platform Design", "Ethnographic Research", "TfL / PHV Regulation"],
  philosophy: "ΔK < 0 — the more you learn, the more you unlearn. Efficiency without care is cruelty.",
  pursuing: "Masters / PhD pathway — UCL IoE, King's, Oxford or Cambridge (Sept 2026)",
};

const PROJECT_KNOWLEDGE = {
  zerogrid: {
    core: "Zero Grid is the spine of the whole submission — the argument, the testimony, the framework, and the closing invitation in one place.",
    detail: "It asks why people can still disappear inside systems that claim to see everything. Visibility without care becomes surveillance. Zero Grid is trying to build the opposite.",
    open: "Click 'View Project' below to open the full Zero Grid site.",
  },
  survey: {
    core: "Survey Results is the evidence room. This is where the project stops being a visual idea and starts showing what people actually said, missed, needed, or could not see.",
    detail: "It includes primary research from students, tutors, parents, gig economy workers, and professional services participants.",
    open: "Click 'Open Survey' below to go through the evidence.",
  },
  materialisation: {
    core: "The 3D University Grid takes Ravensbourne's ground floor and turns it into a visible, navigable model of the system.",
    detail: "This is the point where the abstract argument becomes spatial. You can move through the system rather than just read about it.",
    open: "Click 'Open 3D Grid' below to explore the materialised version.",
  },
  continuity: {
    core: "Continuity is the story route. You do not just read it — you move through it. Each coordinate is a year, each fragment a piece of testimony.",
    detail: "It turns a linear story into a spatial experience. The navigation is part of the argument.",
    open: "Click 'Open Continuity' below to enter the story grid.",
  },
  assist: {
    core: "Assist University is the student and staff lens. It shows how a university could make people visible without turning them into extracted data.",
    detail: "It sits between welfare, campus resources, visibility, and institutional accountability.",
    open: "Click 'Open Assist University' below to see the lens view.",
  },
};

const MUSIC_TRACKS = [
  { title: "Track 01", id: "3imO7PFU5cI" },
  { title: "Track 02", id: "dC6NPbqJV6k" },
  { title: "Track 03", id: "0nHHZZRYNf4" },
  { title: "Track 04", id: "9HEdLmbZoJQ" },
];

// ─── BOT LOGIC ───────────────────────────────────────────────────────────────
function createFreshMemory() {
  return {
    totalMessages: 0,
    lastTopic: null,
    interests: [],
  };
}

function addUnique(list, item) {
  if (!item) return list || [];
  return Array.from(new Set([...(list || []), item]));
}

function detectIntent(input) {
  const text = String(input || "").toLowerCase().trim();

  if (/^(hi|hello|hey|yo|sup|safe|morning|evening|what's up|whats up)\b/.test(text)) return "greeting";
  if (text.includes("what is this") || text.includes("what am i looking at") || text.includes("explain") || text.includes("what does this mean")) return "explain";
  if (text.includes("where do i start") || text.includes("guide") || text.includes("show me around") || text.includes("walk me through")) return "guide";
  if (text.includes("music") || text.includes("song") || text.includes("track") || text.includes("playlist") || text.includes("youtube")) return "music";
  if (text.includes("project") || text.includes("prototype") || text.includes("work") || text.includes("open") || text.includes("link")) return "project";
  if (text.includes("cv") || text.includes("resume") || text.includes("experience") || text.includes("who are you") || text.includes("about you")) return "identity";
  if (text.includes("research") || text.includes("survey") || text.includes("evidence") || text.includes("data")) return "research";
  if (text.includes("lost") || text.includes("confused") || text.includes("don't get") || text.includes("dont get") || text.includes("i don't understand") || text.includes("i dont understand")) return "confused";
  if (text.includes("strongest") || text.includes("best") || text.includes("important")) return "strongest";

  return "general";
}

function learnFromMessage(input, memory) {
  const text = String(input || "").toLowerCase();
  const next = {
    ...(memory || createFreshMemory()),
    totalMessages: (memory?.totalMessages || 0) + 1,
  };

  const topicMap = [
    { key: "research", terms: ["research", "survey", "evidence", "data"] },
    { key: "grid", terms: ["grid", "3d", "space", "map", "campus"] },
    { key: "story", terms: ["story", "continuity", "testimony", "navigate"] },
    { key: "design", terms: ["design", "ui", "ux", "prototype", "figma"] },
    { key: "music", terms: ["music", "song", "track", "youtube", "playlist"] },
  ];

  topicMap.forEach(topic => {
    if (topic.terms.some(term => text.includes(term))) {
      next.lastTopic = topic.key;
      next.interests = addUnique(next.interests, topic.key);
    }
  });

  return next;
}

function generateBotReply(input, contact, memory) {
  const safeContact = contact || CONTACTS[0];
  const project = PROJECT_KNOWLEDGE[safeContact.id] || PROJECT_KNOWLEDGE.zerogrid;
  const intent = detectIntent(input);
  const isReturning = (memory?.totalMessages || 0) > 2;

  if (intent === "greeting") {
    return `Hey. You're in the ${safeContact.name} chat.\n\n${project.core}\n\nAsk me what it is, where to start, the research behind it, or just open the link below.`;
  }

  if (intent === "explain") {
    return `${project.core}\n\n${project.detail}`;
  }

  if (intent === "guide") {
    return `Start here: ${safeContact.name}.\n\n${project.open}\n\nIf you want the full route, go in this order: Zero Grid → Survey Results → 3D University Grid → Continuity → Assist University.`;
  }

  if (intent === "music") {
    return "Open YouTube from the desktop or Start Menu. Play Track 01 first. If you minimise YouTube, it stays in the taskbar so the system still feels alive while you explore the work.";
  }

  if (intent === "project") {
    return `${project.core}\n\n${project.open}`;
  }

  if (intent === "research") {
    if (safeContact.id === "survey") {
      return "This is the research hub. Students, tutors, parents, gig workers, and professional services participants are all part of the evidence layer. Open the survey link and read it as the proof behind the system.";
    }
    return `The research behind ${safeContact.name} connects back to the Survey Results contact. That is where the evidence sits. This project is not meant to float as a visual idea — it is tied to what people actually reported.`;
  }

  if (intent === "identity") {
    return "Orion · AJ — UX/UI designer, systems thinker, practitioner-researcher. The private hire background matters because this work comes from watching real systems move people, miss people, and control people. Press Start for the CV layer.";
  }

  if (intent === "confused") {
    return `That's fine. Start simple. Open ${safeContact.name}, look at it for two minutes, then come back and ask one thing. Do not try to understand the whole operating system at once.`;
  }

  if (intent === "strongest") {
    return `${safeContact.name} is strong because ${project.detail}`;
  }

  if (isReturning && memory?.lastTopic) {
    return `We're still around ${safeContact.name}. You seem interested in ${memory.lastTopic}. Ask me about that directly and I'll keep it focused.`;
  }

  return `${project.core}\n\nYou can ask me: "what is this?", "where do I start?", "what's the research?", "show me the project", or "recommend music".`;
}

// ─── SHARED UI ───────────────────────────────────────────────────────────────
function StatusDot({ status, size = 10 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: STATUS_COLORS[status] || "#A0A0A0",
        border: "1.5px solid rgba(255,255,255,0.7)",
        flexShrink: 0,
        boxShadow: `0 0 4px ${STATUS_COLORS[status] || "#A0A0A0"}88`,
      }}
    />
  );
}

function Avatar({ contact, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: `linear-gradient(135deg, ${contact.color}33, ${contact.color}88)`,
        border: `2px solid ${contact.color}66`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.45,
        flexShrink: 0,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      {contact.avatar}
    </div>
  );
}

function MSNIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 16 C12 10, 4 8, 2 12 C0 16, 6 20, 16 16Z" fill="#f97316" />
      <path d="M16 16 C10 18, 4 24, 6 28 C8 32, 14 28, 16 16Z" fill="#fb923c" />
      <path d="M16 16 C20 10, 28 8, 30 12 C32 16, 26 20, 16 16Z" fill="#facc15" />
      <path d="M16 16 C22 18, 28 24, 26 28 C24 32, 18 28, 16 16Z" fill="#fde047" />
      <ellipse cx="16" cy="16" rx="2.5" ry="5" fill="#1e3a5f" />
      <circle cx="16" cy="10" r="2" fill="#1e3a5f" />
      <line x1="15" y1="8.5" x2="12" y2="5" stroke="#1e3a5f" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="8.5" x2="20" y2="5" stroke="#1e3a5f" strokeWidth="1" strokeLinecap="round" />
      <circle cx="12" cy="5" r="1" fill="#f97316" />
      <circle cx="20" cy="5" r="1" fill="#facc15" />
    </svg>
  );
}

function WindowsIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4 L14 2 L14 14 L2 14 Z" fill="#f25022" />
      <path d="M16 2 L30 0 L30 14 L16 14 Z" fill="#7fba00" />
      <path d="M2 16 L14 16 L14 28 L2 30 Z" fill="#00a4ef" />
      <path d="M16 16 L30 16 L30 32 L16 30 Z" fill="#ffb900" />
    </svg>
  );
}

function XPButton({ children, onClick, danger = false, title }) {
  return (
    <button
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      style={{
        width: 20,
        height: 18,
        border: "1px solid rgba(255,255,255,0.45)",
        background: danger
          ? "linear-gradient(180deg,#e05050,#c03030)"
          : "linear-gradient(180deg,rgba(255,255,255,0.45),rgba(180,210,240,0.2))",
        borderRadius: 2,
        color: "white",
        fontSize: 12,
        lineHeight: 1,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── WINDOW SHELL ────────────────────────────────────────────────────────────
function XPWindow({
  id,
  title,
  icon,
  children,
  defaultX = 120,
  defaultY = 80,
  defaultWidth = 520,
  defaultHeight = 390,
  zIndex = 400,
  windowStates,
  setWindowStates,
  minWidth = 285,
  minHeight = 200,
  onFocus,
  keepMounted = false,
}) {
  const state = windowStates[id] || { open: false, minimised: false, maximised: false };
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const [size, setSize] = useState({ w: defaultWidth, h: defaultHeight });
  const [preMax, setPreMax] = useState(null);

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizing = useRef(false);
  const resizeDir = useRef("");
  const resizeStart = useRef({ mx: 0, my: 0, x: 0, y: 0, w: 0, h: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (dragging.current && !state.maximised) {
        setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
      }

      if (resizing.current && !state.maximised) {
        const dx = e.clientX - resizeStart.current.mx;
        const dy = e.clientY - resizeStart.current.my;
        const dir = resizeDir.current;
        let { x, y, w, h } = resizeStart.current;

        if (dir.includes("e")) w = Math.max(minWidth, w + dx);
        if (dir.includes("s")) h = Math.max(minHeight, h + dy);
        if (dir.includes("w")) {
          const nw = Math.max(minWidth, w - dx);
          x = x + (w - nw);
          w = nw;
        }
        if (dir.includes("n")) {
          const nh = Math.max(minHeight, h - dy);
          y = y + (h - nh);
          h = nh;
        }

        setPos({ x, y });
        setSize({ w, h });
      }
    };

    const onUp = () => {
      dragging.current = false;
      resizing.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [state.maximised, minWidth, minHeight]);

  if (!state.open && !keepMounted) return null;
  if (!state.open && keepMounted) return null;

  const patch = (change) => {
    setWindowStates((s) => ({ ...s, [id]: { ...s[id], ...change } }));
  };

  const startDrag = (e) => {
    if (state.maximised) return;
    onFocus?.();
    const rect = ref.current.getBoundingClientRect();
    dragging.current = true;
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    e.preventDefault();
  };

  const startResize = (e, dir) => {
    if (state.maximised) return;
    onFocus?.();
    resizing.current = true;
    resizeDir.current = dir;
    resizeStart.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y, w: size.w, h: size.h };
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleMax = () => {
    if (state.maximised) {
      if (preMax) {
        setPos(preMax.pos);
        setSize(preMax.size);
      }
      patch({ maximised: false });
    } else {
      setPreMax({ pos: { ...pos }, size: { ...size } });
      patch({ maximised: true, minimised: false });
    }
  };

  const containerStyle = state.maximised
    ? {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 32px)",
        zIndex,
        borderRadius: 0,
        display: state.minimised ? "none" : "flex",
      }
    : {
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex,
        borderRadius: 6,
        display: state.minimised ? "none" : "flex",
      };

  const handleStyle = (cursor, style) => ({
    position: "absolute",
    ...style,
    cursor,
    zIndex: 10,
    userSelect: "none",
  });

  return (
    <div
      ref={ref}
      onMouseDown={() => onFocus?.()}
      style={{
        ...containerStyle,
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12)",
        border: "1px solid #5b9bd5",
        fontFamily: "Tahoma, 'Segoe UI', sans-serif",
        background: "white",
        flexDirection: "column",
      }}
    >
      <div
        onMouseDown={startDrag}
        onDoubleClick={toggleMax}
        style={{
          background: "linear-gradient(180deg, #4a90d9 0%, #2a6cb5 40%, #1e5ca8 100%)",
          padding: "4px 7px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: state.maximised ? "default" : "move",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 15 }}>{icon}</span>
        <span style={{ flex: 1, color: "white", fontSize: 13, fontWeight: "bold", textShadow: "0 1px 1px rgba(0,0,0,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </span>
        <XPButton title="Minimise" onClick={() => patch({ minimised: true })}>_</XPButton>
        <XPButton title={state.maximised ? "Restore" : "Maximise"} onClick={toggleMax}>{state.maximised ? "❐" : "□"}</XPButton>
        <XPButton title="Close" danger onClick={() => patch({ open: false, minimised: false, maximised: false })}>×</XPButton>
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>

      {!state.maximised && !state.minimised && (
        <>
          <div onMouseDown={(e) => startResize(e, "n")} style={handleStyle("n-resize", { top: 0, left: 4, right: 4, height: 4 })} />
          <div onMouseDown={(e) => startResize(e, "s")} style={handleStyle("s-resize", { bottom: 0, left: 4, right: 4, height: 4 })} />
          <div onMouseDown={(e) => startResize(e, "e")} style={handleStyle("e-resize", { right: 0, top: 4, bottom: 4, width: 4 })} />
          <div onMouseDown={(e) => startResize(e, "w")} style={handleStyle("w-resize", { left: 0, top: 4, bottom: 4, width: 4 })} />
          <div onMouseDown={(e) => startResize(e, "nw")} style={handleStyle("nw-resize", { top: 0, left: 0, width: 8, height: 8 })} />
          <div onMouseDown={(e) => startResize(e, "ne")} style={handleStyle("ne-resize", { top: 0, right: 0, width: 8, height: 8 })} />
          <div onMouseDown={(e) => startResize(e, "sw")} style={handleStyle("sw-resize", { bottom: 0, left: 0, width: 8, height: 8 })} />
          <div onMouseDown={(e) => startResize(e, "se")} style={handleStyle("se-resize", { bottom: 0, right: 0, width: 8, height: 8 })} />
        </>
      )}
    </div>
  );
}

// ─── DESKTOP ICON ────────────────────────────────────────────────────────────
function DraggableIcon({ icon, label, initialX, initialY, onDoubleClick }) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [selected, setSelected] = useState(false);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      hasMoved.current = true;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };

    const onUp = () => {
      isDragging.current = false;
    };

    const deselect = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setSelected(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousedown", deselect);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousedown", deselect);
    };
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    hasMoved.current = false;
    const rect = ref.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setSelected(true);
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onDoubleClick={() => {
        if (!hasMoved.current) onDoubleClick?.();
      }}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 80,
        padding: "6px 4px",
        textAlign: "center",
        color: "white",
        cursor: "default",
        fontFamily: "Tahoma, 'Segoe UI', sans-serif",
        textShadow: "1px 1px 2px #000, 0 0 4px rgba(0,0,0,0.8)",
        userSelect: "none",
        zIndex: 100,
        borderRadius: 3,
        background: selected ? "rgba(49,105,194,0.4)" : "transparent",
        border: selected ? "1px dotted rgba(255,255,255,0.6)" : "1px solid transparent",
      }}
    >
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, pointerEvents: "none" }}>{icon}</div>
      <div style={{ fontSize: 12, lineHeight: 1.3, pointerEvents: "none" }}>{label}</div>
    </div>
  );
}

// ─── WINDOW CONTENTS ─────────────────────────────────────────────────────────
function IEBrowserContent({ url, title }) {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [inputUrl, setInputUrl] = useState(url);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentUrl(url);
    setInputUrl(url);
  }, [url]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [currentUrl]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f0f0", borderBottom: "1px solid #c0c0c0", padding: "2px 8px", display: "flex", gap: 16, flexShrink: 0 }}>
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => <span key={m} style={{ fontSize: 13, color: "#333" }}>{m}</span>)}
      </div>

      <div style={{ background: "linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)", borderBottom: "1px solid #c0c0c0", padding: "3px 6px", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
        {[{ label: "◀" }, { label: "▶" }, { label: "✕" }, { label: "↻", action: () => setCurrentUrl(inputUrl) }, { label: "⌂", action: () => { setInputUrl("https://www.google.com/"); setCurrentUrl("https://www.google.com/"); } }].map((btn, i) => (
          <button key={i} onClick={btn.action} style={{ width: 26, height: 26, border: "1px solid transparent", background: "transparent", borderRadius: 3, cursor: "pointer", fontSize: 14, color: "#444", padding: 0 }}>{btn.label}</button>
        ))}
        <span style={{ fontSize: 13, color: "#666" }}>Address</span>
        <div style={{ flex: 1, display: "flex", alignItems: "center", background: "white", border: "1px solid #7aabde", borderRadius: 2, height: 22, overflow: "hidden" }}>
          <span style={{ fontSize: 12, padding: "0 4px", color: "#666" }}>🌐</span>
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setCurrentUrl(inputUrl);
            }}
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "Tahoma", background: "transparent", color: "#00c" }}
          />
        </div>
        <button onClick={() => setCurrentUrl(inputUrl)} style={{ padding: "2px 10px", fontSize: 13, background: "linear-gradient(180deg,#fff,#dce8f5)", border: "1px solid #7aabde", borderRadius: 2, cursor: "pointer" }}>Go</button>
      </div>

      <div style={{ flex: 1, position: "relative", background: "white" }}>
        {loading ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "white", gap: 12 }}>
            <div style={{ fontSize: 32 }}>🌐</div>
            <div style={{ fontSize: 15, color: "#666", fontFamily: "Tahoma" }}>Loading page...</div>
            <div style={{ width: 200, height: 14, border: "1px solid #999", background: "#f0f0f0", borderRadius: 1 }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg, #5b9bd5, #3a7ebd)", animation: "ieload 0.7s ease-out forwards" }} />
            </div>
          </div>
        ) : currentUrl.startsWith("http") ? (
          <iframe src={currentUrl} style={{ width: "100%", height: "100%", border: "none" }} title={title} allow="fullscreen; clipboard-read; clipboard-write; autoplay" />
        ) : (
          <div style={{ padding: 30, fontFamily: "Tahoma", color: "#1a3a5c" }}>
            <h2>{title}</h2>
            <p>Local anchor: {currentUrl}</p>
          </div>
        )}
      </div>

      <div style={{ background: "#f0f0f0", borderTop: "1px solid #d0d0d0", padding: "2px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: "#666", fontFamily: "Tahoma" }}>Done</span>
        <span style={{ fontSize: 12, color: "#666", fontFamily: "Tahoma" }}>🌐 Internet · ✓ 100%</span>
      </div>
    </div>
  );
}

function YouTubeContent({ visible }) {
  const [active, setActive] = useState(MUSIC_TRACKS[0]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#111", fontFamily: "Tahoma, 'Segoe UI', sans-serif" }}>
      <div style={{ background: "#f0f0f0", borderBottom: "1px solid #c0c0c0", padding: "2px 8px", display: "flex", gap: 16, flexShrink: 0 }}>
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => <span key={m} style={{ fontSize: 13, color: "#333" }}>{m}</span>)}
      </div>

      <div style={{ background: "linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)", borderBottom: "1px solid #c0c0c0", padding: "4px 8px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 13, color: "#666" }}>Address</span>
        <div style={{ flex: 1, background: "white", border: "1px solid #7aabde", borderRadius: 2, height: 22, display: "flex", alignItems: "center", padding: "0 6px", color: "#00c", fontSize: 12 }}>
          https://www.youtube.com/embed/{active.id}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, background: "#000" }}>
          <iframe
            key={active.id}
            src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
            title={active.title}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div style={{ width: 190, background: "#f4f4f4", borderLeft: "1px solid #c0c0c0", padding: 8, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: "bold", color: "#555", marginBottom: 8, textTransform: "uppercase" }}>Playlist</div>
          {MUSIC_TRACKS.map((track) => (
            <div
              key={track.id}
              onDoubleClick={() => setActive(track)}
              style={{
                padding: "8px 6px",
                marginBottom: 4,
                borderRadius: 3,
                cursor: "pointer",
                background: active.id === track.id ? "#cfe4ff" : "white",
                border: active.id === track.id ? "1px solid #7aabde" : "1px solid #ddd",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: "bold", color: "#1a3a5c" }}>▶ {track.title}</div>
              <div style={{ fontSize: 10, color: "#777" }}>Double-click to play</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#f0f0f0", borderTop: "1px solid #d0d0d0", padding: "2px 8px", fontSize: 12, color: "#666", flexShrink: 0 }}>
        {visible ? "YouTube embedded player loaded" : "♪ Playing in background..."}
      </div>
    </div>
  );
}

function PrototypeFolderContent({ onOpenBrowser }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f0f0", borderBottom: "1px solid #c0c0c0", padding: "2px 6px", display: "flex", gap: 12, fontSize: 12, color: "#333" }}>
        {["File", "Edit", "View", "Tools", "Help"].map((m) => <span key={m} style={{ padding: "2px 4px", cursor: "default" }}>{m}</span>)}
      </div>
      <div style={{ background: "linear-gradient(180deg,#f8f8f8,#ececec)", borderBottom: "1px solid #c8c8c8", padding: "3px 8px", fontSize: 11, color: "#555" }}>
        Address: C:\Documents and Settings\Orion\Desktop\Prototypes
      </div>
      <div style={{ padding: 18, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, overflowY: "auto", flex: 1 }}>
        {PROTOTYPES.map((file) => (
          <div
            key={file.name}
            onDoubleClick={() => onOpenBrowser(file.url, file.name)}
            style={{ textAlign: "center", cursor: "pointer", color: "#1a3a5c", userSelect: "none", padding: 8, borderRadius: 4, border: "1px solid transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ddeeff"; e.currentTarget.style.borderColor = "#99bbdd"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
          >
            <div style={{ fontSize: 40 }}>{file.icon}</div>
            <div style={{ fontSize: 12, marginTop: 5, fontWeight: "bold" }}>{file.name}</div>
            <div style={{ fontSize: 10, color: "#777", marginTop: 2 }}>{file.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyComputerContent({ onOpenFolder }) {
  const drives = [
    { icon: "💿", label: "Local Disk (C:)", detail: "74.5 GB free" },
    { icon: "📀", label: "DVD Drive (D:)", detail: "No disc" },
    { icon: "🖨️", label: "Printers & Fax", detail: "" },
    { icon: "🌐", label: "Network Places", detail: "" },
    { icon: "⚙️", label: "Control Panel", detail: "" },
    { icon: "📁", label: "My Projects", detail: "6 items", onClick: onOpenFolder },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f0f0", borderBottom: "1px solid #c0c0c0", padding: "2px 6px", display: "flex", gap: 12 }}>
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => <span key={m} style={{ fontSize: 12, color: "#333", padding: "2px 4px", cursor: "default" }}>{m}</span>)}
      </div>
      <div style={{ background: "linear-gradient(180deg,#f8f8f8,#ececec)", borderBottom: "1px solid #c8c8c8", padding: "3px 8px", display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
        <span style={{ color: "#666" }}>Address</span>
        <div style={{ flex: 1, background: "white", border: "1px solid #7aabde", borderRadius: 2, padding: "1px 6px", fontSize: 12, color: "#00c" }}>My Computer</div>
      </div>
      <div style={{ display: "flex", background: "white", flex: 1 }}>
        <div style={{ width: 140, background: "linear-gradient(180deg,#6fa8d8,#4a88c0)", padding: "10px 0", borderRight: "1px solid #3a78b0" }}>
          <div style={{ fontSize: 10, fontWeight: "bold", color: "#ddeeff", padding: "2px 10px 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>System Tasks</div>
          {["🔧 System Info", "⚙️ Add/Remove", "🌐 Network"].map((item) => <div key={item} style={{ fontSize: 11, color: "white", padding: "3px 12px", cursor: "default" }}>{item}</div>)}
          <div style={{ height: 1, background: "rgba(255,255,255,0.2)", margin: "6px 10px" }} />
          <div style={{ fontSize: 10, fontWeight: "bold", color: "#ddeeff", padding: "2px 10px 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Other Places</div>
          <div onClick={onOpenFolder} style={{ fontSize: 11, color: "white", padding: "3px 12px", cursor: "pointer" }}>📁 My Projects</div>
          <div style={{ fontSize: 11, color: "white", padding: "3px 12px", cursor: "default" }}>📄 My Documents</div>
        </div>
        <div style={{ flex: 1, padding: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, minHeight: 180 }}>
          {drives.map((d) => (
            <div
              key={d.label}
              onDoubleClick={d.onClick}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 4px", borderRadius: 3, cursor: d.onClick ? "pointer" : "default", border: "1px solid transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#ddeeff"; e.currentTarget.style.borderColor = "#99bbdd"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
            >
              <div style={{ fontSize: 32 }}>{d.icon}</div>
              <div style={{ fontSize: 11, fontWeight: "bold", color: "#1a1a1a", textAlign: "center" }}>{d.label}</div>
              {d.detail && <div style={{ fontSize: 10, color: "#888" }}>{d.detail}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#f0f0f0", borderTop: "1px solid #d0d0d0", padding: "2px 8px", fontSize: 11, color: "#666" }}>6 objects</div>
    </div>
  );
}

function RecycleBinContent() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f0f0", borderBottom: "1px solid #c0c0c0", padding: "2px 6px", display: "flex", gap: 12 }}>
        {["File", "Edit", "View", "Help"].map((m) => <span key={m} style={{ fontSize: 12, color: "#333", padding: "2px 4px", cursor: "default" }}>{m}</span>)}
      </div>
      <div style={{ display: "flex", background: "white", flex: 1 }}>
        <div style={{ width: 140, background: "linear-gradient(180deg,#6fa8d8,#4a88c0)", padding: "10px 0", borderRight: "1px solid #3a78b0" }}>
          <div style={{ fontSize: 10, fontWeight: "bold", color: "#ddeeff", padding: "2px 10px 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Bin Tasks</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", padding: "3px 12px", cursor: "default" }}>🗑️ Empty Bin</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", padding: "3px 12px", cursor: "default" }}>↩️ Restore All</div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.2)", margin: "6px 10px" }} />
          <div style={{ fontSize: 10, fontWeight: "bold", color: "#ddeeff", padding: "2px 10px 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Details</div>
          <div style={{ fontSize: 10, color: "#c8e8ff", padding: "2px 12px", lineHeight: 1.5 }}>Recycle Bin<br />0 items<br />0 bytes</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#aaa", gap: 8 }}>
          <div style={{ fontSize: 48 }}>🗑️</div>
          <div style={{ fontSize: 13, fontFamily: "Tahoma" }}>The Recycle Bin is empty.</div>
        </div>
      </div>
      <div style={{ background: "#f0f0f0", borderTop: "1px solid #d0d0d0", padding: "2px 8px", fontSize: 11, color: "#666" }}>0 objects</div>
    </div>
  );
}

// ─── CHAT ────────────────────────────────────────────────────────────────────
function ChatWindow({ contact, onBack, onOpenBrowser }) {
  const [memory, setMemory] = useState(createFreshMemory);
  const [messages, setMessages] = useState(() => contact.messages.map((m, i) => ({ ...m, id: `${contact.id}-intro-${i}`, time: new Date() })));
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    setMemory(createFreshMemory());
    setMessages(contact.messages.map((m, i) => ({ ...m, id: `${contact.id}-intro-${i}`, time: new Date() })));
    setInput("");
    setTyping(false);
  }, [contact.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    const nextMemory = learnFromMessage(userInput, memory);

    setMemory(nextMemory);
    setMessages((m) => [...m, { from: "user", text: userInput, id: `user-${Date.now()}`, time: new Date() }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(userInput, contact, nextMemory);
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: reply, id: `bot-${Date.now()}`, time: new Date() }]);
    }, 650);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "Tahoma, 'Segoe UI', sans-serif" }}>
      <div style={{ background: "linear-gradient(180deg, #c5d8e8 0%, #a0c0d8 100%)", borderBottom: "1px solid #7aabde", padding: "6px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onBack} style={{ background: "linear-gradient(180deg,#fff,#dce8f5)", border: "1px solid #7aabde", borderRadius: 3, padding: "2px 8px", fontSize: 13, cursor: "pointer", color: "#333" }}>◀ Back</button>
        <Avatar contact={contact} size={32} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#1a3a5c" }}>{contact.name}</div>
          <div style={{ fontSize: 12, color: "#5580a0" }}>{contact.email}</div>
        </div>
        <StatusDot status={contact.status} />
      </div>

      <div style={{ background: "linear-gradient(180deg, #e8f0f8 0%, #d8e8f4 100%)", borderBottom: "1px solid #b8d0e8", padding: "3px 8px", display: "flex", gap: 4 }}>
        {["Photos", "Files", "Video", "Call", "Games", "Activities"].map((action) => (
          <button key={action} style={{ fontSize: 12, padding: "2px 8px", background: "linear-gradient(180deg,rgba(255,255,255,0.8),rgba(200,220,240,0.5))", border: "1px solid #a0c0d8", borderRadius: 2, cursor: "pointer", color: "#2a5070" }}>{action}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px", background: "white", backgroundImage: "radial-gradient(circle, #c5d8e8 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: msg.from === "bot" ? "#1a3a8a" : "#8B0000", fontWeight: "bold", marginBottom: 1 }}>
              {msg.from === "bot" ? contact.name : "You"} says:
            </div>
            <div style={{ fontSize: 15, color: "#1a1a1a", paddingLeft: 8, lineHeight: 1.5, whiteSpace: "pre-line" }}>{msg.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: "#1a3a8a", fontWeight: "bold", marginBottom: 1 }}>{contact.name} says:</div>
            <div style={{ paddingLeft: 8, color: "#888" }}>typing...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {contact.links?.length > 0 && (
        <div style={{ background: "linear-gradient(180deg, #f0f6fc, #e4eef8)", borderTop: "1px solid #b8d0e8", borderBottom: "1px solid #b8d0e8", padding: "6px 12px", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#5580a0", alignSelf: "center" }}>Links:</span>
          {contact.links.map((link, i) => (
            <button key={i} onClick={() => onOpenBrowser(link.url, link.label)} style={{ fontSize: 13, color: "#0033cc", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0 }}>{link.label}</button>
          ))}
        </div>
      )}

      <div style={{ background: "linear-gradient(180deg, #d8e8f4, #c8d8ec)", borderTop: "1px solid #a8c4da", borderBottom: "1px solid #a8c4da", padding: "3px 8px", display: "flex", gap: 4 }}>
        {["A", "☺", "✦", "🖼"].map((icon, i) => (
          <button key={i} style={{ width: 24, height: 22, border: "1px solid #a0b8d0", background: "linear-gradient(180deg,rgba(255,255,255,0.7),rgba(180,210,240,0.5))", borderRadius: 2, cursor: "pointer", fontSize: 14 }}>{icon}</button>
        ))}
      </div>

      <div style={{ padding: 8, background: "white", borderTop: "1px solid #c8d8ec" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          rows={2}
          style={{ width: "100%", border: "none", outline: "none", resize: "none", fontFamily: "Tahoma", fontSize: 15, color: "#1a1a1a", background: "transparent", boxSizing: "border-box" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={sendMessage} style={{ background: "linear-gradient(180deg, #e8f4ff 0%, #c5daf5 50%, #a8c8ee 100%)", border: "1px solid #7aabde", borderRadius: 3, padding: "3px 16px", fontSize: 14, cursor: "pointer", color: "#1a3a5c", fontFamily: "Tahoma" }}>Send</button>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ contact, hoverId, setHoverId, onSelectContact }) {
  return (
    <div
      onClick={() => onSelectContact(contact)}
      onMouseEnter={() => setHoverId(contact.id)}
      onMouseLeave={() => setHoverId(null)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        cursor: "pointer",
        background: hoverId === contact.id ? "linear-gradient(90deg, rgba(90,155,213,0.15), rgba(90,155,213,0.05))" : "transparent",
        borderLeft: hoverId === contact.id ? `3px solid ${contact.color}` : "3px solid transparent",
        transition: "all 0.15s",
      }}
    >
      <div style={{ position: "relative" }}>
        <Avatar contact={contact} size={36} />
        <div style={{ position: "absolute", bottom: -2, right: -2 }}><StatusDot status={contact.status} size={9} /></div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: "bold", color: "#1a3050", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{contact.name}</div>
        <div style={{ fontSize: 12, color: "#7090b0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{contact.mood}</div>
      </div>
    </div>
  );
}

function ContactList({ onSelectContact }) {
  const [hoverId, setHoverId] = useState(null);
  const online = CONTACTS.filter((c) => c.status === "online");
  const away = CONTACTS.filter((c) => c.status === "away" || c.status === "busy");

  const GroupHeader = ({ label, count }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px 2px", background: "linear-gradient(90deg, rgba(91,155,213,0.12), transparent)", borderBottom: "1px solid rgba(91,155,213,0.2)", marginTop: 4 }}>
      <span style={{ fontSize: 12, fontWeight: "bold", color: "#3a6a9a", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
      <span style={{ fontSize: 11, color: "white", background: "#5b9bd5", borderRadius: 8, padding: "0 5px", lineHeight: "14px" }}>{count}</span>
    </div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "Tahoma, 'Segoe UI', sans-serif" }}>
      <div style={{ background: "linear-gradient(180deg, #d4e8f8 0%, #b8d4ec 50%, #a0c4e0 100%)", borderBottom: "2px solid #7aabde", padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 48, height: 48, borderRadius: 8, background: "linear-gradient(135deg, #5b9bd533, #3a7ebd88)", border: "2px solid #5b9bd5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 3px 8px rgba(0,0,0,0.2)" }}>🧠</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 15, fontWeight: "bold", color: "#1a3a5c" }}>{ME.name}</span>
              <StatusDot status="online" size={9} />
            </div>
            <div style={{ fontSize: 11, color: "#3a6a9a", marginTop: 1, fontStyle: "italic" }}>{ME.mood}</div>
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.7)", border: "1px solid #a0c0d8", borderRadius: 10, padding: "3px 10px", gap: 6 }}>
          <span style={{ fontSize: 13 }}>🔍</span>
          <input placeholder="Search contacts..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: "Tahoma", flex: 1, color: "#2a5070" }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", background: "white" }}>
        <GroupHeader label="Online" count={online.length} />
        {online.map((c) => <ContactItem key={c.id} contact={c} hoverId={hoverId} setHoverId={setHoverId} onSelectContact={onSelectContact} />)}
        <GroupHeader label="Away / Busy" count={away.length} />
        {away.map((c) => <ContactItem key={c.id} contact={c} hoverId={hoverId} setHoverId={setHoverId} onSelectContact={onSelectContact} />)}
      </div>
      <div style={{ background: "linear-gradient(180deg, #c8dced, #b0ccde)", borderTop: "1px solid #88b8d8", padding: "5px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["📧", "📞", "📹", "🎮"].map((icon, i) => (
            <button key={i} style={{ width: 26, height: 24, border: "1px solid #88b8d8", background: "linear-gradient(180deg,rgba(255,255,255,0.6),rgba(180,210,240,0.4))", borderRadius: 3, cursor: "pointer", fontSize: 14 }}>{icon}</button>
          ))}
        </div>
        <span style={{ fontSize: 11, color: "#5580a0" }}>© 2008 Microsoft Corporation</span>
      </div>
    </div>
  );
}

// ─── START MENU ──────────────────────────────────────────────────────────────
function StartMenu({ onClose, startBtnRef, openWindow, openBrowser }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const clickedMenu = menuRef.current && menuRef.current.contains(e.target);
      const clickedStart = startBtnRef?.current && startBtnRef.current.contains(e.target);
      if (!clickedMenu && !clickedStart) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, startBtnRef]);

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#7aabde", borderBottom: "1px solid #2a4a6a", paddingBottom: 3, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );

  const MenuItem = ({ icon, label, id }) => (
    <div
      onClick={() => {
        openWindow(id);
        onClose();
      }}
      style={{ padding: "5px 6px", borderRadius: 2, marginBottom: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}
      onMouseEnter={(e) => e.currentTarget.style.background = "#ddeeff"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      <span>{icon}</span> {label}
    </div>
  );

  return (
    <div ref={menuRef} style={{ position: "fixed", bottom: 32, left: 0, zIndex: 1000, width: 480, maxHeight: "70vh", display: "flex", flexDirection: "column", borderRadius: "0 8px 0 0", overflow: "hidden", boxShadow: "4px -4px 30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)", fontFamily: "Tahoma, 'Segoe UI', sans-serif", transformOrigin: "bottom left", animation: "startMenuIn 0.15s cubic-bezier(0.2, 0, 0.2, 1) forwards" }}>
      <div style={{ background: "linear-gradient(180deg, #245eac 0%, #1a4a96 100%)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: "2px solid #ffa500", flexShrink: 0 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #5b9bd5, #3a7ebd)", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, boxShadow: "0 0 12px rgba(91,155,213,0.6)" }}>🧠</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: "bold", color: "white", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>Orion · AJ</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>UX/UI Designer · Systems Thinker</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: "55%", background: "white", borderRight: "1px solid #d0d0d0", padding: "10px 12px", overflowY: "auto" }}>
          <Section title="Programs">
            <MenuItem icon="💬" label="Windows Live Messenger" id="messenger" />
            <div
              onClick={() => {
                openBrowser("https://www.google.com/", "Internet");
                onClose();
              }}
              style={{ padding: "5px 6px", borderRadius: 2, marginBottom: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#ddeeff"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span>🌐</span> Internet
            </div>
            <MenuItem icon="▶️" label="YouTube" id="youtube" />
            <MenuItem icon="📁" label="My Projects" id="prototypes" />
            <MenuItem icon="🖥️" label="My Computer" id="myComputer" />
            <MenuItem icon="🗑️" label="Recycle Bin" id="recycleBin" />
          </Section>

          <Section title="Experience">
            {CV.experience.map((e, i) => (
              <div key={i} style={{ padding: "5px 6px", borderRadius: 2, marginBottom: 4, borderLeft: "3px solid #5b9bd5", background: "linear-gradient(90deg, rgba(91,155,213,0.06), transparent)" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: "#1a1a1a" }}>{e.role}</div>
                <div style={{ fontSize: 12, color: "#5b9bd5" }}>{e.company} · {e.period}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}>{e.detail}</div>
              </div>
            ))}
          </Section>
        </div>

        <div style={{ flex: 1, background: "linear-gradient(180deg, #d4e4f4 0%, #c0d8ee 100%)", padding: "10px 12px", overflowY: "auto" }}>
          <Section title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {CV.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "2px 7px", background: "rgba(255,255,255,0.7)", border: "1px solid #a0c0d8", borderRadius: 8, color: "#1a3a5c" }}>{s}</span>)}
            </div>
          </Section>
          <Section title="Currently Pursuing">
            <div style={{ fontSize: 12, color: "#1a3a5c", lineHeight: 1.5, background: "rgba(255,255,255,0.5)", padding: "5px 7px", borderRadius: 3, border: "1px solid rgba(91,155,213,0.3)" }}>{CV.pursuing}</div>
          </Section>
          <Section title="Philosophy">
            <div style={{ fontSize: 12, color: "#1a3a5c", lineHeight: 1.5, fontStyle: "italic", background: "rgba(255,255,255,0.5)", padding: "5px 7px", borderRadius: 3, border: "1px solid rgba(91,155,213,0.3)" }}>"{CV.philosophy}"</div>
          </Section>
        </div>
      </div>

      <div style={{ background: "linear-gradient(180deg, #245eac 0%, #1a4a96 100%)", borderTop: "2px solid #ffa500", padding: "4px 10px", display: "flex", justifyContent: "flex-end", gap: 6, flexShrink: 0 }}>
        {[{ icon: "🔴", label: "Log Off" }, { icon: "⭕", label: "Shut Down" }].map((btn) => (
          <button key={btn.label} onClick={onClose} style={{ fontSize: 12, padding: "3px 10px", background: "linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.05))", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 2, cursor: "pointer", color: "white", display: "flex", alignItems: "center", gap: 4 }}>{btn.icon} {btn.label}</button>
        ))}
      </div>
    </div>
  );
}
function ClippyGuide({ openWindow, openBrowser }) {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState(
    "Hi, I’m Clippy. I can guide you through this portfolio."
  );

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "fixed",
          right: 24,
          bottom: 52,
          zIndex: 1200,
          fontSize: 30,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        📎
      </button>
    );
  }

  const say = (text) => setMessage(text);

  return (
    <div
      style={{
        position: "fixed",
        right: 26,
        bottom: 50,
        zIndex: 1200,
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        fontFamily: "Tahoma, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: 300,
          background: "#ffffcc",
          border: "1px solid #777",
          borderRadius: 10,
          padding: 10,
          boxShadow: "2px 4px 12px rgba(0,0,0,0.35)",
          color: "#111",
        }}
      >
        <div style={{ fontSize: 13, lineHeight: 1.45, marginBottom: 8 }}>
          {message}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          <button onClick={() => say("This is a desktop-style portfolio. Your projects, research, music, browser, and Messenger all sit inside one system.")} style={clippyBtn}>What is this?</button>

          <button onClick={() => say("Start with Zero Grid. Then open Survey Results, 3D University Grid, Continuity, and Assist University.")} style={clippyBtn}>Where do I start?</button>

          <button onClick={() => { openWindow("prototypes"); say("I opened your Projects folder. Double-click a project to launch it."); }} style={clippyBtn}>Open projects</button>

          <button onClick={() => { openWindow("messenger"); say("Messenger is open. Pick a project contact and ask it questions."); }} style={clippyBtn}>Open Messenger</button>

          <button onClick={() => { openWindow("youtube"); say("YouTube is open. Play a track, minimise it, and let the desktop feel alive."); }} style={clippyBtn}>Play music</button>

          <button onClick={() => { openBrowser("https://fmporion.figma.site/", "Zero Grid"); say("Zero Grid is open. This is the spine of the whole submission."); }} style={clippyBtn}>Open Zero Grid</button>
        </div>

        <button
          onClick={() => setVisible(false)}
          style={{
            marginTop: 8,
            background: "none",
            border: "none",
            color: "#0033cc",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: 11,
            padding: 0,
          }}
        >
          hide Clippy
        </button>
      </div>

      <div style={{ width: 88, height: 118, position: "relative" }}>
        <div style={paperSheet}></div>
        <div style={clipBody}></div>
        <div style={eyeLeft}></div>
        <div style={eyeRight}></div>
        <div style={pupilLeft}></div>
        <div style={pupilRight}></div>
        <div style={browLeft}></div>
        <div style={browRight}></div>
      </div>
    </div>
  );
}

const clippyBtn = {
  fontSize: 11,
  padding: "3px 6px",
  border: "1px solid #999",
  borderRadius: 3,
  background: "linear-gradient(180deg,#fff,#e6e6c9)",
  cursor: "pointer",
};

const paperSheet = {
  position: "absolute",
  width: 74,
  height: 88,
  right: 0,
  bottom: 0,
  background: "linear-gradient(180deg,#f4f0b8,#ded98b)",
  transform: "skewY(-7deg)",
  border: "1px solid rgba(0,0,0,0.15)",
  boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
};

const clipBody = {
  position: "absolute",
  left: 16,
  top: 8,
  width: 42,
  height: 92,
  border: "8px solid #7777aa",
  borderTop: "none",
  borderRadius: "0 0 28px 28px",
  boxSizing: "border-box",
};

const eyeLeft = {
  position: "absolute",
  left: 9,
  top: 2,
  width: 25,
  height: 25,
  background: "white",
  borderRadius: "50%",
  border: "1px solid #ccc",
};

const eyeRight = {
  position: "absolute",
  left: 40,
  top: 2,
  width: 25,
  height: 25,
  background: "white",
  borderRadius: "50%",
  border: "1px solid #ccc",
};

const pupilLeft = {
  position: "absolute",
  left: 18,
  top: 11,
  width: 10,
  height: 10,
  background: "#111",
  borderRadius: "50%",
};

const pupilRight = {
  position: "absolute",
  left: 49,
  top: 11,
  width: 10,
  height: 10,
  background: "#111",
  borderRadius: "50%",
};

const browLeft = {
  position: "absolute",
  left: 8,
  top: -5,
  width: 26,
  height: 5,
  background: "#111",
  transform: "rotate(-18deg)",
  borderRadius: 4,
};

const browRight = {
  position: "absolute",
  left: 39,
  top: -5,
  width: 26,
  height: 5,
  background: "#111",
  transform: "rotate(18deg)",
  borderRadius: 4,
};
// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function MSNPortfolio() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [browser, setBrowser] = useState(null);
  const [shake, setShake] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [startHover, setStartHover] = useState(false);
  const [showDateTooltip, setShowDateTooltip] = useState(false);
  const startBtnRef = useRef(null);

  const [windowStates, setWindowStates] = useState({
    messenger: { open: true, minimised: false, maximised: false },
    prototypes: { open: false, minimised: false, maximised: false },
    myComputer: { open: false, minimised: false, maximised: false },
    recycleBin: { open: false, minimised: false, maximised: false },
    browser: { open: false, minimised: false, maximised: false },
    youtube: { open: false, minimised: false, maximised: false },
  });

  const [zOrders, setZOrders] = useState({ messenger: 410, prototypes: 401, myComputer: 402, recycleBin: 403, browser: 404, youtube: 405 });
  const zCounter = useRef(410);

  const bringToFront = useCallback((id) => {
    zCounter.current += 1;
    setZOrders((z) => ({ ...z, [id]: zCounter.current }));
  }, []);

  const openWindow = (id) => {
    setWindowStates((s) => ({ ...s, [id]: { ...s[id], open: true, minimised: false } }));
    bringToFront(id);
  };

  const openBrowser = (url, title) => {
    setBrowser({ url, title: String(title || "Internet").replace(" →", "") });
    setWindowStates((s) => ({ ...s, browser: { open: true, minimised: false, maximised: false } }));
    bringToFront("browser");
  };

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formattedDate = time.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const desktopIcons = [
    { id: "messenger", icon: <MSNIcon size={38} />, label: "Messenger", x: 18, y: 24, onDoubleClick: () => openWindow("messenger") },
    { id: "browser", icon: "🌐", label: "Internet", x: 18, y: 110, onDoubleClick: () => openBrowser("https://www.google.com/", "Internet") },
    { id: "youtube", icon: "▶️", label: "YouTube", x: 18, y: 196, onDoubleClick: () => openWindow("youtube") },
    { id: "prototypes", icon: "📁", label: "Prototypes", x: 18, y: 282, onDoubleClick: () => openWindow("prototypes") },
    { id: "mycomputer", icon: "🖥️", label: "My Computer", x: 18, y: 368, onDoubleClick: () => openWindow("myComputer") },
    { id: "recycle", icon: "🗑️", label: "Recycle Bin", x: 18, y: 454, onDoubleClick: () => openWindow("recycleBin") },
  ];

  const taskbarWindows = [
    { id: "messenger", icon: <MSNIcon size={14} />, label: selectedContact ? selectedContact.name : "Windows Live Messenger" },
    { id: "prototypes", icon: "📁", label: "Prototypes" },
    { id: "myComputer", icon: "🖥️", label: "My Computer" },
    { id: "recycleBin", icon: "🗑️", label: "Recycle Bin" },
    { id: "browser", icon: "🌐", label: browser?.title || "Internet Explorer" },
    { id: "youtube", icon: "▶️", label: "YouTube" },
  ].filter((w) => windowStates[w.id]?.open);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 40%, #1a4a7c 100%)", fontFamily: "Tahoma, 'Segoe UI', sans-serif", overflow: "hidden", position: "relative" }}>
      {desktopIcons.map((icon) => (
        <DraggableIcon key={icon.id} icon={icon.icon} label={icon.label} initialX={icon.x} initialY={icon.y} onDoubleClick={icon.onDoubleClick} />
      ))}

      {startOpen && <StartMenu onClose={() => setStartOpen(false)} startBtnRef={startBtnRef} openWindow={openWindow} openBrowser={openBrowser} />}
<ClippyGuide openWindow={openWindow} openBrowser={openBrowser} />
      <XPWindow id="messenger" title="Windows Live Messenger" icon={<MSNIcon size={15} />} defaultX={360} defaultY={80} defaultWidth={selectedContact ? 520 : 340} defaultHeight={600} zIndex={zOrders.messenger} windowStates={windowStates} setWindowStates={setWindowStates} onFocus={() => bringToFront("messenger")} minWidth={320} minHeight={420}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column", animation: shake ? "nudge 0.6s ease" : "none" }}>
          {selectedContact ? (
            <ChatWindow key={selectedContact.id} contact={selectedContact} onBack={() => setSelectedContact(null)} onOpenBrowser={openBrowser} />
          ) : (
            <ContactList onSelectContact={(contact) => setSelectedContact(contact)} />
          )}
        </div>
      </XPWindow>

      <XPWindow id="prototypes" title="Prototypes" icon="📁" defaultX={92} defaultY={72} defaultWidth={560} defaultHeight={390} zIndex={zOrders.prototypes} windowStates={windowStates} setWindowStates={setWindowStates} onFocus={() => bringToFront("prototypes")}>
        <PrototypeFolderContent onOpenBrowser={openBrowser} />
      </XPWindow>

      <XPWindow id="myComputer" title="My Computer" icon="🖥️" defaultX={160} defaultY={80} defaultWidth={520} defaultHeight={330} zIndex={zOrders.myComputer} windowStates={windowStates} setWindowStates={setWindowStates} onFocus={() => bringToFront("myComputer")}>
        <MyComputerContent onOpenFolder={() => openWindow("prototypes")} />
      </XPWindow>

      <XPWindow id="recycleBin" title="Recycle Bin" icon="🗑️" defaultX={200} defaultY={100} defaultWidth={420} defaultHeight={270} zIndex={zOrders.recycleBin} windowStates={windowStates} setWindowStates={setWindowStates} onFocus={() => bringToFront("recycleBin")}>
        <RecycleBinContent />
      </XPWindow>

      {browser && (
        <XPWindow id="browser" title={`${browser.title} - Windows Internet Explorer`} icon="🌐" defaultX={90} defaultY={50} defaultWidth={920} defaultHeight={640} zIndex={zOrders.browser} windowStates={windowStates} setWindowStates={setWindowStates} onFocus={() => bringToFront("browser")} minWidth={520} minHeight={320}>
          <IEBrowserContent url={browser.url} title={browser.title} />
        </XPWindow>
      )}

      <XPWindow id="youtube" title="YouTube" icon="▶️" defaultX={120} defaultY={50} defaultWidth={920} defaultHeight={640} zIndex={zOrders.youtube} windowStates={windowStates} setWindowStates={setWindowStates} onFocus={() => bringToFront("youtube")} minWidth={520} minHeight={320}>
        <YouTubeContent visible={!windowStates.youtube.minimised} />
      </XPWindow>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 32, background: "linear-gradient(180deg, #245eac 0%, #1a4a96 100%)", borderTop: "2px solid #3a70c0", display: "flex", alignItems: "center", padding: "0 4px", gap: 4, zIndex: 950, boxShadow: "0 -2px 8px rgba(0,0,0,0.3)" }}>
        <button
          ref={startBtnRef}
          onClick={() => setStartOpen((o) => !o)}
          onMouseEnter={() => setStartHover(true)}
          onMouseLeave={() => setStartHover(false)}
          style={{ height: 26, background: startOpen ? "linear-gradient(180deg, #2e7d32, #1b5e20)" : startHover ? "linear-gradient(180deg, #5cb860, #388e3c)" : "linear-gradient(180deg, #4caf50, #2e7d32)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "0 4px 4px 0", padding: "0 14px 0 8px", fontSize: 14, fontWeight: "bold", color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, boxShadow: startOpen ? "inset 0 2px 4px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.3)", transition: "all 0.1s", fontFamily: "Tahoma, 'Segoe UI', sans-serif" }}
        >
          <WindowsIcon size={16} />
          <span style={{ textShadow: "0 1px 1px rgba(0,0,0,0.4)", letterSpacing: "0.3px" }}>start</span>
        </button>

        {taskbarWindows.map((w) => (
          <button
            key={w.id}
            onClick={() => {
              setWindowStates((s) => ({ ...s, [w.id]: { ...s[w.id], minimised: !s[w.id].minimised, open: true } }));
              bringToFront(w.id);
            }}
            style={{ height: 22, padding: "0 10px", background: windowStates[w.id]?.minimised ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 2, fontSize: 12, color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "Tahoma" }}
          >
            <span>{w.icon}</span>
            <span style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.label}</span>
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <div style={{ position: "relative" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "0 8px", height: 24, cursor: "default" }}
            onMouseEnter={() => setShowDateTooltip(true)}
            onMouseLeave={() => setShowDateTooltip(false)}
          >
            <span style={{ fontSize: 14 }}>🔊</span>
            <span style={{ fontSize: 14 }}>📶</span>
            <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)" }} />
            <div style={{ fontSize: 13, color: "white", fontWeight: "bold", lineHeight: 1.2 }}>{formattedTime}</div>
          </div>
          {showDateTooltip && (
            <div style={{ position: "absolute", bottom: 30, right: 0, background: "#ffffcc", border: "1px solid #999", padding: "3px 8px", fontSize: 13, fontFamily: "Tahoma", color: "#000", whiteSpace: "nowrap", borderRadius: 2, boxShadow: "1px 1px 4px rgba(0,0,0,0.3)", zIndex: 1000 }}>{formattedDate}</div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes nudge {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-8px)}
          30%{transform:translateX(8px)}
          45%{transform:translateX(-6px)}
          60%{transform:translateX(6px)}
          75%{transform:translateX(-3px)}
          90%{transform:translateX(3px)}
        }
        @keyframes ieload { from { width: 0% } to { width: 100% } }
      `}</style>
    </div>
  );
}
