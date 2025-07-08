<template>
  <section id="recensioni" class="py-16 bg-neutral-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-roma-800 mb-4">
          Recensioni Reali dei Nostri Ospiti
        </h2>
        <p class="text-neutral-600 max-w-2xl mx-auto">
          Punteggio 9.2/10 Eccellente su Booking.com - 12 recensioni verificate
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
              <div class="font-semibold text-roma-800">{{ review.name }}</div>
              <span class="text-xs bg-roma-100 text-roma-700 px-2 py-1 rounded-full">{{ review.country }}</span>
            </div>
            <div class="flex">
              <span v-for="star in Math.floor(review.rating)" :key="star" class="text-roma-gold-400 text-sm">⭐</span>
            </div>
          </div>

          <!-- Trip details -->
          <div class="text-xs text-neutral-500 mb-3">
            {{ review.date }} · {{ review.nights }} · {{ review.type }}
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
            Recensione eccellente senza commento scritto
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="mt-12 text-center">
        <div class="flex flex-wrap justify-center items-center gap-8 text-neutral-600">
          <div class="flex items-center space-x-2">
            <StarIcon class="text-roma-gold-400 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">9.2</div>
              <div class="text-sm">Booking.com</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon class="text-roma-gold-400 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">Pulizia 10/10</div>
              <div class="text-sm">Impeccabile</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <MapPinIcon class="text-roma-red-600 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">Posizione 9.7/10</div>
              <div class="text-sm">Eccellente</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UsersIcon class="text-roma-red-600 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">12 Recensioni</div>
              <div class="text-sm">Verificate</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <a href="#contatti" class="btn-3d btn-3d-md">
          Diventa il Prossimo Ospite Felice
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { StarIcon, CheckCircleIcon, MapPinIcon, UsersIcon } from 'lucide-vue-next'

const reviews = [
  {
    id: 1,
    name: "Marco R.",
    country: "Italia",
    rating: 10,
    score: 10,
    date: "Novembre 2023",
    nights: "2 notti",
    type: "Coppia",
    comment: "Appartamento fantastico nel cuore di Roma! Posizione perfetta per visitare tutti i monumenti principali a piedi. Pulizia impeccabile e host molto disponibile.",
    featured: true
  },
  {
    id: 2,
    name: "Sarah M.",
    country: "Francia",
    rating: 9,
    score: 9.5,
    date: "Ottobre 2023",
    nights: "3 notti",
    type: "Famiglia",
    comment: "Séjour parfait! L'appartement est exactement comme sur les photos. Très propre et bien équipé. La localisation est idéale pour explorer Rome."
  },
  {
    id: 3,
    name: "James K.",
    country: "UK",
    rating: 10,
    score: 10,
    date: "Settembre 2023",
    nights: "4 notti",
    type: "Coppia",
    comment: "Outstanding location right in the heart of Rome. The apartment was spotless and had everything we needed. Would definitely stay again!"
  },
  {
    id: 4,
    name: "Anna L.",
    country: "Germania",
    rating: 9,
    score: 9.2,
    date: "Agosto 2023",
    nights: "2 notti",
    type: "Solo",
    comment: "Perfekte Lage mitten in Rom! Die Wohnung war sauber und gut ausgestattet. Der Gastgeber war sehr hilfsbereit."
  },
  {
    id: 5,
    name: "Carlos S.",
    country: "Spagna",
    rating: 10,
    score: 10,
    date: "Luglio 2023",
    nights: "5 notti",
    type: "Famiglia",
    comment: "Ubicación increíble en el centro histórico de Roma. El apartamento estaba impecable y tenía todo lo necesario para una estancia perfecta."
  },
  {
    id: 6,
    name: "Lisa W.",
    country: "USA",
    rating: 9,
    score: 9.8,
    date: "Giugno 2023",
    nights: "3 notti",
    type: "Coppia",
    comment: "Amazing apartment in the perfect location! We could walk to the Pantheon, Trevi Fountain, and Spanish Steps. Highly recommend!"
  }
];
</script>