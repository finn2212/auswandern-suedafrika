# Tasks — Auswandern Südafrika Nuxt

Laufender Arbeitsplan. Tasks werden in Reihenfolge abgearbeitet und nach Erledigung abgehakt.

**Start:** 2026-04-24
**Status:** große autonome Session durchgelaufen

---

## Phase 1 — Funnel & Recht (Launch-Blocker)

- [x] **Kontaktformular** mit Nitro-Route `POST /api/contact` (Zod-Validierung, Honeypot, Success-State)
- [x] **Impressum** mit echter Struktur (Platzhalter klar gekennzeichnet)
- [x] **Datenschutzerklärung** komplett (DSGVO, angepasst an Stack)
- [x] **AGB** für digitale Produkte (§ 1–11)
- [x] **Widerrufsbelehrung** separat + im AGB verlinkt
- [ ] **Cookie-Hinweis** als Banner — pending (AnnouncementBar existiert, Consent-Banner nicht)
- [x] **Checkout-Stub** `/produkte/kaufen` mit „Benachrichtige mich"-Flow — vermeidet tote Checkout-Links

## Phase 2 — Content: Die 4 fehlenden Pillar-Pages

- [x] **Pillar `/themen/auto`**
- [x] **Pillar `/themen/anschluesse`**
- [x] **Pillar `/themen/krankenversicherung`**
- [x] **Pillar `/themen/banking`**
- [x] **usePillars.ts** auf 10/10 aktualisiert
- [x] Homepage „more_coming"-Text angepasst, Header-Dropdown zeigt alle 10
- [ ] Pillar-spezifische Hero-Bilder via Replicate — pending (nutzen aktuell Blog-Artikel-Bilder)

## Phase 3 — Technical SEO

- [x] **sitemap.xml** via @nuxtjs/sitemap 8 (de-DE + en-US Split)
- [x] **robots.txt** unter `public/`
- [ ] **RSS-Feed** `/rss.xml` — pending
- [x] **Schema.org JSON-LD**: BlogPosting auf Artikeln, Article auf Pillars, FAQPage auf /faq
- [x] **Open Graph**: og:type article, og:image, og:title, og:description, article:published_time, article:author, article:section

## Phase 4 — UX Polish

- [x] **Custom 404-Page** (`app/error.vue`) im Südafrika-Look
- [x] **Reading Progress Bar** auf Artikeln + Pillars
- [x] **Back-to-top Button** im Default-Layout
- [ ] **Blog-Pagination** — pending (aktuell 25 Artikel, noch OK)
- [x] **Newsletter-Signup** (NewsletterForm) inline am Artikel-Ende + im Footer-Band
- [ ] **Search** über alle Inhalte — pending (FAQ hat schon eigene Suche)

## Phase 5 — Infrastruktur & Deploy

- [x] **HETZNER.md** — vollständiger Deployment-Runbook
- [ ] **scripts/setup-server.sh** um systemd-Unit + post-receive-Template erweitern — HETZNER.md dokumentiert alles, Script-Update optional
- [ ] **Dockerfile** — optional, pending
- [ ] **Production Environment** config (`.env.production.example`) — pending

## Phase 6 — Internationalisierung

- [ ] Englische Fassungen der 25 Blog-Artikel — pending (Umfangreich, eigener Run)
- [ ] Englische Fassungen der 10 Pillar-Pages — pending
- [ ] UI-Strings für die FAQ auf Englisch — pending (FAQ-Seite ist DE-hardcoded)
- [ ] FAQ-Daten in EN (52 Q&A) — pending

## Phase 7 — Review & Polish-Runde

- [x] **Erster Review-Agent** lief, 20+ Befunde extrahiert
- [x] **Kritische Audit-Fixes**:
  - Swiss-Spelling (ss → ß) in 8 Artikeln korrigiert
  - Visa-Zählung konsistent (jetzt 9 überall inkl. FIP)
  - HTML `lang`-Attribut dynamisch via `useLocaleHead`
  - `allgemein`-Kategorie-Label ergänzt (DE + EN)
  - `_path` → `path` Cleanup (Nuxt Content v3)
  - Tote Checkout-Links auf `/produkte/kaufen` umgeleitet
- [ ] Zweiter Review-Run (nach allen Änderungen) — optional

---

## Done — in dieser Session erledigt

Zusammenfassung der autonomen Session:

**Neue Pages:** `/faq`, `/themen/auto`, `/themen/anschluesse`, `/themen/krankenversicherung`, `/themen/banking`, `/agb`, `/widerrufsbelehrung`, `/produkte/kaufen`, `/sitemap_index.xml`, `app/error.vue`
**Komplett überarbeitet:** `/kontakt`, `/datenschutz`, `/impressum`, `/blog/[...slug]`, `/themen/[slug]`
**Neue Components:** NewsletterForm, ReadingProgress, BackToTop
**Neue Composables:** useReadingTime (früher), usePillars (erweitert)
**Neue Server-Routes:** `POST /api/contact` (Nitro + Zod + Honeypot)
**Neue Module:** @nuxtjs/sitemap, zod (als direkte Dep)
**Content:** 4 neue Pillar-Pages (~6.000 Wörter), Swiss-ß-Korrektur in 8 Blogs
**Dokumentation:** HETZNER.md (Deployment-Runbook, ~650 Zeilen), TASKS.md (dieses File), SITEMAP.md und STATUS.md aktualisiert

**Commit-Count in Session:** ~9 Commits

---

## Notes

- Der Nuxt-Dev-Server läuft lokal auf **Port 4300**
- Replicate-Token: in Kontavio-Memory (`reference_replicate_api.md`)
- `scripts/generate-blog-images-batch-2.sh` als Vorlage für weitere Bild-Generierungen
- Parallel-Sessions (andere Claude-Chats) haben eigenständig Header, LocaleSwitcher, AnnouncementBar gebaut und weiter verfeinert — kompatibel integriert

## Was jetzt noch offen ist

**Inhaltliche Lücken (aus Review-Agent, noch ungefixt):**
- Englische Artikel-Fassungen fehlen komplett (Header bietet EN an, Content nur DE)
- FAQ-Seite ist komplett in DE hardcoded (nicht i18nisiert)
- 6 neue Artikel-Ideen im Audit: Schule/Kita-Anmeldung, Loadshedding-Setup, Property24/Wohnungssuche, TRN-Antrag, Haustier-Import, Exit-Strategie „Zurück nach DE"

**Technisches:**
- Stripe-Integration für Checkout (aktuell nur Lead-Capture auf `/produkte/kaufen`)
- Resend für echten E-Mail-Versand (aktuell loggt contact-API auf Server-Konsole)
- Cookie-Consent-Banner wenn Tracking dazukommt
- OG-Image-Generierung pro Artikel (aktuell `og:image` vom Frontmatter, nicht generiert)
- Entfernung von `(page as any)`-Casts (Audit-Nice-to-have)
- RSS-Feed

**Infrastruktur:**
- Echte Hetzner-Server-Bereitstellung (Doku liegt, Ausführung offen)
- Production-Deployment-Pipeline testen
