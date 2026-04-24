<script setup lang="ts">
defineProps<{
  items: Array<{ label: string, to?: string }>
}>()
</script>

<template>
  <nav class="flex items-center gap-2 text-xs text-anthracite-light" aria-label="Breadcrumb">
    <template v-for="(item, idx) in items" :key="idx">
      <NuxtLink v-if="item.to && idx < items.length - 1" :to="item.to" class="transition-colors hover:text-gold">
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-anthracite">{{ item.label }}</span>
      <span v-if="idx < items.length - 1" aria-hidden="true" class="text-anthracite-light/50">/</span>
    </template>
  </nav>
</template>
