<script setup lang="ts">
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 800
}
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200"
    enter-from-class="opacity-0 translate-y-2"
    leave-active-class="transition-all duration-150"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-if="visible"
      type="button"
      class="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-white shadow-lg transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white"
      aria-label="Zum Seitenanfang"
      @click="scrollTop"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="m18 15-6-6-6 6" />
      </svg>
    </button>
  </Transition>
</template>
