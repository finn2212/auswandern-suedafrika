<script setup lang="ts">
const props = defineProps<{
  category?: string
  excludePath: string
  limit?: number
}>()

const { locale } = useI18n()
const limit = computed(() => props.limit ?? 3)

const { data: related } = await useAsyncData(
  () => `related-${props.excludePath}-${props.category ?? ''}-${locale.value}`,
  async () => {
    const all = await queryCollection('content').all()
    const pool = all.filter(p =>
      p.path?.startsWith(`/${locale.value}/blog/`)
      && p.path !== props.excludePath,
    )
    // Same-category first, then fallback to latest for fill
    const sameCat = pool.filter(p => p.category === props.category)
    const others = pool.filter(p => p.category !== props.category)
    const combined = [...sameCat, ...others]
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    return combined.slice(0, limit.value)
  },
  { watch: [() => props.excludePath, () => props.category, locale] },
)
</script>

<template>
  <div v-if="related && related.length">
    <div class="mx-auto max-w-6xl">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
        Weiterlesen
      </p>
      <h2 class="mt-3 text-3xl font-bold text-anthracite sm:text-4xl">
        Das könnte dich auch interessieren
      </h2>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <BlogCard v-for="post in related" :key="post.path" :post="post" />
      </div>
    </div>
  </div>
</template>
