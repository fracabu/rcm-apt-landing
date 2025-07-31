<template>
  <div class="bg-gradient-to-br from-neutral-50 via-roma-50 to-neutral-100">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/images/colosseo.jpg" 
          alt="Musei e Siti Archeologici Roma" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div class="container mx-auto px-4 py-12 relative mt-16 md:mt-20 lg:mt-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 lg:mb-8 animate-fade-in drop-shadow-2xl">
            {{ $t('museums.hero.title') }}
            <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-200 mt-2 lg:mt-4 font-light">
              {{ $t('museums.hero.subtitle') }}
            </span>
          </h1>

          <!-- Key Features - Simple Text -->
          <div class="mb-8 lg:mb-12">
            <p class="text-lg sm:text-xl md:text-2xl text-amber-200 font-light max-w-2xl mx-auto">
              {{ $t('museums.hero.features') }}
            </p>
          </div>

          <button onclick="document.querySelector('main').scrollIntoView({behavior: 'smooth'})" class="btn-3d btn-3d-md">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ $t('museums.hero.cta') }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Museums Content -->
    <main class="py-16">
      <div class="container mx-auto px-4">

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
            {{ $t(`museums.categories.${category}`) }}
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
                  {{ $t(`museums.categories.${museum.category}`) }}
                </span>
              </div>
              <!-- Duration Badge -->
              <div class="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                ⏱️ {{ museum.duration }}
              </div>
            </div>

            <!-- Museum Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-roma-800 mb-2">{{ getTranslatedMuseumName(museum) }}</h3>
              <p class="text-neutral-700 text-sm mb-4 line-clamp-3">{{ getTranslatedMuseumDescription(museum) }}</p>
              
              <!-- Highlights -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-roma-700 mb-2">🌟 Highlights:</h4>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="(highlight, index) in museum.highlights"
                    :key="index"
                    class="bg-roma-50 text-roma-700 px-2 py-1 rounded-full text-xs"
                  >
                    {{ getTranslatedHighlight(museum, index) }}
                  </span>
                </div>
              </div>

              <!-- Price and Info -->
              <div class="flex items-center justify-between mb-4">
                <div class="text-sm text-neutral-700">
                  <span class="font-semibold text-roma-700">💰 {{ translations.price_from }} {{ museum.priceFrom }}</span>
                </div>
                <div class="text-sm text-neutral-700">
                  📍 {{ museum.distance }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  @click="openTickets(museum)"
                  class="flex-1 btn-3d btn-3d-sm"
                >
                  <span class="shadow"></span>
                  <span class="edge"></span>
                  <span class="front">
                    🎫 {{ translations.buttons.tickets }}
                  </span>
                </button>
                <button
                  @click="openInfo(museum)"
                  class="btn-3d btn-3d-secondary btn-3d-sm"
                >
                  <span class="shadow"></span>
                  <span class="edge"></span>
                  <span class="front">
                    ℹ️ {{ translations.buttons.info }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Practical Tips Section -->
        <div class="mt-12 md:mt-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
          <h2 class="text-2xl md:text-3xl font-bold text-roma-800 mb-6 text-center">
            💡 {{ translations.tips.title }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-12 h-12 bg-roma-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🎟️
              </div>
              <h3 class="font-semibold text-roma-800 mb-2">{{ translations.tips.book_online.title }}</h3>
              <p class="text-gray-600 text-sm">{{ translations.tips.book_online.description }}</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-roma-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🌅
              </div>
              <h3 class="font-semibold text-roma-800 mb-2">{{ translations.tips.best_times.title }}</h3>
              <p class="text-gray-600 text-sm">{{ translations.tips.best_times.description }}</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-roma-100 rounded-full flex items-center justify-center mx-auto mb-3">
                🎧
              </div>
              <h3 class="font-semibold text-roma-800 mb-2">{{ translations.tips.audioguides.title }}</h3>
              <p class="text-gray-600 text-sm">{{ translations.tips.audioguides.description }}</p>
            </div>
          </div>
        </div>

        <!-- Transportation Info -->
        <div class="mt-8 bg-gradient-to-r from-roma-600 to-roma-700 rounded-2xl text-white p-6 md:p-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4 text-center">
            🚇 {{ translations.transport.title }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold mb-2">🚊 {{ translations.transport.vatican.title }}</h3>
              <p class="text-roma-100 text-sm mb-1">{{ translations.transport.vatican.metro }}</p>
              <p class="text-roma-100 text-sm">{{ translations.transport.vatican.bus }}</p>
            </div>
            <div>
              <h3 class="font-semibold mb-2">🏛️ {{ translations.transport.center.title }}</h3>
              <p class="text-roma-100 text-sm mb-1">{{ translations.transport.center.metro }}</p>
              <p class="text-roma-100 text-sm">{{ translations.transport.center.time }}</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-8">
          <router-link to="/contatti" class="btn-3d btn-3d-lg">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ translations.cta.book_cultural_stay }}
            </span>
          </router-link>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { TicketIcon, MapPinIcon, ClockIcon } from 'lucide-vue-next'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

const { t, locale } = useI18n()
const selectedCategory = ref('all')

// Computed properties for reactive translations
const isEnglish = computed(() => locale.value === 'en')

// Hardcoded translations that work
const translations = {
  buttons: {
    tickets: isEnglish.value ? 'Tickets' : 'Biglietti',
    info: isEnglish.value ? 'Info' : 'Info'
  },
  tips: {
    title: isEnglish.value ? 'Practical Tips for Visits' : 'Consigli Pratici per le Visite',
    book_online: {
      title: isEnglish.value ? 'Book Online' : 'Prenota Online',
      description: isEnglish.value ? 'Skip the lines and secure entry by booking in advance online' : 'Evita le code e assicurati l\'ingresso prenotando in anticipo online'
    },
    best_times: {
      title: isEnglish.value ? 'Best Times' : 'Orari Migliori',
      description: isEnglish.value ? 'Visit early morning or late afternoon to avoid crowds' : 'Visita al mattino presto o nel tardo pomeriggio per evitare la folla'
    },
    audioguides: {
      title: isEnglish.value ? 'Audio Guides' : 'Audioguide',
      description: isEnglish.value ? 'Many museums offer free audio guides to enrich your visit' : 'Molti musei offrono audioguide gratuite per arricchire la visita'
    }
  },
  transport: {
    title: isEnglish.value ? 'How to Reach Museums from Our Apartment' : 'Come Raggiungere i Musei dal Nostro Appartamento',
    vatican: {
      title: isEnglish.value ? 'Vatican Museums & St. Peter\'s' : 'Musei Vaticani & San Pietro',
      metro: isEnglish.value ? 'Metro A: Cipro (2 stops) + 10 min walk' : 'Metro A: Cipro (2 fermate) + 10 min a piedi',
      bus: isEnglish.value ? 'Bus 49: Direct in 15 minutes' : 'Bus 49: Diretto in 15 minuti'
    },
    center: {
      title: isEnglish.value ? 'Historic Center (Pantheon, Colosseum)' : 'Centro Storico (Pantheon, Colosseo)',
      metro: isEnglish.value ? 'Metro A: Lepanto → Flaminio + Bus' : 'Metro A: Lepanto → Flaminio + Bus',
      time: isEnglish.value ? 'Total time: 30-40 minutes' : 'Tempo totale: 30-40 minuti'
    }
  },
  cta: {
    book_cultural_stay: isEnglish.value ? 'Book Your Cultural Stay' : 'Prenota il Tuo Soggiorno Culturale'
  },
  price_from: isEnglish.value ? 'From' : 'Da'
}

// Museum translations for ALL 12 museums
const getTranslatedMuseumName = (museum: Museum) => {
  if (!isEnglish.value) return museum.name
  
  const museumTranslations: Record<string, string> = {
    'musei-vaticani': 'Vatican Museums & Sistine Chapel',
    'basilica-san-pietro': 'St. Peter\'s Basilica & Dome',
    'colosseo': 'Colosseum',
    'fori-imperiali': 'Imperial Forums & Palatine',
    'musei-capitolini': 'Capitoline Museums',
    'pantheon': 'Pantheon',
    'villa-borghese': 'Borghese Gallery',
    'terme-caracalla': 'Baths of Caracalla',
    'castel-santangelo': 'Castel Sant\'Angelo',
    'palazzo-altemps': 'Palazzo Altemps',
    'palazzo-massimo': 'Palazzo Massimo',
    'crypta-balbi': 'Crypta Balbi'
  }
  
  return museumTranslations[museum.id] || museum.name
}

const getTranslatedMuseumDescription = (museum: Museum) => {
  if (!isEnglish.value) return museum.description
  
  const museumDescriptions: Record<string, string> = {
    'musei-vaticani': 'The world\'s largest art collection with the famous Sistine Chapel frescoed by Michelangelo. A journey through centuries of art and history.',
    'basilica-san-pietro': 'The most important basilica of Christianity with Michelangelo\'s majestic dome. Climb the dome for a breathtaking view of Rome.',
    'colosseo': 'The world\'s most famous amphitheater, symbol of the Roman Empire. Discover the history of gladiators and ancient Roman spectacles.',
    'fori-imperiali': 'The heart of ancient Rome with the remains of the forums of Caesar, Augustus and Trajan. The Palatine, legendary hill of Rome\'s foundation.',
    'musei-capitolini': 'The world\'s oldest public museums with masterpieces of ancient sculpture and a panoramic view of the Roman Forum.',
    'pantheon': 'The best preserved Roman temple in the world, a masterpiece of ancient architecture with its unique dome.',
    'villa-borghese': 'Extraordinary collection of Bernini sculptures and Caravaggio paintings in a villa surrounded by greenery.',
    'terme-caracalla': 'One of the largest thermal complexes of Roman antiquity, with advanced heating technologies and breathtaking decorations.',
    'castel-santangelo': 'Hadrian\'s Mausoleum transformed into a papal fortress, with spectacular views over Rome and the Tiber.',
    'palazzo-altemps': 'Part of the National Roman Museum, it houses one of the world\'s most important collections of ancient sculptures.',
    'palazzo-massimo': 'Main seat of the National Roman Museum with extraordinary ancient frescoes and imperial sculptures.',
    'crypta-balbi': 'Journey through medieval Rome built on the remains of the ancient city, with visible archaeological excavations.'
  }
  
  return museumDescriptions[museum.id] || museum.description
}

const getTranslatedHighlight = (museum: Museum, index: number) => {
  if (!isEnglish.value) return museum.highlights[index] || ''
  
  const highlightTranslations: Record<string, string[]> = {
    'musei-vaticani': ['Sistine Chapel', 'Raphael Rooms', 'Gallery of Maps', 'Pinacoteca'],
    'basilica-san-pietro': ['Michelangelo\'s Dome', 'Pietà', 'Bernini\'s Baldachin', 'Vatican Grottoes'],
    'colosseo': ['Arena', 'Underground', 'Third Ring', 'Museum'],
    'fori-imperiali': ['Roman Forum', 'House of Augustus', 'Domus Aurea', 'Trajan\'s Markets'],
    'musei-capitolini': ['Marcus Aurelius', 'Capitoline Wolf', 'Capitoline Venus', 'Tabularium'],
    'pantheon': ['Dome with oculus', 'Raphael\'s Tomb', 'High Altar', 'Roman Architecture'],
    'villa-borghese': ['Apollo and Daphne', 'Caravaggio Works', 'Canova', 'Titian'],
    'terme-caracalla': ['Frigidarium', 'Tepidarium', 'Mosaics', 'Roman Technologies'],
    'castel-santangelo': ['Panoramic Terrace', 'Papal Apartments', 'Passetto di Borgo', 'Angel Statue'],
    'palazzo-altemps': ['Ludovisi Throne', 'Discobolus', 'Renaissance Frescoes', 'Courtyard'],
    'palazzo-massimo': ['Villa of Livia Frescoes', 'Augustus of Prima Porta', 'Boxer at Rest', 'Anzio Girl'],
    'crypta-balbi': ['Medieval Excavations', 'Medieval Rome', 'Theater of Balbus', 'Urban Stratification']
  }
  
  return highlightTranslations[museum.id]?.[index] || museum.highlights[index] || ''
}

// Use i18n directly with better error handling

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
    image: '/images/Room_in_Baths_of_Caracalla,_Rome_(6652987465).jpg',
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
    image: '/images/palazzo daltemps.jpg',
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
    image: 'https://museonazionaleromano.beniculturali.it/sito/wp-content/uploads/2020/06/Palazzo-Massimo-main-3.jpg',
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
    image: 'https://museonazionaleromano.beniculturali.it/sito/wp-content/uploads/2020/06/Crypta-Balbi_main.jpg',
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

// getCategoryLabel rimosso - ora usa i18n direttamente nel template

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