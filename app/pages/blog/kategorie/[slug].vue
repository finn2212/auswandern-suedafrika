<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)

const categoryLabel = computed(() => {
  const key = `home.topics.${slug.value}.name`
  const translated = t(key)
  return translated === key ? slug.value : translated
})

const { data: posts } = await useAsyncData(
  () => `cat-${slug.value}-${locale.value}`,
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

useHead({ title: `${categoryLabel.value} — Blog` })
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-16">
    <NuxtLink
      :to="localePath('/blog')"
      class="text-sm text-anthracite-light hover:text-gold"
    >
      ← {{ t('blog.back_to_all') }}
    </NuxtLink>

    <h1 class="mt-4 text-4xl font-bold text-anthracite">
      {{ categoryLabel }}
    </h1>
    <p class="mt-3 text-anthracite-light">
      {{ t('blog.category_intro', { category: categoryLabel }) }}
    </p>

    <div v-if="posts && posts.length" class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <p
      v-else
      class="mt-12 rounded-lg border border-gold/20 bg-white p-6 text-sm text-anthracite-light"
    >
      {{ t('blog.empty_category') }}
    </p>
  </section>
</template>
