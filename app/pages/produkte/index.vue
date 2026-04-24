<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const products = [
  { slug: 'starter-guide', price: '49–79 €', ctaColor: 'gold' as const },
  { slug: 'playbook',      price: '197–397 €', ctaColor: 'terracotta' as const },
]

useHead({ title: t('products.title') })
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-16">
    <h1 class="text-center text-4xl font-bold text-anthracite">{{ t('products.title') }}</h1>
    <p class="mx-auto mt-4 max-w-2xl text-center text-anthracite-light">{{ t('products.intro') }}</p>

    <div class="mt-12 grid gap-8 md:grid-cols-2">
      <div
        v-for="p in products"
        :key="p.slug"
        class="rounded-xl border border-gold/20 bg-white p-8 shadow-sm"
      >
        <h2 class="text-2xl font-bold text-anthracite">{{ t(`products.${p.slug}.name`) }}</h2>
        <p class="mt-2 text-sm uppercase tracking-wider text-gold">{{ p.price }}</p>
        <p class="mt-4 text-anthracite-light">{{ t(`products.${p.slug}.description`) }}</p>
        <NuxtLink
          :to="localePath(`/produkte/${p.slug}`)"
          class="mt-6 inline-block rounded-lg px-6 py-2 font-semibold text-white transition-colors"
          :class="p.ctaColor === 'gold' ? 'bg-gold hover:bg-gold-dark' : 'bg-terracotta hover:bg-terracotta-dark'"
        >
          {{ t('products.cta') }}
        </NuxtLink>
      </div>
    </div>

    <p class="mt-12 text-center text-sm text-anthracite-light">{{ t('products.note') }}</p>
  </section>
</template>
