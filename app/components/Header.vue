<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { hasPillar } = usePillars()

const { y: scrollY } = useWindowScroll()

const isHome = computed(() => {
  const name = typeof route.name === 'string' ? route.name.split('___')[0] : ''
  return name === 'index'
})

// Header is transparent on top of the home hero; solid on every other page
// and as soon as the user scrolls past the hero edge.
const solid = computed(() => !isHome.value || scrollY.value > 16)

// Desktop dropdown state
type DropdownId = 'topics' | 'products' | null
const activeDropdown = ref<DropdownId>(null)
let closeTimer: ReturnType<typeof setTimeout> | null = null
const openDropdown = (name: Exclude<DropdownId, null>) => {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  activeDropdown.value = name
}
const scheduleClose = () => {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = setTimeout(() => { activeDropdown.value = null }, 140)
}
const closeDropdownNow = () => {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  activeDropdown.value = null
}

// Mobile overlay
const mobileOpen = ref(false)

watch(() => route.fullPath, () => {
  mobileOpen.value = false
  closeDropdownNow()
})

watch(mobileOpen, (v) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = v ? 'hidden' : ''
})
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeDropdownNow()
    mobileOpen.value = false
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

// The 10 content pillars — order matches home-page topic grid, with the
// six that have a dedicated /themen/ pillar page surfaced first.
interface Topic { key: string; emoji: string }
const topics: Topic[] = [
  { key: 'visa', emoji: '🛂' },
  { key: 'job', emoji: '💼' },
  { key: 'immobilien', emoji: '🏡' },
  { key: 'sicherheit', emoji: '🛡️' },
  { key: 'steuern', emoji: '📊' },
  { key: 'umzug', emoji: '📦' },
  { key: 'auto', emoji: '🚗' },
  { key: 'anschluesse', emoji: '🔌' },
  { key: 'krankenversicherung', emoji: '⚕️' },
  { key: 'banking', emoji: '💳' },
]

