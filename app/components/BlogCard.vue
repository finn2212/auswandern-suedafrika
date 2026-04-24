<script setup lang="ts">
defineProps<{
  post: {
    path?: string
    title: string
    description?: string
    date?: string
    category?: string
    image?: string
  }
}>()

const formatDate = (iso?: string) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return iso
  }
}
</script>

<template>
  <NuxtLink
    :to="post.path ?? '#'"
    class="group block overflow-hidden rounded-xl border border-gold/20 bg-white shadow-sm transition-all hover:border-gold hover:shadow-md"
  >
    <div v-if="post.image" class="aspect-video overflow-hidden bg-gold/5">
      <img
        :src="post.image"
        :alt="post.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      >
    </div>
    <div class="p-6">
      <div class="flex items-center gap-3 text-xs text-anthracite-light">
        <span
          v-if="post.category"
          class="inline-block rounded bg-gold/10 px-2 py-0.5 font-medium uppercase tracking-wider text-gold-dark"
        >
          {{ post.category }}
        </span>
        <span v-if="post.date">{{ formatDate(post.date) }}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold text-anthracite group-hover:text-gold">
        {{ post.title }}
      </h3>
      <p v-if="post.description" class="mt-2 line-clamp-2 text-sm text-anthracite-light">
        {{ post.description }}
      </p>
    </div>
  </NuxtLink>
</template>
