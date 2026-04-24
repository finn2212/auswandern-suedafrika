# auswandern-suedafrika-nuxt

## Projekt
Deutschsprachige Plattform für Südafrika-Auswanderer, betrieben von Laura & Finn.
Nachfolger des Next.js + Payload-Projekts unter `~/DEV/auswandern-südafrika/auswandern-suedafrika/` (archiviert, nicht mehr aktiv).

## Tech-Stack
- **Framework:** Nuxt 4 (monolithisch: Vue 3.5 + Nitro server routes, keine separate API)
- **CMS:** Nuxt Content 3 (Markdown in `content/`, zweisprachig DE + EN)
- **i18n:** @nuxtjs/i18n 9 (DE default, EN via `/en/` prefix)
- **UI:** PrimeVue 4 + Tailwind CSS 4 (via `@tailwindcss/postcss`, NICHT über `@nuxtjs/tailwindcss`)
- **Package Manager:** pnpm 9.15.4
- **Node:** 22+
- **Dev-Port:** 4300 (global registriert in Kontavio Port-Memory)

## Projektstruktur
```
app/
  app.vue
  assets/css/main.css          # Design-System via @theme (Gold/Terracotta/Ocean/Safari)
  components/                   # Header, Footer, LocaleSwitcher (auto-imported)
  layouts/default.vue
  pages/                        # Auto-routed, i18n-aware
content/
  de/                           # Deutsche Inhalte (Markdown + Frontmatter)
  en/                           # Englische Inhalte
i18n/locales/                   # UI-Übersetzungen (de.json, en.json)
public/                         # Statische Assets (Bilder, Favicon, OG)
scripts/                        # Deploy/Setup-Scripts (Hetzner)
.claude/agents/                 # Leyla, Max, Noa — Claude-Agenten fürs Projekt
```

## Konventionen
- **Code:** Englisch (Variablen, Funktionen, Kommentare)
- **UI-Texte:** Deutsch (Default) + Englisch (über i18n-JSON)
- **Content:** zweisprachig in `content/{de,en}/`
- **Commits:** konventionell (`feat:`, `fix:`, `chore:`)
- **Dateien:** kebab-case
- **Vue-Komponenten:** PascalCase
- **Branding:** Südafrika-Palette — Gold `#F5A623` (primär), Terracotta `#C75B39` (sekundär), Ocean, Safari, Warm-White, Anthracite. Font: Inter.

## Content-Workflow
- Blog-Artikel entstehen über den `leyla`-Agent (`.claude/agents/leyla.md`) in `content/{de,en}/blog/<slug>.md`
- Jeder Artikel hat Frontmatter: `title`, `description`, `date`, `category`, `tags`, `author`, `image`
- 10 feste Content-Säulen: Visa, Job, Auto, Immobilien, Anschlüsse, Sicherheit, Steuern, Krankenversicherung, Umzug, Banking

## Produkte & Monetarisierung (Stand: noch zu recherchieren)
- **Kostenlos:** Blog, Newsletter, Webinare, Auswander-KI (5 Fragen/Tag)
- **Starter-Guide** (geplant 49–79 €, einmalig) — umfassender Leitfaden + Checklisten + Videos + 30-Tage E-Mail-Serie
- **Premium-Playbook** (geplant 197–397 €, einmalig) — alles aus Starter + Experten-Interviews + Live-Q&A + unbegrenzter KI-Zugang
- **Affiliates:** 10 Themenbereiche mit Partner-Vermittlung (Visa-Agenturen, Wise, Versicherer, Umzugsfirmen etc.)
- **Offene Fragen** zur finalen Produktdefinition und Preispunkt → siehe Memory `todo_product_research.md`

## Commands
```bash
pnpm install      # Dependencies installieren
pnpm dev          # Dev-Server auf http://localhost:4300
pnpm build        # Production Build (Nitro)
pnpm generate     # Static Site (falls später relevant)
pnpm typecheck    # TypeScript-Check
```

## Deploy
- **Target:** Hetzner Cloud (Falkenstein, GDPR-konform)
- **Server:** CAX11 ARM (MVP) oder CPX21 (Produktion)
- **Reverse Proxy:** Caddy (Auto-HTTPS) — Config in `Caddyfile`
- **Provisioning:** `scripts/setup-server.sh` (einmalig auf frischem Ubuntu 24.04)
- **Deploy-Flow:** `git push origin main` → post-receive hook rebuilded und restartet systemd-Service

## Referenzprojekte
- Alt: `~/DEV/auswandern-südafrika/auswandern-suedafrika/` (Next.js + Payload, archiviert)
- Strategie-Dokument: `~/DEV/auswandern-südafrika/auswandern-suedafrika/Features.md` (39 KB — Vision, Geschäftsmodell, Affiliate-Strategie)
- Stack-Vorbild: `~/DEV/kontavio/` (Nuxt + PrimeVue + Tailwind-Konvention)
- Design-/Agent-Vorbild: `~/DEV/Vikash/` (Team-Struktur Leyla/Max/Noa)
