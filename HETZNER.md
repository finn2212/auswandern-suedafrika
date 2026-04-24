# Hetzner Cloud Deployment

Runbook für das Ausrollen von `auswandern-suedafrika-nuxt` auf Hetzner Cloud.

**Stand:** April 2026
**Ziel-Stack:** Hetzner CAX11 (ARM, 4 GB RAM) oder CPX21 (3 vCPU, 4 GB RAM)
**Reverse-Proxy:** Caddy 2 (Auto-HTTPS via Let's Encrypt)
**App-Runtime:** Node 22, pnpm 9.15, systemd-Service
**Deploy-Strategie:** Git push → bare repo → post-receive hook → rebuild + restart

---

## 0 · Vorbereitungen (lokal)

Bevor irgendetwas in der Cloud passiert:

```bash
# SSH-Key für das Projekt
ssh-keygen -t ed25519 -f ~/.ssh/auswandern-suedafrika -C "auswandern-suedafrika deploy"
```

Den öffentlichen Schlüssel `~/.ssh/auswandern-suedafrika.pub` brauchst du gleich beim Server-Setup.

---

## 1 · Server provisionieren

### 1.1 Hetzner Cloud Konsole

- Einloggen auf <https://console.hetzner.cloud>
- Neues Projekt „auswandern-suedafrika" anlegen (oder zu bestehendem hinzufügen)
- **Neuen Server** erstellen:
  - Standort: **Falkenstein (fsn1)** — Deutschland, DSGVO-konform, niedrigste Latenz für DE-User
  - Image: **Ubuntu 24.04 LTS**
  - Typ: **CAX11** (ARM, 2 vCPU, 4 GB RAM, 40 GB SSD — ca. 4 €/Monat) für MVP; **CPX21** (3 vCPU x86, 4 GB, 80 GB — ca. 8 €/Monat) wenn mehr Leistung gebraucht wird
  - Netzwerke: IPv4 + IPv6
  - SSH-Keys: den `auswandern-suedafrika.pub` einbinden
  - Cloud-init / User Data: leer lassen (wir nutzen `scripts/setup-server.sh`)
  - Name: `auswandern-suedafrika-prod`
- Erstellen und IP notieren (nehmen wir hier mal `49.13.XX.XX`)

### 1.2 DNS konfigurieren

Bei deinem DNS-Provider (Cloudflare, Hetzner DNS, Netcup, …):

```
A       auswandern-südafrika.de          →  49.13.XX.XX
A       www.auswandern-südafrika.de      →  49.13.XX.XX
AAAA    auswandern-südafrika.de          →  <IPv6>
AAAA    www.auswandern-südafrika.de      →  <IPv6>
```

TTL auf 1h setzen, bis alles stabil läuft.

### 1.3 Ersten Login testen

```bash
ssh -i ~/.ssh/auswandern-suedafrika root@49.13.XX.XX
```

Direkt `passwd root` und `apt update && apt upgrade -y`.

---

## 2 · Server-Setup per Script

Das Grundgerüst legt unser Skript aus dem Repo an. Lokal:

```bash
scp -i ~/.ssh/auswandern-suedafrika scripts/setup-server.sh root@49.13.XX.XX:/root/
```

Dann auf dem Server:

```bash
ssh -i ~/.ssh/auswandern-suedafrika root@49.13.XX.XX
bash /root/setup-server.sh
```

Das Skript installiert:
- Node 22, pnpm 9.15, git, build-essential
- Caddy 2 (aus offiziellem Cloudsmith-Repo)
- UFW-Firewall (22/80/443 offen)
- Einen User `deploy` mit eigenem Verzeichnis `/var/www/auswandern-suedafrika`

Nach Skript-Ende:

```bash
id deploy                       # User angelegt
caddy version                   # Caddy v2.x
ufw status                      # active, 22/80/443 allow
node -v && pnpm -v              # Node 22, pnpm 9.15
```

---

## 3 · Systemd-Unit für den Nuxt-Server

Nuxt baut ein Nitro-Server-Bundle unter `.output/`. Das läuft persistent als systemd-Service.

Datei `/etc/systemd/system/auswandern-suedafrika.service` anlegen:

```ini
[Unit]
Description=Nuxt auswandern-südafrika.de
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/var/www/auswandern-suedafrika/current
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=127.0.0.1
EnvironmentFile=/var/www/auswandern-suedafrika/.env

[Install]
WantedBy=multi-user.target
```

Aktivieren:

```bash
systemctl daemon-reload
systemctl enable auswandern-suedafrika.service
# Noch nicht starten — es gibt noch kein current/ Verzeichnis
```

---

## 4 · Environment-Variablen

Datei `/var/www/auswandern-suedafrika/.env` (nur für User deploy lesbar):

```bash
# .env auf dem Server
NODE_ENV=production
NUXT_PUBLIC_SITE_URL=https://auswandern-südafrika.de

# Kontakt-Formular / Resend
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=hallo@auswandern-südafrika.de

# Später, wenn Stripe dazukommt
# STRIPE_SECRET_KEY=sk_live_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx
```

```bash
chown deploy:deploy /var/www/auswandern-suedafrika/.env
chmod 600 /var/www/auswandern-suedafrika/.env
```

---

## 5 · Caddyfile für Reverse-Proxy

Datei `/etc/caddy/Caddyfile` ersetzen:

```caddyfile
auswandern-südafrika.de, www.auswandern-südafrika.de {
    encode gzip zstd

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Referrer-Policy strict-origin-when-cross-origin
        Permissions-Policy "camera=(), microphone=(), geolocation=()"
    }

    # Cachable static assets
    @static path *.js *.css *.woff2 *.webp *.avif *.png *.jpg *.jpeg *.svg *.ico
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Nuxt app
    reverse_proxy 127.0.0.1:3000
}

# Redirect www.* → apex
www.auswandern-südafrika.de {
    redir https://auswandern-südafrika.de{uri} 308
}
```

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

Caddy holt automatisch ein Let's-Encrypt-Zertifikat — dauert ca. 30 Sekunden beim ersten Start.

---

## 6 · Git-Push-to-Deploy-Setup

### 6.1 Bare-Repo auf dem Server

```bash
sudo -u deploy -i
cd /home/deploy
git init --bare auswandern-suedafrika.git
```

### 6.2 Release-Verzeichnisse vorbereiten

```bash
mkdir -p /var/www/auswandern-suedafrika/{releases,shared}
ln -s /var/www/auswandern-suedafrika/releases/initial /var/www/auswandern-suedafrika/current
# Platzhalter — wird beim ersten Deploy überschrieben
```

### 6.3 post-receive Hook

Datei `/home/deploy/auswandern-suedafrika.git/hooks/post-receive`:

```bash
#!/usr/bin/env bash
set -euo pipefail

APP_ROOT=/var/www/auswandern-suedafrika
TS=$(date +%Y%m%d%H%M%S)
RELEASE=$APP_ROOT/releases/$TS

mkdir -p "$RELEASE"
git --work-tree="$RELEASE" --git-dir=/home/deploy/auswandern-suedafrika.git checkout -f main

cd "$RELEASE"
pnpm install --frozen-lockfile
pnpm build

# .env shared, also Symlink
ln -sfn "$APP_ROOT/.env" "$RELEASE/.env"

# current-Symlink switchen
ln -sfn "$RELEASE" "$APP_ROOT/current"

# Alte Releases (mehr als 5) löschen
cd "$APP_ROOT/releases"
ls -1t | tail -n +6 | xargs -r rm -rf

# Service neustarten
sudo -n systemctl restart auswandern-suedafrika.service

echo "✓ Deployed release $TS"
```

```bash
chmod +x /home/deploy/auswandern-suedafrika.git/hooks/post-receive
```

### 6.4 sudo-Rule für Service-Restart

`/etc/sudoers.d/deploy-restart` anlegen:

```
deploy ALL=NOPASSWD: /bin/systemctl restart auswandern-suedafrika.service
```

`chmod 0440 /etc/sudoers.d/deploy-restart`.

### 6.5 Lokal Remote einrichten

Zurück auf deinem Laptop:

```bash
cd ~/DEV/auswandern-suedafrika-nuxt
git remote add production deploy@49.13.XX.XX:auswandern-suedafrika.git
```

### 6.6 Erster Deploy

```bash
git push production main
```

Das sollte auf dem Server triggern:
1. Checkout nach `releases/<timestamp>/`
2. `pnpm install --frozen-lockfile`
3. `pnpm build` (baut `.output/`)
4. `current`-Symlink aktualisieren
5. Service restarten

Dauer beim ersten Mal: 3–5 Minuten (wegen erstem Dependency-Install).

---

## 7 · Smoke-Test

```bash
curl -I https://auswandern-südafrika.de
# HTTP/2 200 erwartet

curl https://auswandern-südafrika.de/ | grep -o "<title>[^<]*</title>"
# <title>Auswandern nach Südafrika — auswandern-südafrika.de</title>
```

Auf dem Server:

```bash
systemctl status auswandern-suedafrika
journalctl -u auswandern-suedafrika -f       # Live-Logs
```

---

## 8 · Monitoring (minimal)

### 8.1 Uptime via Hetzner oder extern

- Entweder Hetzner Monitoring (einfach, 30s-Intervall) aktivieren
- Oder kostenlos: [uptimerobot.com](https://uptimerobot.com/), 5-Minuten-Interval

### 8.2 Log-Rotation

systemd-journal kürzt automatisch. Für längere Logs aufheben:

```bash
mkdir -p /etc/systemd/journald.conf.d
cat > /etc/systemd/journald.conf.d/size.conf <<EOF
[Journal]
SystemMaxUse=500M
MaxRetentionSec=30day
EOF
systemctl restart systemd-journald
```

### 8.3 Disk-Space-Alert

Optional: `ncdu` installieren, ein Cron-Job der bei >80 % Disk-Auslastung eine E-Mail schickt. Für MVP nicht kritisch — Releases werden auf 5 beschränkt, Disk-Wachstum ist minimal.

---

## 9 · Backup-Strategie

### Was gesichert werden muss

| Quelle | Inhalt | Wie |
|--------|--------|-----|
| Git-Remote (GitHub, GitLab) | Kompletter Code | wöchentlicher Push vom Server als Backup-Remote |
| `.env` | Secrets | offline, verschlüsselt (password manager) |
| `content/` | Markdown-Artikel | Teil des Git-Repos — automatisch gesichert |
| `public/images/` | Generierte Bilder | Teil des Git-Repos |

Aktuell haben wir **keine Datenbank** (Nuxt Content nutzt SQLite, das beim Build regeneriert wird). Sobald User-Konten / Bestellungen dazukommen, wird PostgreSQL nötig — dann muss dieser Abschnitt erweitert werden um `pg_dump`-Cron.

### Hetzner Backups

Optional Hetzner-eigene Server-Backups aktivieren: 20 % Zusatzkosten, tägliche Snapshots mit 7-Tage-Retention. Für MVP-Phase nicht nötig (Git ist die Source of Truth), später empfohlen.

---

## 10 · Rollback-Strategie

Weil Releases in nummerierten Verzeichnissen liegen:

```bash
# auf dem Server
cd /var/www/auswandern-suedafrika/releases
ls -la                              # verfügbare Releases anzeigen
ln -sfn <previous-release-dir> /var/www/auswandern-suedafrika/current
sudo systemctl restart auswandern-suedafrika.service
```

Rollback-Zeit: ~10 Sekunden.

---

## 11 · Spätere Ergänzungen

Wenn diese Checkliste einmal durchgegangen ist, steht der Grundserver. Noch ausstehende Erweiterungen:

- **PostgreSQL** für User-Konten und Bestellungen (wenn Stripe live ist)
- **Redis** für Session-Storage und Rate-Limiting (falls wir skalieren)
- **S3-kompatibler Storage** für PDF-Exports / generierte Produkt-Downloads
- **CDN** für `public/images/*` (Cloudflare, Bunny) — lohnt sich ab >1k Visits/Tag
- **staging.auswandern-südafrika.de** als zweite Umgebung auf dem gleichen Server

---

## Kurz-Check: Bist du Launch-ready?

Vor dem Live-Schalten:

- [ ] DNS zeigt auf die richtige IP, TTL auf vernünftigen Wert (nicht 1 Minute)
- [ ] Caddy hat Zertifikat gezogen (`curl https://` → 200)
- [ ] systemd-Service läuft und restartet nach Server-Reboot (`systemctl is-enabled`)
- [ ] `.env` hat echte Production-Keys (RESEND, später STRIPE)
- [ ] Kontakt-Formular funktioniert (POST auf /api/contact → 200)
- [ ] Legacy-Redirects (falls wir umleiten müssen) im Caddyfile
- [ ] Impressum, Datenschutz, AGB sind mit **echten** Anschriften versehen, nicht mit Platzhaltern
- [ ] Letzte Git-Push-to-Deploy-Pipeline einmal vollständig durchgelaufen
- [ ] Monitoring eingerichtet
- [ ] Erstes manuelles Backup des kompletten Repos angelegt (inkl. `.env` offline)
