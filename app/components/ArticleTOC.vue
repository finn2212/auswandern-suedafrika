<script setup lang="ts">
defineProps<{
  links: Array<{ id: string, depth: number, text: string }>
}>()

const openMobile = ref(false)
</script>

<template>
  <div v-if="links && links.length" class="text-sm">
    <!-- Desktop: persistent -->
    <div class="hidden lg:block">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-anthracite-light">
        Inhalt
      </p>
      <ol class="space-y-2 border-l border-gold/20 pl-4">
        <li v-for="link in links" :key="link.id" :class="link.depth > 2 ? 'pl-3' : ''">
          <a
            :href="`#${link.id}`"
            class="block text-anthracite-light transition-colors hover:text-gold"
          >
            {{ link.text }}
          </a>
        </li>
      </ol>
    </div>

    <!-- Mobile: collapsible -->
    <details
      class="rounded-lg border border-gold/20 bg-white p-4 lg:hidden"
      :open="openMobile"
      @toggle="openMobile = ($event.target as HTMLDetailsElement).open"
    >
      <summary class="cursor-pointer text-xs font-semibold uppercase tracking-wider text-anthracite-light">
        Inhalt anzeigen
      </summary>
      <ol class="mt-3 space-y-2 border-l border-gold/20 pl-4">
        <li v-for="link in links" :key="link.id" :class="link.depth > 2 ? 'pl-3' : ''">
          <a
            :href="`#${link.id}`"
            class="block text-anthracite-light transition-colors hover:text-gold"
            @click="openMobile = false"
          >
            {{ link.text }}
          </a>
        </li>
      </ol>
    </details>
  </div>
</template>
