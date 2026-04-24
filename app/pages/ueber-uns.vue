<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({ title: t('about.meta.title') })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-warm-white to-gold/10 px-4 py-20 text-center">
      <div class="mx-auto max-w-3xl">
        <h1 class="text-4xl font-bold leading-tight text-anthracite md:text-5xl">
          {{ t('about.hero.title') }}
        </h1>
        <p class="mt-6 text-lg text-anthracite-light md:text-xl">
          {{ t('about.hero.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Story -->
    <section class="mx-auto max-w-3xl px-4 py-16">
      <h2 class="text-3xl font-bold text-anthracite">{{ t('about.story.heading') }}</h2>
      <div class="mt-6 space-y-5 text-lg text-anthracite leading-relaxed">
        <p>{{ t('about.story.p1') }}</p>
        <p>{{ t('about.story.p2') }}</p>
        <p>{{ t('about.story.p3') }}</p>
      </div>
    </section>

    <!-- Mission + Werte -->
    <section class="bg-white px-4 py-16">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold text-anthracite">{{ t('about.mission.heading') }}</h2>
        <p class="mt-6 text-lg text-anthracite leading-relaxed">{{ t('about.mission.p1') }}</p>

        <h3 class="mt-12 text-xl font-semibold text-anthracite">{{ t('about.values.heading') }}</h3>
        <ul class="mt-6 space-y-4">
          <li
            v-for="key in ['v1', 'v2', 'v3', 'v4']"
            :key="key"
            class="flex gap-4 rounded-lg border border-gold/20 bg-warm-white p-4"
          >
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
              {{ key.slice(1) }}
            </span>
            <div>
              <p class="font-semibold text-anthracite">{{ t(`about.values.${key}.title`) }}</p>
              <p class="mt-1 text-sm text-anthracite-light">{{ t(`about.values.${key}.body`) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-gold to-terracotta px-4 py-16 text-center text-white">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold">{{ t('about.cta.title') }}</h2>
        <p class="mt-4 text-lg text-white/90">{{ t('about.cta.subtitle') }}</p>
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NuxtLink
            :to="localePath('/produkte')"
            class="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-gold shadow-lg transition-all hover:shadow-xl"
          >
            {{ t('about.cta.primary') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/blog')"
            class="rounded-lg border-2 border-white/40 px-8 py-3 text-lg font-semibold text-white transition-colors hover:border-white"
          >
            {{ t('about.cta.secondary') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
