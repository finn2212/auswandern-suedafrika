#!/usr/bin/env bash
# Batch 3 — hero images for the 5 articles added in the fill-thin-categories run.

set -u

TOKEN="${REPLICATE_API_TOKEN:?REPLICATE_API_TOKEN env var not set}"
OUT="/Users/finnstolle/DEV/auswandern-suedafrika-nuxt/public/images/blog"
TMP="/tmp/blog-hero-gen-b3"
mkdir -p "$OUT" "$TMP"

STYLE='editorial travel photography, Leica Q3 aesthetic, 35mm lens, shallow depth of field, muted warm color grading with hints of gold and terracotta, subtle atmospheric haze, photoreal, high detail, magazine quality, no text'

declare -a JOBS=(
  "loadshedding-setup-guide|A home office work desk lit only by a warm desk lamp during a Cape Town power outage — laptop open, small inverter/UPS unit beside it with indicator LEDs glowing, window showing a darkened suburban street at dusk, calm and focused atmosphere, no people, ${STYLE}"
  "schule-kita-kapstadt-anmeldung|A clipboard with a German Schul-Anmeldung form next to a small Cape Town schoolbag, coloured crayons, an apple, and a printed map of Cape Town suburbs on a warm wooden table, soft morning window light, no people, ${STYLE}"
  "trn-tax-reference-number-beantragen|Close-up flatlay of a SARS-style official South African tax document, a passport, a calculator, and a black pen on a dark mahogany desk, moody low-key lighting with a single warm window accent, bureaucratic editorial atmosphere, no people, ${STYLE}"
  "wise-setup-fuer-suedafrika|Close-up of a green Wise debit card on a marble cafe table next to a smartphone showing a banking app interface (blurred), cortado coffee cup in soft focus, South African Rand notes folded beside, warm afternoon window light, no people, ${STYLE}"
  "umzug-haustiere-suedafrika|An airline-approved pet transport crate with a cozy blanket inside, sitting on a Cape Town home floor next to packed moving boxes and a labeled pet passport, warm afternoon light streaming through a window, hopeful and caring atmosphere, no people, no animal visible inside, ${STYLE}"
)

generate_one() {
  local slug="$1"; local prompt="$2"
  local out_webp="$OUT/${slug}.webp"
  [ -f "$out_webp" ] && { echo "[$slug] exists, skip"; return 0; }

  echo "[$slug] starting…"
  local body
  body=$(PROMPT="$prompt" python3 -c "import json,os; print(json.dumps({'input':{'prompt':os.environ['PROMPT'],'aspect_ratio':'16:9','output_format':'jpg','safety_tolerance':2,'raw':False}}))")
  local resp
  resp=$(curl -s -X POST "https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro-ultra/predictions" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "$body")
  local id
  id=$(echo "$resp" | python3 -c "import json,sys,re; c=re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',sys.stdin.buffer.read().decode('utf-8','replace')); d=json.loads(c); print(d.get('id',''))")
  [ -z "$id" ] && { echo "[$slug] FAILED: $resp"; return 1; }

  for i in $(seq 1 60); do
    sleep 3
    local poll
    poll=$(curl -s "https://api.replicate.com/v1/predictions/$id" -H "Authorization: Bearer $TOKEN" | python3 -c "
import json,sys,re
c=re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',sys.stdin.buffer.read().decode('utf-8','replace'))
d=json.loads(c); o=d.get('output')
print(f\"{d.get('status','')}|{o if isinstance(o,str) else (o[0] if o else '')}\")
")
    local state="${poll%%|*}"; local url="${poll#*|}"
    if [ "$state" = "succeeded" ]; then
      local tmpjpg="$TMP/${slug}.jpg"
      curl -sL "$url" -o "$tmpjpg"
      cwebp -q 85 -m 6 "$tmpjpg" -o "$out_webp" 2>/dev/null
      rm -f "$tmpjpg"
      echo "[$slug] ✓"
      return 0
    elif [ "$state" = "failed" ] || [ "$state" = "canceled" ]; then
      echo "[$slug] ✗ $state"; return 1
    fi
  done
  echo "[$slug] ✗ timeout"; return 1
}

for job in "${JOBS[@]}"; do
  slug="${job%%|*}"; prompt="${job#*|}"
  generate_one "$slug" "$prompt"
  sleep 8
done

echo; echo "=== Done ==="; ls -la "$OUT" | tail -10
