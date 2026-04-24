# auswandern-suedafrika-nuxt

Nuxt 4 rewrite of auswandern-südafrika.de — German-language platform for emigrating to South Africa, run by Laura & Finn.

## Stack

- Nuxt 4 (Vue 3.5, Nitro)
- Nuxt Content 3 (Markdown, DE + EN)
- @nuxtjs/i18n (DE default, EN under `/en/...`)
- PrimeVue 4 + Tailwind CSS 4
- pnpm 9.15+ / Node 22+

## Run locally

```bash
pnpm install
pnpm dev                 # → http://localhost:4300
```

## Content

- `content/de/` — German pages / articles
- `content/en/` — English pages / articles
- Blog posts go in `content/{locale}/blog/<slug>.md`

## Design system

See `app/assets/css/main.css`. Palette inherited from the previous Next.js build:

- **Gold** `#F5A623` — primary CTAs, brand accent
- **Terracotta** `#C75B39` — secondary accent
- **Ocean** `#2B6CB0` — editorial blue
- **Safari** `#48835D` — nature green
- **Warm White** `#FFF8F0` — page background
- **Anthracite** `#2D3748` — body text
- Font: **Inter**

## Claude agents

Pre-configured in `.claude/agents/`:

- **Leyla** — content writer (warm, personal voice)
- **Max** — strategy / SEO advisor
- **Noa** — trend scout (ZA news, visa changes, community pulse)

## Deploy

Target: Hetzner Cloud + Caddy (auto-HTTPS). See `Caddyfile` and `scripts/setup-server.sh`.
