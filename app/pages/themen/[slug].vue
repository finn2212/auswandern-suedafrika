<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)
const path = computed(() => `/${locale.value}/themen/${slug.value}`)

const { data: page } = await useAsyncData(
  () => path.value,
  () => queryCollection('content').path(path.value).first(),
  { watch: [path] },
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Thema nicht gefunden', fatal: true })
}

// Articles in this topic (category = slug)
const { data: articles } = await useAsyncData(
  () => `topic-articles-${slug.value}-${locale.value}`,
  async () => {
    const all = await queryCollection('content').all()
    return all
      .filter(p =>
        p.path?.startsWith(`/${locale.value}/blog/`)
        && p.category === slug.value,
      )
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  },
  { watch: [slug, locale] },
)

const tocLinks = computed(() => (page.value as any)?.body?.toc?.links ?? [])

const pillarSchema = computed(() => {
  const p = page.value as any
  if (!p) return null
  const baseUrl = 'https://auswandern-südafrika.de'
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    image: p.image ? `${baseUrl}${p.image}` : undefined,
    author: {
      '@type': 'Organization',
      name: 'Laura & Finn',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'auswandern-südafrika.de',
      url: baseUrl,
    },
    inLanguage: locale.value === 'en' ? 'en-US' : 'de-DE',
  }
})

useHead(() => ({
  title: (page.value as any)?.title,
  meta: [
    { name: 'description', content: (page.value as any)?.description },
    { property: 'og:title', content: (page.value as any)?.title },
    { property: 'og:description', content: (page.value as any)?.description },
    { property: 'og:image', content: (page.value as any)?.image },
    { property: 'og:type', content: 'article' },
  ],
  link: [{ rel: 'canonical', href: `https://auswandern-südafrika.de/themen/${slug.value}` }],
  script: pillarSchema.value
    ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(pillarSchema.value) }]
    : [],
}))
</script>

<template>
  <div v-if="page">
    <ReadingProgress />
    <!-- HERO -->
    <section class="relative isolate">
      <div class="relative h-[55vh] min-h-[400px] w-full overflow-hidden bg-anthracite-dark">
        <img
          v-if="(page as any).image"
          :src="(page as any).image"
          :alt="(page as any).title"
          class="h-full w-full object-cover"
          fetchpriority="high"
        >
        <!-- Sun-haze blobs overlay for warmth -->
        <div class="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-gold/30 blur-3xl" />
        <div class="absolute -bottom-60 -left-40 h-[600px] w-[600px] rounded-full bg-terracotta/30 blur-3xl" />
        <!-- Gradient -->
        <div class="absolute inset-0 bg-gradient-to-b from-anthracite-dark/40 via-anthracite-dark/30 to-anthracite-dark/85" />

        <div class="absolute inset-x-0 bottom-0">
          <div class="mx-auto max-w-5xl px-4 pb-14 text-white">
            <Breadcrumbs
              class="text-white/80"
              :items="[
                { label: 'Start', to: localePath('/') },
                { label: 'Themen' },
                { label: (page as any).title },
              ]"
            />
            <p class="mt-6 text-xs font-semibold uppercase tracking-[0.4em] text-gold-light">
              Themenwelt
            </p>
            <h1 class="mt-3 text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
              {{ (page as any).title }}
            </h1>
            <p v-if="(page as any).description" class="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
              {{ (page as any).description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- BODY with TOC sidebar -->
    <section class="bg-warm-white py-16">
      <div class="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_280px]">
        <div class="prose prose-lg max-w-none prose-headings:text-anthracite prose-headings:font-bold prose-a:text-gold-dark hover:prose-a:text-terracotta prose-strong:text-anthracite prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:py-1 prose-blockquote:not-italic prose-img:rounded-xl">
          <ContentRenderer :value="page" />
        </div>
        <aside class="lg:sticky lg:top-24 lg:self-start">
          <ArticleTOC :links="tocLinks" />

          <div class="mt-8 hidden rounded-xl border border-gold/20 bg-gradient-to-br from-gold/5 to-terracotta/5 p-6 lg:block">
            <p class="text-xs font-semibold uppercase tracking-wider text-anthracite-light">
              Tiefer einsteigen
            </p>
            <p class="mt-2 text-sm text-anthracite">
              Unser Starter-Guide bündelt alle Themen als strukturierten Leitfaden mit Checklisten.
            </p>
            <NuxtLink
              :to="localePath('/produkte/starter-guide')"
              class="mt-4 inline-block rounded-md bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark"
            >
              Starter-Guide ansehen
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <!-- Articles in this topic -->
    <section v-if="articles && articles.length" class="bg-white px-4 py-20">
      <div class="mx-auto max-w-6xl">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
          Artikel zum Thema
        </p>
        <h2 class="mt-3 text-3xl font-bold text-anthracite sm:text-4xl">
          Alles, was wir zu diesem Thema geschrieben haben
        </h2>
        <p class="mt-3 max-w-2xl text-anthracite-light">
          {{ articles.length }} Artikel — aus unserer eigenen Erfahrung, mit konkreten Zahlen und ehrlichen Einschätzungen.
        </p>

        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard v-for="post in articles" :key="post.path" :post="post" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-br from-gold via-gold-dark to-terracotta px-4 py-20 text-center text-white">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold sm:text-4xl">
          Du brauchst einen konkreten Plan?
        </h2>
        <p class="mt-4 text-lg text-white/90">
          Unser Starter-Guide übersetzt dieses Thema und neun weitere in eine Schritt-für-Schritt-Anleitung mit Checklisten, Vorlagen und Videos.
        </p>
        <NuxtLink
          :to="localePath('/produkte/starter-guide')"
          class="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-terracotta-dark shadow-xl hover:shadow-2xl"
        >
          Starter-Guide entdecken →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
