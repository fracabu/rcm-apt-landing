<template>
  <div style="background: linear-gradient(135deg, rgba(152, 20, 43, 0.92) 0%, rgba(122, 16, 36, 0.92) 50%, rgba(152, 20, 43, 0.92) 100%), url('/images/sfondo.png'); background-size: 500px 500px; background-repeat: repeat; background-position: center; background-attachment: fixed;">
    <TheHeader />

    <!-- Hero Section -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="/images/colosseo.jpg"
          alt="Panorama di Roma"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
      <div class="container mx-auto px-4 py-12 relative mt-16 md:mt-20 lg:mt-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            {{ $t('news.title') }}
            <span class="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-200 mt-2 lg:mt-4 font-light">
              {{ $t('news.subtitle') }}
            </span>
          </h1>
          <p class="text-lg sm:text-xl text-amber-200 font-light max-w-2xl mx-auto mb-8">
            {{ $t('news.description') }}
          </p>
          <a href="#news-section" class="btn-3d btn-3d-md">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
              {{ $t('news.cta.explore') }}
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            class="filter-btn"
            :class="{ 'active': selectedCategory === cat.id }"
          >
            <component :is="cat.icon" class="w-4 h-4 mr-2" />
            {{ $t(`news.categories.${cat.id}`) }}
          </button>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <main id="news-section" class="py-16">
      <div class="container mx-auto px-4">
        <!-- Featured Article -->
        <div v-if="featuredArticle && selectedCategory === 'all'" class="mb-12">
          <router-link :to="`/news/${featuredArticle.slug}`" class="block">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.01]">
              <div class="grid md:grid-cols-2">
                <div class="relative h-64 md:h-auto min-h-[300px]">
                  <img
                    :src="featuredArticle.imageUrl"
                    :alt="getTitle(featuredArticle)"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute top-4 left-4">
                    <span class="bg-roma-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {{ $t('news.featured') }}
                    </span>
                  </div>
                </div>
                <div class="p-8 flex flex-col justify-center">
                  <div class="flex items-center gap-3 mb-4">
                    <span class="category-badge" :class="getCategoryClass(featuredArticle.category)">
                      {{ $t(`news.categories.${featuredArticle.category}`) }}
                    </span>
                    <span class="text-gray-500 text-sm flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1" />
                      {{ formatDate(featuredArticle.publishedAt) }}
                    </span>
                  </div>
                  <h2 class="text-2xl md:text-3xl font-serif font-bold text-roma-800 mb-4">
                    {{ getTitle(featuredArticle) }}
                  </h2>
                  <p class="text-gray-600 mb-6 leading-relaxed">
                    {{ getExcerpt(featuredArticle) }}
                  </p>
                  <span class="text-roma-600 font-semibold flex items-center">
                    {{ $t('news.cta.read_more') }}
                    <ArrowRightIcon class="w-4 h-4 ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <router-link
            v-for="article in filteredNews"
            :key="article.id"
            :to="`/news/${article.slug}`"
            class="news-card block"
          >
            <div class="relative h-48 overflow-hidden rounded-t-2xl">
              <img
                :src="article.imageUrl"
                :alt="getTitle(article)"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <span
                class="absolute bottom-3 left-3 category-badge"
                :class="getCategoryClass(article.category)"
              >
                {{ $t(`news.categories.${article.category}`) }}
              </span>
            </div>
            <div class="bg-white p-6 rounded-b-2xl">
              <div class="flex items-center text-gray-500 text-sm mb-3">
                <CalendarIcon class="w-4 h-4 mr-1" />
                {{ formatDate(article.publishedAt) }}
                <span v-if="article.author" class="ml-3 flex items-center">
                  <UserIcon class="w-4 h-4 mr-1" />
                  {{ article.author }}
                </span>
              </div>
              <h3 class="text-xl font-serif font-bold text-roma-800 mb-3 line-clamp-2">
                {{ getTitle(article) }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ getExcerpt(article) }}
              </p>
              <span class="text-roma-600 font-semibold flex items-center">
                {{ $t('news.cta.read_more') }}
                <ArrowRightIcon class="w-4 h-4 ml-1" />
              </span>
            </div>
          </router-link>
        </div>

        <!-- Empty State -->
        <div v-if="filteredNews.length === 0 && !featuredArticle" class="text-center py-16">
          <NewspaperIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">{{ $t('news.empty') }}</p>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import { getAllNews, getFeaturedNews } from '../services/news'
import type { NewsArticle } from '../types'
import {
  NewspaperIcon,
  CalendarIcon,
  UserIcon,
  ArrowRightIcon,
  MapPinIcon,
  HomeIcon,
  CalendarDaysIcon,
  LightbulbIcon
} from 'lucide-vue-next'

const { locale } = useI18n()
const selectedCategory = ref<string>('all')

interface Category {
  id: string
  icon: any
}

const categories: Category[] = [
  { id: 'all', icon: NewspaperIcon },
  { id: 'roma', icon: MapPinIcon },
  { id: 'appartamento', icon: HomeIcon },
  { id: 'eventi', icon: CalendarDaysIcon },
  { id: 'consigli', icon: LightbulbIcon }
]

const allNews = getAllNews()
const featuredNews = getFeaturedNews()

const featuredArticle = computed(() => {
  if (selectedCategory.value !== 'all') return null
  return featuredNews[0] || null
})

const filteredNews = computed(() => {
  let articles = allNews

  // Exclude featured article if showing all
  if (selectedCategory.value === 'all' && featuredArticle.value) {
    articles = articles.filter(a => a.id !== featuredArticle.value?.id)
  }

  // Filter by category
  if (selectedCategory.value !== 'all') {
    articles = articles.filter(a => a.category === selectedCategory.value)
  }

  return articles
})

const getTitle = (article: NewsArticle) => {
  return locale.value === 'en' ? article.titleEn : article.titleIt
}

const getExcerpt = (article: NewsArticle) => {
  return locale.value === 'en' ? article.excerptEn : article.excerptIt
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const currentLocale = locale.value === 'en' ? 'en-US' : 'it-IT'
  return date.toLocaleDateString(currentLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'roma': 'bg-blue-500 text-white',
    'appartamento': 'bg-green-500 text-white',
    'eventi': 'bg-purple-500 text-white',
    'consigli': 'bg-orange-500 text-white'
  }
  return classes[category] || 'bg-gray-500 text-white'
}
</script>

<style scoped>
.filter-btn {
  @apply px-6 py-3 bg-white text-roma-700 font-medium rounded-full border border-roma-200 hover:bg-roma-50 transition-all duration-300 flex items-center;
}

.filter-btn.active {
  @apply bg-roma-600 text-white border-roma-600;
}

.news-card {
  @apply bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden;
}

.category-badge {
  @apply px-3 py-1 rounded-full text-xs font-bold;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
