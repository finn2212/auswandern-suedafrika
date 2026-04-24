#!/usr/bin/env bash
# Generate 14 blog hero images via Replicate FLUX 1.1 Pro Ultra, convert to WebP.
# Intended to be run in the background from the project root.

set -u  # intentionally NOT -e: one failed image shouldn't abort the whole batch

TOKEN="${REPLICATE_API_TOKEN:?REPLICATE_API_TOKEN env var not set}"
OUT="/Users/finnstolle/DEV/auswandern-suedafrika-nuxt/public/images/blog"
TMP="/tmp/blog-hero-gen"

mkdir -p "$OUT" "$TMP"

STYLE='editorial travel photography, Leica Q3 aesthetic, 35mm lens, shallow depth of field, muted warm color grading with hints of gold and terracotta, subtle atmospheric haze, photoreal, high detail, magazine quality, no text'

declare -a JOBS=(
  "welches-visum-suedafrika|Close-up of an open passport on a wooden desk, faint South African visa stamp visible, soft warm window light, subtle bokeh, no people, ${STYLE}"
  "als-deutscher-in-suedafrika-arbeiten|Modern workspace with a MacBook open on a wooden desk, view through large window of Table Mountain in soft golden-hour haze, coffee mug beside, minimalist aesthetic, no people, ${STYLE}"
  "auto-kaufen-suedafrika|Dusty Toyota Hilux parked on a gravel road in Western Cape countryside, vineyards and mountains in background, late afternoon warm sunlight, lens flare, no people, ${STYLE}"
  "wo-in-suedafrika-wohnen|Aerial view of Cape Town neighbourhoods at dusk, Table Mountain rising in distance, city lights beginning to twinkle, warm golden ocean reflecting sunset, no people, ${STYLE}"
  "erste-14-tage-suedafrika|Moving boxes stacked in a sunlit empty apartment with large windows, a kettle on the counter, a single houseplant by the window, view of Cape Town rooftops outside, soft morning light, no people, ${STYLE}"
  "warum-wir-ausgewandert-sind|Wide landscape of Chapmans Peak Drive coastal road at sunset, winding road disappearing into distance, Atlantic Ocean glistening, sense of arrival, no people, ${STYLE}"
  "10-groesste-fehler-auswandern|Top-down flatlay of a worn leather journal on a wooden table, open to a handwritten bulleted list, a pen, a coffee cup, faded Cape Town postcard, warm tungsten light, no people, ${STYLE}"
  "wie-sicher-ist-suedafrika|Quiet upscale suburban street in Cape Town at golden hour, palm trees, jacaranda blossoms, an electric fence around a residential property understated, warm safe atmosphere, no people in frame, ${STYLE}"
  "steuerliche-abmeldung-deutschland|A stack of official German tax documents and a passport on a dark wooden desk, a fountain pen, an open laptop showing a spreadsheet, moody low-key lighting, no people, ${STYLE}"
  "discovery-vs-momentum-medical-aid|Stethoscope and a tablet showing health plan comparison charts on a clinic desk, soft natural window light, healthcare editorial aesthetic, blue and warm tones, no people, ${STYLE}"
  "container-nach-kapstadt-kosten|A 20-foot shipping container being unloaded at Cape Town harbour at dusk, Table Mountain looming in hazy background, dock workers silhouetted, dramatic editorial composition, ${STYLE}"
  "banking-fuer-deutsche-in-suedafrika|Close-up of South African rand banknotes and a silver credit card on a marble cafe table, a smartphone showing a blurred banking app, cortado coffee beside, warm afternoon light, no people, ${STYLE}"
  "auswandern-mit-kind-suedafrika|Family silhouette — two parents and a small child — standing at a Cape Town viewpoint looking out over the city and ocean at golden hour, child holding parents hand, warm backlit rim light, hopeful emotional tone, ${STYLE}"
  "suedafrika-vs-deutschland-lebenshaltung|Split-composition flatlay on wooden surface — left side has a German grocery receipt, euro coins, and a pretzel; right side has a South African grocery receipt, rand coins, and a rusk biscuit, shot from above, even lighting, conceptual editorial, no people, ${STYLE}"
)

parse_json_scrub() {
  python3 -c "
import json, sys, re
raw = sys.stdin.buffer.read().decode('utf-8', errors='replace')
cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', raw)
d = json.loads(cleaned)
field = '$1'
if field == 'id':
    print(d.get('id',''))
elif field == 'status_output':
    o = d.get('output')
    print(f\"{d.get('status','')}|{o if isinstance(o,str) else (o[0] if o else '')}\")
"
}

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
  body=$(python3 -c "import json,os; print(json.dumps({'input':{'prompt':os.environ['PROMPT'],'aspect_ratio':'16:9','output_format':'jpg','safety_tolerance':2,'raw':False}}))" PROMPT="$prompt" 2>/dev/null || PROMPT="$prompt" python3 -c "import json,os; print(json.dumps({'input':{'prompt':os.environ['PROMPT'],'aspect_ratio':'16:9','output_format':'jpg','safety_tolerance':2,'raw':False}}))")

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
echo "=== Done. Files in $OUT: ==="
ls -la "$OUT"
