<template>
  <div class="flex min-h-screen flex-col">
    <AnnouncementBar />
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>
