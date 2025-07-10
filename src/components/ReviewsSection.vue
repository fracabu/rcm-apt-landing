<template>
  <section id="recensioni" class="py-16 bg-neutral-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-roma-800 mb-4">
          Recensioni Reali dei Nostri Ospiti
        </h2>
        <p class="text-neutral-600 max-w-2xl mx-auto">
          Punteggio 9.4/10 Eccellente - 12 recensioni verificate su Booking.com
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
              <div class="font-bold text-lg">9.4</div>
              <div class="text-sm">Booking.com</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon class="text-roma-gold-400 h-8 w-8" />
            <div>
              <div class="font-bold text-lg">Staff 10/10</div>
              <div class="text-sm">Eccellente</div>
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
              <div class="font-bold text-lg">Posizione 9.6/10</div>
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
    name: "Frigerio",
    country: "Italia",
    rating: 10,
    score: 10,
    date: "Giugno 2025",
    nights: "1 notte",
    type: "Famiglia",
    comment: "SUPERCONSIGLIATO: Dell'appartamento ci è piaciuto veramente tutto. Dalla posizione comoda con tutti i servizi di trasporto, volendo c'è anche una ciclabile che arriva fino al Vaticano. Comodissimo per chi vuole visitare il centro di Roma e per raggiungere lo stadio Olimpico. Appartamento nuovo, con tutti i servizi, molto pulito. Il proprietario molto accogliente e gentile.",
    featured: true
  },
  {
    id: 2,
    name: "Federica",
    country: "Italia", 
    rating: 10,
    score: 10,
    date: "Giugno 2025",
    nights: "1 notte",
    type: "Famiglia",
    comment: "Ci siamo innamorati di questo appartamento appena entrati. Luminoso, super pulito e ben arredato. Per non parlare della disponibilità di Francesco, il proprietario, ha soddisfatto ogni nostra esigenza."
  },
  {
    id: 3,
    name: "Alessandra",
    country: "Italia",
    rating: 10,
    score: 10,
    date: "Aprile 2025", 
    nights: "1 notte",
    type: "Solo",
    comment: "L'appartamento è nuovo, pulitissimo e dotato di ogni comfort. Ha anche un ampio balcone dal quale abbiamo apprezzato l'aria fresca e fruzzantina della serata. Il proprietario, molto simpatico e disponibile, ci ha accolto di persona. La casa si trova in una posizione molto centrale ma silenziosa."
  },
  {
    id: 4,
    name: "Janaka",
    country: "Svezia",
    rating: 10,
    score: 10,
    date: "Giugno 2025",
    nights: "6 notti",
    type: "Famiglia",
    comment: "Det bästa boendet som vi har bott i. Jätte rent och nu renoverad lägenhet. Ganska stor lägenhet. Man kände hemma direkt. Det fanns allt du behövde i lägenheten. Hyres värdarna var hjälpsamma och ordnar allt du behöver. BÄSTA BOENDET i ROM!"
  },
  {
    id: 5,
    name: "Motlagh",
    country: "Iran",
    rating: 9,
    score: 9.0,
    date: "Maggio 2025",
    nights: "6 notti",
    type: "Solo",
    comment: "I had a wonderful stay at Roma Caput Mundi Apartment. The location is great! Within just 5 minutes of walking, you can reach the train station. There's also a lovely square nearby with easy access to a pharmacy, ice cream shops, restaurants. The hosts were kind and welcoming—especially Francesco, who was so helpful."
  },
  {
    id: 6,
    name: "Fabio", 
    country: "Italia",
    rating: 9,
    score: 9.0,
    date: "Marzo 2025",
    nights: "1 notte",
    type: "Famiglia",
    comment: "Posizione dell'appartamento ottima perché abbastanza vicina alla stazione ferroviaria Appiano Proba Petronia. Proprietario molto cordiale ed affabile nelle richieste. Appartamento funzionale e molto pulito che ha decisamente soddisfatto le nostre aspettative."
  },
  {
    id: 7,
    name: "Roberto",
    country: "Italia",
    rating: 10,
    score: 10,
    date: "Maggio 2025", 
    nights: "1 notte",
    type: "Solo",
    comment: "Appartamento accogliente, pulito, silenzioso, curato e con tutti i comfort necessari per un soggiorno perfetto a Roma."
  },
  {
    id: 8,
    name: "Giorgio",
    country: "Italia",
    rating: 9,
    score: 9.0,
    date: "Maggio 2025",
    nights: "3 notti", 
    type: "Famiglia",
    comment: "Pulizia, spazi e cortesia del proprietario. Casa accessoriata con tutto quello che serve per un soggiorno confortevole."
  },
  {
    id: 9,
    name: "Mazzariol", 
    country: "Italia",
    rating: 9,
    score: 9.0,
    date: "Maggio 2025",
    nights: "1 notte",
    type: "Famiglia", 
    comment: "Arredato con cura, pulizia approfondita, personale gentilissimo e puntuale. Esperienza davvero positiva, lo consigliamo vivamente."
  },
  {
    id: 10,
    name: "Mirko",
    country: "Italia",
    rating: 10,
    score: 10,
    date: "Maggio 2025",
    nights: "2 notti",
    type: "Famiglia",
    comment: null
  },
  {
    id: 11,
    name: "Ciari", 
    country: "Italia",
    rating: 7,
    score: 7.0,
    date: "Giugno 2025",
    nights: "1 notte",
    type: "Coppia",
    comment: null
  },
  {
    id: 12,
    name: "Victoriia",
    country: "Ucraina", 
    rating: 10,
    score: 10,
    date: "Aprile 2025",
    nights: "2 notti",
    type: "Famiglia",
    comment: "Все було дуже добре, дуже милий господар (Tutto è stato molto buono, proprietario molto gentile)"
  }
];
</script>