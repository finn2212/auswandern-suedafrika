# Sitemap & Delta — auswandern-suedafrika-nuxt

Stand: 2026-04-24

Legende:
- ✅ **Fertig** — Seite existiert und ist inhaltlich wie gestalterisch ausgearbeitet
- 🟡 **Stub** — Seite existiert mit Platzhalter-Inhalt, muss noch ausgebaut werden
- 🟠 **Geplant, fehlt noch** — Seite ist im Ziel-Sitemap vorgesehen, existiert aber nicht
- 🔴 **Kritisch fehlend** — ohne diese Seite ist der Live-Gang nicht möglich (Recht, Checkout)

---

## Ist-Zustand (Was wir haben)

```
/                                   ✅  Cinematic Hero + 10 Topics + Unser Versprechen + Über-uns-Teaser + Neueste Artikel + CTA
/blog                               ✅  Liste aller Artikel, sortiert nach Datum
/blog/[...slug]                     ✅  Artikel-Detail (ContentRenderer)
/blog/kategorie/[slug]              ✅  Kategorie-Filter für jede der 10 Säulen
/produkte                           ✅  Übersicht der beiden Produkte
/produkte/starter-guide             ✅  Detail mit Kapiteln, Features, Für-wen-Block, Upgrade-CTA
/produkte/playbook                  ✅  Detail mit 10 Kapiteln, Bonus-Block, Für-wen, Final CTA
/ueber-uns                          ✅  Story, Mission, Werte, CTA
/kontakt                            🟡  Nur E-Mail-Link, kein Formular
/impressum                          🟡  Placeholder-Text, braucht echte Angaben
/datenschutz                        🟡  Placeholder-Text, braucht DSGVO-konforme Policy
/login                              🟡  Form-Stub, kein Auth-Flow
/registrieren                       🟡  Form-Stub, kein Auth-Flow
/mein-bereich                       🟡  Placeholder, kein echter User-Bereich
/en/*                               ✅  Alle obigen Seiten auch auf Englisch (i18n)
```

**Content:** 14 Blog-Artikel in `content/de/blog/`, ~16.200 Wörter. Englische Fassungen fehlen komplett.

**Assets:** 1 Hero-Bild (Kapstadt, Golden Hour, 4 MP). Keine Artikel-Images, keine OG-Bilder, keine Topic-Icons.

---

## Ziel-Sitemap (Was wir brauchen)

Gruppiert nach Funktion.

### 1. Public Marketing (offen zugänglich)

| Route | Status | Was fehlt | Prio |
|-------|--------|-----------|------|
| `/` | ✅ | Optional: Loop-Video, mehr Mikrointeraktionen | — |
| `/ueber-uns` | ✅ | Optional: Foto von Laura & Finn einbauen, Medien-Logos | P2 |
| `/kontakt` | 🟡 | Kontaktformular (Nitro-Route `POST /api/contact`), Thank-you-Page | P1 |
| `/presse` | 🟠 | Media-Kit, Logos zum Download, Pressezitate | P2 |
| `/webinare` | 🟠 | Liste kommender + aufgezeichneter Webinare | P2 |
| `/webinare/[slug]` | 🟠 | Webinar-Detail mit Countdown + Anmeldung | P2 |
| `/checkliste` | 🟠 | Lead-Magnet: „Erste 10 Schritte"-Checklist-Download gegen E-Mail | P1 |
| `/newsletter` | 🟠 | Standalone Newsletter-Anmelde-Seite (Danke-Page + Double-Opt-In) | P1 |

### 2. Content Hub (Blog + SEO-Pillars)

