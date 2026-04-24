<script setup lang="ts">
// Thin progress bar at the top of the viewport that fills as the user
// scrolls through the referenced container (or the whole document).

const props = defineProps<{
  targetSelector?: string  // e.g. 'article' — defaults to whole document
}>()

const progress = ref(0)

function measure() {
  if (typeof document === 'undefined') return
  const target = props.targetSelector
    ? document.querySelector(props.targetSelector)
    : null

  if (target) {
    const rect = target.getBoundingClientRect()
    const articleTop = rect.top + window.scrollY
    const articleBottom = articleTop + rect.height
    const viewportBottom = window.scrollY + window.innerHeight
    const visible = Math.min(viewportBottom, articleBottom) - articleTop
    const total = Math.max(1, articleBottom - articleTop)
    progress.value = Math.max(0, Math.min(1, visible / total))
  }
  else {
    const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    progress.value = Math.max(0, Math.min(1, window.scrollY / total))
  }
}

let rafId = 0
function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    :aria-hidden="true"
  >
    <div
      class="h-full origin-left bg-gradient-to-r from-gold via-gold-dark to-terracotta transition-transform duration-150 ease-out"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
