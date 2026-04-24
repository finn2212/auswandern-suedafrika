#!/usr/bin/env bash
# One-time provisioning for auswandern-suedafrika-nuxt on a fresh Ubuntu 24.04 LTS Hetzner server.
# Run as root on the freshly provisioned server.

set -euo pipefail

echo "==> Updating system..."
apt update && apt upgrade -y
apt install -y curl ca-certificates git build-essential ufw

echo "==> Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

echo "==> Installing pnpm 9.15..."
npm install -g pnpm@9.15.4

echo "==> Installing Caddy..."
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy

echo "==> Creating deploy user..."
id -u deploy &>/dev/null || useradd -m -s /bin/bash deploy
mkdir -p /var/www/auswandern-suedafrika
chown deploy:deploy /var/www/auswandern-suedafrika

echo "==> Configuring firewall..."
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo
echo "==> Next steps (manual):"
echo "  1. Copy Caddyfile to /etc/caddy/Caddyfile and run: systemctl reload caddy"
echo "  2. Create a systemd unit /etc/systemd/system/auswandern-suedafrika.service"
echo "     that runs 'node /var/www/auswandern-suedafrika/.output/server/index.mjs'"
echo "  3. Set up a bare git repo + post-receive hook for push-to-deploy:"
echo "       git init --bare /home/deploy/auswandern-suedafrika.git"
echo "     then write the post-receive hook to checkout + pnpm install + pnpm build + systemctl restart"
echo "  4. Add your SSH key to /home/deploy/.ssh/authorized_keys"
echo "  5. Locally: git remote add production deploy@<server-ip>:auswandern-suedafrika.git"
echo
echo "==> Done."
