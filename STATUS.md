# Status — auswandern-suedafrika-nuxt

Snapshot zum Weiterarbeiten in einer anderen Claude-Code-Session.

**Letzte Aktualisierung:** 2026-04-24 (nach großer autonomer Marathon-Session)

---

## Aktueller Zustand in Zahlen

| Kategorie | Wert |
|-----------|------|
| **Blog-Artikel (DE)** | 30 |
| **Pillar-Pages (DE)** | 11 (10 thematisch + `allgemein`) |
| **Blog-Hero-Images** | 30 (alle Artikel abgedeckt) |
| **FAQ-Einträge** | 52 in 11 Kategorien |
| **Legal-Pages** | 4 (Impressum, Datenschutz, AGB, Widerrufsbelehrung) |
| **Git-Commits in Session** | 19+ |
| **Content in Wörtern** | ~45.000 DE |
| **Dev-Server** | http://localhost:4300 |

---

## Was in der großen autonomen Session entstanden ist

### Phase 1 — Funnel & Recht
- Kontaktformular mit Nitro-Route `POST /api/contact` (Zod-Validierung, Honeypot, Success-State)
- Impressum, Datenschutz, AGB, Widerrufsbelehrung — komplette DSGVO/TMG-Texte (Platzhalter klar markiert)
- `/produkte/kaufen` Zwischen-Checkout mit Lead-Capture (ersetzt tote Checkout-Links)

### Phase 2 — Content
- 4 neue Pillar-Pages: Auto, Anschlüsse, Krankenversicherung, Banking + 1 Allgemein-Pillar
- 10 neue Blog-Artikel via Agent-Runs (5 Deep-Dives + 5 Lücken-Filler: Loadshedding, Schule, TRN, Wise, Haustiere)
- FIP-Artikel nach Web-Recherche (Nettovermögen 12 Mio ZAR verifiziert)

### Phase 3 — Technical SEO
- `@nuxtjs/sitemap` mit de-DE + en-US Split
- `robots.txt` mit Allow/Disallow/Sitemap-Link
- `/rss.xml` Nitro-Route (RSS 2.0 aus Nuxt Content)
- Schema.org: BlogPosting auf Artikeln, Article auf Pillars, FAQPage auf /faq
- Default OG-Image + Twitter Cards im app-head
- Dynamische `<html lang>` via `useLocaleHead` (DE → de-DE, EN → en-US)
- Canonical URLs auf allen Content-Seiten

### Phase 4 — UX Polish
- Custom 404 in `app/error.vue` mit Navigations-Karten
- `ReadingProgress.vue` auf Blog- + Pillar-Pages
- `BackToTop.vue` im Default-Layout
- `NewsletterForm.vue` (light/dark/compact) am Artikelende + als Footer-Band

