# myKaarma Design Team — AI Fluency Guide

An internal reference and tooling resource for the myKaarma Design Team. Covers AI concepts, prompt writing, ready-to-use templates, and interactive tools — all in a single self-contained HTML file that requires no backend, no install, and no login.

---

## What's inside

The guide is organized into six tabs:

| Tab | What it does |
|---|---|
| 📖 Glossary | 15 AI terms explained for designers — filterable by category, with live search, designer implications, and PM angles for each |
| 💡 Prompt Guide | The 6 principles of effective prompting, the 6-block anatomy, a fully built example using myKaarma context, and the iteration loop |
| 📄 Templates | 12 built-in prompt templates across 5 categories, plus team-added templates, an Add Template form, and a versioned Changelog |
| ⚡ Prompt Workshop | Three tools in one: Build (block-by-block form), Transform (AI rewrites a weak prompt), Critique (AI scores your prompt out of 30) |
| 🚩 Red Flags | A 10-question pre-ship checklist for AI features with live readiness scoring |
| 🎯 Cheat Sheet | Quick-reference do/don't cards and a prompt-by-situation table |

---

## How to use it

The guide is a single `.html` file. Open it in any modern browser — no server, framework, or dependencies required.

```
open mykaarma-ai-guide.html
```

To share it with the team, drop the file in a shared drive, Notion embed, or internal server. Everything runs client-side.

---

## Template system

### Built-in templates

Twelve templates are included across five categories: UX & Design, PM & Strategy, Research, Content & Copy, and Dev Communication. Each template uses `[bracket]` placeholders for the parts that should be customized before running.

| Category | Templates |
|---|---|
| 🎨 UX & Design | UX Critique Request, Error Message Generator, Flow Gap Finder |
| 📋 PM & Strategy | Feature Brief / One-Pager, Prioritization Framework, Stakeholder Pressure Test |
| 🔍 Research | Research Discussion Guide, Affinity Mapping Assistant |
| ✍️ Content & Copy | System Prompt Writer, Microcopy Generator |
| 🛠️ Dev Communication | Design → Dev Handoff Notes, AI Feature Spec for Engineers |

### Adding templates

Click the **➕ Add Template** tab, fill in the name, category, description, and prompt, and submit. The template appears immediately in the correct category tab. New templates are logged to the Changelog with the submitter's name.

### Editing templates

Every template — built-in and team-added — has an **Edit** button. Clicking it opens a modal pre-filled with the current content. As you edit the prompt, a live diff preview shows what's being removed (red) and added (green). Fill in your name and an optional reason for the change, then save.

Edited built-in templates display an `edited` badge on the card so it's clear the content has been modified from the original.

### Changelog

The **📋 Changelog** tab (with a live count badge) records every edit, addition, and restore. Each entry shows:

- What changed (template name, type of change)
- Who made the change and when
- The reason provided (if any)
- A **View diff** button to toggle the before/after content inline

### Restoring a version

Any edit entry in the Changelog has a **↩ Restore** button. Clicking it shows a preview of the version you're reverting to. Confirm with your name, and the template is restored to that state. The restore is itself logged as a new changelog entry — the full history is always intact and nothing is permanently deleted.

> **Note:** All template edits, additions, and changelog entries are stored in-memory and will reset on page refresh. For persistent cross-team storage, the template data store (`communityTemplates` array and `changelog` array in the script) can be connected to any key-value backend such as Firebase, Supabase, or a simple API endpoint.

---

## Prompt Workshop

The Workshop tab combines three tools behind a shared **Context bar** at the top. Anything typed in the context bar (e.g. "myKaarma check-in flow, service advisor audience") is automatically passed into whichever tool is active, so you don't have to re-enter it when switching tabs.

### Build
A six-field form — Role, Context, Task, Format, Constraints, Example — that assembles a color-coded prompt in real time as you type. The assembled prompt can be copied or saved directly as a team template.

### Transform
Paste a rough or vague prompt. The AI rewrites it using the 6-block anatomy with each block labeled. Two modes: **Rewrite for me** (just the improved prompt) or **Rewrite + explain changes** (each block annotated with why it was added — good for learning). Three pre-loaded weak prompt examples let you see the transformer in action before using your own.

