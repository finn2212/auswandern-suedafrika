<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { pillars, hasPillar } = usePillars()

const topics = [
  { key: 'visa', num: '01' },
  { key: 'job', num: '02' },
  { key: 'auto', num: '03' },
  { key: 'immobilien', num: '04' },
  { key: 'anschluesse', num: '05' },
  { key: 'sicherheit', num: '06' },
  { key: 'steuern', num: '07' },
  { key: 'krankenversicherung', num: '08' },
  { key: 'umzug', num: '09' },
  { key: 'banking', num: '10' },
]

const topicLink = (slug: string) =>
  hasPillar(slug)
    ? localePath(`/themen/${slug}`)
    : localePath(`/blog/kategorie/${slug}`)

const { data: latestPosts } = await useAsyncData(
  () => `home-latest-${locale.value}`,
  async () => {
    const all = await queryCollection('content').all()
    return all
      .filter(p => p.path?.startsWith(`/${locale.value}/blog/`) && p.path !== `/${locale.value}/blog`)
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
      .slice(0, 3)
  },
  { watch: [locale] },
)

useHead({
  title: t('home.meta.title'),
  link: [
    { rel: 'preload', as: 'image', href: '/images/hero/cape-town-golden-hour.webp' },
  ],
})
</script>

<template>
  <div>
    <!-- HERO — Full-bleed image with Ken Burns, gradient overlay, large typography -->
    <section class="relative isolate overflow-hidden">
      <!-- Background image with Ken Burns drift -->
      <div class="absolute inset-0 -z-10">
        <img
          src="/images/hero/cape-town-golden-hour.webp"
          alt=""
          class="ken-burns h-full w-full object-cover"
          fetchpriority="high"
        >
        <!-- Gradient overlay — readable over image -->
        <div class="absolute inset-0 bg-gradient-to-b from-anthracite-dark/60 via-anthracite-dark/30 to-anthracite-dark/80" />
        <!-- Warm vignette corners -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,32,44,0.5)_100%)]" />
      </div>

      <div class="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-4 py-24 text-center text-white sm:min-h-[90vh]">
        <p class="fade-in-up text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold-light sm:text-xs" style="animation-delay:0.1s">
          {{ t('home.hero.eyebrow') }}
        </p>

        <h1
          class="fade-in-up mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style="animation-delay:0.3s"
        >
          {{ t('home.hero.title_prefix') }}<br>
          <span class="bg-gradient-to-r from-gold-light via-gold to-terracotta-light bg-clip-text text-transparent">
            {{ t('home.hero.title_highlight') }}
          </span>
        </h1>

        <p
          class="fade-in-up mt-8 max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl"
          style="animation-delay:0.6s"
        >
          {{ t('home.hero.subtitle') }}
        </p>

        <div
          class="fade-in-up mt-10 flex flex-col items-center gap-4 sm:flex-row"
          style="animation-delay:0.9s"
        >
          <NuxtLink
            :to="localePath('/produkte')"
            class="rounded-lg bg-gold px-8 py-4 text-base font-semibold text-white shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-gold/40 sm:text-lg"
          >
            {{ t('home.hero.cta_primary') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/blog')"
            class="rounded-lg border-2 border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/15 sm:text-lg"
          >
            {{ t('home.hero.cta_secondary') }}
          </NuxtLink>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-10 flex flex-col items-center gap-3 text-white/60">
          <span class="text-[0.65rem] uppercase tracking-[0.3em]">{{ t('home.hero.scroll') }}</span>
          <div class="h-10 w-px overflow-hidden bg-white/10">
            <div class="scroll-line h-full w-full bg-gold-light" />
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO / PROMISE — short editorial band after the hero -->
    <section class="bg-warm-white px-4 py-20 sm:py-24">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
          {{ t('home.promise.eyebrow') }}
        </p>
        <p class="mt-6 text-lg font-medium leading-relaxed text-anthracite sm:text-xl md:text-2xl">
          {{ t('home.promise.line1') }}
          <span class="font-semibold text-gold">{{ t('home.promise.highlight') }}</span>
          {{ t('home.promise.line2') }}
        </p>
      </div>
    </section>

    <!-- TOPICS — numbered 01-10, editorial 2-col grid with gold accent -->
    <section class="relative overflow-hidden bg-anthracite-dark px-4 py-24 text-white">
      <!-- Warm sun-haze blobs -->
      <div class="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold/20 blur-3xl" />
      <div class="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-terracotta/20 blur-3xl" />

      <div class="relative mx-auto max-w-6xl">
        <div class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            {{ t('home.topics.eyebrow') }}
          </p>
          <h2 class="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {{ t('home.topics.title') }}
          </h2>
          <p class="mt-6 text-lg text-white/70">
            {{ t('home.topics.subtitle') }}
          </p>
        </div>

        <div class="mt-16 grid gap-px bg-white/5 sm:grid-cols-2">
          <NuxtLink
            v-for="topic in topics"
            :key="topic.key"
            :to="topicLink(topic.key)"
            class="group relative flex gap-6 bg-anthracite-dark p-8 transition-colors hover:bg-anthracite lg:p-10"
          >
            <!-- Number column -->
            <div class="shrink-0">
              <span class="font-mono text-2xl font-light text-gold transition-all group-hover:text-gold-light">
                {{ topic.num }}
              </span>
            </div>
            <!-- Content -->
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-xl font-semibold transition-colors group-hover:text-gold-light sm:text-2xl">
                  {{ t(`home.topics.${topic.key}.name`) }}
                </h3>
                <span
                  v-if="hasPillar(topic.key)"
                  class="rounded bg-gold/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-gold-light"
                >
                  Deep Dive
                </span>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
                {{ t(`home.topics.${topic.key}.description`) }}
              </p>
              <span class="mt-4 inline-flex items-center gap-1 text-sm text-gold opacity-0 transition-opacity group-hover:opacity-100">
                {{ hasPillar(topic.key) ? t('home.topics.deep_dive_link') : t('home.topics.read_link') }} →
              </span>
            </div>
            <!-- Top gold accent bar on hover -->
            <span class="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold to-terracotta transition-transform duration-500 group-hover:scale-x-100" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- THEMEN-WELTEN — featured pillar pages -->
    <section class="bg-warm-white px-4 py-24">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-3xl">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            {{ t('home.worlds.eyebrow') }}
          </p>
          <h2 class="mt-4 text-4xl font-bold leading-tight text-anthracite sm:text-5xl">
            {{ t('home.worlds.title') }}
          </h2>
          <p class="mt-6 text-lg text-anthracite-light">
            {{ t('home.worlds.subtitle') }}
          </p>
        </div>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          <NuxtLink
            v-for="p in pillars"
            :key="p.slug"
            :to="localePath(`/themen/${p.slug}`)"
            class="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-xl"
          >
            <div class="aspect-[4/3] overflow-hidden bg-gold/5">
              <img
                :src="p.image"
                :alt="t(`home.topics.${p.slug}.name`)"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              >
            </div>
            <div class="flex flex-1 flex-col p-6">
              <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                {{ t('home.worlds.badge') }}
              </p>
              <h3 class="mt-2 text-2xl font-bold text-anthracite transition-colors group-hover:text-gold">
                {{ t(`home.topics.${p.slug}.name`) }}
              </h3>
              <p class="mt-3 flex-1 text-anthracite-light">
                {{ t(`home.worlds.pillars.${p.slug}`) }}
              </p>
              <span class="mt-6 inline-flex items-center gap-2 font-semibold text-gold">
                {{ t('home.worlds.cta') }}
                <span class="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
            <!-- Gold accent stripe -->
            <span class="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold to-terracotta transition-transform duration-500 group-hover:scale-x-100" />
          </NuxtLink>
        </div>

        <p class="mt-10 text-sm text-anthracite-light">
          {{ t('home.worlds.more_coming') }}
        </p>
      </div>
    </section>

    <!-- PERSONAL BAND — who we are, pulls to /ueber-uns -->
    <section class="bg-warm-white px-4 py-24">
      <div class="mx-auto grid max-w-6xl gap-12 md:grid-cols-5 md:items-center">
        <div class="md:col-span-3">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            {{ t('home.personal.eyebrow') }}
          </p>
          <h2 class="mt-4 text-3xl font-bold text-anthracite sm:text-4xl md:text-5xl">
            {{ t('home.personal.title') }}
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-anthracite-light">
            {{ t('home.personal.p1') }}
          </p>
          <p class="mt-4 text-lg leading-relaxed text-anthracite-light">
            {{ t('home.personal.p2') }}
          </p>
          <NuxtLink
            :to="localePath('/ueber-uns')"
            class="mt-8 inline-flex items-center gap-2 text-gold transition-colors hover:text-terracotta"
          >
            {{ t('home.personal.link') }}
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </NuxtLink>
        </div>

        <div class="relative md:col-span-2">
          <div class="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-gold/20 to-terracotta/20 p-1">
            <div class="h-full w-full rounded-xl bg-gradient-to-br from-gold/10 to-terracotta/10 p-8 text-center">
              <div class="flex h-full flex-col items-center justify-center">
                <p class="font-mono text-xs uppercase tracking-[0.3em] text-anthracite-light">
                  {{ t('home.personal.card.label') }}
                </p>
                <p class="mt-4 text-5xl font-bold text-anthracite">Laura<br>& Finn</p>
                <p class="mt-4 text-sm text-anthracite-light">
                  {{ t('home.personal.card.note') }}
                </p>
                <div class="mt-6 flex items-center gap-2 text-xs text-anthracite-light">
                  <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-safari" />
                  <span>{{ t('home.personal.card.status') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LATEST ARTICLES -->
    <section v-if="latestPosts && latestPosts.length" class="bg-white px-4 py-24">
      <div class="mx-auto max-w-6xl">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              {{ t('home.latest.eyebrow') }}
            </p>
            <h2 class="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
              {{ t('home.latest.title') }}
            </h2>
            <p class="mt-3 max-w-lg text-anthracite-light">
              {{ t('home.latest.subtitle') }}
            </p>
          </div>
          <NuxtLink :to="localePath('/blog')" class="hidden shrink-0 text-gold hover:text-gold-dark md:inline">
            {{ t('home.latest.all_link') }} →
          </NuxtLink>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <BlogCard v-for="post in latestPosts" :key="post.path" :post="post" />
        </div>

        <div class="mt-8 text-center md:hidden">
          <NuxtLink :to="localePath('/blog')" class="text-gold hover:text-gold-dark">
            {{ t('home.latest.all_link') }} →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="relative overflow-hidden bg-gradient-to-br from-gold via-gold-dark to-terracotta px-4 py-24 text-center text-white">
      <!-- Decorative sun-haze overlay -->
      <div class="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4)_0%,transparent_50%)]" />
      <div class="relative mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold sm:text-4xl md:text-5xl">{{ t('home.cta.title') }}</h2>
        <p class="mt-4 text-lg text-white/90 sm:text-xl">{{ t('home.cta.subtitle') }}</p>
        <NuxtLink
          :to="localePath('/produkte')"
          class="mt-10 inline-block rounded-lg bg-white px-10 py-4 text-lg font-semibold text-terracotta-dark shadow-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          {{ t('home.cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
