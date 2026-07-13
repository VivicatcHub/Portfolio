# Portfolio

A developer portfolio that ships in **two interchangeable versions**, both driven by the exact same content files. A **Switch Theme** button jumps between them, and each lives at its own URL.

## 🎭 The two versions

| Version              | URL    | What it is                                                                                                                                                                                                                                                                           |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Normal** (VS Code) | `/`    | A **VS Code-inspired interface**: tabs, a file finder and an editor-like layout. This started from **[Théo Marinho](https://thmarinho.dev/#contact)**'s project and was **reworked and enhanced** here (data-driven, i18n, extra tabs). It keeps Théo's concept as its base/example. |
| **Pro**              | `/pro` | A **clean, white, multi-page portfolio**: a classic top-nav site with dedicated pages (Home, Experience, Projects, Skills, Contact). This one is a **fully original design**, built from scratch.                                                                                    |

Both read the **same** `public/locales/{language}/data.json`, so any content you add (a project, a skill, an experience, a language) shows up in **both** versions automatically: no component changes required.

The rest of this document describes the shared, **data-driven and scalable** architecture: adding content or even a whole new language never requires touching the components.

## ✨ What changed in this version

The goal of the rewrite was simple: **update the content, not the code.**

- **Single source of truth**: all content (skills, projects, experiences, socials, labels) is driven by `public/locales/{language}/data.json`.
- **Fully internationalized**: content and UI strings share the same data files, one per language (`en`, `fr`), loaded on demand.
- **Scalable by design**: components render whatever the data describes, so the site grows just by editing JSON.
- **Modular components**: reusable building blocks like `ProjectCard`, `SkillGrid`, and `SkillReactIcons` keep the rendering generic.

## 🛠️ Tech stack

- [React 18](https://react.dev/) (Create React App)
- [Tailwind CSS](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/) / react-i18next (with HTTP backend + language detection)
- [Monaco Editor](https://github.com/suren-atoyan/monaco-react) & [React Quill](https://github.com/zenoamaro/react-quill) for the notepad
- [react-icons](https://react-icons.github.io/react-icons/) / [devicons-react](https://github.com/mnjm/devicons-react) for skill icons

## 🚀 Getting started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm start

# Build for production
npm run build
```

## 🧩 Editing the content

All content lives in per-language data files: no component changes needed.

```
public/locales/
├── en/data.json
├── jp/data.json
└── fr/data.json
```

Each file contains both the **UI labels** (navbar, tabs, form fields…) and the **content data**:

| Key                | What it controls                                                         |
| ------------------ | ------------------------------------------------------------------------ |
| `data.socials`     | Email / GitHub / LinkedIn links shown in the contact tab                 |
| `data.projects`    | Projects grouped by category, rendered as cards                          |
| `data.experiences` | Timeline of experiences with hard/soft skills                            |
| `data.skills`      | Skills grouped by domain (frontend, backend, database, test, devops, os) |

To add a project, append an entry under the matching `data.projects[].items`; to add a skill, add an object to the relevant `data.skills` group. Do the same in **each** language file to keep translations in sync.

## 🌍 Adding a language

1. Create `public/locales/<lng>/data.json` (copy an existing one and translate it).
2. i18next will pick it up automatically via the loader path in [src/i18n.js](src/i18n.js).

## 🙏 Credits

- Original concept and base project by **[Théo Marinho](https://thmarinho.dev/#contact)**.
- Enhanced into a scalable, data-driven portfolio by **Valentin Guinet**.