### Critique
Paste any prompt and get a score out of 30 across the six anatomy blocks, a list of the three highest-leverage improvements, and a coaching note. Three example prompts (Weak / Medium / Strong) are pre-loaded so you can calibrate what different score levels look like.

The Workshop uses the Anthropic API (`claude-sonnet-4-20250514`) and requires an active API connection. In the hosted `claude.ai` environment this is handled automatically. If running the file locally or on a different host, the API calls will fail unless proxied or authenticated appropriately.

---

## Red Flags Checklist

Ten questions every designer should answer before any AI feature ships, grouped across four areas:

- **UX & Design Readiness** — output states, AI disclosure, correction UX
- **AI Behavior & Safety** — hallucination testing, guardrails, human-in-the-loop
- **Product & PM Readiness** — quality baseline, cost per interaction
- **Technical & Performance** — latency fallbacks, privacy and data compliance

Each item has a severity rating (Critical / High / Medium), a plain-language explanation of why it matters, and a checkbox. The summary bar at the top shows a live readiness score and verdict as items are checked off.

---

## File structure

Everything lives in a single HTML file with no external dependencies beyond Google Fonts (loaded via CDN). The file is self-contained and will work fully offline except for:

- Google Fonts (display degrades gracefully to system fonts if unavailable)
- The Anthropic API calls in the Prompt Workshop (Transform and Critique tools)

```
mykaarma-ai-guide-v6.html
├── <style>          — All CSS, CSS variables, myKaarma brand tokens
├── Topbar           — myKaarma brand bar (navy, orange mK logomark)
├── <nav>            — Six sticky tab buttons
├── <main>
│   ├── #page-glossary
│   ├── #page-prompting
│   ├── #page-templates
│   │   ├── Built-in panels (ux, pm, research, content, dev)
│   │   ├── #tmpl-other      — Community overflow category
│   │   ├── #tmpl-add        — Add Template form
│   │   └── #tmpl-changelog  — Version history
│   ├── #page-workshop
│   │   ├── #ws-build
│   │   ├── #ws-transform
│   │   └── #ws-critique
│   ├── #page-redflags
│   └── #page-cheatsheet
├── Modals           — Save as Template, Edit, Restore
└── <script>         — All JS: navigation, glossary search, template CRUD,
                       changelog system, AI API calls, red flags checklist
```

---

## Brand tokens

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#0D1F3C` | Primary text, navy backgrounds |
| `--accent` | `#F26522` | Orange — primary accent, active states |
| `--accent2` | `#2EAE6C` | Green — success states, team templates, save actions |
| `--paper` | `#f4f6fa` | Page background |
| `--cream` | `#e8edf5` | Card backgrounds, filter bar |
| `--muted` | `#6B7A99` | Secondary text, labels |

---

## Versioning

| Version | Summary |
|---|---|
| v1 | Initial editorial UI — warm paper tones, Playfair Display |
| v2 | Added Prompt Principles, Anatomy, Builder, Templates |
| v3 | myKaarma brand colors applied; Add Template + Other tabs added; Save as Template in Builder |
| v4 | AI Prompt Critique, Before/After Transformer, Red Flags Checklist, Glossary search bar |
| v5 | Consolidated to 6 tabs: Prompt Guide (principles + anatomy), Prompt Workshop (builder + critique + transformer) |
| v6 | Edit and versioning system for all templates; Changelog tab with diff view and one-click restore |

---

## Repository files

```
mykaarma-ai-guide.html    — The complete guide (open in any browser, no install needed)
prompt-workshop.jsx       — Standalone React artifact for the AI-powered Workshop tools
README.md                 — This file
```

The `prompt-workshop.jsx` file is a self-contained React component designed to run inside [Claude.ai artifacts](https://claude.ai). It powers the Transform and Critique tools, which require authenticated API access that is handled automatically in that environment. Paste the contents of `prompt-workshop.jsx` into a new Claude artifact to use it.

---

*myKaarma Design Team · Internal use only*
