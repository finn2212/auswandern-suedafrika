<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()

const product = computed(() => {
  const p = (route.query.produkt ?? '').toString()
  if (p === 'playbook') return { key: 'playbook', label: 'Auswander-Playbook', price: '197–397 €' }
  return { key: 'starter-guide', label: 'Südafrika Starter-Guide', price: '49–79 €' }
})

useHead({
  title: `Kauf von ${product.value.label}`,
  meta: [
    { name: 'description', content: 'Der Kauf unserer digitalen Produkte wird gerade eingerichtet. Wir melden uns, sobald der Launch live ist.' },
    { name: 'robots', content: 'noindex' },
  ],
})

const email = ref('')
const submitted = ref(false)
const submitting = ref(false)
const errorMsg = ref('')

async function notifyMe() {
  errorMsg.value = ''
  submitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: 'Interessent',
        email: email.value,
        subject: `Launch-Benachrichtigung: ${product.value.label}`,
        message: `Bitte benachrichtigt mich, sobald das Produkt "${product.value.label}" (${product.value.price}) zum Kauf verfügbar ist.`,
      },
    })
    submitted.value = true
  }
  catch (err: any) {
    errorMsg.value = err?.statusMessage ?? 'Leider ist etwas schiefgelaufen. Bitte später erneut versuchen.'
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-2xl px-4 py-20 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
      Fast fertig
    </p>
    <h1 class="mt-4 text-4xl font-bold text-anthracite sm:text-5xl">
      Der Checkout ist gerade im Aufbau.
    </h1>
    <p class="mx-auto mt-6 max-w-xl text-lg text-anthracite-light">
      Du willst <strong class="text-anthracite">{{ product.label }}</strong> ({{ product.price }}) kaufen — danke für dein Interesse. Wir integrieren aktuell den Zahlungsanbieter und halten dich gern auf dem Laufenden.
    </p>

    <div class="mx-auto mt-10 max-w-md rounded-2xl border border-gold/20 bg-warm-white p-6 shadow-sm">
      <div v-if="submitted" class="py-4">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-safari/15">
          <svg class="h-6 w-6 text-safari" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <p class="mt-5 text-lg font-semibold text-anthracite">Notiert, danke.</p>
        <p class="mt-2 text-sm text-anthracite-light">
          Wir schreiben dir, sobald der Kauf möglich ist.
        </p>
      </div>
      <form v-else class="space-y-3" @submit.prevent="notifyMe">
        <label class="block text-left text-sm font-medium text-anthracite">
          Deine E-Mail
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="du@example.de"
            class="mt-1.5 w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-anthracite shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          >
        </label>
        <button
          type="submit"
          :disabled="submitting"
          class="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ submitting ? 'Wird gespeichert …' : 'Benachrichtige mich zum Launch' }}
        </button>
        <p v-if="errorMsg" class="text-sm text-terracotta-dark">{{ errorMsg }}</p>
        <p class="text-xs text-anthracite-light">
          Keine Newsletter, keine Werbung — nur eine einzige E-Mail, sobald es losgeht.
        </p>
      </form>
    </div>

    <div class="mx-auto mt-10 max-w-md text-sm text-anthracite-light">
      Oder schau dir in der Zwischenzeit unseren Blog an — dort stehen schon jetzt {{ '25+' }} ausführliche Artikel gratis.
      <NuxtLink :to="localePath('/blog')" class="block mt-2 text-gold hover:text-terracotta">
        Zum Blog →
      </NuxtLink>
    </div>
  </section>
</template>
