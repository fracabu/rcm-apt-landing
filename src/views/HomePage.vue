<template>
  <div class="min-h-screen" style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 50%, rgba(152, 20, 43, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <TheHeader />
    <HeroSection />
    <ServicesPreview />
    <GalleryPreview />
    <ReviewsPreview />
    <ConcertiPreview />
    <MuseiPreview />
    <RestaurantsPreview />
    <ContactSection />
    <TheFooter />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import ServicesPreview from '../components/ServicesPreview.vue'
import GalleryPreview from '../components/GalleryPreview.vue'
import ReviewsPreview from '../components/ReviewsPreview.vue'
import ConcertiPreview from '../components/ConcertiPreview.vue'
import MuseiPreview from '../components/MuseiPreview.vue'
import RestaurantsPreview from '../components/RestaurantsPreview.vue'
import ContactSection from '../components/ContactSection.vue'
import TheFooter from '../components/TheFooter.vue'
import CookieBanner from '../components/CookieBanner.vue'
</script>