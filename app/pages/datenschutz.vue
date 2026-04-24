<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('privacy.title') })
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-16">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
      Rechtliches
    </p>
    <h1 class="mt-3 text-4xl font-bold text-anthracite">{{ t('privacy.title') }}</h1>

    <div class="prose prose-lg mt-10 max-w-none prose-headings:text-anthracite prose-a:text-gold-dark hover:prose-a:text-terracotta">
      <p><strong>Stand:</strong> April 2026</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br>
        Laura Mustermann &amp; Finn Mustermann GbR<br>
        Musterstraße 1, 8001 Kapstadt, Südafrika<br>
        <em>(Kontaktdaten und Rechtsform werden vor Live-Gang ergänzt.)</em>
      </p>

      <h2>2. Allgemeines zum Datenschutz</h2>
      <p>
        Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Deine personenbezogenen
        Daten werden vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
        sowie dieser Datenschutzerklärung behandelt.
      </p>
      <p>
        Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten
        möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, E-Mail)
        erhoben werden, erfolgt dies stets auf freiwilliger Basis.
      </p>

      <h2>3. Hosting und Server-Log-Files</h2>
      <p>
        Unsere Website wird auf Servern der <strong>Hetzner Online GmbH</strong>, Industriestraße 25,
        91710 Gunzenhausen, Deutschland gehostet. Hetzner ist ein deutsches Unternehmen und
        bietet ausschließlich DSGVO-konformes Hosting innerhalb der Europäischen Union.
      </p>
      <p>
        Beim Aufruf unserer Seiten speichert unser Webserver automatisch Informationen in
        sogenannten <em>Server-Log-Files</em>, die dein Browser automatisch übermittelt:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse (gekürzt bzw. anonymisiert nach 7 Tagen)</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
        Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        am sicheren und störungsfreien Betrieb der Website). Die Logs werden nach maximal
        7 Tagen gelöscht.
      </p>

      <h2>4. Kontaktformular</h2>
      <p>
        Wenn du uns per Kontaktformular Anfragen zukommen lässt, werden deine Angaben aus dem
        Anfrageformular inklusive der von dir dort angegebenen Kontaktdaten (Name, E-Mail-Adresse,
        ggf. Betreff und Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von
        Anschlussfragen bei uns gespeichert.
      </p>
      <p>
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
        sofern deine Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
        vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
        Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns
        gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf deiner Einwilligung
        (Art. 6 Abs. 1 lit. a DSGVO).
      </p>
      <p>
        Die von dir im Kontaktformular eingegebenen Daten verbleiben bei uns, bis du uns zur
        Löschung aufforderst, deine Einwilligung zur Speicherung widerrufst oder der Zweck für
        die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung deiner Anfrage).
      </p>

      <h2>5. Cookies</h2>
      <p>
        Diese Website setzt ausschließlich <strong>technisch notwendige Cookies</strong>, die für den
        Betrieb der Seite erforderlich sind (Session-Cookies, Sprach-Auswahl). Diese Cookies
        werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert und sind ohne
        Einwilligung zulässig.
      </p>
      <p>
        Wir verwenden <strong>keine</strong> Tracking- oder Analyse-Cookies, kein Google Analytics,
        kein Facebook-Pixel und keine Werbenetzwerke. Die Seite lässt sich in ihrer
        grundlegenden Funktion auch mit deaktivierten Cookies nutzen.
      </p>

      <h2>6. Mitgliedsbereich (falls vorhanden)</h2>
      <p>
        Für einige Inhalte (digitale Produkte wie Starter-Guide und Playbook) kannst du ein
        kostenpflichtiges Nutzerkonto erstellen. Die dafür erhobenen Daten (Name, E-Mail,
        gewähltes Passwort in verschlüsselter Form) werden zur Vertragsabwicklung und
        Bereitstellung der erworbenen Inhalte verwendet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b
        DSGVO.
      </p>

      <h2>7. Zahlungsabwicklung</h2>
      <p>
        Für die Zahlungsabwicklung nutzen wir <strong>Stripe Payments Europe, Ltd.</strong>,
        Irland. Stripe verarbeitet deine Zahlungsdaten (Karten- oder Bankverbindung) in eigener
        Verantwortung. Wir selbst erhalten und speichern keine vollständigen Zahlungsdaten.
      </p>
      <p>
        Die Datenschutzerklärung von Stripe findest du unter
        <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener">https://stripe.com/de/privacy</a>.
      </p>

      <h2>8. E-Mail-Versand und Newsletter</h2>
      <p>
        Wenn du dich für unseren Newsletter anmeldest, verwenden wir die angegebene E-Mail zum
        Versand von Newslettern im Rahmen des Double-Opt-In-Verfahrens. Die Einwilligung kann
        jederzeit widerrufen werden. Für den technischen Versand nutzen wir <strong>Resend</strong>
        (Resend, Inc., USA — mit Standard-Vertragsklauseln nach Art. 46 DSGVO).
      </p>

      <h2>9. Eingebettete externe Inhalte</h2>
      <p>
        Unsere Seite enthält aktuell keine eingebetteten Inhalte Dritter (keine Videos,
        keine Social-Media-Widgets, keine externen Kartendienste). Sollten solche Einbindungen
        künftig hinzukommen, werden wir diese Datenschutzerklärung entsprechend aktualisieren.
      </p>

      <h2>10. Deine Rechte</h2>
      <p>Du hast jederzeit das Recht auf:</p>
      <ul>
        <li><strong>Auskunft</strong> (Art. 15 DSGVO) über die gespeicherten personenbezogenen Daten</li>
        <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
        <li><strong>Löschung</strong> der bei uns gespeicherten Daten (Art. 17 DSGVO), soweit keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen</li>
        <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
        <li><strong>Widerspruch</strong> gegen die Verarbeitung auf Basis von Art. 6 Abs. 1 lit. f DSGVO
          (Art. 21 DSGVO)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong>Beschwerde</strong> bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>

      <h2>11. SSL-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
        Inhalte eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du am
        <em>https://</em> in der Adresszeile deines Browsers.
      </p>

      <h2>12. Kontakt zum Datenschutz</h2>
      <p>
        Für Fragen zum Datenschutz oder zur Ausübung deiner Rechte schreib uns bitte über das
        <NuxtLink to="/kontakt">Kontaktformular</NuxtLink>. Wir antworten in der Regel innerhalb von
        48 Stunden.
      </p>

      <hr>

      <p class="text-sm text-anthracite-light">
        <strong>Hinweis:</strong> Diese Datenschutzerklärung ist eine DSGVO-konforme Standardfassung,
        angepasst an unseren konkreten Tech-Stack (Hetzner-Hosting, Stripe, Resend, keine
        Analytics). Sie sollte vor Live-Gang durch eine Fachperson geprüft werden.
      </p>
    </div>
  </section>
</template>
