<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100 flex flex-col">
    <TheHeader />
    <main class="flex-1 pt-24 md:pt-28 pb-8">
      <ContactSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import ContactSection from '../components/ContactSection.vue'
import TheFooter from '../components/TheFooter.vue'
</script>