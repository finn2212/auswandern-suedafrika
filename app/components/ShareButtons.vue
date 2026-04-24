<script setup lang="ts">
const props = defineProps<{
  url: string
  title: string
}>()

const encoded = computed(() => ({
  url: encodeURIComponent(props.url),
  title: encodeURIComponent(props.title),
}))

const links = computed(() => [
  { label: 'Twitter / X', icon: 'X', href: `https://twitter.com/intent/tweet?url=${encoded.value.url}&text=${encoded.value.title}` },
  { label: 'LinkedIn',    icon: 'in', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.value.url}` },
  { label: 'Facebook',    icon: 'f',  href: `https://www.facebook.com/sharer.php?u=${encoded.value.url}` },
  { label: 'WhatsApp',    icon: 'W',  href: `https://wa.me/?text=${encoded.value.title}%20${encoded.value.url}` },
  { label: 'E-Mail',      icon: '✉',  href: `mailto:?subject=${encoded.value.title}&body=${encoded.value.url}` },
])

const copied = ref(false)
async function copyLink() {
  await navigator.clipboard.writeText(props.url)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <span class="mr-1 text-xs font-semibold uppercase tracking-wider text-anthracite-light">Teilen</span>
    <a
      v-for="l in links"
      :key="l.label"
      :href="l.href"
      :aria-label="l.label"
      target="_blank"
      rel="noopener noreferrer"
      class="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-white text-sm font-semibold text-anthracite transition-all hover:border-gold hover:bg-gold hover:text-white"
    >
      {{ l.icon }}
    </a>
    <button
      type="button"
      class="flex h-9 items-center gap-2 rounded-full border border-gold/30 bg-white px-3 text-xs font-medium text-anthracite transition-all hover:border-gold hover:bg-gold hover:text-white"
      @click="copyLink"
    >
      {{ copied ? '✓ kopiert' : 'Link kopieren' }}
    </button>
  </div>
</template>
