<script setup lang="ts">
import { faqCategories, allFAQs, totalQuestions, totalCategories } from '~/lib/faq-data'
import type { FAQCategory } from '~/lib/faq-data'

const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: 'FAQ — Fragen & Antworten zum Auswandern nach Südafrika',
  meta: [
    { name: 'description', content: `${totalQuestions} ehrliche Antworten zu den häufigsten Fragen rund ums Auswandern nach Südafrika — von Visa über Steuern bis zum Container. Aus erster Hand.` },
  ],
  link: [{ rel: 'canonical', href: 'https://auswandern-südafrika.de/faq' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allFAQs.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }),
    },
  ],
})

// --- State ---
const query = ref('')
const activeCategory = ref<string>('all')
const searchInput = ref<HTMLInputElement | null>(null)
const openQuestions = ref(new Set<string>())

// --- Derived ---
const normalized = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const filteredCategories = computed<FAQCategory[]>(() => {
  const q = normalized(query.value.trim())
  const catFilter = activeCategory.value

  return faqCategories
    .filter(c => catFilter === 'all' || c.slug === catFilter)
    .map((c) => {
      if (!q) return c
      return {
        ...c,
        items: c.items.filter(item =>
          normalized(item.q).includes(q) || normalized(item.a).includes(q),
        ),
      }
    })
    .filter(c => c.items.length > 0)
})

const matchCount = computed(() =>
  filteredCategories.value.reduce((acc, c) => acc + c.items.length, 0),
)

// Auto-expand matching questions on search, auto-collapse on clear
watch(query, (q) => {
  if (q.trim()) {
    const keys = new Set<string>()
    for (const c of filteredCategories.value) {
      for (const item of c.items) keys.add(`${c.slug}::${item.q}`)
    }
    openQuestions.value = keys
  }
  else {
    openQuestions.value = new Set()
  }
})

