# BiotaElite — Zoology Learning Hub

An open, educational website for zoology — featuring curated zoological assets, research projects, news, theses and blogs. Built with **plain HTML, CSS and JavaScript** (no build tools), fully **mobile-responsive**, and ready to host on GitHub Pages.

## Sections

| Page | Description |
|------|-------------|
| `index.html` | Home — hero, stats, featured species, taxonomy strip, latest news |
| `assets.html` | Zoological assets library with search + category filters |
| `projects.html` | Research projects (conservation, field, lab, genomics) |
| `news.html` | News and updates with filters |
| `thesis.html` | Thesis library (undergrad / postgrad / ecology / conservation) |
| `phyla.html` | Animal Kingdom — all major phyla with scientific names & characteristics |
| `fish.html` | Fish orders & classification, bilingual (Bengali/English) |
| `names.html` | Scientific names of animals, fish & fisheries taxa |
| `blog.html` | Articles and field notes |
| `about.html` | Mission and team |
| `contact.html` | Contact form and submission options |

## Features

- Mobile-responsive — mobile-first grid layouts, hamburger menu, touch-friendly
- Dark / light theme toggle (saved in `localStorage`)
- Live client-side search and category filtering on every library page
- Scroll-reveal animations and animated stat counters
- Back-to-top button, sticky header
- Newsletter + contact forms with inline validation and toast notifications
- Semantic HTML, ARIA labels, `prefers-reduced-motion` support

## Project structure

```
├── index.html
├── assets.html
├── projects.html
├── news.html
├── thesis.html
├── phyla.html
├── fish.html
├── names.html
├── blog.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/          <- add your own images here
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repository on GitHub and push this folder.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, select `main` and `/ (root)`.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

A `.github/workflows/pages.yml` file is included if you prefer to deploy via GitHub Actions instead.

## Customize

- Replace the emoji-based species art in `css/style.css` (`.sprite-*` classes) with real images placed in `assets/images/`.
- Update the newsletter / contact form endpoints to connect to a real backend or a service like Formspree.
- Add your own content by copying an existing card in any page.
- Change the theme colours via the CSS variables at the top of `css/style.css`.

## License

MIT — free to use, modify and share. See `LICENSE`.
