<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('blog.title') })

const { data: posts } = await useAsyncData(
  () => `blog-${locale.value}`,
  async () => {
    const all = await queryCollection('content').all()
    return all
      .filter(p => p.path?.startsWith(`/${locale.value}/blog/`) && p.path !== `/${locale.value}/blog`)
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  },
  { watch: [locale] },
)

const featured = computed(() => posts.value?.[0])
const rest = computed(() => posts.value?.slice(1) ?? [])

// Build category pill set (distinct categories present in posts)
const categories = computed(() => {
  const seen = new Set<string>()
  for (const p of posts.value ?? []) {
    if (p.category) seen.add(p.category)
  }
  return [...seen]
})
</script>

<template>
  <div>
    <!-- Intro header -->
    <section class="bg-gradient-to-br from-warm-white to-gold/10 px-4 py-20 sm:py-24">
      <div class="mx-auto max-w-4xl text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
          Blog
        </p>
        <h1 class="mt-4 text-4xl font-bold text-anthracite sm:text-5xl md:text-6xl">
          {{ t('blog.title') }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-anthracite-light sm:text-xl">
          {{ t('blog.intro') }}
        </p>

        <!-- Category pills -->
        <div v-if="categories.length" class="mt-10 flex flex-wrap justify-center gap-2">
          <NuxtLink
            v-for="cat in categories"
            :key="cat"
            :to="localePath(`/blog/kategorie/${cat}`)"
            class="rounded-full border border-gold/30 bg-white px-4 py-1.5 text-sm text-anthracite transition-all hover:border-gold hover:bg-gold hover:text-white"
          >
            {{ t(`home.topics.${cat}.name`) !== `home.topics.${cat}.name` ? t(`home.topics.${cat}.name`) : cat }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured article -->
    <section v-if="featured" class="bg-warm-white px-4 pb-8 pt-4">
      <div class="mx-auto max-w-6xl">
        <NuxtLink
          :to="featured.path"
          class="group grid gap-8 overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition-all hover:border-gold hover:shadow-xl lg:grid-cols-2"
        >
          <div class="aspect-[16/10] overflow-hidden bg-gold/5 lg:aspect-auto">
            <img
              v-if="featured.image"
              :src="featured.image"
              :alt="featured.title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
          </div>
          <div class="flex flex-col justify-center p-8 lg:p-12">
            <div class="flex items-center gap-3 text-xs">
              <span class="rounded bg-gold/10 px-2 py-0.5 font-semibold uppercase tracking-wider text-gold-dark">
                Neu
              </span>
              <span v-if="featured.category" class="text-anthracite-light uppercase tracking-wider">
                {{ t(`home.topics.${featured.category}.name`) !== `home.topics.${featured.category}.name` ? t(`home.topics.${featured.category}.name`) : featured.category }}
              </span>
            </div>
            <h2 class="mt-4 text-2xl font-bold text-anthracite transition-colors group-hover:text-gold sm:text-3xl md:text-4xl">
              {{ featured.title }}
            </h2>
            <p v-if="featured.description" class="mt-4 text-lg text-anthracite-light">
              {{ featured.description }}
            </p>
            <span class="mt-6 inline-flex items-center gap-2 font-medium text-gold">
              Artikel lesen
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Grid of the rest -->
    <section class="bg-white px-4 py-20">
      <div class="mx-auto max-w-6xl">
        <h2 v-if="rest.length" class="text-2xl font-bold text-anthracite">
          Alle Artikel
        </h2>

        <div v-if="rest.length" class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard v-for="post in rest" :key="post.path" :post="post" />
        </div>

        <p
          v-else-if="!posts || !posts.length"
          class="mt-12 rounded-lg border border-gold/20 bg-warm-white p-6 text-center text-anthracite-light"
        >
          {{ t('blog.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>
