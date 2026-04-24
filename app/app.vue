<script setup lang="ts">
// Dynamic <html lang="..."> and SEO alternate links driven by @nuxtjs/i18n.
const head = useLocaleHead({ seo: true })
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
    <Head>
      <template v-for="l in head.link" :key="`link-${l.id}`">
        <Link :id="l.id" :rel="l.rel" :href="l.href" :hreflang="l.hreflang" />
      </template>
      <template v-for="m in head.meta" :key="`meta-${m.id}`">
        <Meta :id="m.id" :property="m.property" :content="m.content" />
      </template>
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
