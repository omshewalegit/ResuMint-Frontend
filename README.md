<div align="center">

# ResuMint — Frontend

**The client application for ResuMint — turns a single free-form description into a polished, ATS-optimized resume across multiple professionally designed templates.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](#license)

[Quick Start](#quick-start) · [Templates](#templates) · [Architecture](#architecture) · [Roadmap](#roadmap)

</div>

---

## Overview

ResuMint Frontend is the client application for **ResuMint**, an AI-assisted resume builder. A user describes their background in a single free-form paragraph; the app sends that description to the [ResuMint Backend](https://github.com/omshewalegit/ResumeAi-Backend), receives back a fully structured resume JSON object, and renders it live across multiple interchangeable, print-ready resume templates — all editable and exportable as a polished PDF.

The app is built with **React + Vite** for a fast development loop and a lightweight production bundle, with no server-side rendering or backend logic — all resume generation intelligence lives in the Spring AI-powered backend.

## Features

- **AI-powered generation** — a single free-text input is transformed into a complete, structured resume via the backend's `/ai/resume/generate` endpoint.
- **Multiple professional templates** — four fully distinct, production-grade resume layouts (Modern, Timeline, Two-Column, Sidebar) that all render from the same underlying resume data, so switching templates never loses information.
- **Live template switching** — instantly preview the same resume content across every template without regenerating data.
- **Manual editing** — every generated field (experience bullets, skills, summary, etc.) can be reviewed and refined directly in the form before export.
- **Print-perfect output** — every template ships with dedicated print stylesheets (`@media print`) tuned for accurate page breaks, exact color rendering, and consistent margins when exporting to PDF.
- **Resilient rendering** — templates gracefully handle missing or partial data (no broken layouts when a section like certifications or languages is empty).
- **Responsive, icon-driven UI** — consistent SVG iconography (no emoji) across contact details, dates, locations, and links for a clean, ATS-friendly visual language.
- **Environment-based API configuration** — backend URL is fully configurable via environment variables, with no hardcoded endpoints.

## Tech Stack

| Layer | Technology |
|---|---|
| Library | React 18 |
| Build Tool | Vite |
| Styling | Plain CSS (component-scoped stylesheets) |
| HTTP Client | Fetch / Axios via `services/api.js` |
| Linting | ESLint |
| Fonts | Google Fonts (Inter, Lato, Poppins — per template) |

## Architecture

```
User Input (free-text description)
  │
  ▼
InputForm / ResumeForm        local form state
  │
  │  POST /ai/resume/generate
  ▼
api.js                        backend integration layer
  │
  ▼
ResuMint Backend (Spring AI)  structured JSON resume
  │
  ▼
BuilderPage                   holds resume data in state
  │
  ▼
TemplateSelector              choose active template
  │
  ▼
ResumePreviewWrapper
  │
  ▼
ModernTemplate / TimelineTemplate / TwoColumnTemplate / SidebarTemplate
  │
  ▼
Rendered, print-ready resume
```

<details>
<summary><strong>Project structure</strong></summary>

```
src/
├── assets/                            Static images (hero, logos)
├── components/
│   ├── InputForm/
│   │   ├── InputForm.jsx              Free-text description input
│   │   └── InputForm.css
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── ResumeForm/
│   │   ├── ResumeForm.jsx             Editable structured-resume form
│   │   └── ResumeForm.css
│   ├── ResumePreview/
│   │   ├── ResumePreview.jsx          Live preview shell
│   │   └── ResumePreview.css
│   └── templates/
│       ├── ResumePreviewWrapper.jsx   Picks the active template at render time
│       ├── TemplateSelector.jsx       Template switcher UI
│       ├── TemplateSelector.css
│       ├── ModernTemplate.jsx / .css      Centered header, blue accent, clean grid
│       ├── TimelineTemplate.jsx / .css    Vertical timeline for experience/education
│       ├── TwoColumnTemplate.jsx / .css   Enhancv-style two-column layout
│       └── SidebarTemplate.jsx / .css     Dark sidebar, white main content
├── pages/
│   ├── LandingPage.jsx / .css         Marketing / entry page
│   └── BuilderPage.jsx / .css         Main resume builder flow
├── services/
│   └── api.js                         Backend API calls
├── styles/
│   └── global.css                     App-wide base styles
├── App.jsx / App.css
└── main.jsx                           App entry point
```

</details>

## Templates

All four templates consume the exact same resume data shape, so any template can be selected at any time without data loss.

| Template | Description |
|---|---|
| **Modern** | Centered header, blue accent palette, clean section dividers, dot-rated languages, skill pill tags. |
| **Timeline** | Orange/blue accent, vertical connecting-line timeline for experience and education entries. |
| **Two-Column** | Replicates a classic two-column resume layout (decorative header, left content column, right sidebar of strengths/values/languages). |
| **Sidebar** | Dark navy sidebar with avatar initials, teal accents, and a connected-dot timeline in the main content area. |

Every template independently supports: personal information & contact icons, summary, experience, education (with coursework), projects (with live/GitHub links), certifications, skills (grouped by category), languages (proficiency dots), achievements / extracurricular / leadership, and interests — rendering only the sections present in the data.

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+ (or yarn/pnpm)
- The [ResuMint Backend](https://github.com/omshewalegit/ResumeAi-Backend) running locally or deployed

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/omshewalegit/ResuMint-Frontends.git
cd ResuMint-Frontends
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Copy the example environment file and set your backend URL:

```bash
cp src/.env.example .env
```

```env
VITE_API_BASE_URL=http://localhost:8080
```

**4. Run the development server**

```bash
npm run dev
```

The app starts on `http://localhost:5173` by default (Vite will auto-select the next available port if it's in use).

### Build for production

```bash
npm run build
npm run preview   # serve the production build locally
```

## Configuration

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the ResuMint backend API | `http://localhost:8080` |

> All environment variables consumed by Vite must be prefixed with `VITE_` to be exposed to client-side code.

## API Integration

The frontend communicates with a single backend endpoint via `src/services/api.js`:

```
POST {VITE_API_BASE_URL}/ai/resume/generate
Content-Type: application/json

{ "description": "<free-form candidate description>" }
```

The response is a structured resume JSON object (personal information, summary, skills, experience, education, projects, certifications, achievements, languages, interests) which is stored in `BuilderPage` state and passed down to whichever template is currently active.

## Roadmap

- [ ] PDF export via client-side print-to-PDF refinement (consistent cross-browser output)
- [ ] Drag-and-drop section reordering
- [ ] Additional template themes
- [ ] Resume versioning / save & load from local storage
- [ ] Form-level validation before submission
- [ ] Dark mode for the builder UI (templates remain print-optimized light theme)

## Security

- No API keys or secrets are stored in the frontend; all sensitive configuration lives on the backend.
- `.env` files are excluded via `.gitignore` and never committed to version control.
- All external links (LinkedIn, GitHub, project links) open with `rel="noreferrer"` to prevent tab-nabbing.

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Om Shewale** · [GitHub](https://github.com/omshewalegit)

Part of the ResuMint resume builder ecosystem.

</div>
