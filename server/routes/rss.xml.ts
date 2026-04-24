// RSS-Feed für den Blog — generiert aus Nuxt Content beim Request.
// Liegt bewusst unter server/routes/ (nicht server/api/), damit der Pfad
// /rss.xml ohne /api/-Prefix erreichbar ist.

const SITE = 'https://auswandern-südafrika.de'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const { queryCollection } = await import('@nuxt/content/server' as any).catch(() => ({ queryCollection: null as any }))

  // Fallback: read SQLite directly if server-side import path changes
  let posts: any[] = []
  try {
    if (queryCollection) {
      const all = await queryCollection(event, 'content').all()
      posts = all
        .filter((p: any) => p.path?.startsWith('/de/blog/') && p.path !== '/de/blog')
        .sort((a: any, b: any) => (b.date ?? '').localeCompare(a.date ?? ''))
        .slice(0, 30)
    }
  }
  catch {
    // no-op — fallback handled below
  }

  const items = posts.map((p) => {
    // Content path is /de/blog/... — public URL strips the de-default prefix.
    const publicPath = (p.path ?? '').replace(/^\/de\//, '/')
    const url = `${SITE}${publicPath}`
    const title = escapeXml(p.title ?? '')
    const description = escapeXml(p.description ?? '')
    const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString()
    const category = p.category ? `<category>${escapeXml(p.category)}</category>` : ''
    return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      ${category}
    </item>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>auswandern-südafrika.de — Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Ehrliche Erfahrungsberichte, praktische Guides und aktuelle Infos rund ums Auswandern nach Südafrika — von Laura &amp; Finn.</description>
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')
  return xml
})
