import { useState, useRef } from "react";

const BRAND = {
  ink: "#0D1F3C",
  orange: "#F26522",
  green: "#2EAE6C",
  paper: "#f4f6fa",
  cream: "#e8edf5",
  muted: "#6B7A99",
  card: "#ffffff",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #f4f6fa; }

  .ws-root { max-width: 900px; margin: 0 auto; padding: 1.5rem; font-family: 'DM Sans', sans-serif; }

  .ws-topbar {
    background: #0D1F3C; border-radius: 6px; padding: 0.65rem 1.1rem;
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem;
  }
  .ws-topbar-left { display: flex; align-items: center; gap: 0.65rem; }
  .mk-logo {
    width: 28px; height: 28px; background: #F26522; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace; font-size: 0.72rem; font-weight: 800; color: white;
  }
  .mk-name { font-size: 0.85rem; font-weight: 600; color: white; }
  .mk-name span { color: #F26522; }
  .ws-topbar-tag { font-family: 'DM Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; }

  .ws-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #0D1F3C; margin-bottom: 0.3rem; }
  .ws-title em { font-style: italic; color: #F26522; }
  .ws-sub { font-size: 0.88rem; color: #6B7A99; font-weight: 300; margin-bottom: 1.4rem; line-height: 1.6; }

  .ctx-bar {
    background: #e8edf5; border: 1px solid rgba(13,31,60,0.1); border-radius: 4px;
    padding: 0.6rem 1rem; display: flex; align-items: center; gap: 0.7rem; margin-bottom: 1.2rem;
  }
  .ctx-label { font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: #6B7A99; white-space: nowrap; }
  .ctx-input {
    flex: 1; background: transparent; border: none; outline: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #0D1F3C;
  }
  .ctx-input::placeholder { color: #6B7A99; font-weight: 300; }

  .tab-bar { display: flex; border: 1px solid rgba(13,31,60,0.15); border-radius: 4px; overflow: hidden; width: fit-content; margin-bottom: 1.5rem; }
  .tab-btn {
    font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.55rem 1.1rem; border: none; border-right: 1px solid rgba(13,31,60,0.15);
    background: transparent; color: #6B7A99; cursor: pointer; transition: all 0.18s;
  }
  .tab-btn:last-child { border-right: none; }
  .tab-btn:hover { background: #e8edf5; color: #0D1F3C; }
  .tab-btn.active { background: #0D1F3C; color: white; }

  .tool-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; align-items: start; }
  @media (max-width: 640px) { .tool-grid { grid-template-columns: 1fr; } }

  .panel-card { background: white; border: 1px solid rgba(13,31,60,0.1); border-radius: 4px; padding: 1.3rem; }
  .panel-label { font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase; color: #6B7A99; margin-bottom: 0.5rem; display: block; font-weight: 500; }
  .panel-label span { color: #F26522; }

  .field-input, .field-textarea, .field-select {
    width: 100%; font-family: 'DM Sans', sans-serif; font-size: 0.86rem; color: #0D1F3C;
    background: #f4f6fa; border: 1px solid rgba(13,31,60,0.16); padding: 0.55rem 0.75rem;
    border-radius: 3px; outline: none; transition: border-color 0.2s; -webkit-appearance: none;
  }
  .field-input:focus, .field-textarea:focus, .field-select:focus { border-color: #0D1F3C; }
  .field-textarea { resize: vertical; min-height: 72px; line-height: 1.55; font-family: 'DM Sans', sans-serif; }
  .field-textarea.tall { min-height: 160px; font-family: 'DM Mono', monospace; font-size: 0.78rem; }
  .field-group { margin-bottom: 0.9rem; }

  .run-btn {
    width: 100%; margin-top: 0.75rem; font-family: 'DM Mono', monospace; font-size: 0.7rem;
    letter-spacing: 0.12em; text-transform: uppercase; padding: 0.7rem; background: #0D1F3C;
    color: #f4f6fa; border: none; border-radius: 3px; cursor: pointer; transition: background 0.2s;
  }
  .run-btn:hover:not(:disabled) { background: #F26522; }
  .run-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .examples-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.8rem; align-items: center; }
  .ex-label { font-family: 'DM Mono', monospace; font-size: 0.58rem; color: #6B7A99; letter-spacing: 0.08em; }
  .ex-chip {
    font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.06em;
    background: rgba(242,101,34,0.1); color: #F26522; padding: 0.2rem 0.55rem;
    border-radius: 100px; cursor: pointer; border: none; transition: background 0.15s;
  }
  .ex-chip:hover { background: rgba(242,101,34,0.2); }

  .mode-bar { display: flex; gap: 0.4rem; margin-bottom: 0.9rem; }
  .mode-btn {
    font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 0.35rem 0.85rem; border: 1px solid rgba(13,31,60,0.2);
    background: transparent; color: #6B7A99; cursor: pointer; border-radius: 3px; transition: all 0.18s;
  }
  .mode-btn.active { background: #0D1F3C; color: white; border-color: #0D1F3C; }

  .output-panel { background: #0D1F3C; border-radius: 4px; padding: 1.3rem; position: sticky; top: 1rem; min-height: 300px; }
  .output-topbar { font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; }
  .copy-btn-out {
    font-family: 'DM Mono', monospace; font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.22rem 0.6rem; border: 1px solid rgba(255,255,255,0.15); background: transparent;
    color: rgba(255,255,255,0.4); cursor: pointer; border-radius: 2px; transition: all 0.18s;
  }
  .copy-btn-out:hover { border-color: #f8c06a; color: #f8c06a; }
  .copy-btn-out.copied { background: #2EAE6C; color: white; border-color: #2EAE6C; }

  .output-text { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.78); line-height: 1.72; }
  .output-placeholder { font-family: 'DM Mono', monospace; font-size: 0.73rem; color: rgba(255,255,255,0.2); font-style: italic; line-height: 1.6; }

  .dot-pulse { display: flex; gap: 4px; align-items: center; }
  .dot-pulse span { width: 5px; height: 5px; background: #F26522; border-radius: 50%; animation: pulse 1.2s ease-in-out infinite; }
  .dot-pulse span:nth-child(2) { animation-delay: 0.2s; }
  .dot-pulse span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
  .loading-row { display: flex; align-items: center; gap: 0.6rem; font-family: 'DM Mono', monospace; font-size: 0.68rem; color: rgba(255,255,255,0.35); }

  .score-badge { display: inline-flex; align-items: center; gap: 0.35rem; font-family: 'DM Mono', monospace; font-size: 0.65rem; padding: 0.2rem 0.6rem; border-radius: 100px; font-weight: 500; }
  .score-weak     { background: rgba(239,68,68,0.2);  color: #fca5a5; }
  .score-ok       { background: rgba(248,192,106,0.2); color: #fde68a; }
  .score-strong   { background: rgba(46,174,108,0.2);  color: #86efac; }

  .section-label { font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin: 1rem 0 0.4rem; }

  /* Build tab output */
  .built-prompt { font-family: 'DM Mono', monospace; font-size: 0.76rem; line-height: 1.75; white-space: pre-wrap; }
  .part-role       { color: #7dd3b8; }
  .part-context    { color: #93c5fd; }
  .part-task       { color: #fca5a5; }
  .part-format     { color: #fde68a; }
  .part-constraint { color: #d8b4fe; }
  .part-example    { color: #86efac; }

  .legend { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; padding-top: 0.9rem; border-top: 1px solid rgba(255,255,255,0.07); }
  .legend-chip { font-family: 'DM Mono', monospace; font-size: 0.56rem; letter-spacing: 0.08em; padding: 0.12rem 0.4rem; border-radius: 2px; }

  .error-msg { color: rgba(255,100,100,0.85); font-family: 'DM Mono', monospace; font-size: 0.78rem; line-height: 1.55; }

  .block-label { color: #fca5a5; font-family: 'DM Mono', monospace; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.08em; }
`;

// ─── Critique examples ───────────────────────────────────────────────────────
const CRITIQUE_EXAMPLES = [
  { label: "Weak", prompt: "Write an error message.", context: "" },
  { label: "Medium", prompt: "Write 3 error messages for when a payment fails in our app. They should feel friendly and not technical.", context: "myKaarma payment flow" },
  { label: "Strong", prompt: `You are a UX writer for myKaarma, an automotive service lane platform. Our users are service advisors at car dealerships.\n\nWrite 3 versions of an error message for when a customer's payment fails during checkout.\n\nFormat: For each version — Headline (max 6 words), Body text (max 20 words), CTA button (max 4 words).\n\nTone: Warm and clear — not technical, not alarming. The advisor needs to stay calm while talking to the customer.\n\nNever use: error codes, the word "invalid", passive voice.\n\nExample of tone we like: "Something went wrong — let's try that again."`, context: "myKaarma payment processing, service advisor UI" },
];

// ─── Transform examples ──────────────────────────────────────────────────────
const TRANSFORM_EXAMPLES = [
  { label: "Error message", prompt: "Write an error message for our app.", context: "myKaarma payment checkout flow" },
  { label: "Design feedback", prompt: "Give me feedback on my design.", context: "Service lane mobile check-in screen" },
  { label: "Feature brief", prompt: "Help me write a brief for a new feature.", context: "AI-powered appointment scheduling for dealers" },
];

// ─── API call ────────────────────────────────────────────────────────────────
async function callClaude(system, userMsg) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error ${res.status}`);
  }
  const data = await res.json();
  return data.content?.map((b) => b.text || "").join("") || "";
}

// ─── Format AI text for display ─────────────────────────────────────────────
function FormattedOutput({ text, isTransform }) {
  if (!text) return null;

  const lines = text.split("\n");
  return (
    <div className="output-text">
      {lines.map((line, i) => {
        const isSectionHeader = /^(SCORES|TOP 3 IMPROVEMENTS|COACHING NOTE|WHAT CHANGED)$/.test(line.trim());
        const isBlockLabel = /^\[([A-Z]+)\]/.test(line.trim());
        if (isSectionHeader) {
          return <div key={i} className="section-label" style={{ display: "block", marginTop: i > 0 ? "1rem" : 0 }}>{line}</div>;
        }
        if (isBlockLabel && isTransform) {
          const rest = line.replace(/^\[([A-Z]+)\]/, "");
          const label = line.match(/^\[([A-Z]+)\]/)[1];
          return (
            <div key={i} style={{ marginBottom: "0.1rem" }}>
              <span className="block-label">[{label}]</span>
              {rest}
            </div>
          );
        }
        return <div key={i} style={{ minHeight: line === "" ? "0.7rem" : undefined }}>{line || "\u00a0"}</div>;
      })}
    </div>
  );
}

// ─── BUILD TAB ───────────────────────────────────────────────────────────────
function BuildTab({ context }) {
  const [fields, setFields] = useState({ role: "", context: "", task: "", format: "", constraints: "", example: "" });
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));
  const hasAny = Object.values(fields).some(Boolean);

  const parts = [];
  if (fields.role)        parts.push({ cls: "part-role",       text: `You are ${fields.role}.` });
  if (fields.context)     parts.push({ cls: "part-context",    text: fields.context });
  if (fields.task)        parts.push({ cls: "part-task",       text: fields.task });
  if (fields.format)      parts.push({ cls: "part-format",     text: `Format: ${fields.format}` });
  if (fields.constraints) parts.push({ cls: "part-constraint", text: fields.constraints });
  if (fields.example)     parts.push({ cls: "part-example",    text: `Example: ${fields.example}` });

  const plainText = parts.map((p) => p.text).join("\n\n");

  function copyPrompt() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const LEGEND = [
    { cls: "part-role",       label: "Role",        bg: "rgba(125,211,184,0.15)", color: "#7dd3b8" },
    { cls: "part-context",    label: "Context",     bg: "rgba(147,197,253,0.15)", color: "#93c5fd" },
    { cls: "part-task",       label: "Task",        bg: "rgba(252,165,165,0.15)", color: "#fca5a5" },
    { cls: "part-format",     label: "Format",      bg: "rgba(253,230,138,0.15)", color: "#fde68a" },
    { cls: "part-constraint", label: "Constraints", bg: "rgba(216,180,254,0.15)", color: "#d8b4fe" },
    { cls: "part-example",    label: "Example",     bg: "rgba(134,239,172,0.15)", color: "#86efac" },
  ];

  return (
    <div className="tool-grid">
      <div className="panel-card">
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: BRAND.ink, marginBottom: "1.1rem" }}>
          Build from blocks
        </div>
        {[
          { key: "role",        label: "Role",        ph: "e.g., senior UX writer with expertise in automotive SaaS", type: "input" },
          { key: "context",     label: "Context",     ph: "e.g., We're redesigning the myKaarma mobile check-in flow…",  type: "textarea" },
          { key: "task",        label: "Task",        ph: "e.g., Write 3 versions of the welcome screen headline",       type: "input" },
          { key: "format",      label: "Format",      ph: "e.g., Numbered list. Headline + subtext + CTA for each.",     type: "input" },
          { key: "constraints", label: "Constraints", ph: "e.g., Warm tone. Max 150 words each. No jargon.",             type: "textarea" },
          { key: "example",     label: "Example",     ph: "e.g., Current copy to improve: 'Welcome — Get started today.'", type: "textarea" },
        ].map(({ key, label, ph, type }) => (
          <div key={key} className="field-group">
            <label className="panel-label"><span>{label}</span> — {
              key === "role" ? "Who is the AI?" :
              key === "context" ? "What's the situation?" :
              key === "task" ? "What should it do?" :
              key === "format" ? "How should output look?" :
              key === "constraints" ? "Rules to follow" : "Show what good looks like (optional)"
            }</label>
            {type === "input"
              ? <input className="field-input" value={fields[key]} onChange={set(key)} placeholder={ph} />
              : <textarea className="field-textarea" value={fields[key]} onChange={set(key)} placeholder={ph} rows={2} />
            }
          </div>
        ))}
      </div>

      <div className="output-panel">
        <div className="output-topbar">
          <span>Your Prompt</span>
          {hasAny && (
            <button className={`copy-btn-out ${copied ? "copied" : ""}`} onClick={copyPrompt}>
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        {!hasAny
          ? <div className="output-placeholder">Your prompt assembles here as you fill in the fields on the left…</div>
          : <>
              <div className="built-prompt">
                {parts.map((p, i) => (
                  <span key={i}>
                    <span className={p.cls}>{p.text}</span>
                    {i < parts.length - 1 ? "\n\n" : ""}
                  </span>
                ))}
              </div>
              <div className="legend">
                {LEGEND.filter((l) => fields[l.cls.replace("part-", "")]).map((l) => (
                  <span key={l.label} className="legend-chip" style={{ background: l.bg, color: l.color }}>{l.label}</span>
                ))}
              </div>
            </>
        }
      </div>
    </div>
  );
}

// ─── TRANSFORM TAB ───────────────────────────────────────────────────────────
function TransformTab({ context }) {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("rewrite");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function run() {
    if (!prompt.trim()) return;
    setLoading(true); setOutput(""); setError("");
    const withExplain = mode === "explain";
    const system = `You are a prompt engineering expert for myKaarma's design team. You rewrite weak, vague prompts into strong, structured prompts using the 6-block anatomy: Role, Context, Task, Format, Constraints, Example.

${withExplain ? "After the rewritten prompt, add a section called WHAT CHANGED that explains each block you added and why, in plain language a designer can learn from. One sentence per block." : "Just provide the rewritten prompt with no extra explanation."}

Rules:
- Label each block clearly: [ROLE], [CONTEXT], [TASK], [FORMAT], [CONSTRAINTS], [EXAMPLE]
- Only include blocks that genuinely improve the prompt — don't force all 6
- Keep the user's original intent intact
- Make it specific and actionable
- If context was provided, incorporate it`;

    const userMsg = `Original weak prompt: "${prompt.trim()}"${context ? `\n\nContext: ${context}` : ""}\n\nRewrite this into a strong, structured prompt.`;

    try {
      const text = await callClaude(system, userMsg);
      setOutput(text);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="tool-grid">
      <div className="panel-card">
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: BRAND.ink, marginBottom: "0.9rem" }}>
          Paste your rough prompt
        </div>
        <div className="mode-bar">
          {[{ id: "rewrite", label: "Rewrite for me" }, { id: "explain", label: "Rewrite + explain changes" }].map((m) => (
            <button key={m.id} className={`mode-btn ${mode === m.id ? "active" : ""}`} onClick={() => setMode(m.id)}>{m.label}</button>
          ))}
        </div>
        <div className="field-group">
          <label className="panel-label">Original prompt</label>
          <textarea className="field-textarea tall" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={"Paste your rough or vague prompt here…\n\ne.g. Help me write something for onboarding."} />
        </div>
        <div className="examples-row">
          <span className="ex-label">Try an example:</span>
          {TRANSFORM_EXAMPLES.map((ex, i) => (
            <button key={i} className="ex-chip" onClick={() => { setPrompt(ex.prompt); }}>{ex.label}</button>
          ))}
        </div>
        <button className="run-btn" onClick={run} disabled={loading || !prompt.trim()}>
          {loading ? "Transforming…" : "Transform My Prompt →"}
        </button>
      </div>

      <div className="output-panel">
        <div className="output-topbar">
          <span>Transformed Prompt</span>
          {output && <button className={`copy-btn-out ${copied ? "copied" : ""}`} onClick={copy}>{copied ? "Copied!" : "Copy"}</button>}
        </div>
        {loading
          ? <div className="loading-row"><div className="dot-pulse"><span/><span/><span/></div><span>Rewriting using 6-block anatomy…</span></div>
          : error
            ? <div className="error-msg">⚠ {error}</div>
            : output
              ? <FormattedOutput text={output} isTransform />
              : <div className="output-placeholder">Your rewritten prompt will appear here, structured using the 6-block anatomy.</div>
        }
      </div>
    </div>
  );
}

// ─── CRITIQUE TAB ────────────────────────────────────────────────────────────
function CritiqueTab({ context }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  async function run() {
    if (!prompt.trim()) return;
    setLoading(true); setOutput(""); setError(""); setScore(null);

    const system = `You are an expert prompt engineer and UX design coach at myKaarma. Critique prompts written by product designers.

Evaluate across 6 dimensions (score each 1–5):
1. Role — Does it give the AI a clear persona?
2. Context — Does it provide enough background?
3. Task — Is the ask specific and action-oriented?
4. Format — Is the desired output format specified?
5. Constraints — Are tone, length, and restrictions defined?
6. Example — Is there a sample or reference provided?

Then provide:
- OVERALL SCORE: WEAK (6–14), DEVELOPING (15–22), or STRONG (23–30)
- 3 specific improvements (numbered, concise)
- One coaching note

Respond in this exact format:

SCORES
Role: X/5
Context: X/5
Task: X/5
Format: X/5
Constraints: X/5
Example: X/5
Total: XX/30 — [WEAK / DEVELOPING / STRONG]

TOP 3 IMPROVEMENTS
1. [specific suggestion]
2. [specific suggestion]
3. [specific suggestion]

COACHING NOTE
[One warm, specific sentence]

Keep under 200 words. Be direct and specific.`;

    const userMsg = `Critique this prompt:\n\n"${prompt.trim()}"${context ? `\n\nContext: ${context}` : ""}`;

    try {
      const text = await callClaude(system, userMsg);
      setOutput(text);
      const m = text.match(/Total:\s*(\d+)\/30\s*[—–-]\s*(WEAK|DEVELOPING|STRONG)/i);
      if (m) setScore({ num: parseInt(m[1]), label: m[2].toUpperCase() });
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  const scoreCls = score ? (score.label === "WEAK" ? "score-weak" : score.label === "DEVELOPING" ? "score-ok" : "score-strong") : "";
  const scoreEmoji = score ? (score.label === "WEAK" ? "⚠️" : score.label === "DEVELOPING" ? "📈" : "✅") : "";

  return (
    <div className="tool-grid">
      <div className="panel-card">
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: BRAND.ink, marginBottom: "0.9rem" }}>
          Paste your prompt to critique
        </div>
        <div className="field-group">
          <label className="panel-label">Prompt</label>
          <textarea className="field-textarea tall" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={"Paste the prompt you want feedback on…\n\ne.g. Write me 3 options for the error message when a payment fails."} />
        </div>
        <div className="examples-row">
          <span className="ex-label">Load example:</span>
          {CRITIQUE_EXAMPLES.map((ex, i) => (
            <button key={i} className="ex-chip" onClick={() => setPrompt(ex.prompt)}>{ex.label} prompt</button>
          ))}
        </div>
        <button className="run-btn" onClick={run} disabled={loading || !prompt.trim()}>
          {loading ? "Analysing…" : "Critique My Prompt →"}
        </button>
      </div>

      <div className="output-panel">
        <div className="output-topbar">
          <span>Critique</span>
          {score && <span className={`score-badge ${scoreCls}`}>{scoreEmoji} {score.label} · {score.num}/30</span>}
        </div>
        {loading
          ? <div className="loading-row"><div className="dot-pulse"><span/><span/><span/></div><span>Reading your prompt…</span></div>
          : error
            ? <div className="error-msg">⚠ {error}</div>
            : output
              ? <FormattedOutput text={output} isTransform={false} />
              : <div className="output-placeholder">Your critique will appear here — scored across 6 anatomy blocks with the top 3 improvements and a coaching note.</div>
        }
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function PromptWorkshop() {
  const [tab, setTab] = useState("build");
  const [context, setContext] = useState("");

  const TABS = [
    { id: "build",     label: "⚙️ Build" },
    { id: "transform", label: "✨ Transform" },
    { id: "critique",  label: "🔍 Critique" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="ws-root">
        <div className="ws-topbar">
          <div className="ws-topbar-left">
            <div className="mk-logo">mK</div>
            <span className="mk-name">my<span>Kaarma</span></span>
            <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)", margin: "0 0.3rem" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Design Team</span>
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>Prompt Workshop</span>
        </div>

        <p className="ws-title">Prompt <em>Workshop</em></p>
        <p className="ws-sub">Build a prompt from scratch, transform a weak one, or get AI feedback on yours. Add context once at the top — it carries into whichever tool you're using.</p>

        <div className="ctx-bar">
          <span className="ctx-label">Context</span>
          <input
            className="ctx-input"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Optional — describe what you're working on (e.g. myKaarma check-in flow, service advisor audience)"
          />
        </div>

        <div className="tab-bar">
          {TABS.map((t) => (
            <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {tab === "build"     && <BuildTab     context={context} />}
        {tab === "transform" && <TransformTab context={context} />}
        {tab === "critique"  && <CritiqueTab  context={context} />}
      </div>
    </>
  );
}
