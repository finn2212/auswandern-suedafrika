<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="border-t border-gold/10 bg-white">
    <!-- Newsletter band -->
    <div class="border-b border-gold/10 bg-gradient-to-br from-warm-white via-gold/5 to-terracotta/5 px-4 py-12">
      <div class="mx-auto max-w-3xl">
        <NewsletterForm />
      </div>
    </div>

    <div class="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
      <div class="md:col-span-2">
        <p class="text-lg font-bold text-anthracite">
          auswandern-suedafrika<span class="text-gold">.de</span>
        </p>
        <p class="mt-3 max-w-sm text-sm text-anthracite-light">
          {{ t('footer.tagline') }}
        </p>
      </div>

      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-anthracite">
          {{ t('footer.explore') }}
        </p>
        <ul class="mt-3 space-y-2 text-sm text-anthracite-light">
          <li><NuxtLink :to="localePath('/blog')" class="hover:text-gold">{{ t('nav.blog') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/produkte')" class="hover:text-gold">{{ t('nav.products') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/ueber-uns')" class="hover:text-gold">{{ t('nav.about') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/faq')" class="hover:text-gold">{{ t('nav.faq') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/kontakt')" class="hover:text-gold">{{ t('nav.contact') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-anthracite">
          {{ t('footer.legal') }}
        </p>
        <ul class="mt-3 space-y-2 text-sm text-anthracite-light">
          <li><NuxtLink :to="localePath('/impressum')" class="hover:text-gold">{{ t('nav.imprint') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/datenschutz')" class="hover:text-gold">{{ t('nav.privacy') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/agb')" class="hover:text-gold">AGB</NuxtLink></li>
          <li><NuxtLink :to="localePath('/widerrufsbelehrung')" class="hover:text-gold">Widerruf</NuxtLink></li>
        </ul>
      </div>
    </div>

    <div class="mx-auto max-w-6xl border-t border-gold/10 px-4 py-6 text-center text-xs text-anthracite-light">
      © {{ new Date().getFullYear() }} Laura & Finn — auswandern-südafrika.de
    </div>
  </footer>
</template>