const topicLink = (slug: string) =>
  hasPillar(slug) ? localePath(`/themen/${slug}`) : localePath(`/blog/kategorie/${slug}`)
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-colors duration-300"
    :class="solid
      ? 'border-b border-gold/15 bg-warm-white/92 shadow-[0_4px_24px_-12px_rgba(45,55,72,0.18)] backdrop-blur-md supports-[backdrop-filter]:bg-warm-white/80'
      : 'border-b border-transparent bg-gradient-to-b from-anthracite-dark/55 via-anthracite-dark/25 to-transparent'"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:py-4">
      <!-- Logo -->
      <NuxtLink
        :to="localePath('/')"
        class="group flex items-center gap-2.5"
        @click="closeDropdownNow"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-terracotta text-base font-bold text-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-105"
          aria-hidden="true"
        >AS</span>
        <span
          class="hidden text-base font-bold tracking-tight sm:inline"
          :class="solid ? 'text-anthracite' : 'text-white drop-shadow'"
        >
          auswandern-suedafrika<span :class="solid ? 'text-gold-dark' : 'text-gold-light'">.de</span>
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 lg:flex">
        <div
          class="relative"
          @mouseenter="openDropdown('topics')"
          @mouseleave="scheduleClose"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            :class="[
              solid ? 'text-anthracite hover:bg-gold/10' : 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white/15',
              activeDropdown === 'topics' && (solid ? 'bg-gold/10' : 'bg-white/10'),
            ]"
            :aria-expanded="activeDropdown === 'topics'"
            @click="activeDropdown === 'topics' ? closeDropdownNow() : openDropdown('topics')"
          >
            {{ t('nav.topics') }}
            <svg
              class="h-3.5 w-3.5 transition-transform"
              :class="activeDropdown === 'topics' && 'rotate-180'"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.22 4.47a.75.75 0 0 1 1.06 0L6 6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0L3.22 5.53a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>

        <NuxtLink
          :to="localePath('/blog')"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="solid ? 'text-anthracite hover:bg-gold/10' : 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white/15'"
        >
          {{ t('nav.blog') }}
        </NuxtLink>

        <div
          class="relative"
          @mouseenter="openDropdown('products')"
          @mouseleave="scheduleClose"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            :class="[
              solid ? 'text-anthracite hover:bg-gold/10' : 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white/15',
              activeDropdown === 'products' && (solid ? 'bg-gold/10' : 'bg-white/10'),
            ]"
            :aria-expanded="activeDropdown === 'products'"
            @click="activeDropdown === 'products' ? closeDropdownNow() : openDropdown('products')"
          >
            {{ t('nav.products') }}
            <svg
              class="h-3.5 w-3.5 transition-transform"
              :class="activeDropdown === 'products' && 'rotate-180'"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.22 4.47a.75.75 0 0 1 1.06 0L6 6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0L3.22 5.53a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>

        <NuxtLink
          :to="localePath('/ueber-uns')"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="solid ? 'text-anthracite hover:bg-gold/10' : 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white/15'"
        >
          {{ t('nav.about') }}
        </NuxtLink>

        <NuxtLink
          :to="localePath('/faq')"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="solid ? 'text-anthracite hover:bg-gold/10' : 'text-white [text-shadow:_0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white/15'"
        >
          {{ t('nav.faq') }}
        </NuxtLink>
      </nav>

      <!-- Right cluster -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <LocaleSwitcher :tone="solid ? 'dark' : 'light'" class="hidden sm:block" />

        <NuxtLink
          :to="localePath('/produkte/starter-guide')"
          class="hidden shrink-0 items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:inline-flex"
          :class="solid
            ? 'bg-gold text-white hover:bg-gold-dark'
            : 'bg-white/95 text-anthracite hover:bg-white'"
        >
          {{ t('nav.cta_starter') }}
          <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 transition-colors lg:hidden"
          :class="solid ? 'text-anthracite hover:bg-gold/10' : 'text-white hover:bg-white/10'"
          :aria-label="mobileOpen ? t('nav.menu_close') : t('nav.menu')"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Desktop mega panel: Themen -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-show="activeDropdown === 'topics'"
        class="absolute inset-x-0 top-full hidden lg:block"
        @mouseenter="openDropdown('topics')"
        @mouseleave="scheduleClose"
      >
        <div class="mx-auto max-w-7xl px-4 pb-6">
          <div class="overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-2xl ring-1 ring-black/5">
            <div class="grid gap-0 lg:grid-cols-[280px_1fr]">
              <div class="relative overflow-hidden bg-gradient-to-br from-anthracite-dark via-anthracite to-anthracite-dark p-8 text-white">
                <div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/25 blur-3xl" />
                <div class="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-terracotta/25 blur-3xl" />
                <div class="relative">
                  <p class="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-light">
                    {{ t('nav.mega.eyebrow') }}
                  </p>
                  <h3 class="mt-3 text-2xl font-bold leading-tight">
                    {{ t('nav.mega.title') }}
                  </h3>
                  <p class="mt-3 text-sm leading-relaxed text-white/70">
                    {{ t('nav.mega.subtitle') }}
                  </p>
                  <NuxtLink
                    :to="localePath('/blog')"
                    class="mt-6 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                    @click="closeDropdownNow"
                  >
                    {{ t('nav.mega.all_cta') }}
                    <svg class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>

              <div class="grid gap-px bg-gold/10 sm:grid-cols-2">
                <NuxtLink
                  v-for="topic in topics"
                  :key="topic.key"
                  :to="topicLink(topic.key)"
                  class="group flex items-start gap-3 bg-white p-4 transition-colors hover:bg-gold/5"
                  @click="closeDropdownNow"
                >
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gold/10 text-lg ring-1 ring-gold/15" aria-hidden="true">
                    {{ topic.emoji }}
                  </span>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-semibold text-anthracite transition-colors group-hover:text-gold-dark">
                        {{ t(`home.topics.${topic.key}.name`) }}
                      </span>
                      <span
                        v-if="hasPillar(topic.key)"
                        class="rounded-full bg-terracotta/10 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-terracotta-dark ring-1 ring-terracotta/20"
                      >
                        {{ t('nav.mega.pillar_badge') }}
                      </span>
                    </div>
                    <p class="mt-0.5 text-xs leading-snug text-anthracite-light">
                      {{ t(`home.topics.${topic.key}.description`) }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Desktop flyout: Produkte -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-show="activeDropdown === 'products'"
        class="absolute inset-x-0 top-full hidden lg:block"
        @mouseenter="openDropdown('products')"
        @mouseleave="scheduleClose"
      >
        <div class="mx-auto flex max-w-7xl justify-center px-4 pb-6">
          <div class="w-full max-w-2xl overflow-hidden rounded-2xl border border-gold/15 bg-white p-2 shadow-2xl ring-1 ring-black/5">
            <div class="grid gap-1 sm:grid-cols-2">
              <NuxtLink
                :to="localePath('/produkte/starter-guide')"
                class="group flex flex-col gap-2 rounded-xl p-4 transition-colors hover:bg-gold/5"
                @click="closeDropdownNow"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="rounded-full bg-gold/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-gold-dark">
                    {{ t('nav.products_menu.starter_tag') }}
                  </span>
                  <span class="text-xs font-semibold text-anthracite-light">
                    {{ t('nav.products_menu.starter_price') }}
                  </span>
                </div>
                <p class="text-base font-semibold text-anthracite transition-colors group-hover:text-gold-dark">
                  {{ t('products.starter-guide.name') }}
                </p>
                <p class="text-xs leading-snug text-anthracite-light">
                  {{ t('products.starter-guide.description') }}
                </p>
              </NuxtLink>

              <NuxtLink
                :to="localePath('/produkte/playbook')"
                class="group flex flex-col gap-2 rounded-xl p-4 transition-colors hover:bg-terracotta/5"
                @click="closeDropdownNow"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="rounded-full bg-terracotta/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-terracotta-dark">
                    {{ t('nav.products_menu.playbook_tag') }}
                  </span>
                  <span class="text-xs font-semibold text-anthracite-light">
                    {{ t('nav.products_menu.playbook_price') }}
                  </span>
                </div>
                <p class="text-base font-semibold text-anthracite transition-colors group-hover:text-terracotta-dark">
                  {{ t('products.playbook.name') }}
                </p>
                <p class="text-xs leading-snug text-anthracite-light">
                  {{ t('products.playbook.description') }}
                </p>
              </NuxtLink>
            </div>

            <NuxtLink
              :to="localePath('/produkte')"
              class="mt-1 flex items-center justify-between gap-2 rounded-xl border-t border-gold/10 px-4 py-3 text-xs font-semibold text-anthracite-light transition-colors hover:bg-gold/5 hover:text-anthracite"
              @click="closeDropdownNow"
            >
              <span class="inline-flex items-center gap-1.5">
                <svg class="h-3.5 w-3.5 text-gold-dark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M3 4.75A1.75 1.75 0 0 1 4.75 3h3.5A1.75 1.75 0 0 1 10 4.75v3.5A1.75 1.75 0 0 1 8.25 10h-3.5A1.75 1.75 0 0 1 3 8.25v-3.5ZM3 11.75A1.75 1.75 0 0 1 4.75 10h3.5A1.75 1.75 0 0 1 10 11.75v3.5A1.75 1.75 0 0 1 8.25 17h-3.5A1.75 1.75 0 0 1 3 15.25v-3.5ZM11.75 3A1.75 1.75 0 0 0 10 4.75v3.5A1.75 1.75 0 0 0 11.75 10h3.5A1.75 1.75 0 0 0 17 8.25v-3.5A1.75 1.75 0 0 0 15.25 3h-3.5ZM10 11.75A1.75 1.75 0 0 1 11.75 10h3.5A1.75 1.75 0 0 1 17 11.75v3.5A1.75 1.75 0 0 1 15.25 17h-3.5A1.75 1.75 0 0 1 10 15.25v-3.5Z" />
                </svg>
                {{ t('nav.products_menu.compare') }}
              </span>
              <span class="font-normal text-anthracite-light/80">
                {{ t('nav.products_menu.once') }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile overlay -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-50 flex flex-col bg-warm-white lg:hidden"
      >
        <div class="flex items-center justify-between border-b border-gold/15 px-4 py-3">
          <NuxtLink
            :to="localePath('/')"
            class="flex items-center gap-2.5"
            @click="mobileOpen = false"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-terracotta text-base font-bold text-white shadow-sm ring-1 ring-black/5">AS</span>
            <span class="text-base font-bold text-anthracite">
              auswandern-suedafrika<span class="text-gold-dark">.de</span>
            </span>
          </NuxtLink>
          <button
            type="button"
            class="rounded-md p-2 text-anthracite hover:bg-gold/10"
            :aria-label="t('nav.menu_close')"
            @click="mobileOpen = false"
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto px-4 py-6">
          <details class="group rounded-xl border border-gold/15 bg-white">
            <summary class="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-base font-semibold text-anthracite">
              <span>{{ t('nav.topics') }}</span>
              <svg class="h-4 w-4 text-anthracite-light transition-transform group-open:rotate-180" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M3.22 4.47a.75.75 0 0 1 1.06 0L6 6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0L3.22 5.53a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </summary>
            <div class="grid gap-px border-t border-gold/10 bg-gold/10">
              <NuxtLink
                v-for="topic in topics"
                :key="topic.key"
                :to="topicLink(topic.key)"
                class="flex items-center gap-3 bg-white px-4 py-3 text-sm text-anthracite hover:bg-gold/5"
                @click="mobileOpen = false"
              >
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold/10 text-base ring-1 ring-gold/15" aria-hidden="true">
                  {{ topic.emoji }}
                </span>
                <span class="flex-1 font-medium">{{ t(`home.topics.${topic.key}.name`) }}</span>
                <span
                  v-if="hasPillar(topic.key)"
                  class="rounded-full bg-terracotta/10 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-terracotta-dark"
                >
                  {{ t('nav.mega.pillar_badge') }}
                </span>
              </NuxtLink>
            </div>
          </details>

          <NuxtLink
            :to="localePath('/blog')"
            class="mt-2 block rounded-xl border border-gold/15 bg-white px-4 py-3 text-base font-semibold text-anthracite hover:bg-gold/5"
            @click="mobileOpen = false"
          >
            {{ t('nav.blog') }}
          </NuxtLink>

          <details class="group mt-2 rounded-xl border border-gold/15 bg-white">
            <summary class="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-base font-semibold text-anthracite">
              <span>{{ t('nav.products') }}</span>
              <svg class="h-4 w-4 text-anthracite-light transition-transform group-open:rotate-180" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M3.22 4.47a.75.75 0 0 1 1.06 0L6 6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0L3.22 5.53a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </summary>
            <div class="border-t border-gold/10">
              <NuxtLink
                :to="localePath('/produkte/starter-guide')"
                class="block px-4 py-3 hover:bg-gold/5"
                @click="mobileOpen = false"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-sm font-semibold text-anthracite">{{ t('products.starter-guide.name') }}</span>
                  <span class="text-xs font-semibold text-gold-dark">{{ t('nav.products_menu.starter_price') }}</span>
                </div>
                <p class="mt-1 text-xs text-anthracite-light">{{ t('nav.products_menu.starter_tag') }} · {{ t('nav.products_menu.once') }}</p>
              </NuxtLink>
              <NuxtLink
                :to="localePath('/produkte/playbook')"
                class="block border-t border-gold/10 px-4 py-3 hover:bg-terracotta/5"
                @click="mobileOpen = false"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-sm font-semibold text-anthracite">{{ t('products.playbook.name') }}</span>
                  <span class="text-xs font-semibold text-terracotta-dark">{{ t('nav.products_menu.playbook_price') }}</span>
                </div>
                <p class="mt-1 text-xs text-anthracite-light">{{ t('nav.products_menu.playbook_tag') }} · {{ t('nav.products_menu.once') }}</p>
              </NuxtLink>
            </div>
          </details>

          <NuxtLink
            :to="localePath('/ueber-uns')"
            class="mt-2 block rounded-xl border border-gold/15 bg-white px-4 py-3 text-base font-semibold text-anthracite hover:bg-gold/5"
            @click="mobileOpen = false"
          >
            {{ t('nav.about') }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/faq')"
            class="mt-2 block rounded-xl border border-gold/15 bg-white px-4 py-3 text-base font-semibold text-anthracite hover:bg-gold/5"
            @click="mobileOpen = false"
          >
            {{ t('nav.faq') }}
          </NuxtLink>
        </nav>

        <div class="border-t border-gold/15 bg-white px-4 py-4">
          <NuxtLink
            :to="localePath('/produkte/starter-guide')"
            class="flex items-center justify-center gap-1.5 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gold-dark"
            @click="mobileOpen = false"
          >
            {{ t('nav.cta_starter') }}
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
          <div class="mt-3 flex items-center justify-between">
            <NuxtLink
              :to="localePath('/login')"
              class="text-sm font-medium text-anthracite-light hover:text-anthracite"
              @click="mobileOpen = false"
            >
              {{ t('nav.login') }}
            </NuxtLink>
            <LocaleSwitcher tone="dark" />
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
