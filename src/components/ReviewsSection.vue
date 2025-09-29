<template>
  <section id="recensioni" class="py-16 bg-neutral-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-roma-700 mb-4">
          {{ $t('reviews.title') }}
        </h2>
        <p class="text-neutral-600 max-w-2xl mx-auto">
          {{ $t('reviews.subtitle') }}
        </p>
      </div>

      <!-- Reviews Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div 
          v-for="review in reviews" 
          :key="review.id"
          class="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-roma-100/30"
          :class="review.featured ? 'md:col-span-2 lg:col-span-1' : ''"
        >
          <!-- Header with name and rating -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <div class="font-semibold text-roma-600">{{ review.name }}</div>
              <span class="text-xs bg-roma-100 text-roma-700 px-2 py-1 rounded-full">{{ $t(`reviews.countries.${review.country}`) }}</span>
            </div>
            <div class="flex">
              <span v-for="star in Math.floor(review.rating)" :key="star" class="text-roma-gold-400 text-sm">⭐</span>
            </div>
          </div>

          <!-- Trip details -->
          <div class="text-xs text-neutral-500 mb-3">
            {{ review.date }} · {{ review.nights }} {{ $t('reviews.nights') }} · {{ $t(`reviews.trip_types.${review.type.toLowerCase()}`) }}
          </div>
          
          <!-- Rating score -->
          <div class="text-sm font-bold text-roma-600 mb-3">
            {{ review.score }}/10
          </div>
          
          <!-- Comment -->
          <blockquote v-if="review.comment" class="text-neutral-700 text-sm italic leading-relaxed">
            "{{ review.comment }}"
          </blockquote>
          <div v-else class="text-neutral-500 text-sm italic">
            {{ $t('reviews.no_comment') }}
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="mt-12 text-center">
        <div class="flex flex-wrap justify-center items-center gap-8 text-neutral-600">
          <div class="flex items-center space-x-2">
            <StarIcon class="text-roma-gold-400 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">9.4</div>
              <div class="text-sm">Booking.com</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon class="text-roma-gold-400 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">{{ $t('reviews.badges.staff') }}</div>
              <div class="text-sm">{{ $t('reviews.badges.excellent') }}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon class="text-roma-gold-400 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">{{ $t('reviews.badges.cleanliness') }}</div>
              <div class="text-sm">{{ $t('reviews.badges.impeccable') }}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <MapPinIcon class="text-roma-red-600 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">{{ $t('reviews.badges.location') }}</div>
              <div class="text-sm">{{ $t('reviews.badges.excellent') }}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UsersIcon class="text-roma-red-600 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">{{ $t('reviews.badges.verified') }}</div>
              <div class="text-sm">{{ $t('reviews.badges.verified_label') }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <router-link to="/contatti" class="btn-3d btn-3d-md">
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front">
            {{ $t('reviews.cta.become_guest') }}
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { StarIcon, CheckCircleIcon, MapPinIcon, UsersIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { tm } = useI18n()

const reviews = computed(() => {
  const data = tm('reviews.data')
  return Array.isArray(data) ? data : []
})
</script>