<script setup lang="ts">
interface Props {
  tone?: 'light' | 'dark'
}
const props = withDefaults(defineProps<Props>(), { tone: 'dark' })

const { locale, locales, setLocale, t } = useI18n()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

const items = computed(
  () => (locales.value as unknown as { code: string; name: string }[]),
)
const current = computed(() => items.value.find(l => l.code === locale.value))

const pick = async (code: string) => {
  open.value = false
  if (code !== locale.value) {
    await setLocale(code as 'de' | 'en')
  }
}

const onDocClick = (event: MouseEvent) => {
  if (!root.value) return
  if (!root.value.contains(event.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      :aria-label="t('nav.locale_label')"
      :aria-expanded="open"
      class="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors"
      :class="[
        tone === 'light'
          ? 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white/15'
          : 'text-anthracite-light hover:bg-gold/10 hover:text-anthracite',
      ]"
      @click="open = !open"
    >
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <circle cx="10" cy="10" r="7.25" />
        <path d="M2.75 10h14.5M10 2.75c2 2.2 3.1 4.8 3.1 7.25S12 15.05 10 17.25M10 2.75c-2 2.2-3.1 4.8-3.1 7.25S8 15.05 10 17.25" />
      </svg>
      <span class="font-semibold tracking-wide">{{ current?.code.toUpperCase() }}</span>
      <svg
        class="h-3 w-3 transition-transform"
        :class="open && 'rotate-180'"
        viewBox="0 0 12 12"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3.22 4.47a.75.75 0 0 1 1.06 0L6 6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0L3.22 5.53a.75.75 0 0 1 0-1.06Z" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="open"
        class="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-gold/15 bg-white py-1 shadow-xl ring-1 ring-black/5"
      >
        <button
          v-for="l in items"
          :key="l.code"
          type="button"
          class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors"
          :class="l.code === locale
            ? 'bg-gold/10 font-semibold text-anthracite'
            : 'text-anthracite-light hover:bg-gold/5 hover:text-anthracite'"
          @click="pick(l.code)"
        >
          <span>{{ l.name }}</span>
          <span class="font-mono text-xs opacity-60">{{ l.code.toUpperCase() }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>