### Phase 5 — Audit-Fixes (2 Runden)
- Swiss-Spelling-Bereinigung in 13 Artikeln (ß, nicht ss)
- Visa-Zählung konsistent (9 Optionen überall inkl. FIP)
- Artikel-Dates über Jan–April 2026 gestreut (nicht mehr alle 2026-04-24)
- Zeit-Widerspruch (18 Monate vs. zwei Jahre) normalisiert
- Newsletter-UX-Copy ehrlich (keine falsche „Bestätigungsmail"-Promise)
- Dev-Kommentar aus `content/de/index.md` raus
- `_path` → `path` (Nuxt Content v3 Cleanup)
- Tote Checkout-Links auf `/produkte/kaufen` umgeleitet

### Phase 6 — Infrastruktur
- **HETZNER.md** — vollständiger Deployment-Runbook (600+ Zeilen): Server, DNS, Caddy, systemd, Push-to-Deploy, Monitoring, Rollback, Launch-Checklist

---

## Sitemap (live)

| Route | Status |
|-------|--------|
| `/` | Cinematic Hero + 11 Pillar-Kacheln + Personal Band + Latest Articles + CTA |
| `/blog`, `/blog/[...slug]`, `/blog/kategorie/[slug]` | 30 Artikel, Editorial-Templates, TOC, Share, Related |
| `/themen/[slug]` (alle 11) | visa · job · auto · immobilien · anschluesse · sicherheit · steuern · krankenversicherung · umzug · banking · allgemein |
| `/produkte`, `/produkte/starter-guide`, `/produkte/playbook`, `/produkte/kaufen` | Detail + Lead-Capture-Stub |
| `/faq` | 52 Fragen, Live-Search (⌘K), Kategorie-Chips, Schema.org |
| `/ueber-uns`, `/kontakt`, `/impressum`, `/datenschutz`, `/agb`, `/widerrufsbelehrung` | Alle ausgefüllt |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml` | Automatisch generiert |
| `/login`, `/registrieren`, `/mein-bereich` | 🟡 Auth-Stubs (kein echter Session-Flow) |

---

## Was jetzt noch offen ist (priorisiert)

### Launch-Blocker (P0)

1. **Echte Impressum-/Datenschutz-Anschrift** einsetzen (aktuell Platzhalter)
2. **Stripe live schalten** — `/produkte/kaufen` ist Lead-Capture, keine Zahlung
3. **Resend API-Key** setzen — Contact-API logt aktuell auf Server-Konsole
4. **Anwaltliche Prüfung** der Legal-Texte

### Hoch (P1)

1. **Englische Content-Fassungen** — Header bietet EN an, aber `content/en/blog/` und `/themen/` sind leer → hreflang auf 404 ist SEO-negativ
2. **FAQ-UI i18n** — Chrome (Search, Chips, Labels) ist hardcoded Deutsch
3. **Pillar-spezifische Hero-Bilder** via Replicate (nutzen derzeit Blog-Artikel-Bilder)
4. **Double-Opt-In für Newsletter** via Resend Audiences (aktuell Piggyback auf Contact-API)

### Mittel (P2)

1. **Weitere Artikel-Ideen** (aus Audits):
   - Solar/Inverter-Deep-Dive für zu Hause
   - Domestic Worker einstellen (UIF, COIDA, Vertrag)
   - Schwangerschaft/Geburt in SA (Medical Aid, Staatsangehörigkeit)
   - SARS-Steuererklärung aus SA-Perspektive
2. **OG-Image-Generation** pro Artikel (aktuell globales Default-OG)
3. **Cookie-Consent-Banner** (falls Analytics)
4. **Blog-Pagination** (ab >40 Artikeln)
5. **Client-seitige Volltextsuche** über Blog

---

## Git-Log (Session, chronologisch)

```
81109ce  feat(seo): default OG image + twitter card for social shares
4bc4fbe  fix(content): audit-2 pass — spelling, dates, newsletter copy
62aaea8  fix(content): add FIP to welches-visum priority ladder
2f865b3  docs: update STATUS.md + TASKS.md
8a9cd62  feat: RSS feed + alternate link in head
3a85e70  feat(ux): reading progress + back-to-top + newsletter inline
153bc7b  feat: 4 remaining pillars + technical SEO + 404 + HETZNER runbook
d1e1e63  feat: contact form + legal pages + batch audit fixes
ffaeff7  feat: intelligent FAQ page with search, filter, Schema.org
961c9d7  feat: 3 more pillar pages + 11 missing blog hero images
e7f77c3  feat(nav): pillar pages surfaced in header + homepage
5641491  feat(content): Financially Independent Permit + 10 deep-dive articles
02e9ed8  feat: article polish + 3 pillar pages + 14 blog hero images
d4789b0  feat(home): upgrade hero to 4 MP via FLUX 1.1 Pro Ultra
178071a  feat(home): cinematic hero + redesigned topics section + AI hero image
69e145c  feat: expand site structure + 14 seed blog articles
76bd80a  chore: initial scaffold
```

Plus die in der Marathon-Session: allgemein-Pillar, 5 Artikel der Lücken-Fill-Runde, deren Hero-Images.

---

## Leitfaden für die nächste Session

1. **STATUS.md** — wo wir stehen
2. **TASKS.md** — Task-Detailliste mit Checkmarks
3. **SITEMAP.md** — Delta-Übersicht aller Seiten
4. **HETZNER.md** — für Produktion
5. **CLAUDE.md** — Tech-Stack und Konventionen

**Erste konkrete Schritte einer Folge-Session:**

- **Launch-ready machen (1–2 h):** Impressum-Daten füllen, Resend anschließen, Stripe-Keys einsetzen
- **Hetzner-Server provisionieren** nach HETZNER.md (45 min)
- **Production-Deploy** testen — Caddy-TLS, Smoke-Test, Monitoring-Checkbox
- **Englische Content-Fassungen** via Übersetzungs-Agent (eigene Session)

Das Projekt ist jetzt inhaltlich so vollständig, dass der nächste Schritt tatsächlich „Rollout" heißt, nicht mehr „bauen".
