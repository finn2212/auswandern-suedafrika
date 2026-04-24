// FAQ content — single source of truth.
// Edit entries here; the FAQ page, search index, and Schema.org JSON-LD
// all derive from this file.

export interface FAQItem {
  q: string
  a: string
  link?: { label: string, to: string }
}

export interface FAQCategory {
  slug: string
  label: string
  accent: 'gold' | 'terracotta' | 'ocean' | 'safari'
  description?: string
  items: FAQItem[]
}

export const faqCategories: FAQCategory[] = [
  {
    slug: 'allgemein',
    label: 'Allgemein & Grundsätzliches',
    accent: 'gold',
    description: 'Die Fragen, die wir zuerst gehört haben — bevor es konkret wurde.',
    items: [
      {
        q: 'Wie lange sollte die Vorbereitung mindestens dauern?',
        a: 'Wir empfehlen 12 Monate Vorlauf — mindestens 9. Die drei Engpässe sind Visum (6–12 Wochen Bearbeitung), steuerliche Abmeldung und Wohnungssuche vor Ort. Wer versucht, das in unter 6 Monaten zu stemmen, zahlt den Schnellschuss mit Stress und Fehlern.',
      },
      {
        q: 'Brauchen wir wirklich einen Plan B in Deutschland?',
        a: 'Nein, aber einen Notgroschen. Wir sind ohne Plan B ausgewandert — was wir hatten, waren 12 Monate Lebenshaltung auf einem Tagesgeldkonto. Das reicht, um in den ersten Monaten vor Ort nicht unter Zeitdruck falsche Entscheidungen treffen zu müssen.',
      },
      {
        q: 'Wie gut muss unser Englisch sein?',
        a: 'Business-Englisch reicht. Südafrikaner sind in Englisch entspannter als Briten oder Amerikaner — Akzent ist okay, Vokabelprobleme werden freundlich übersehen. Afrikaans ist in Kapstadt nicht nötig, öffnet aber Türen. In Johannesburg kommt man mit Zulu/Xhosa nicht weiter im Alltag, aber es ist eine nette Geste.',
        link: { label: 'Afrikaans oder Englisch?', to: '/blog/afrikaans-oder-englisch-suedafrika' },
      },
      {
        q: 'Kann man Deutschland einfach wieder zurück, wenn es nicht klappt?',
        a: 'Ja. Die deutsche Staatsbürgerschaft bleibt, der Wiedereintritt ist unbürokratisch. Aber: wer steuerlich abgemeldet war und zurückkehrt, muss das Jahr-im-Jahr-aus sauber beim Finanzamt deklarieren. Für unsere Kreise: Unter den 6 Familien, die wir kennen, sind zwei wieder zurück, vier sind geblieben.',
      },
      {
        q: 'Was kostet der Umzug insgesamt, grob?',
        a: 'Für eine 4-köpfige Familie mit 20-Fuß-Container, Visa für alle, Lawyer, Medical, Übergangs-Airbnb, Mietkaution und Anschaffungen für den Neustart: 20.000–35.000 EUR. Mit Financial Independence Visa (alleine 6.000 EUR Ausstellungsgebühr) deutlich mehr.',
        link: { label: 'Lebenshaltung & Umzugskosten', to: '/blog/suedafrika-vs-deutschland-lebenshaltung' },
      },
      {
        q: 'Wann ist die beste Reisezeit für einen Sondierungs-Trip?',
        a: 'Oktober bis April für Kapstadt (trocken, warm) — aber nicht Weihnachten/Neujahr (alles überlaufen). Wenn du echten Alltag sehen willst, komm im Februar, März oder Oktober. Winter (Juni–August) zeigt dir die andere Seite: nass, kühl, loadshedding-intensiver.',
      },
    ],
  },

  {
    slug: 'visa',
    label: 'Visa & Aufenthalt',
    accent: 'terracotta',
    description: 'Alles rund um Einreise, Aufenthalt und Permanent Residence.',
    items: [
      {
        q: 'Welches Visum passt zu uns?',
        a: 'Das hängt von Beruf und Lebenssituation ab. Qualifizierte Angestellte → Critical Skills (wenn Beruf auf der Liste) oder General Work. Remote für DE-Arbeitgeber → Digital Nomad Visa. Vermögend → Financially Independent Permit. Ehepartner eines SA-Bürgers → Spousal Visa. Rentner → Retired Person\'s Visa.',
        link: { label: 'Alle 9 Visa-Typen', to: '/themen/visa' },
      },
      {
        q: 'Wie lange dauert ein Visa-Antrag?',
        a: 'Critical Skills: 8–12 Wochen. General Work: 10–16 Wochen. Spousal: 6–10 Wochen. FIP: 6–8 Monate. Intra-Company Transfer: 4–8 Wochen. Plane realistisch 3–4 Monate Puffer ein — wir kennen einzelne Fälle mit 20+ Wochen Bearbeitung.',
      },
      {
        q: 'Was kostet das Visum komplett?',
        a: 'Für eine Einzelperson inklusive Immigration Lawyer, SAQA-Evaluation, Führungszeugnis, Medical und Übersetzungen: 2.200–4.500 EUR. Familie mit 2 Kindern: 5.000–8.000 EUR. FIP durch die Ausstellungsgebühr zusätzlich 6.000 EUR.',
      },
      {
        q: 'Brauchen wir einen Immigration Lawyer?',
        a: 'Stark empfohlen, ja. Gute Lawyer kosten 1.500–3.500 EUR und sparen dir Monate Verzögerung und vermeidbare Ablehnungen. Wir haben zuerst selbst recherchiert und es war der teuerste unserer Auswander-Fehler.',
        link: { label: 'Unsere 10 größten Fehler', to: '/blog/10-groesste-fehler-auswandern' },
      },
      {
        q: 'Was ist das Critical Skills Visa?',
        a: 'Das populärste Visum für qualifizierte Einwanderer. Du brauchst einen Beruf auf der offiziellen „Critical Skills List" (140+ Berufe, u.a. Developer, Engineer, Doctor). Kein Jobangebot nötig, aber stark empfohlen. Läuft 5 Jahre, verlängerbar, Weg zu PR.',
        link: { label: 'Critical Skills Detail', to: '/blog/critical-skills-visa-suedafrika' },
      },
      {
        q: 'Was ist das Financially Independent Permit?',
        a: 'Direkter PR-Status gegen Nachweis von 12 Millionen ZAR Nettovermögen (ca. 600.000 EUR). Plus einmalige Ausstellungsgebühr von 120.000 ZAR. Keine Arbeitspflicht, keine Altersbeschränkung, nur alle 3 Jahre einreisen. Teuer, aber der schnellste Weg zur Permanent Residence.',
        link: { label: 'Financial Independence Visa', to: '/blog/financial-independence-visa-suedafrika' },
      },
      {
        q: 'Können wir als Tourist einreisen und vor Ort das richtige Visum beantragen?',
        a: 'Nein. Visa-Status-Wechsel innerhalb Südafrikas ist fast unmöglich. Du musst das passende Visum von Deutschland aus beantragen (bei der Botschaft Berlin oder Hamburg) und mit dem bewilligten Visum einreisen. Tourist → Arbeit in SA geht nicht.',
      },
      {
        q: 'Wie läuft die Anerkennung deutscher Abschlüsse (SAQA)?',
        a: 'SAQA ist die South African Qualifications Authority. Du reichst Abschlüsse beglaubigt und übersetzt ein, SAQA ordnet sie dem südafrikanischen NQF-Level zu. Kosten ca. 100 EUR, Dauer 4–8 Wochen. Pflicht für Critical Skills und General Work Visa.',
      },
      {
        q: 'Können wir unsere Kinder mit einschreiben?',
        a: 'Ja, als „Dependents" auf deinem Visum. Pflichtdokumente: Geburtsurkunden (apostilliert, übersetzt), bei nur einem Elternteil als Antragsteller zusätzlich eine notariell beglaubigte Einverständniserklärung des anderen Elternteils.',
      },
      {
        q: 'Wann bekommen wir die Permanent Residence?',
        a: 'Nach 5 Jahren auf Critical Skills oder bestimmten anderen Visa. Ausnahme: FIP bringt direkt PR. PR-Bearbeitung dauert aktuell 18–36 Monate. Nach weiteren 5 Jahren mit PR ist Staatsbürgerschaft möglich.',
      },
    ],
  },

  {
    slug: 'job',
    label: 'Arbeiten & Gehälter',
    accent: 'ocean',
    description: 'Lokal angestellt, remote oder selbstständig — was realistisch funktioniert.',
    items: [
      {
        q: 'Was verdient ein Senior Developer in Kapstadt?',
        a: '60.000–110.000 ZAR brutto pro Monat (ca. 2.800–5.200 EUR), Engineering Manager 100.000–170.000 ZAR. Internationale Firmen zahlen oben, lokale Startups unten. Deutlich weniger als in DE, aber bei 50–70% der Kosten lebbar gut.',
        link: { label: 'IT-Gehälter in Südafrika', to: '/blog/it-gehaelter-suedafrika' },
      },
      {
        q: 'Kann ich für meinen deutschen Arbeitgeber remote aus Südafrika arbeiten?',
        a: 'Ja, das ist der finanziell attraktivste Weg. Voraussetzung: Arbeitgeber spielt mit, richtige Steuerstruktur ist aufgesetzt (DBA greift), Visum passt (Digital Nomad seit 2024). Wichtig: Ab 183 Tagen in SA wirst du hier steuerpflichtig, nicht mehr in DE.',
        link: { label: 'Remote für deutschen Arbeitgeber', to: '/blog/remote-arbeiten-deutscher-arbeitgeber-sa' },
      },
      {
        q: 'Werden deutsche Abschlüsse anerkannt?',
        a: 'Ja, über SAQA-Evaluation. Universitäre Abschlüsse werden problemlos NQF-Leveln zugeordnet. Bei dualen Ausbildungsberufen (Handwerk, Pflege) wird es komplizierter — teilweise werden nur Teilqualifikationen anerkannt.',
      },
      {
        q: 'Wie ist der Arbeitsmarkt für Quereinsteiger oder ohne Uni-Abschluss?',
        a: 'Schwierig. Die Critical Skills List setzt auf qualifizierte Berufe, und die lokale Konkurrenz ist hoch. Ohne spezifische Qualifikation ist der einzige realistische Weg meist Selbstständigkeit, Remote-Arbeit für einen ausländischen Arbeitgeber oder das FIP wenn das Vermögen reicht.',
      },
      {
        q: 'Welche Arbeitszeit-Kultur erwartet mich?',
        a: 'Standard-Woche 40–45 Stunden, aber mit entspannterer Arbeitsatmosphäre als in DE. Freitag-Mittag ist in vielen Firmen gefühlt Wochenende. Work-Life-Balance wird ernst genommen, Überstunden sind seltener als in DE-Tech. Homeoffice ist seit 2020 Standard in Tech/White-Collar.',
      },
    ],
  },

  {
    slug: 'immobilien',
    label: 'Wohnen & Immobilien',
    accent: 'safari',
    description: 'Regionen, Mieten, Kaufen — und die Zeitfrage dahinter.',
    items: [
      {
        q: 'Sollen wir mieten oder direkt kaufen?',
        a: 'Unbedingt erst mieten. Wir kennen keine einzige deutsche Familie, die sofort nach Ankunft gekauft hat und es nicht bereut. Miete mindestens 6 Monate, lerne 2–3 Stadtteile, triff die Kaufentscheidung danach. Mehr dazu im Pillar.',
        link: { label: 'Immobilien Deep Dive', to: '/themen/immobilien' },
      },
      {
        q: 'Was kostet eine 3-Zimmer-Wohnung in Kapstadt zur Miete?',
        a: 'Unmöbliert, 110 m², City Bowl oder Tamboerskloof: 22.000–35.000 ZAR pro Monat (ca. 1.050–1.700 EUR). 3-Zi-Haus mit Garten in Constantia/Newlands: 30.000–55.000 ZAR. Premium-Lagen wie Bishopscourt: deutlich drüber.',
      },
      {
        q: 'Kann ich als Ausländer in Südafrika kaufen?',
        a: 'Ja, ohne Restriktionen. Keine Residenz-Pflicht, keine Sondergenehmigung. Finanzierung über eine SA-Bank geht theoretisch, Nicht-Residenten brauchen aber 30–50% Eigenkapital und zahlen 11–13% Zinsen — meist lohnt sich bar zu kaufen oder mit DE-Finanzierung.',
      },
      {
        q: 'Welche Gegend in Kapstadt ist für Familien am besten?',
        a: 'Klassiker: Constantia, Bishopscourt, Newlands, Tokai, Bergvliet. Grün, familiär, gute Schulen, sicher. Sea Point und City Bowl sind eher für Paare ohne Kind oder Berufstätige ohne Auto-Bedarf.',
        link: { label: 'Stadtteil-Guide Familien', to: '/blog/kapstadt-stadtteil-guide-familien' },
      },
      {
        q: 'Wie lange ist ein Standard-Mietvertrag?',
        a: '12 Monate fest. Vorzeitige Kündigung meist mit Kautionsverlust verbunden. Kaution = 1–2 Monatsmieten, auf verzinstem Konto. Maklergebühr zahlt in SA der Vermieter, nicht der Mieter.',
      },
      {
        q: 'Können wir Haustiere aus Deutschland mitbringen?',
        a: 'Ja, aber mit Planungsaufwand. Hunde und Katzen brauchen Mikrochip, Tollwutimpfung (mind. 30 Tage alt, max. 12 Monate), Tollwut-Titer-Test, Gesundheitszeugnis und Import-Permit von SA. Rechne mit 3–6 Monaten Vorlauf und 1.500–3.000 EUR pro Tier inkl. Transport.',
      },
    ],
  },

  {
    slug: 'sicherheit',
    label: 'Sicherheit',
    accent: 'terracotta',
    description: 'Die Frage, die wir am häufigsten gestellt bekommen.',
    items: [
      {
        q: 'Wie sicher ist Südafrika wirklich?',
        a: 'In guten Wohngegenden in Kapstadt, Stellenbosch, Paarl: absolut lebbar. Wir haben in 2 Jahren zwei Autoaufbrüche gehabt, keine persönliche Bedrohung. Die Sicherheitsstatistik konzentriert sich stark auf Townships und spezifische Stadtteile — wer dort nicht hinmuss, ist im Alltag geschützt.',
        link: { label: 'Sicherheit Deep Dive', to: '/themen/sicherheit' },
      },
      {
        q: 'Braucht man einen bewaffneten Sicherheitsdienst?',
        a: 'Praktisch alle Wohngegenden haben Alarm-Response (Fidelity, ADT). Kosten 400–600 ZAR pro Monat. Wir haben das — nicht aus Angst, sondern weil es Standard ist. Response-Zeit 5–10 Minuten. Bewaffnete Hausbewacher gibt es, aber für Normal-Auswanderer unnötig.',
      },
      {
        q: 'Können Kinder hier unbesorgt draußen spielen?',
        a: 'In den typischen Auswanderer-Vierteln: ja, in beaufsichtigten Rahmen (Garten, Park mit anderen Familien, Schulgelände). Alleine auf der Straße rumlaufen ist ungewöhnlicher als in DE — nicht nur wegen Kriminalität, auch wegen Verkehr.',
        link: { label: 'Sicherheit mit Kind', to: '/blog/sicherheit-mit-kind-suedafrika' },
      },
      {
        q: 'Soll ich eine Waffe besitzen?',
        a: 'Fast alle Deutschen, die wir kennen, haben keine. Wer eine hat, bereut es oft — Waffen zu Hause werden bei Einbrüchen häufiger gestohlen als eingesetzt. Der Erlaubnisprozess dauert Monate und ist bürokratisch. Security-Response und gute Prävention sind der bessere Ansatz.',
      },
      {
        q: 'Wie ist die Situation auf den Straßen nachts?',
        a: 'Nicht katastrophal, aber aufmerksam fahren. Ampeln nicht lange stehen, keine sichtbaren Wertsachen im Auto, Tankstellen nach 22 Uhr meiden. Smash-and-Grab-Einbrüche sind realer als Carjacking, aber beides kommt vor. Uber ersetzt für uns fast alle Nachtfahrten.',
      },
    ],
  },

  {
    slug: 'steuern',
    label: 'Steuern & Finanzen',
    accent: 'gold',
    description: 'Das Thema, bei dem du einen Berater brauchst.',
    items: [
      {
        q: 'Muss ich mich beim Finanzamt in Deutschland abmelden?',
        a: 'Nicht direkt beim Finanzamt — das erfährt automatisch von der Abmeldung beim Einwohnermeldeamt. Wichtig ist: Letzte Steuererklärung sauber aufteilen (unbeschränkt bis Wegzug, beschränkt danach). Kein Rechtsrat, bitte einen Berater konsultieren.',
        link: { label: 'Steuer-Abmeldung Detail', to: '/blog/steuerliche-abmeldung-deutschland' },
      },
      {
        q: 'Werde ich doppelt besteuert?',
        a: 'Nein, es gibt ein Doppelbesteuerungsabkommen DE–ZA. Einkommen wird entweder im Wohnsitzland oder im Quellenland besteuert, aber nie doppelt. Anrechnung wird in jährlicher Steuererklärung beantragt.',
      },
      {
        q: 'Was ist die Wegzugsteuer?',
        a: 'Wenn du ≥1% an einer Kapitalgesellschaft hältst, werden die stillen Reserven beim Wegzug versteuert — auch ohne Verkauf. Stundung in 7 Jahresraten möglich. Bei Wegzug nach SA (Nicht-EU) gelten strengere Regeln als innerhalb der EU. Das ist eine klassische Teure-Falle.',
        link: { label: 'Wegzugsteuer Detail', to: '/blog/wegzugsteuer-gmbh-anteile-suedafrika' },
      },
      {
        q: 'Wie hoch sind die Steuern in Südafrika?',
        a: 'Progressiv von 18% bis 45%. Spitzensatz ab ca. 1.817.000 ZAR pro Jahr (ca. 90.000 EUR). Zusätzlich SDL (1% Skill Development Levy) und UIF (Arbeitslosenversicherung, 1%). Insgesamt ähnliches Niveau wie in DE, aber mit weniger Sozialabgaben.',
      },
      {
        q: 'Wann brauche ich einen Steuerberater?',
        a: 'Immer beim Auswandern DE→ZA. Die Kombination aus deutscher (Wegzug, beschränkte Steuerpflicht) und südafrikanischer Logik (Residency-Definition, SARS-Prozesse) ist ohne Spezialisten nicht zu stemmen. Rechne mit 2.000–4.000 EUR im ersten Jahr.',
      },
      {
        q: 'Was ist die Tax Reference Number (TRN)?',
        a: 'Deine Steuer-ID in Südafrika. Brauchst du für Bankkonto, Medical Aid, Mietverträge, vieles mehr. Beantragt bei SARS, dauert 4–8 Wochen. Wichtig: direkt nach Ankunft anstoßen, sonst blockierst du dich selbst.',
      },
      {
        q: 'Wie werden meine deutschen Mieteinnahmen besteuert?',
        a: 'Bleiben in DE steuerpflichtig (beschränkte Steuerpflicht), werden in SA nur mit Progressionsvorbehalt berücksichtigt. Heißt: Du zahlst die deutsche Steuer, SA erhöht nur deinen Gesamtsteuersatz, aber besteuert die Einkünfte selbst nicht.',
      },
    ],
  },

  {
    slug: 'krankenversicherung',
    label: 'Krankenversicherung',
    accent: 'ocean',
    description: 'Medical Aid ist nicht dasselbe wie GKV — und der Unterschied kostet Geld.',
    items: [
      {
        q: 'Was ist Medical Aid?',
        a: 'Die südafrikanische Variante der privaten Krankenversicherung. Zwingend nötig, weil die staatliche Versorgung für die meisten Ausländer nicht praktikabel ist. Kosten 2.000–8.000 ZAR pro Person/Monat, abhängig vom Plan.',
        link: { label: 'Discovery vs. Momentum', to: '/blog/discovery-vs-momentum-medical-aid' },
      },
      {
        q: 'Welche Medical-Aid-Anbieter gibt es?',
        a: 'Die großen Vier: Discovery, Momentum, Bonitas, Fedhealth. Discovery ist Marktführer und hat das Vitality-Programm. Momentum ist Nummer 2 mit flexibleren Plänen. Bonitas ist günstiger aber spartanischer. Fedhealth ist nischig.',
      },
      {
        q: 'Kann ich mit einer Vorerkrankung abgeschlossen werden?',
        a: 'Ja, aber mit Wartezeiten. 3 Monate generelle Wartezeit und bis zu 12 Monate „Condition-Specific Waiting Period" für die betreffende Erkrankung. In diesen Zeiten zahlst du Beitrag, bekommst aber keine Leistung für die Vorerkrankung.',
      },
      {
        q: 'Sind die Kinder mitversichert wie in DE?',
        a: 'Nein, jedes Familienmitglied zahlt einen eigenen Beitrag — allerdings ist der Kinderbeitrag etwa 30–50% niedriger als der Erwachsenenbeitrag. Rechne für eine 4-köpfige Familie mit 12.000–25.000 ZAR pro Monat Medical Aid.',
      },
      {
        q: 'Wann sollte ich Medical Aid abschließen?',
        a: 'Sofort nach Ankunft. Als „Late Joiner" (wenn du über 35 bist und vorher keine SA Medical Aid hattest) kommt ein Zuschlag von 5–75% dazu. Je früher du einsteigst, desto besser.',
      },
    ],
  },

  {
    slug: 'umzug',
    label: 'Umzug & Logistik',
    accent: 'safari',
    description: 'Container oder Neustart vor Ort — die Grundsatzfrage.',
    items: [
      {
        q: 'Lohnt sich ein kompletter Container?',
        a: 'Für 70–90 m² DE-Haushalt: marginal. Container 20 Fuß komplett: 6.500–10.000 EUR. Viele unserer Möbel haben hier nicht gepasst oder funktioniert (Strom!). Prüf ehrlich: Was brauchst du wirklich?',
        link: { label: 'Umzug Deep Dive', to: '/themen/umzug' },
      },
      {
        q: 'Welche Dinge sollte ich definitiv nicht mitnehmen?',
        a: 'Elektro-Großgeräte (falscher Stecker, andere Voltage-Toleranz), Sofa (selten passender Maßstab), Deckenlampen (E27-Gewinde-Kompatibilität), alle IKEA-Möbel (überleben Transport selten). Neu kaufen vor Ort ist oft günstiger als der Containeranteil.',
        link: { label: 'Was mitnehmen, was verkaufen', to: '/blog/container-was-mitnehmen-was-verkaufen' },
      },
      {
        q: 'Wie lange dauert der Container-Transport?',
        a: 'Ab Packung in DE bis Zustellung in Kapstadt: 4–8 Wochen. Seefracht selbst 20–28 Tage, der Rest verteilt sich auf Verpackung, Zoll und Zustellung. Einmal im Hafen Kapstadt — pro Woche Verzögerung 400–600 EUR Demurrage.',
      },
      {
        q: 'Muss ich Zoll zahlen?',
        a: 'Für gebrauchte Haushaltsgegenstände bei einem Wohnsitzwechsel: nein, wenn die Sachen mindestens 6 Monate in deinem Besitz waren und du gültigen Aufenthaltsstatus hast. Neu gekaufte Dinge, Alkohol und Tabak sind davon ausgenommen.',
      },
      {
        q: 'Wann sollte ich den Container losschicken?',
        a: 'Erst wenn du einen unterschriebenen Mietvertrag am Zielort hast. Unser größter Fehler: zu früh losgeschickt, Container stand 7 Wochen im Hafen, 2.400 EUR extra. Nie ohne Dach über dem Kopf am Zielort.',
      },
    ],
  },

  {
    slug: 'auto',
    label: 'Auto & Mobilität',
    accent: 'ocean',
    description: 'Kaufen, importieren, Führerschein umschreiben.',
    items: [
      {
        q: 'Brauche ich in Kapstadt überhaupt ein Auto?',
        a: 'Praktisch ja. ÖPNV in Kapstadt ist für den Familienalltag nicht brauchbar. Uber ersetzt viel, aber mit Kind und täglichen Schulwegen nicht praktikabel. Im City Bowl oder Sea Point geht es teilweise ohne, sobald du in Constantia oder Hout Bay wohnst — nein.',
      },
      {
        q: 'Neuwagen, Gebrauchtwagen oder Import?',
        a: 'Gebrauchtwagen von Dealern (WeBuyCars, Motorpark) sind der pragmatischste Weg. Neuwagen sind oft nicht günstiger als in DE. Import lohnt sich nur bei sehr spezifischen Sammlerfahrzeugen — Zoll und Umrüstung kosten 40–60% Zuschlag.',
        link: { label: 'Auto kaufen Detail', to: '/blog/auto-kaufen-suedafrika' },
      },
      {
        q: 'Ist mein deutscher Führerschein gültig?',
        a: 'In den ersten 12 Monaten ja. Danach musst du auf einen südafrikanischen Führerschein umschreiben — mit beglaubigter Übersetzung, Eye Test, DLTC-Termin. Plane 3–6 Monate Vorlauf ein, Termine sind rar.',
        link: { label: 'Führerschein umschreiben', to: '/blog/fuehrerschein-umschreiben-suedafrika' },
      },
      {
        q: 'Wie teuer ist eine Kaskoversicherung?',
        a: 'Für ein 5 Jahre altes Toyota Hilux mit Vollkasko inkl. Scheibenschutz: 2.200–2.800 ZAR pro Monat (ca. 105–135 EUR). Selbstbeteiligung üblich 5.000–10.000 ZAR. Fast doppelt so teuer wie in DE — wegen der Risiken.',
      },
    ],
  },

  {
    slug: 'banking',
    label: 'Banking & Geld',
    accent: 'gold',
    description: 'Konten, Transfers, die besten Setups für Deutsche.',
    items: [
      {
        q: 'Brauche ich ein südafrikanisches Bankkonto?',
        a: 'Ja, spätestens nach 3–6 Monaten. Für Miete, Medical Aid, Schule, Gehaltseingang. FNB, Capitec oder Standard Bank sind die häufigsten Wahlen. Kontoeröffnung mit Temp-Visa + Mietvertrag + TRN dauert 1–2 Wochen.',
        link: { label: 'Banking Detail', to: '/blog/banking-fuer-deutsche-in-suedafrika' },
      },
      {
        q: 'Wie überweise ich große Summen nach SA?',
        a: 'Wise ist der günstigste Standard-Weg (0,3–0,5% Gebühr plus Mittelkurs). Für große Beträge (>50.000 EUR) lohnt sich eine spezialisierte Forex-Plattform wie Currencies Direct — bessere Kurse, mehr Service. Niemals über die Hausbank machen (2–4% Zuschlag).',
      },
      {
        q: 'Ist Wise in Südafrika akzeptiert?',
        a: 'Ja, praktisch überall wie eine normale Debitkarte (Tap to Pay). Läden, Restaurants, ATMs — alles geht. Du kannst mit Wise monatelang leben, ohne ein lokales Konto zu brauchen.',
      },
      {
        q: 'Wie hoch sind die Bankgebühren in SA?',
        a: 'Mit Standardkonto bei FNB oder Standard Bank: 80–250 ZAR pro Monat. Capitec ist deutlich günstiger (ca. 6 ZAR Grundgebühr + Transaktionskosten). Für die meisten Auswanderer-Zwecke reicht Capitec + Wise vollkommen.',
      },
    ],
  },

  {
    slug: 'anschluesse',
    label: 'Anschlüsse & Alltag',
    accent: 'terracotta',
    description: 'Internet, Strom, SIM, Loadshedding — die ersten Wochen.',
    items: [
      {
        q: 'Wie schnell kann ich Internet zu Hause haben?',
        a: 'Fiber in urbanen Gegenden: 2–7 Tage nach Bestellung. Anbieter: Vumatel, Openserve, Frogfoot. Pakete 100–1000 Mbit/s, 700–1.400 ZAR pro Monat (ca. 35–70 EUR). LTE-Router (MTN, Vodacom) sofort einsatzbereit, aber teurer pro GB.',
        link: { label: 'Erste 14 Tage', to: '/blog/erste-14-tage-suedafrika' },
      },
      {
        q: 'Was ist Loadshedding und ist es noch ein Problem?',
        a: 'Geplante Stromausfälle durch Eskom-Engpässe. 2022/23 war\'s hart, 2024/25 besser, aber nicht vorbei. In gehobenen Vierteln meist 1–3× pro Woche für 2–4 Stunden. Backup-Lösungen: UPS (1.500 ZAR), Inverter mit Batterie (25.000 ZAR+), Solar (100.000+ ZAR).',
      },
      {
        q: 'Welche SIM-Karte ist die beste?',
        a: 'Vodacom für beste Netzabdeckung, MTN für Pricing. Prepaid-Starter-Kit 50–100 ZAR am Flughafen oder in jedem Supermarkt. RICA-Registrierung mit Passkopie ist Pflicht. Postpaid-Verträge erst mit TRN sinnvoll.',
      },
      {
        q: 'Gibt es Postdienste wie in Deutschland?',
        a: 'SA Post Office funktioniert schlecht und unzuverlässig. Praktisch alles wichtige läuft über Kurierdienste (PostNet, PUDO, Aramex, Courier Guy) oder direkte Adresse beim Empfänger. Versand aus DE lieber an eine Filiale (Aramex DHL) als nach Hause.',
      },
    ],
  },

  {
    slug: 'familie',
    label: 'Familie & Kinder',
    accent: 'safari',
    description: 'Schule, Kita, Gesundheit, Freunde finden.',
    items: [
      {
        q: 'Welche Schule für unser Kind?',
        a: 'Drei Wege: Öffentliche Schulen (gute in wohlhabenden Gegenden sind stark nachgefragt), Private Schulen (15.000–80.000 ZAR/Term, je nach Renommee) oder die Deutsche Internationale Schule Kapstadt (DSK, 12.000–25.000 ZAR/Monat). Warteliste überall, früh anmelden.',
        link: { label: 'Auswandern mit Kind', to: '/blog/auswandern-mit-kind-suedafrika' },
      },
      {
        q: 'Wie finde ich einen Kinderarzt?',
        a: 'Netzwerk zählt. Frag im Medical-Aid-Broker-Gespräch, in lokalen Facebook-Gruppen (z.B. „German Parents Cape Town"), in der Schule/Kita. Gute Kinderärzte sind ausgebucht — schreib dich früh auf Wartelisten.',
      },
      {
        q: 'Wie integrieren sich die Kinder sprachlich?',
        a: 'In Kapstadt: Englisch ist Hauptsprache, Afrikaans oft als Zweitsprache in der Schule. Kinder unter 10 lernen das in 3–6 Monaten problemlos. Ab 10 wird es härter, aber machbar. Viele Familien halten zu Hause Deutsch aktiv (wichtig für Bilingualität).',
      },
      {
        q: 'Wie schnell finden wir Anschluss an andere Eltern?',
        a: 'Schule/Kita ist der Hauptkanal — Playdates, Abholzeiten, Geburtstagsfeiern. Deutsche Community gibt es (DSK-Events, deutschsprachige Kirche), aber auch der lokale Kreis kommt schnell. Rechne mit 3–6 Monaten, bis sich echte Freundschaften festigen.',
      },
    ],
  },
]

// Flat list of all FAQs for search indexing
export const allFAQs: Array<FAQItem & { category: string, categoryLabel: string }> =
  faqCategories.flatMap(c =>
    c.items.map(item => ({ ...item, category: c.slug, categoryLabel: c.label })),
  )

export const totalQuestions = allFAQs.length
export const totalCategories = faqCategories.length
