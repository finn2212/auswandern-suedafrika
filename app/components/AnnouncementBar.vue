<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const ANNOUNCEMENT_KEY = 'as-announce-2026-04'
const dismissed = ref(false)

onMounted(() => {
  try {
    dismissed.value = window.localStorage.getItem(ANNOUNCEMENT_KEY) === '1'
  }
  catch {
    /* private mode — keep visible */
  }
})

const dismiss = () => {
  dismissed.value = true
  try {
    window.localStorage.setItem(ANNOUNCEMENT_KEY, '1')
  }
  catch {
    /* ignore storage errors (private mode) */
  }
}
</script>

<template>
  <ClientOnly>
    <div
      v-if="!dismissed"
      class="relative isolate overflow-hidden bg-anthracite-dark text-white"
    >
    <!-- Warm gold glow backdrop -->
    <div class="pointer-events-none absolute -right-24 top-1/2 h-40 w-80 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl" />
    <div class="pointer-events-none absolute -left-32 top-1/2 h-40 w-80 -translate-y-1/2 rounded-full bg-terracotta/20 blur-3xl" />

    <div class="relative mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-sm sm:py-2.5">
      <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-light ring-1 ring-gold/30">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
        {{ t('announcement.badge') }}
      </span>

      <p class="min-w-0 flex-1 truncate text-white/90">
        {{ t('announcement.message') }}
      </p>

      <NuxtLink
        :to="localePath('/themen/sicherheit')"
        class="hidden shrink-0 items-center gap-1 rounded-md px-2 py-1 font-semibold text-gold-light transition-colors hover:bg-white/5 hover:text-gold sm:inline-flex"
      >
        {{ t('announcement.cta') }}
        <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
        </svg>
      </NuxtLink>

      <button
        type="button"
        :aria-label="t('announcement.dismiss')"
        class="shrink-0 rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        @click="dismiss"
      >
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    </div>
    </div>
  </ClientOnly>
</template>
