<script setup lang="ts">
// Inline newsletter signup. Until a dedicated Resend-Audiences workflow
// is wired up, this piggybacks on the /api/contact route with a fixed
// subject — simple but reliable.

const props = withDefaults(defineProps<{
  tone?: 'light' | 'dark'
  compact?: boolean
}>(), { tone: 'light', compact: false })

const email = ref('')
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMsg = ref('')

async function subscribe() {
  errorMsg.value = ''
  if (!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
    errorMsg.value = 'Bitte gib eine gültige E-Mail-Adresse an.'
    return
  }
  status.value = 'submitting'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: 'Newsletter-Interessent',
        email: email.value,
        subject: 'Newsletter-Anmeldung',
        message: `Bitte für den Newsletter eintragen: ${email.value}`,
      },
    })
    status.value = 'success'
    email.value = ''
  }
  catch (err: any) {
    status.value = 'error'
    errorMsg.value = err?.statusMessage ?? 'Leider ist etwas schiefgelaufen. Bitte später erneut versuchen.'
  }
}

const dark = computed(() => props.tone === 'dark')
</script>

<template>
  <div
    class="rounded-2xl border p-6 sm:p-8"
    :class="dark
      ? 'border-white/15 bg-anthracite-dark text-white'
      : 'border-gold/20 bg-gradient-to-br from-gold/5 to-terracotta/5 text-anthracite'"
  >
    <div v-if="status === 'success'">
      <p class="text-xs font-semibold uppercase tracking-wider" :class="dark ? 'text-gold-light' : 'text-gold-dark'">
        Notiert
      </p>
      <p class="mt-2 text-lg font-semibold" :class="dark ? 'text-white' : 'text-anthracite'">
        Danke, wir haben deine E-Mail aufgenommen.
      </p>
      <p class="mt-2 text-sm" :class="dark ? 'text-white/70' : 'text-anthracite-light'">
        Sobald der Newsletter startet, bekommst du eine Begrüßungsmail — bis dahin nichts. Keine Werbung, kein Spam, max. alle 2–3 Wochen ein Update.
      </p>
    </div>

    <div v-else>
      <p class="text-xs font-semibold uppercase tracking-wider" :class="dark ? 'text-gold-light' : 'text-gold-dark'">
        Newsletter
      </p>
      <p class="mt-2" :class="[dark ? 'text-white' : 'text-anthracite', compact ? 'text-base font-semibold' : 'text-xl font-semibold sm:text-2xl']">
        Alle 2–3 Wochen ein ehrliches Update aus Südafrika.
      </p>
      <p v-if="!compact" class="mt-3 text-sm" :class="dark ? 'text-white/70' : 'text-anthracite-light'">
        Was gerade passiert (Visa-Änderungen, Alltag, Bauchgefühle), plus neue Artikel und Frühbucher-Rabatte auf unsere Produkte. Abmelden per Klick.
      </p>

      <form class="mt-5 flex flex-col gap-2 sm:flex-row" @submit.prevent="subscribe">
        <input
          v-model="email"
          type="email"
          required
          placeholder="du@example.de"
          autocomplete="email"
          class="flex-1 rounded-lg border px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2"
          :class="dark
            ? 'border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-gold-light focus:ring-gold-light/30'
            : 'border-gold/30 bg-white text-anthracite placeholder-anthracite-light/60 focus:border-gold focus:ring-gold/30'"
        >
        <button
          type="submit"
          :disabled="status === 'submitting'"
          class="rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          :class="dark
            ? 'bg-gold text-anthracite-dark hover:bg-gold-light'
            : 'bg-gold text-white hover:bg-gold-dark'"
        >
          {{ status === 'submitting' ? 'Sende …' : 'Abonnieren' }}
        </button>
      </form>

      <p v-if="errorMsg" class="mt-3 text-sm" :class="dark ? 'text-terracotta-light' : 'text-terracotta-dark'">
        {{ errorMsg }}
      </p>

      <p v-if="!compact" class="mt-3 text-xs" :class="dark ? 'text-white/50' : 'text-anthracite-light/80'">
        Mit der Anmeldung akzeptierst du unsere
        <NuxtLink :to="'/datenschutz'" class="underline decoration-dotted underline-offset-2 hover:no-underline">Datenschutzerklärung</NuxtLink>.
      </p>
    </div>
  </div>
</template>
