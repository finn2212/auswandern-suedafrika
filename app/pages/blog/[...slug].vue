<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()

const slug = computed(() => (route.params.slug as string[]).join('/'))
const path = computed(() => `/${locale.value}/blog/${slug.value}`)

const { data: page } = await useAsyncData(
  () => path.value,
  () => queryCollection('content').path(path.value).first(),
  { watch: [path] },
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artikel nicht gefunden', fatal: true })
}

const reading = computed(() => useReadingTime((page.value as any)?.body))
const tocLinks = computed(() => (page.value as any)?.body?.toc?.links ?? [])
const category = computed(() => (page.value as any)?.category as string | undefined)

const formattedDate = computed(() => {
  const raw = (page.value as any)?.date
  if (!raw) return ''
  try {
    return new Date(raw).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return raw }
})

const fullUrl = computed(() => {
  const base = runtimeConfig.public.siteUrl ?? 'https://auswandern-südafrika.de'
  return `${base}${route.fullPath}`
})

const categoryLabel = computed(() => {
  if (!category.value) return ''
  const key = `home.topics.${category.value}.name`
  const translated = t(key)
  return translated === key ? category.value : translated
})

const articleSchema = computed(() => {
  const p = page.value as any
  if (!p) return null
  const baseUrl = 'https://auswandern-südafrika.de'
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    image: p.image ? `${baseUrl}${p.image}` : undefined,
    datePublished: p.date,
    dateModified: p.date,
    author: {
      '@type': 'Person',
      name: p.author ?? 'Laura & Finn',
      url: `${baseUrl}${localePath('/ueber-uns')}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'auswandern-südafrika.de',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${route.fullPath}`,
    },
    articleSection: p.category,
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
    { property: 'article:published_time', content: (page.value as any)?.date },
    { property: 'article:author', content: (page.value as any)?.author ?? 'Laura & Finn' },
    { property: 'article:section', content: (page.value as any)?.category },
  ],
  link: [{ rel: 'canonical', href: `https://auswandern-südafrika.de${route.fullPath}` }],
  script: articleSchema.value
    ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(articleSchema.value) }]
    : [],
}))
</script>

<template>
  <article v-if="page">
    <ReadingProgress target-selector="article" />
    <!-- HERO — full-bleed article image + overlay with meta -->
    <section class="relative isolate">
      <div class="relative h-[55vh] min-h-[360px] w-full overflow-hidden bg-anthracite-dark">
        <img
          v-if="(page as any).image"
          :src="(page as any).image"
          :alt="(page as any).title"
          class="h-full w-full object-cover"
          fetchpriority="high"
        >
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-anthracite-dark/30 via-anthracite-dark/50 to-anthracite-dark/90" />

        <div class="absolute inset-x-0 bottom-0">
          <div class="mx-auto max-w-4xl px-4 pb-14 text-white">
            <Breadcrumbs
              class="text-white/80"
              :items="[
                { label: 'Start', to: localePath('/') },
                { label: 'Blog', to: localePath('/blog') },
                ...(category ? [{ label: categoryLabel, to: localePath(`/blog/kategorie/${category}`) }] : []),
                { label: (page as any).title },
              ]"
            />
            <h1 class="mt-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {{ (page as any).title }}
            </h1>
            <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
              <NuxtLink
                v-if="category"
                :to="localePath(`/blog/kategorie/${category}`)"
                class="rounded bg-gold/90 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-anthracite-dark hover:bg-gold-light"
              >
                {{ categoryLabel }}
              </NuxtLink>
              <span v-if="formattedDate">{{ formattedDate }}</span>
              <span v-if="reading.minutes">· {{ reading.label }}</span>
              <span v-if="(page as any).author">· {{ (page as any).author }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BODY — two-column with sticky sidebar -->
    <section class="bg-warm-white py-14 sm:py-20">
      <div class="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_280px]">
        <!-- Main column -->
        <div>
          <p v-if="(page as any).description" class="border-l-4 border-gold pl-5 text-lg italic leading-relaxed text-anthracite-light sm:text-xl">
            {{ (page as any).description }}
          </p>

          <div class="prose prose-lg mt-10 max-w-none prose-headings:text-anthracite prose-headings:font-bold prose-a:text-gold-dark hover:prose-a:text-terracotta prose-strong:text-anthracite prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:py-1 prose-blockquote:not-italic prose-img:rounded-xl">
            <ContentRenderer :value="page" />
          </div>

          <!-- Share row at bottom of body -->
          <div class="mt-12 border-t border-gold/20 pt-8">
            <ShareButtons :url="fullUrl" :title="(page as any).title" />
          </div>

          <!-- Newsletter signup inline -->
          <div class="mt-10">
            <NewsletterForm compact />
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:sticky lg:top-24 lg:self-start">
          <ArticleTOC :links="tocLinks" />

          <div class="mt-8 hidden rounded-xl border border-gold/20 bg-white p-6 lg:block">
            <p class="text-xs font-semibold uppercase tracking-wider text-anthracite-light">
              Teilen
            </p>
            <ShareButtons class="mt-3" :url="fullUrl" :title="(page as any).title" />
          </div>

          <!-- Author card -->
          <div class="mt-8 hidden rounded-xl border border-gold/20 bg-gradient-to-br from-gold/5 to-terracotta/5 p-6 lg:block">
            <p class="text-xs font-semibold uppercase tracking-wider text-anthracite-light">
              Geschrieben von
            </p>
            <p class="mt-2 text-lg font-bold text-anthracite">Laura & Finn</p>
            <p class="mt-2 text-sm text-anthracite-light">
              Deutsche Auswanderer-Familie in Kapstadt — teilen alles, was sie gelernt haben, ehrlich und aus erster Hand.
            </p>
            <NuxtLink
              :to="localePath('/ueber-uns')"
              class="mt-4 inline-block text-sm text-gold hover:text-terracotta"
            >
              Mehr über uns →
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <!-- RELATED -->
    <section class="bg-white px-4 py-20">
      <RelatedArticles :category="category" :exclude-path="path" :limit="3" />
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-br from-gold via-gold-dark to-terracotta px-4 py-20 text-center text-white">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold sm:text-4xl">
          Du planst gerade selbst den Umzug?
        </h2>
        <p class="mt-4 text-lg text-white/90">
          Unser Starter-Guide bündelt alles, was wir wissen — Schritt für Schritt, mit Checklisten und Vorlagen.
        </p>
        <NuxtLink
          :to="localePath('/produkte/starter-guide')"
          class="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-terracotta-dark shadow-xl hover:shadow-2xl"
        >
          Starter-Guide ansehen →
        </NuxtLink>
      </div>
    </section>
  </article>
</template>
