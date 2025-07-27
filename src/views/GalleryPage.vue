<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100 flex flex-col">
    <TheHeader />
    <main class="flex-1 pt-20 md:pt-24 pb-4 flex items-center">
      <div class="w-full">
        <GallerySection />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import GallerySection from '../components/GallerySection.vue'
import TheFooter from '../components/TheFooter.vue'
</script>