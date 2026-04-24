#!/usr/bin/env bash
# Batch 2 — generate missing hero images for the 11 articles added after
# the first batch (10 deep-dives + FIP). Skips any file that already exists.

set -u

TOKEN="${REPLICATE_API_TOKEN:?REPLICATE_API_TOKEN env var not set}"
OUT="/Users/finnstolle/DEV/auswandern-suedafrika-nuxt/public/images/blog"
TMP="/tmp/blog-hero-gen-b2"

mkdir -p "$OUT" "$TMP"

STYLE='editorial travel photography, Leica Q3 aesthetic, 35mm lens, shallow depth of field, muted warm color grading with hints of gold and terracotta, subtle atmospheric haze, photoreal, high detail, magazine quality, no text'

declare -a JOBS=(
  "financial-independence-visa-suedafrika|Still-life of a leather-bound passport atop a stack of financial documents (bank statements, property deeds, investment certificates), a vintage fountain pen, a crystal paperweight, warm desk lamp light, mahogany wood, wealth-and-paperwork aesthetic, no people, ${STYLE}"
  "critical-skills-visa-suedafrika|Close-up of a South African work permit being stamped into an open passport, official blue ink stamp mid-impression, hands not visible, clean official government desk setting, document authenticity vibe, no people, ${STYLE}"
  "spousal-visa-suedafrika|Close-up of two simple wedding rings resting on top of a passport and a marriage certificate, soft window light from the side, warm wood surface, intimate editorial tone, no people visible, ${STYLE}"
  "remote-arbeiten-deutscher-arbeitgeber-sa|Person working on a laptop on a sunny balcony overlooking Cape Town, coffee cup, open notebook, palm tree shadow on the table, the laptop screen shows a generic videocall grid (no faces visible), warm afternoon light, ${STYLE}"
  "it-gehaelter-suedafrika|Flatlay on wooden desk — a laptop showing an anonymous salary spreadsheet with bar charts, South African rand notes spread beside, a coffee and pastry, warm light from a window on the right, overhead angle, no people, ${STYLE}"
  "fuehrerschein-umschreiben-suedafrika|Close-up of a German drivers license next to a South African drivers license card on a dark counter at a DLTC office, soft fluorescent overhead light, authentic bureaucratic atmosphere, no people, ${STYLE}"
  "kapstadt-stadtteil-guide-familien|Warm aerial panorama of a Cape Town residential neighborhood like Constantia or Newlands — tree-lined streets, pitched roofs, lush gardens, Table Mountain backdrop, golden hour haze, family suburb feel, no people visible, ${STYLE}"
  "sicherheit-mit-kind-suedafrika|Small child walking down a sunny tree-lined suburban Cape Town sidewalk holding a parents hand, back view, golden hour rim light, safe neighborhood feeling, protective-but-calm mood, warm rim light, ${STYLE}"
  "wegzugsteuer-gmbh-anteile-suedafrika|Close-up of a German share certificate (Aktie/GmbH-Anteil style document) on a dark desk, a fountain pen, a steel safe slightly out of focus in the background, moody low-key lighting, serious financial editorial tone, no people, ${STYLE}"
  "container-was-mitnehmen-was-verkaufen|Overhead flatlay of household items sorted into two piles on a wooden floor — one pile labeled mitnehmen with books, kitchen basics, framed photos; the other labeled verkaufen with an old toaster, chairs, decor — soft overhead daylight, conceptual editorial, no people, ${STYLE}"
  "afrikaans-oder-englisch-suedafrika|An open notebook on a cafe table with handwritten Afrikaans and English words side by side with translations, a cappuccino, a Cape Town book on the side, warm window light, intimate study vibe, no people, ${STYLE}"
)

generate_one() {
  local slug="$1"
  local prompt="$2"
  local out_webp="$OUT/${slug}.webp"

  if [ -f "$out_webp" ]; then
    echo "[$slug] already exists, skip"
    return 0
  fi

  echo "[$slug] starting…"

  local body
  body=$(PROMPT="$prompt" python3 -c "import json,os; print(json.dumps({'input':{'prompt':os.environ['PROMPT'],'aspect_ratio':'16:9','output_format':'jpg','safety_tolerance':2,'raw':False}}))")

  local resp
  resp=$(curl -s -X POST "https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro-ultra/predictions" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "$body")

  local id
  id=$(echo "$resp" | python3 -c "
import json,sys,re
c=re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',sys.stdin.buffer.read().decode('utf-8','replace'))
try:
    d=json.loads(c); print(d.get('id',''))
except Exception:
    pass
")

  if [ -z "$id" ]; then
    echo "[$slug] FAILED to create prediction: $resp"
    return 1
  fi

  for i in $(seq 1 60); do
    sleep 3
    local poll
    poll=$(curl -s "https://api.replicate.com/v1/predictions/$id" -H "Authorization: Bearer $TOKEN" | python3 -c "
import json,sys,re
c=re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',sys.stdin.buffer.read().decode('utf-8','replace'))
try:
    d=json.loads(c)
    o=d.get('output')
    print(f\"{d.get('status','')}|{o if isinstance(o,str) else (o[0] if o else '')}\")
except Exception:
    print('error|')
")
    local state="${poll%%|*}"
    local url="${poll#*|}"
    if [ "$state" = "succeeded" ]; then
      local tmpjpg="$TMP/${slug}.jpg"
      curl -sL "$url" -o "$tmpjpg"
      cwebp -q 85 -m 6 "$tmpjpg" -o "$out_webp" 2>/dev/null
      rm -f "$tmpjpg"
      echo "[$slug] ✓ $(ls -la "$out_webp" | awk '{print $5}')B"
      return 0
    elif [ "$state" = "failed" ] || [ "$state" = "canceled" ]; then
      echo "[$slug] ✗ $state"
      return 1
    fi
  done
  echo "[$slug] ✗ timeout"
  return 1
}

for job in "${JOBS[@]}"; do
  slug="${job%%|*}"
  prompt="${job#*|}"
  generate_one "$slug" "$prompt"
  sleep 8
done

echo
echo "=== Done. All images in $OUT: ==="
ls -la "$OUT"
