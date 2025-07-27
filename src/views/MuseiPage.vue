<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100 flex flex-col">
    <TheHeader />
    <main class="flex-1 pt-24 md:pt-28 pb-8">
      <div class="container mx-auto px-4">
        <!-- Page Header -->
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-roma-800 mb-4">
            🏛️ Musei e Siti Archeologici
          </h1>
          <p class="text-neutral-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Scopri i tesori di Roma: dai Musei Vaticani al Colosseo, dai Musei Capitolini alle Terme di Caracalla. 
            Prenota i tuoi biglietti online e salta la fila!
          </p>
        </div>

        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedCategory === category
                ? 'bg-roma-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-roma-600 border border-roma-200 hover:bg-roma-50 hover:border-roma-300'
            ]"
          >
            {{ getCategoryLabel(category) }}
          </button>
        </div>

        <!-- Museums Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="museum in filteredMuseums"
            :key="museum.id"
            class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-2"
          >
            <!-- Museum Image -->
            <div class="relative h-48 md:h-56 overflow-hidden">
              <img
                :src="museum.image"
                :alt="museum.name"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              >
              <div class="absolute top-3 right-3">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getCategoryColor(museum.category)
                ]">
                  {{ getCategoryLabel(museum.category) }}
                </span>
              </div>
              <!-- Duration Badge -->
              <div class="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                ⏱️ {{ museum.duration }}
              </div>
            </div>

            <!-- Museum Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-roma-800 mb-2">{{ museum.name }}</h3>
              <p class="text-neutral-700 text-sm mb-4 line-clamp-3">{{ museum.description }}</p>
              
              <!-- Highlights -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-roma-700 mb-2">🌟 Highlights:</h4>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="highlight in museum.highlights"
                    :key="highlight"
                    class="bg-roma-50 text-roma-700 px-2 py-1 rounded-full text-xs"
                  >
                    {{ highlight }}
                  </span>
                </div>
              </div>

              <!-- Price and Info -->
              <div class="flex items-center justify-between mb-4">
                <div class="text-sm text-neutral-700">
                  <span class="font-semibold text-roma-700">💰 Da {{ museum.priceFrom }}</span>
                </div>
                <div class="text-sm text-neutral-700">
                  📍 {{ museum.distance }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  @click="openTickets(museum)"
                  class="flex-1 bg-roma-600 hover:bg-roma-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center gap-1"
                >
                  🎫 Biglietti
                </button>
                <button
                  @click="openInfo(museum)"
                  class="px-4 py-2 border border-roma-300 text-roma-600 hover:bg-roma-50 rounded-lg text-sm font-medium transition-colors duration-300"
                >
                  ℹ️ Info
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Practical Tips Section -->
        <div class="mt-12 md:mt-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
          <h2 class="text-2xl md:text-3xl font-bold text-roma-800 mb-6 text-center">
            💡 Consigli Pratici per le Visite
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-12 h-12 bg-roma-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🎟️
              </div>
              <h3 class="font-semibold text-roma-800 mb-2">Prenota Online</h3>
              <p class="text-gray-600 text-sm">Evita le code e assicurati l'ingresso prenotando in anticipo online</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-roma-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🌅
              </div>
              <h3 class="font-semibold text-roma-800 mb-2">Orari Migliori</h3>
              <p class="text-gray-600 text-sm">Visita al mattino presto o nel tardo pomeriggio per evitare la folla</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-roma-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🎧
              </div>
              <h3 class="font-semibold text-roma-800 mb-2">Audioguide</h3>
              <p class="text-gray-600 text-sm">Molti musei offrono audioguide gratuite per arricchire la visita</p>
            </div>
          </div>
        </div>

        <!-- Transportation Info -->
        <div class="mt-8 bg-gradient-to-r from-roma-600 to-roma-700 rounded-2xl text-white p-6 md:p-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4 text-center">
            🚇 Come Raggiungere i Musei dal Nostro Appartamento
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold mb-2">🚊 Musei Vaticani & San Pietro</h3>
              <p class="text-roma-100 text-sm mb-1">Metro A: Cipro (2 fermate) + 10 min a piedi</p>
              <p class="text-roma-100 text-sm">Bus 49: Diretto in 15 minuti</p>
            </div>
            <div>
              <h3 class="font-semibold mb-2">🏛️ Centro Storico (Pantheon, Colosseo)</h3>
              <p class="text-roma-100 text-sm mb-1">Metro A: Lepanto → Flaminio + Bus</p>
              <p class="text-roma-100 text-sm">Tempo totale: 30-40 minuti</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-8">
          <router-link to="/contatti" class="btn-3d btn-3d-lg bg-roma-600 hover:bg-roma-700">
            Prenota il Tuo Soggiorno Culturale
          </router-link>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

const selectedCategory = ref('all')

const categories = ['all', 'vaticani', 'archeologia', 'arte', 'storia']

interface Museum {
  id: string
  name: string
  description: string
  category: string
  image: string
  duration: string
  priceFrom: string
  distance: string
  highlights: string[]
  ticketUrl: string
  infoUrl: string
}

const museums: Museum[] = [
  {
    id: 'musei-vaticani',
    name: 'Musei Vaticani & Cappella Sistina',
    description: 'La più grande collezione d\'arte al mondo con la famosa Cappella Sistina affrescata da Michelangelo. Un viaggio attraverso secoli di arte e storia.',
    category: 'vaticani',
    image: 'https://images.pexels.com/photos/11650245/pexels-photo-11650245.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3-4 ore',
    priceFrom: '€20',
    distance: '10 min',
    highlights: ['Cappella Sistina', 'Stanze di Raffaello', 'Galleria delle Carte', 'Pinacoteca'],
    ticketUrl: 'https://www.museivaticani.va/content/museivaticani/it/visita-i-musei/biglietti.html',
    infoUrl: 'https://www.museivaticani.va/'
  },
  {
    id: 'basilica-san-pietro',
    name: 'Basilica di San Pietro & Cupola',
    description: 'La basilica più importante della cristianità con la maestosa cupola di Michelangelo. Salita alla cupola per una vista mozzafiato su Roma.',
    category: 'vaticani',
    image: 'https://images.pexels.com/photos/6139076/pexels-photo-6139076.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2-3 ore',
    priceFrom: '€10',
    distance: '12 min',
    highlights: ['Cupola di Michelangelo', 'Pietà', 'Baldacchino del Bernini', 'Grotte Vaticane'],
    ticketUrl: 'https://www.vatican.va/various/basiliche/san_pietro/it/cupola/orari.htm',
    infoUrl: 'https://www.vatican.va/'
  },
  {
    id: 'colosseo',
    name: 'Colosseo',
    description: 'L\'anfiteatro più famoso al mondo, simbolo dell\'Impero Romano. Scopri la storia dei gladiatori e degli spettacoli dell\'antica Roma.',
    category: 'archeologia',
    image: 'https://images.pexels.com/photos/5069333/pexels-photo-5069333.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2 ore',
    priceFrom: '€18',
    distance: '35 min',
    highlights: ['Arena', 'Sotterranei', 'Terzo anello', 'Museo'],
    ticketUrl: 'https://www.coopculture.it/it/products/colosseum/',
    infoUrl: 'https://parcocolosseo.it/'
  },
  {
    id: 'fori-imperiali',
    name: 'Fori Imperiali & Palatino',
    description: 'Il cuore dell\'antica Roma con i resti dei fori di Cesare, Augusto e Traiano. Il Palatino, leggendario colle della fondazione di Roma.',
    category: 'archeologia',
    image: 'https://images.pexels.com/photos/18696507/pexels-photo-18696507.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2-3 ore',
    priceFrom: '€18',
    distance: '35 min',
    highlights: ['Foro Romano', 'Casa di Augusto', 'Domus Aurea', 'Mercati di Traiano'],
    ticketUrl: 'https://www.coopculture.it/it/products/roman-forum-palatine-hill/',
    infoUrl: 'https://parcocolosseo.it/'
  },
  {
    id: 'musei-capitolini',
    name: 'Musei Capitolini',
    description: 'I più antichi musei pubblici del mondo con capolavori della scultura antica e una vista panoramica sul Foro Romano.',
    category: 'arte',
    image: 'https://images.pexels.com/photos/28107530/pexels-photo-28107530.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2-3 ore',
    priceFrom: '€15',
    distance: '30 min',
    highlights: ['Marco Aurelio', 'Lupa Capitolina', 'Venere Capitolina', 'Tabularium'],
    ticketUrl: 'https://www.museimunicipaliroma.it/it/musei/musei_capitolini',
    infoUrl: 'https://www.museicapitolini.org/'
  },
  {
    id: 'pantheon',
    name: 'Pantheon',
    description: 'Il tempio romano meglio conservato al mondo, capolavoro dell\'architettura antica con la sua cupola unica.',
    category: 'archeologia',
    image: 'https://images.pexels.com/photos/2031963/pexels-photo-2031963.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '45 min',
    priceFrom: 'Gratuito',
    distance: '25 min',
    highlights: ['Cupola con oculus', 'Tomba di Raffaello', 'Altare maggiore', 'Architettura romana'],
    ticketUrl: 'https://www.pantheonroma.com/',
    infoUrl: 'https://www.pantheonroma.com/'
  },
  {
    id: 'villa-borghese',
    name: 'Galleria Borghese',
    description: 'Straordinaria collezione di sculture del Bernini e dipinti di Caravaggio in una villa immersa nel verde.',
    category: 'arte',
    image: 'https://images.pexels.com/photos/19455909/pexels-photo-19455909.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2 ore',
    priceFrom: '€13',
    distance: '20 min',
    highlights: ['Apollo e Dafne', 'Opere di Caravaggio', 'Canova', 'Tiziano'],
    ticketUrl: 'https://www.galleriaborghese.beniculturali.it/',
    infoUrl: 'https://www.galleriaborghese.beniculturali.it/'
  },
  {
    id: 'terme-caracalla',
    name: 'Terme di Caracalla',
    description: 'Uno dei più grandi complessi termali dell\'antichità romana, con tecnologie avanzate di riscaldamento e decorazioni mozzafiato.',
    category: 'archeologia',
    image: '/images/terme-caracalla.jpg',
    duration: '1.5 ore',
    priceFrom: '€8',
    distance: '40 min',
    highlights: ['Frigidarium', 'Tepidarium', 'Mosaici', 'Tecnologie romane'],
    ticketUrl: 'https://www.coopculture.it/it/products/terme-di-caracalla/',
    infoUrl: 'https://www.beniculturali.it/'
  },
  {
    id: 'castel-santangelo',
    name: 'Castel Sant\'Angelo',
    description: 'Mausoleo di Adriano trasformato in fortezza papale, con panorami spettacolari su Roma e il Tevere.',
    category: 'storia',
    image: 'https://images.pexels.com/photos/18791726/pexels-photo-18791726.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2 ore',
    priceFrom: '€15',
    distance: '15 min',
    highlights: ['Terrazza panoramica', 'Appartamenti papali', 'Passetto di Borgo', 'Statua dell\'Angelo'],
    ticketUrl: 'https://castelsantangelo.beniculturali.it/',
    infoUrl: 'https://castelsantangelo.beniculturali.it/'
  },
  {
    id: 'palazzo-altemps',
    name: 'Palazzo Altemps',
    description: 'Parte del Museo Nazionale Romano, ospita una delle più importanti collezioni di sculture antiche al mondo.',
    category: 'arte',
    image: '/images/palazzo-altemps.jpg',
    duration: '1.5 ore',
    priceFrom: '€10',
    distance: '25 min',
    highlights: ['Trono Ludovisi', 'Discobolos', 'Affreschi rinascimentali', 'Cortile'],
    ticketUrl: 'https://www.museonazionaleromano.beniculturali.it/',
    infoUrl: 'https://www.museonazionaleromano.beniculturali.it/'
  },
  {
    id: 'palazzo-massimo',
    name: 'Palazzo Massimo',
    description: 'Sede principale del Museo Nazionale Romano con straordinari affreschi antichi e sculture di epoca imperiale.',
    category: 'arte',
    image: '/images/palazzo-massimo.jpg',
    duration: '2 ore',
    priceFrom: '€10',
    distance: '30 min',
    highlights: ['Affreschi di Villa di Livia', 'Augusto di Prima Porta', 'Pugile in riposo', 'Fanciulla di Anzio'],
    ticketUrl: 'https://www.museonazionaleromano.beniculturali.it/',
    infoUrl: 'https://www.museonazionaleromano.beniculturali.it/'
  },
  {
    id: 'crypta-balbi',
    name: 'Crypta Balbi',
    description: 'Viaggio attraverso la Roma medievale costruita sui resti dell\'antica città, con scavi archeologici visibili.',
    category: 'storia',
    image: '/images/crypta-balbi.jpg',
    duration: '1.5 ore',
    priceFrom: '€10',
    distance: '30 min',
    highlights: ['Scavi medievali', 'Roma medievale', 'Teatro di Balbo', 'Stratificazione urbana'],
    ticketUrl: 'https://www.museonazionaleromano.beniculturali.it/',
    infoUrl: 'https://www.museonazionaleromano.beniculturali.it/'
  }
]

const filteredMuseums = computed(() => {
  if (selectedCategory.value === 'all') {
    return museums
  }
  return museums.filter(museum => museum.category === selectedCategory.value)
})

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'all': 'Tutti',
    'vaticani': 'Vaticani',
    'archeologia': 'Archeologia',
    'arte': 'Arte',
    'storia': 'Storia'
  }
  return labels[category] || category
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'vaticani': 'bg-yellow-100 text-yellow-800',
    'archeologia': 'bg-amber-100 text-amber-800',
    'arte': 'bg-purple-100 text-purple-800',
    'storia': 'bg-blue-100 text-blue-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const openTickets = (museum: Museum) => {
  window.open(museum.ticketUrl, '_blank')
}

const openInfo = (museum: Museum) => {
  window.open(museum.infoUrl, '_blank')
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>