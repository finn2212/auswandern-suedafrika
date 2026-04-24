<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('contact.title') })

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '', // honeypot
})

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function submit() {
  errorMessage.value = ''
  status.value = 'submitting'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  }
  catch (err: any) {
    status.value = 'error'
    errorMessage.value = err?.statusMessage ?? err?.data?.statusMessage ?? 'Die Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen.'
  }
}
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative isolate overflow-hidden bg-gradient-to-br from-warm-white via-gold/5 to-terracotta/10 px-4 py-20">
      <div class="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gold/20 blur-3xl" />
      <div class="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-terracotta/15 blur-3xl" />

      <div class="relative mx-auto max-w-3xl text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
          Kontakt
        </p>
        <h1 class="mt-4 text-4xl font-bold leading-tight text-anthracite sm:text-5xl md:text-6xl">
          {{ t('contact.title') }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-anthracite-light">
          {{ t('contact.intro') }}
        </p>
      </div>
    </section>

    <!-- FORM -->
    <section class="bg-white px-4 py-16">
      <div class="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_320px]">
        <!-- Form card -->
        <div class="rounded-2xl border border-gold/20 bg-warm-white p-8 shadow-sm sm:p-10">
          <!-- Success -->
          <div v-if="status === 'success'" class="text-center">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-safari/15">
              <svg class="h-7 w-7 text-safari" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
              </svg>
            </div>
            <h2 class="mt-6 text-2xl font-bold text-anthracite">
              Danke, deine Nachricht ist angekommen.
            </h2>
            <p class="mt-3 text-anthracite-light">
              Wir lesen jede E-Mail und antworten meistens innerhalb von 48 Stunden. Falls es dringend ist, schreib uns direkt — alternative Kontaktwege findest du unten.
            </p>
            <button
              type="button"
              class="mt-6 text-sm text-gold hover:text-terracotta"
              @click="status = 'idle'"
            >
              Noch eine Nachricht schreiben
            </button>
          </div>

          <!-- Form -->
          <form v-else class="space-y-6" @submit.prevent="submit">
            <h2 class="text-2xl font-bold text-anthracite">Schreib uns</h2>
            <p class="text-sm text-anthracite-light">
              Die Felder mit <span class="text-terracotta">*</span> sind pflicht. Wir nutzen deine E-Mail nur, um dir zu antworten.
            </p>

            <div class="grid gap-5 sm:grid-cols-2">
              <label class="block">
                <span class="block text-sm font-medium text-anthracite">Name <span class="text-terracotta">*</span></span>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  minlength="2"
                  maxlength="120"
                  autocomplete="name"
                  class="mt-1.5 w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-anthracite shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                >
              </label>

              <label class="block">
                <span class="block text-sm font-medium text-anthracite">E-Mail <span class="text-terracotta">*</span></span>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  maxlength="200"
                  autocomplete="email"
                  class="mt-1.5 w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-anthracite shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                >
              </label>
            </div>

            <label class="block">
              <span class="block text-sm font-medium text-anthracite">Betreff</span>
              <input
                v-model="form.subject"
                type="text"
                maxlength="200"
                placeholder="Worum geht's?"
                class="mt-1.5 w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-anthracite shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              >
            </label>

            <label class="block">
              <span class="block text-sm font-medium text-anthracite">Nachricht <span class="text-terracotta">*</span></span>
              <textarea
                v-model="form.message"
                required
                minlength="10"
                maxlength="5000"
                rows="6"
                placeholder="Erzähl uns kurz, worum es geht. Je konkreter die Frage, desto besser können wir helfen."
                class="mt-1.5 w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-anthracite shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </label>

            <!-- Honeypot — hidden from users, visible to bots -->
            <label class="sr-only" aria-hidden="true">
              <span>Website (nicht ausfüllen)</span>
              <input v-model="form.website" type="text" tabindex="-1" autocomplete="off">
            </label>

            <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs text-anthracite-light">
                Mit dem Absenden stimmst du unserer
                <NuxtLink :to="localePath('/datenschutz')" class="text-gold hover:text-terracotta">Datenschutzerklärung</NuxtLink>
                zu.
              </p>
              <button
                type="submit"
                :disabled="status === 'submitting'"
                class="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span v-if="status === 'submitting'">Senden…</span>
                <span v-else>Nachricht senden</span>
                <svg v-if="status !== 'submitting'" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <p v-if="status === 'error'" class="rounded-lg border border-terracotta/30 bg-terracotta/5 px-4 py-3 text-sm text-terracotta-dark">
              {{ errorMessage }}
            </p>
          </form>
        </div>

        <!-- Side info -->
        <aside class="space-y-6">
          <div class="rounded-xl border border-gold/20 bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-anthracite-light">
              Erwartete Antwortzeit
            </p>
            <p class="mt-2 text-lg font-semibold text-anthracite">Meist unter 48 Stunden</p>
            <p class="mt-2 text-sm text-anthracite-light">
              Wir sind keine Firma mit Hotline. Wir sind Laura und Finn — also bitte etwas Geduld, wir lesen alles.
            </p>
          </div>

          <div class="rounded-xl border border-gold/20 bg-gradient-to-br from-gold/5 to-terracotta/5 p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-anthracite-light">
              Vielleicht reicht die FAQ?
            </p>
            <p class="mt-2 text-sm text-anthracite">
              Die häufigsten Fragen haben wir ausführlich beantwortet — von Visa-Typen bis Medical Aid.
            </p>
            <NuxtLink
              :to="localePath('/faq')"
              class="mt-4 inline-block text-sm font-semibold text-gold hover:text-terracotta"
            >
              Zur FAQ →
            </NuxtLink>
          </div>

          <div class="rounded-xl border border-gold/20 bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-anthracite-light">
              Für Presse & Medien
            </p>
            <p class="mt-2 text-sm text-anthracite">
              Nutze bitte „Presse" im Betreff — wir priorisieren Medienanfragen.
            </p>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