| Route | Status | Was fehlt | Prio |
|-------|--------|-----------|------|
| `/blog` | ✅ | Pagination ab >20 Artikeln, Suche, Lesezeit, „Featured"-Hero | P1 |
| `/blog/[...slug]` | ✅ | Table of Contents, Related Articles, Share Buttons, Breadcrumbs, Hero-Bild pro Artikel | P1 |
| `/blog/kategorie/[slug]` | ✅ | Optional: Kategorie-Hero mit Foto, kurze Einführung pro Kategorie | P2 |
| `/themen/visa` | 🟠 | SEO-Pillar-Page: ausführliche Hub-Seite für Visa, inkl. Inhaltsverzeichnis, alle Visa-Artikel, FAQ | P1 |
| `/themen/job` | 🟠 | s.o. | P1 |
| `/themen/auto` | 🟠 | s.o. | P1 |
| `/themen/immobilien` | 🟠 | s.o. | P1 |
| `/themen/anschluesse` | 🟠 | s.o. | P2 |
| `/themen/sicherheit` | 🟠 | s.o. | P0 (höchste Suche!) |
| `/themen/steuern` | 🟠 | s.o. | P0 |
| `/themen/krankenversicherung` | 🟠 | s.o. | P1 |
| `/themen/umzug` | 🟠 | s.o. | P1 |
| `/themen/banking` | 🟠 | s.o. | P2 |
| `/faq` | 🟠 | Häufige Fragen mit Accordion, gruppiert nach Themen | P1 |
| `/glossar` | 🟠 | Begriffserklärungen (Medical Aid, Loadshedding, Braai, …) | P2 |

> **Hinweis:** Kategorie-Filter (`/blog/kategorie/sicherheit`) ≠ Pillar-Page (`/themen/sicherheit`). Der Filter ist SEO-mäßig dünn. Die Pillar-Page ist der eigentliche Traffic-Magnet mit 3.000+ Wörtern Inhalt.

### 3. Commerce / Produkte

| Route | Status | Was fehlt | Prio |
|-------|--------|-----------|------|
| `/produkte` | ✅ | Vergleichstabelle Starter vs. Playbook | P2 |
| `/produkte/starter-guide` | ✅ | Testimonials, FAQ-Block, Preview-Video, Kauf-Button → Checkout | P1 |
| `/produkte/playbook` | ✅ | s.o. | P1 |
| `/produkte/[slug]/checkout` | 🔴 | Stripe-Checkout-Page | P0 (ohne Checkout kein Umsatz) |
| `/produkte/[slug]/success` | 🔴 | Thank-you-Page nach Kauf, Zugriff freischalten | P0 |
| `/produkte/[slug]/fehler` | 🔴 | Fehlerseite bei Zahlungsabbruch | P0 |

### 4. Member Area (gated, braucht Login)

| Route | Status | Was fehlt | Prio |
|-------|--------|-----------|------|
| `/login` | 🟡 | Echter Auth-Flow (Session, bcrypt, Cookie) | P0 |
| `/registrieren` | 🟡 | Echter Auth-Flow + Double-Opt-In per E-Mail | P0 |
| `/passwort-vergessen` | 🟠 | Password-Reset-Flow | P1 |
| `/passwort-neu/[token]` | 🟠 | Neues Passwort setzen | P1 |
| `/email-bestaetigen/[token]` | 🟠 | E-Mail-Verifizierung | P1 |
| `/mein-bereich` | 🟡 | Dashboard: gekaufte Produkte, Lesefortschritt, Lesezeichen, KI-Nutzung | P1 |
| `/mein-bereich/profil` | 🟠 | Profil bearbeiten, Passwort ändern, Konto löschen (DSGVO) | P1 |
| `/mein-bereich/starter-guide` | 🟠 | Produkt-Kapitel-Navigation, interaktive Checklisten, PDF-Download | P1 |
| `/mein-bereich/playbook` | 🟠 | s.o. mit zusätzlichen Experten-Interviews + Live-Q&A-Zugang | P1 |
| `/mein-bereich/lesezeichen` | 🟠 | Gespeicherte Blogartikel | P2 |
| `/mein-bereich/ki` | 🟠 | Auswander-KI-Chatbot-Interface | P1 |

### 5. Trust / Legal (für Live-Gang Pflicht)

