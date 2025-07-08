<template>
  <div class="min-h-screen">
    <TheHeader />
    <HeroSection />
    <ServicesSection />
    <GallerySection />
    <ReviewsSection />
    <ContactSection />
    <TheFooter />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import GallerySection from '../components/GallerySection.vue'
import ReviewsSection from '../components/ReviewsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import TheFooter from '../components/TheFooter.vue'
import CookieBanner from '../components/CookieBanner.vue'
</script>