<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('products.starter-guide.name') })

const chapters = ['c1', 'c2', 'c3', 'c4', 'c5'] as const
const includes = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7'] as const
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-warm-white to-gold/10 px-4 py-20">
      <div class="mx-auto max-w-3xl">
        <span class="inline-block rounded bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-dark">
          {{ t('products.starter-guide.badge') }}
        </span>
        <h1 class="mt-4 text-4xl font-bold leading-tight text-anthracite md:text-5xl">
          {{ t('products.starter-guide.name') }}
        </h1>
        <p class="mt-6 text-xl text-anthracite-light">
          {{ t('products.starter-guide.tagline') }}
        </p>
        <div class="mt-8 flex items-baseline gap-4">
          <span class="text-4xl font-bold text-gold">49–79 €</span>
          <span class="text-sm text-anthracite-light">{{ t('products.once') }}</span>
        </div>
        <NuxtLink
          :to="localePath('/produkte/kaufen?produkt=starter-guide')"
          class="mt-8 inline-block rounded-lg bg-gold px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-gold-dark hover:shadow-xl"
        >
          {{ t('products.starter-guide.cta') }}
        </NuxtLink>
      </div>
    </section>

    <!-- Was enthalten -->
    <section class="mx-auto max-w-4xl px-4 py-16">
      <h2 class="text-3xl font-bold text-anthracite">{{ t('products.starter-guide.includes_heading') }}</h2>
      <ul class="mt-8 grid gap-4 sm:grid-cols-2">
        <li
          v-for="i in includes"
          :key="i"
          class="flex gap-3 rounded-lg border border-gold/20 bg-white p-4"
        >
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs text-white">✓</span>
          <span class="text-anthracite">{{ t(`products.starter-guide.includes.${i}`) }}</span>
        </li>
      </ul>
    </section>

    <!-- Kapitel -->
    <section class="bg-white px-4 py-16">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-3xl font-bold text-anthracite">{{ t('products.starter-guide.chapters_heading') }}</h2>
        <p class="mt-3 text-anthracite-light">{{ t('products.starter-guide.chapters_intro') }}</p>
        <ol class="mt-8 space-y-4">
          <li
            v-for="(c, idx) in chapters"
            :key="c"
            class="flex gap-4 rounded-lg border border-gold/20 bg-warm-white p-5"
          >
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
              {{ idx + 1 }}
            </span>
            <div>
              <p class="font-semibold text-anthracite">{{ t(`products.starter-guide.chapters.${c}.title`) }}</p>
              <p class="mt-1 text-sm text-anthracite-light">{{ t(`products.starter-guide.chapters.${c}.body`) }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Für wen ist das -->
    <section class="mx-auto max-w-3xl px-4 py-16">
      <h2 class="text-3xl font-bold text-anthracite">{{ t('products.starter-guide.for_whom_heading') }}</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="rounded-lg border border-safari/30 bg-safari/5 p-6">
          <p class="font-semibold text-safari-dark">✓ {{ t('products.starter-guide.for_whom.good.heading') }}</p>
          <p class="mt-2 text-sm text-anthracite">{{ t('products.starter-guide.for_whom.good.body') }}</p>
        </div>
        <div class="rounded-lg border border-terracotta/30 bg-terracotta/5 p-6">
          <p class="font-semibold text-terracotta-dark">✗ {{ t('products.starter-guide.for_whom.bad.heading') }}</p>
          <p class="mt-2 text-sm text-anthracite">{{ t('products.starter-guide.for_whom.bad.body') }}</p>
        </div>
      </div>
    </section>

    <!-- Upgrade-Hinweis -->
    <section class="bg-gradient-to-r from-gold to-terracotta px-4 py-16 text-center text-white">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold">{{ t('products.starter-guide.upgrade.title') }}</h2>
        <p class="mt-4 text-lg text-white/90">{{ t('products.starter-guide.upgrade.body') }}</p>
        <NuxtLink
          :to="localePath('/produkte/playbook')"
          class="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-gold shadow-lg transition-all hover:shadow-xl"
        >
          {{ t('products.starter-guide.upgrade.cta') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