| Route | Status | Was fehlt | Prio |
|-------|--------|-----------|------|
| `/impressum` | 🟡 | Echte Anschrift, USt-ID, verantwortliche Person | P0 |
| `/datenschutz` | 🟡 | DSGVO-konforme Policy (Anwalt-geprüft oder Trusted Shops) | P0 |
| `/agb` | 🔴 | Allgemeine Geschäftsbedingungen (Produktkäufe) | P0 |
| `/widerrufsbelehrung` | 🔴 | Widerrufsrecht für digitale Produkte | P0 |
| `/cookies` | 🟠 | Cookie-Policy + Banner-Konfiguration | P1 |

### 6. SEO / Technical (unsichtbar aber essentiell)

| Pfad | Status | Was fehlt | Prio |
|------|--------|-----------|------|
| `/sitemap.xml` | 🟠 | Auto-generiert via `@nuxtjs/sitemap` | P1 |
| `/robots.txt` | 🟠 | Statisch in `public/` | P1 |
| `/rss.xml` | 🟠 | RSS-Feed für Blog | P2 |
| OG-Bild-Generation | 🟠 | Automatische Open-Graph-Bilder pro Artikel (Satori/Nuxt-og-image) | P1 |
| Schema.org JSON-LD | 🟠 | `Article`, `FAQ`, `HowTo`, `BreadcrumbList`, `Product` Structured Data | P1 |
| 404-Seite | 🟠 | Custom `error.vue` im Südafrika-Look | P2 |

### 7. Affiliate Landing Pages (eigene URL pro Partner)

Vorgesehen 1–2 Partner pro Thema, 10 Themen → 10–20 eigene Landing-Pages:

| Route-Muster | Status | Prio |
|--------------|--------|------|
| `/empfehlung/[slug]` | 🟠 alle fehlen | P2 |

Jede Seite: kurzer Erfahrungsbericht + Screenshot + CTA mit Tracking-Link.

---

## Delta-Zusammenfassung

| Kategorie | Fertig | Stub | Fehlt | Gesamt |
|-----------|-------:|-----:|------:|-------:|
| Public Marketing | 2 | 1 | 5 | 8 |
| Content Hub | 3 | 0 | 12 | 15 |
| Commerce | 3 | 0 | 3 | 6 |
| Member Area | 0 | 3 | 8 | 11 |
| Legal | 0 | 2 | 3 | 5 |
| SEO/Tech | 0 | 0 | 6 | 6 |
| Affiliates | 0 | 0 | ~15 | ~15 |
| **Gesamt** | **8** | **6** | **~52** | **~66** |

---

## Empfohlene Reihenfolge (nach Wirkung / Aufwand)

### Jetzt (ohne die, kein Launch)

1. **Impressum + Datenschutz + AGB + Widerrufsbelehrung** — P0 rechtlich, ohne das kein Live-Gang
2. **Checkout-Flow (Stripe)** — P0 kommerziell, ohne das kein Umsatz

### Bald (die wirklich organischen Traffic bringen)

3. **3 Pillar-Pages** — Sicherheit, Steuern, Visa (höchste Suchvolumen, bereits Artikel dafür vorhanden)
4. **FAQ-Seite** mit Schema.org-Markup — holt sich Rich-Results in Google
5. **Lead-Magnet "Checkliste"** — baut die E-Mail-Liste, wichtig für Funnel
6. **Artikel-Hero-Bilder** via Replicate (14 Bilder à ~30 Sek)
7. **Article-Polish** — Lesezeit, TOC, Related Articles, Breadcrumbs, Share-Buttons
8. **Newsletter-Signup** im Footer + Inline im Blog

### Mittelfristig (nur wenn man Community/Retention aufbaut)

9. **Auth + Member-Bereich** — komplexes Kapitel, lohnt sich erst wenn Produkt verkauft
10. **Member-Produkt-Kapitel** — wenn Playbook verkauft wird
11. **Auswander-KI** — Differenzierungsmerkmal, aber kostet Groq/Claude-Token
12. **Webinar-Plattform** — starke Conversion-Strecke, aber viel Build

### Optional (schöner, nicht kritisch)

13. **Pillar-Pages für die restlichen 7 Themen**
14. **Englische Artikel-Fassungen** (14× re-writing)
15. **Affiliate-Landing-Pages**
16. **Presse-Seite**
17. **Glossar**
18. **RSS-Feed**
