<template>
  <section class="relative bg-gradient-to-br from-neutral-50 via-white to-roma-50 pt-28 pb-16 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><g fill-rule=%22evenodd%22><g fill=%22%23000000%22 fill-opacity=%220.1%22><polygon points=%2250,0 60,10 50,20%22/><polygon points=%2250,40 60,50 50,60%22/><polygon points=%220,50 10,60 0,70%22/><polygon points=%2210,0 20,10 10,20%22/></g></g></svg>')"></div>
    </div>

    <div class="container mx-auto px-4 py-8 relative">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Main Headline -->
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-roma-800 mb-6 animate-fade-in">
          {{ $t('hero.title') }}
          <span class="block text-2xl md:text-3xl lg:text-4xl text-roma-600 mt-2">
            {{ $t('hero.subtitle') }}
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-neutral-800 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
          {{ $t('hero.description') }}
        </p>

        <!-- Key Features -->
        <div class="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base">
          <span class="bg-white/90 px-4 py-2 rounded-full text-roma-700 font-medium shadow-sm border border-roma-100 flex items-center gap-2">
            <TrainIcon class="w-4 h-4" />
            <span>{{ $t('hero.features.station') }}</span>
          </span>
          <span class="bg-white/90 px-4 py-2 rounded-full text-roma-700 font-medium shadow-sm border border-roma-100 flex items-center gap-2">
            <TvIcon class="w-4 h-4" />
            <span>{{ $t('hero.features.streaming') }}</span>
          </span>
          <span class="bg-white/90 px-4 py-2 rounded-full text-roma-700 font-medium shadow-sm border border-roma-100 flex items-center gap-2">
            <CarIcon class="w-4 h-4" />
            <span>{{ $t('hero.features.parking') }}</span>
          </span>
        </div>

        <!-- CTA Button -->
        <div class="space-y-4">
          <a href="#contatti" class="btn-3d btn-3d-lg">
            {{ $t('hero.cta') }}
          </a>
          <p class="text-neutral-600 text-sm">
            <DollarSignIcon class="inline h-4 w-4 text-roma-gold-400 mr-1" />
            {{ $t('hero.guarantee') }}
          </p>
        </div>

        <!-- Trust Indicators -->
        <div class="mt-12 flex flex-wrap justify-center items-center gap-8 text-neutral-600">
          <div class="flex items-center space-x-2">
            <span class="text-roma-gold-400">⭐⭐⭐⭐⭐</span>
            <span class="text-sm">{{ $t('hero.trust.rating') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <HomeIcon class="w-4 h-4 text-roma-red-600" />
            <span class="text-sm">{{ $t('hero.trust.size') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <UsersIcon class="w-4 h-4 text-roma-gold-600" />
            <span class="text-sm">{{ $t('hero.trust.guests') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <div class="animate-bounce-gentle">
        <ChevronDownIcon class="w-6 h-6 text-roma-400" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { TrainIcon, TvIcon, CarIcon, HomeIcon, UsersIcon, ChevronDownIcon, DollarSignIcon } from 'lucide-vue-next'
</script>