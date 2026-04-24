<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('auth.login_title') })
</script>

<template>
  <section class="mx-auto max-w-md px-4 py-16">
    <h1 class="text-3xl font-bold text-anthracite">{{ t('auth.login_title') }}</h1>
    <p class="mt-4 rounded-lg border border-gold/20 bg-white p-6 text-sm text-anthracite-light">
      {{ t('auth.placeholder') }}
    </p>
  </section>
</template>
