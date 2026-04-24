# Replicate Image Prompts

Track every prompt used for asset generation here so regeneration with tweaks is possible later.

## Assets

### `public/images/hero/cape-town-golden-hour.{webp,jpg}`

- **Model:** `black-forest-labs/flux-1.1-pro-ultra`
- **Aspect:** 16:9 (native 2752×1536, ~4 MP)
- **Generated:** 2026-04-24
- **Prompt:**

  > Cinematic wide-angle photograph of Cape Town and Table Mountain at golden hour, warm sunset light on mountain slopes, Atlantic Ocean and Bloubergstrand beach in foreground with gentle waves, dramatic sky with soft wispy clouds turning pink and amber, editorial travel photography, Leica Q3 aesthetic, 35mm lens, shallow depth of field, muted warm color grading with hints of gold and terracotta, subtle atmospheric haze, no people, no text, photoreal, ultra high detail, sharp focus, magazine quality

- **Settings:** `raw: false`, `safety_tolerance: 2`, `output_format: jpg`
- **Post-processing:** Converted JPG → WebP at quality 85 via `cwebp` for ~4× smaller delivery (290 KB vs 1.2 MB, same resolution).
- **First version (superseded):** flux-1.1-pro at 1344×768 — not sharp enough on 4K displays.
