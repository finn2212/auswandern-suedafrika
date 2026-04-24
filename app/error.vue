<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const localePath = useLocalePath()
const is404 = computed(() => props.error.statusCode === 404)

useHead({
  title: is404.value ? '404 — Seite nicht gefunden' : 'Ein Fehler ist aufgetreten',
  meta: [{ name: 'robots', content: 'noindex' }],
})

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-warm-white via-gold/5 to-terracotta/10">
    <div class="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gold/20 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-terracotta/15 blur-3xl" />

    <div class="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <p class="font-mono text-sm font-semibold uppercase tracking-[0.4em] text-gold-dark">
        Error {{ error.statusCode }}
      </p>
      <h1 class="mt-6 text-5xl font-bold leading-tight text-anthracite sm:text-6xl md:text-7xl">
        <span v-if="is404">Diese Seite ist</span>
        <span v-else>Etwas ist</span>
        <br>
        <span class="bg-gradient-to-r from-gold via-gold-dark to-terracotta bg-clip-text text-transparent">
          auf Reisen.
        </span>
      </h1>

      <p class="mx-auto mt-8 max-w-lg text-lg text-anthracite-light">
        <template v-if="is404">
          Die Seite, die du suchst, gibt es nicht (mehr). Vielleicht ist sie umgezogen — oder du folgst einem alten Link. Hier ein paar Wege zurück zur Strecke:
        </template>
        <template v-else>
          Das war unser Fehler, nicht deiner. Wir haben das Event geloggt. Probier's in ein paar Sekunden nochmal oder nimm einen der Wege unten.
        </template>
      </p>

      <div class="mt-10 grid w-full max-w-xl gap-3 sm:grid-cols-2">
        <NuxtLink
          :to="localePath('/')"
          class="group rounded-xl border border-gold/30 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
          @click.prevent="handleClear"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">Zurück auf Anfang</p>
          <p class="mt-1 font-semibold text-anthracite group-hover:text-gold">Startseite</p>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/blog')"
          class="group rounded-xl border border-gold/30 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">25+ Artikel</p>
          <p class="mt-1 font-semibold text-anthracite group-hover:text-gold">Blog durchstöbern</p>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/faq')"
          class="group rounded-xl border border-gold/30 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">52 Antworten</p>
          <p class="mt-1 font-semibold text-anthracite group-hover:text-gold">Zur FAQ</p>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/kontakt')"
          class="group rounded-xl border border-gold/30 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-gold-dark">Direkt an uns</p>
          <p class="mt-1 font-semibold text-anthracite group-hover:text-gold">Kontakt</p>
        </NuxtLink>
      </div>

      <p v-if="!is404 && error.message" class="mx-auto mt-10 max-w-lg rounded-lg border border-gold/20 bg-white/60 p-4 text-xs text-anthracite-light">
        <span class="font-semibold">Technische Info:</span> {{ error.message }}
      </p>
    </div>
  </div>
</template>