// Cmd/Ctrl+K focuses search
const onKey = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchInput.value?.focus()
  }
  else if (e.key === 'Escape' && document.activeElement === searchInput.value) {
    query.value = ''
    searchInput.value?.blur()
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

// Accent class lookup
const accentBar: Record<FAQCategory['accent'], string> = {
  gold: 'bg-gradient-to-r from-gold via-gold-dark to-terracotta',
  terracotta: 'bg-gradient-to-r from-terracotta via-terracotta-dark to-anthracite',
  ocean: 'bg-gradient-to-r from-ocean via-ocean-dark to-anthracite',
  safari: 'bg-gradient-to-r from-safari via-safari-dark to-anthracite',
}
const accentText: Record<FAQCategory['accent'], string> = {
  gold: 'text-gold-dark',
  terracotta: 'text-terracotta-dark',
  ocean: 'text-ocean-dark',
  safari: 'text-safari-dark',
}
const accentDot: Record<FAQCategory['accent'], string> = {
  gold: 'bg-gold',
  terracotta: 'bg-terracotta',
  ocean: 'bg-ocean',
  safari: 'bg-safari',
}

const toggleQuestion = (key: string) => {
  if (openQuestions.value.has(key)) openQuestions.value.delete(key)
  else openQuestions.value.add(key)
  // Vue reactivity for Set: replace reference
  openQuestions.value = new Set(openQuestions.value)
}

const jumpToCategory = (slug: string) => {
  activeCategory.value = slug
  nextTick(() => {
    document.getElementById(`cat-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

const lastUpdated = new Date('2026-04-24').toLocaleDateString('de-DE', {
  year: 'numeric', month: 'long', day: 'numeric',
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative isolate overflow-hidden bg-gradient-to-br from-warm-white via-gold/5 to-terracotta/10 px-4 pb-20 pt-16 sm:pt-24">
      <!-- Sun-haze blobs -->
      <div class="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gold/20 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-terracotta/15 blur-3xl" />

      <div class="relative mx-auto max-w-4xl text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
          Fragen & Antworten
        </p>
        <h1 class="mt-4 text-4xl font-bold leading-tight text-anthracite sm:text-5xl md:text-6xl">
          {{ totalQuestions }} ehrliche Antworten,<br>
          <span class="bg-gradient-to-r from-gold to-terracotta bg-clip-text text-transparent">
            aus erster Hand.
          </span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-anthracite-light">
          Die Fragen, die uns am häufigsten gestellt werden — zu Visa, Steuern, Sicherheit, Schule, Umzug und allem dazwischen. Alles, was wir aus zwei Jahren Leben in Südafrika wissen.
        </p>

        <!-- Search -->
        <div class="mx-auto mt-10 max-w-2xl">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg class="h-5 w-5 text-anthracite-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.2-5.2M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              ref="searchInput"
              v-model="query"
              type="search"
              :placeholder="'Suche nach Stichwort — z.B. „Visa“, „Steuern“, „Medical Aid“'"
              class="w-full rounded-full border border-gold/30 bg-white py-4 pl-12 pr-20 text-base text-anthracite shadow-sm transition-all focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
            >
            <div class="pointer-events-none absolute inset-y-0 right-0 hidden items-center gap-1 pr-4 sm:flex">
              <kbd class="rounded border border-gold/30 bg-warm-white px-1.5 py-0.5 font-mono text-[0.65rem] text-anthracite-light">⌘</kbd>
              <kbd class="rounded border border-gold/30 bg-warm-white px-1.5 py-0.5 font-mono text-[0.65rem] text-anthracite-light">K</kbd>
            </div>
          </div>
          <p v-if="query.trim()" class="mt-3 text-sm text-anthracite-light">
            <span v-if="matchCount">{{ matchCount }} Treffer</span>
            <span v-else>Keine Treffer — formulier die Frage anders oder <button class="text-gold hover:text-terracotta" @click="query = ''">zeig mir alles</button>.</span>
          </p>
        </div>

        <!-- Meta stats -->
        <dl class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-anthracite-light">
          <div class="flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-gold" />
            <dt class="sr-only">Fragen</dt>
            <dd>{{ totalQuestions }} Fragen</dd>
          </div>
          <div class="flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-terracotta" />
            <dt class="sr-only">Themenbereiche</dt>
            <dd>{{ totalCategories }} Themenbereiche</dd>
          </div>
          <div class="flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-safari" />
            <dt class="sr-only">Stand</dt>
            <dd>Zuletzt aktualisiert: {{ lastUpdated }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- CATEGORY CHIPS (sticky) -->
    <div class="sticky top-16 z-30 border-y border-gold/15 bg-warm-white/95 backdrop-blur-md">
      <div class="mx-auto max-w-6xl overflow-x-auto px-4 py-3">
        <div class="flex items-center gap-2 whitespace-nowrap">
          <button
            type="button"
            class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            :class="activeCategory === 'all'
              ? 'bg-anthracite text-white'
              : 'border border-gold/30 bg-white text-anthracite hover:border-gold hover:bg-gold/5'"
            @click="activeCategory = 'all'"
          >
            Alle ({{ totalQuestions }})
          </button>
          <button
            v-for="c in faqCategories"
            :key="c.slug"
            type="button"
            class="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            :class="activeCategory === c.slug
              ? 'bg-anthracite text-white'
              : 'border border-gold/30 bg-white text-anthracite hover:border-gold hover:bg-gold/5'"
            @click="jumpToCategory(c.slug)"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="accentDot[c.accent]" />
            {{ c.label }}
            <span
              class="text-xs"
              :class="activeCategory === c.slug ? 'text-white/70' : 'text-anthracite-light'"
            >{{ c.items.length }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <section class="bg-white px-4 py-16">
      <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_260px]">
        <!-- Main -->
        <div class="space-y-14">
          <div
            v-for="c in filteredCategories"
            :id="`cat-${c.slug}`"
            :key="c.slug"
            class="scroll-mt-32"
          >
            <!-- Category header -->
            <div class="flex items-center gap-4">
              <div class="h-1 w-16 rounded-full" :class="accentBar[c.accent]" />
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider" :class="accentText[c.accent]">
                  {{ c.items.length }} {{ c.items.length === 1 ? 'Frage' : 'Fragen' }}
                </p>
                <h2 class="mt-1 text-2xl font-bold text-anthracite sm:text-3xl">
                  {{ c.label }}
                </h2>
              </div>
            </div>
            <p v-if="c.description" class="ml-20 mt-2 text-anthracite-light">
              {{ c.description }}
            </p>

            <!-- Items -->
            <ul class="mt-8 space-y-3">
              <li
                v-for="item in c.items"
                :key="item.q"
                class="overflow-hidden rounded-xl border border-gold/15 bg-warm-white transition-all hover:border-gold/40"
              >
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gold/5"
                  :aria-expanded="openQuestions.has(`${c.slug}::${item.q}`)"
                  @click="toggleQuestion(`${c.slug}::${item.q}`)"
                >
                  <span class="text-base font-semibold text-anthracite sm:text-lg">
                    {{ item.q }}
                  </span>
                  <svg
                    class="h-5 w-5 shrink-0 text-anthracite-light transition-transform"
                    :class="openQuestions.has(`${c.slug}::${item.q}`) && 'rotate-180'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  v-if="openQuestions.has(`${c.slug}::${item.q}`)"
                  class="border-t border-gold/10 bg-white px-5 py-5 text-anthracite"
                >
                  <p class="leading-relaxed">{{ item.a }}</p>
                  <NuxtLink
                    v-if="item.link"
                    :to="localePath(item.link.to)"
                    class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                    :class="accentText[c.accent]"
                  >
                    {{ item.link.label }}
                    <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
                    </svg>
                  </NuxtLink>
                </div>
              </li>
            </ul>
          </div>

          <div v-if="!filteredCategories.length" class="rounded-2xl border border-gold/20 bg-warm-white p-8 text-center">
            <p class="text-lg font-semibold text-anthracite">Nichts gefunden.</p>
            <p class="mt-2 text-anthracite-light">
              Versuch einen anderen Suchbegriff — oder
              <NuxtLink :to="localePath('/kontakt')" class="text-gold hover:text-terracotta">schreib uns direkt</NuxtLink>.
            </p>
          </div>
        </div>

        <!-- Sidebar: category navigation -->
        <aside class="hidden lg:block">
          <div class="sticky top-40">
            <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-anthracite-light">
              Springe zu
            </p>
            <ul class="space-y-1 border-l border-gold/20 pl-4 text-sm">
              <li v-for="c in faqCategories" :key="c.slug">
                <button
                  type="button"
                  class="flex w-full items-center gap-2 py-1.5 text-left transition-colors"
                  :class="activeCategory === c.slug ? accentText[c.accent] + ' font-semibold' : 'text-anthracite-light hover:text-anthracite'"
                  @click="jumpToCategory(c.slug)"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="accentDot[c.accent]" />
                  <span class="flex-1">{{ c.label }}</span>
                  <span class="font-mono text-xs opacity-60">{{ c.items.length }}</span>
                </button>
              </li>
            </ul>

            <!-- Contact CTA -->
            <div class="mt-10 rounded-xl border border-gold/20 bg-gradient-to-br from-gold/5 to-terracotta/5 p-5">
              <p class="text-xs font-semibold uppercase tracking-wider text-anthracite-light">
                Nicht das Richtige dabei?
              </p>
              <p class="mt-2 text-sm text-anthracite">
                Schreib uns direkt. Wir lesen jede E-Mail und antworten meist innerhalb von 48 Stunden.
              </p>
              <NuxtLink
                :to="localePath('/kontakt')"
                class="mt-4 inline-block rounded-md bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark"
              >
                Zum Kontakt
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bg-gradient-to-br from-gold via-gold-dark to-terracotta px-4 py-20 text-center text-white">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold sm:text-4xl">
          Du hast eine Frage, die nicht auf dieser Seite steht?
        </h2>
        <p class="mt-4 text-lg text-white/90">
          Wir aktualisieren die FAQ regelmäßig. Wenn dir eine wichtige Frage fehlt — sag uns Bescheid. Wir nehmen sie auf und antworten.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NuxtLink
            :to="localePath('/kontakt')"
            class="rounded-lg bg-white px-8 py-3 font-semibold text-terracotta-dark shadow-xl hover:shadow-2xl"
          >
            Frage an uns schicken
          </NuxtLink>
          <NuxtLink
            :to="localePath('/produkte/starter-guide')"
            class="rounded-lg border-2 border-white/40 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm hover:border-white hover:bg-white/20"
          >
            Starter-Guide ansehen
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
