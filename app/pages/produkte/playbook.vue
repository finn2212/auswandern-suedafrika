<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('products.playbook.name') })

const chapters = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'] as const
const bonuses = ['b1', 'b2', 'b3', 'b4', 'b5'] as const
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-anthracite to-terracotta-dark px-4 py-20 text-white">
      <div class="mx-auto max-w-3xl">
        <span class="inline-block rounded bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light">
          {{ t('products.playbook.badge') }}
        </span>
        <h1 class="mt-4 text-4xl font-bold leading-tight md:text-5xl">
          {{ t('products.playbook.name') }}
        </h1>
        <p class="mt-6 text-xl text-white/80">
          {{ t('products.playbook.tagline') }}
        </p>
        <div class="mt-8 flex items-baseline gap-4">
          <span class="text-4xl font-bold text-gold-light">197–397 €</span>
          <span class="text-sm text-white/70">{{ t('products.once') }}</span>
        </div>
        <NuxtLink
          :to="localePath('/produkte/kaufen?produkt=playbook')"
          class="mt-8 inline-block rounded-lg bg-gold px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-gold-light hover:shadow-xl"
        >
          {{ t('products.playbook.cta') }}
        </NuxtLink>
      </div>
    </section>

    <!-- Bonus (alles aus Starter + mehr) -->
    <section class="mx-auto max-w-4xl px-4 py-16">
      <h2 class="text-3xl font-bold text-anthracite">{{ t('products.playbook.bonus_heading') }}</h2>
      <p class="mt-3 text-anthracite-light">{{ t('products.playbook.bonus_intro') }}</p>
      <ul class="mt-8 grid gap-4 sm:grid-cols-2">
        <li
          v-for="b in bonuses"
          :key="b"
          class="flex gap-3 rounded-lg border border-terracotta/30 bg-terracotta/5 p-4"
        >
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs text-white">★</span>
          <span class="text-anthracite">{{ t(`products.playbook.bonus.${b}`) }}</span>
        </li>
      </ul>
    </section>

    <!-- 10 Kapitel -->
    <section class="bg-white px-4 py-16">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-3xl font-bold text-anthracite">{{ t('products.playbook.chapters_heading') }}</h2>
        <p class="mt-3 text-anthracite-light">{{ t('products.playbook.chapters_intro') }}</p>
        <ol class="mt-8 space-y-3">
          <li
            v-for="(c, idx) in chapters"
            :key="c"
            class="flex gap-4 rounded-lg border border-gold/20 bg-warm-white p-5"
          >
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-terracotta text-sm font-bold text-white">
              {{ idx + 1 }}
            </span>
            <div>
              <p class="font-semibold text-anthracite">{{ t(`products.playbook.chapters.${c}.title`) }}</p>
              <p class="mt-1 text-sm text-anthracite-light">{{ t(`products.playbook.chapters.${c}.body`) }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Für wen -->
    <section class="mx-auto max-w-3xl px-4 py-16">
      <h2 class="text-3xl font-bold text-anthracite">{{ t('products.playbook.for_whom_heading') }}</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="rounded-lg border border-safari/30 bg-safari/5 p-6">
          <p class="font-semibold text-safari-dark">✓ {{ t('products.playbook.for_whom.good.heading') }}</p>
          <p class="mt-2 text-sm text-anthracite">{{ t('products.playbook.for_whom.good.body') }}</p>
        </div>
        <div class="rounded-lg border border-terracotta/30 bg-terracotta/5 p-6">
          <p class="font-semibold text-terracotta-dark">✗ {{ t('products.playbook.for_whom.bad.heading') }}</p>
          <p class="mt-2 text-sm text-anthracite">{{ t('products.playbook.for_whom.bad.body') }}</p>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-gradient-to-r from-gold to-terracotta px-4 py-16 text-center text-white">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold">{{ t('products.playbook.final_cta.title') }}</h2>
        <p class="mt-4 text-lg text-white/90">{{ t('products.playbook.final_cta.body') }}</p>
        <NuxtLink
          :to="localePath('/produkte/kaufen?produkt=playbook')"
          class="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-terracotta-dark shadow-lg transition-all hover:shadow-xl"
        >
          {{ t('products.playbook.final_cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
