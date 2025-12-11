<template>
  <div class="min-h-screen bg-cream-50">
    <TheHeader />

    <main v-if="article" class="pt-20">
      <!-- Hero Header with Image - Full Viewport -->
      <header class="relative h-[calc(100vh-5rem)] flex items-end">
        <!-- Background Image -->
        <div class="absolute inset-0">
          <img
            :src="article.imageUrl"
            :alt="getTitle(article)"
            class="w-full h-full object-cover object-top"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <!-- Breadcrumb Overlay -->
        <div class="absolute top-4 left-0 right-0 z-10">
          <div class="container mx-auto px-4">
            <nav class="flex items-center text-sm text-white/80">
              <router-link to="/" class="hover:text-white">Home</router-link>
              <ChevronRightIcon class="w-4 h-4 mx-2" />
              <router-link to="/news" class="hover:text-white">News</router-link>
            </nav>
          </div>
        </div>

        <!-- Content Overlay -->
        <div class="container mx-auto px-4 py-12 relative z-10">
          <div class="max-w-4xl">
            <span
              class="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-white/90"
              :class="getCategoryClass(article.category)"
            >
              {{ $t(`news.categories.${article.category}`) }}
            </span>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg">
              {{ getTitle(article) }}
            </h1>
            <div class="flex flex-wrap items-center gap-4 text-white/90">
              <span class="flex items-center">
                <CalendarIcon class="w-5 h-5 mr-2" />
                {{ formatDate(article.publishedAt) }}
              </span>
              <span v-if="article.author" class="flex items-center">
                <UserIcon class="w-5 h-5 mr-2" />
                {{ article.author }}
              </span>
              <span class="flex items-center">
                <ClockIcon class="w-5 h-5 mr-2" />
                {{ readingTime }} min
              </span>
            </div>
          </div>
        </div>
      </header>

      <!-- Article Content - Alternating Layout -->
      <article class="py-12 md:py-16">
        <div class="container mx-auto px-4">
          <!-- Intro Section -->
          <div class="max-w-3xl mx-auto mb-16">
            <div
              class="prose prose-lg prose-roma"
              v-html="getIntro()"
            ></div>
          </div>

          <!-- Content Sections with Alternating Layout -->
          <div class="space-y-16 md:space-y-24">
            <template v-for="(section, index) in contentSections" :key="index">
              <!-- Section with Image -->
              <div
                v-if="section.hasImage"
                class="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                :class="{ 'md:flex-row-reverse': index % 2 === 1 }"
              >
                <div :class="index % 2 === 1 ? 'md:order-2' : ''">
                  <img
                    :src="getSectionImage(index)"
                    :alt="section.title"
                    class="rounded-2xl shadow-lg w-full h-auto object-contain bg-gray-100 aspect-[4/3]"
                  />
                </div>
                <div :class="index % 2 === 1 ? 'md:order-1' : ''">
                  <h2 class="text-2xl md:text-3xl font-serif font-bold text-roma-800 mb-6">
                    {{ section.title }}
                  </h2>
                  <div
                    class="prose prose-roma"
                    v-html="section.content"
                  ></div>
                </div>
              </div>

              <!-- Section without Image (Full Width) -->
              <div v-else class="max-w-3xl mx-auto">
                <h2 v-if="section.title" class="text-2xl md:text-3xl font-serif font-bold text-roma-800 mb-6">
                  {{ section.title }}
                </h2>
                <div
                  class="prose prose-lg prose-roma"
                  v-html="section.content"
                ></div>
              </div>
            </template>
          </div>

          <!-- CTA Box -->
          <div class="max-w-3xl mx-auto mt-16">
            <div class="bg-gradient-to-r from-roma-700 to-roma-800 rounded-2xl p-8 md:p-10 text-white">
              <h3 class="text-2xl font-serif font-bold mb-4">
                {{ locale === 'it' ? 'Prenota il tuo soggiorno a Roma' : 'Book your stay in Rome' }}
              </h3>
              <p class="text-roma-100 mb-6">
                {{ locale === 'it'
                  ? 'Roma Caput Mundi è un bilocale moderno a soli 8 minuti di treno da San Pietro. WiFi veloce, Netflix, aria condizionata inclusi.'
                  : 'Roma Caput Mundi is a modern two-room apartment just 8 minutes by train from St. Peter\'s. Fast WiFi, Netflix, air conditioning included.'
                }}
              </p>
              <router-link
                to="/contatti"
                class="inline-flex items-center bg-white text-roma-700 font-semibold px-6 py-3 rounded-full hover:bg-roma-50 transition-colors"
              >
                {{ locale === 'it' ? 'Verifica disponibilità' : 'Check availability' }}
                <ArrowRightIcon class="w-5 h-5 ml-2" />
              </router-link>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Articles -->
      <section v-if="relatedArticles.length > 0" class="bg-white py-12 md:py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8">
            {{ $t('news.related') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <router-link
              v-for="related in relatedArticles"
              :key="related.id"
              :to="`/news/${related.slug}`"
              class="group"
            >
              <div class="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div class="aspect-[16/10] overflow-hidden">
                  <img
                    :src="related.imageUrl"
                    :alt="getTitle(related)"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div class="p-5 bg-white">
                  <span
                    class="text-xs font-semibold px-2 py-1 rounded"
                    :class="getCategoryBadgeClass(related.category)"
                  >
                    {{ $t(`news.categories.${related.category}`) }}
                  </span>
                  <h3 class="font-bold text-gray-800 mt-3 group-hover:text-roma-600 transition-colors line-clamp-2">
                    {{ getTitle(related) }}
                  </h3>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Back Link -->
      <div class="bg-cream-50 py-8">
        <div class="container mx-auto px-4">
          <router-link
            to="/news"
            class="inline-flex items-center text-roma-600 hover:text-roma-700 font-medium"
          >
            <ArrowLeftIcon class="w-5 h-5 mr-2" />
            {{ $t('news.cta.back_to_news') }}
          </router-link>
        </div>
      </div>
    </main>

    <!-- 404 -->
    <main v-else class="pt-32 pb-16">
      <div class="container mx-auto px-4 text-center">
        <NewspaperIcon class="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 class="text-3xl font-bold text-gray-700 mb-4">{{ $t('news.not_found') }}</h1>
        <router-link
          to="/news"
          class="inline-flex items-center bg-roma-600 text-white px-6 py-3 rounded-full hover:bg-roma-700 transition-colors"
        >
          {{ $t('news.cta.back_to_news') }}
        </router-link>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import { getNewsBySlug, getRelatedNews } from '../services/news'
import type { NewsArticle } from '../types'
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  NewspaperIcon
} from 'lucide-vue-next'

const route = useRoute()
const { locale } = useI18n()

const article = computed(() => {
  const slug = route.params.slug as string
  return getNewsBySlug(slug)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return getRelatedNews(article.value.id, article.value.category, 3)
})

const getTitle = (art: NewsArticle) => {
  return locale.value === 'en' ? art.titleEn : art.titleIt
}

const getContent = computed(() => {
  if (!article.value) return ''
  return locale.value === 'en' ? article.value.contentEn : article.value.contentIt
})

// Calculate reading time
const readingTime = computed(() => {
  if (!getContent.value) return 0
  const text = getContent.value.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).length
  return Math.ceil(words / 200)
})

// Get intro (first 2 paragraphs before first h2)
const getIntro = () => {
  const content = getContent.value
  const h2Index = content.indexOf('<h2')
  if (h2Index === -1) return content.slice(0, 500)
  return content.slice(0, h2Index)
}

// Parse content into sections
const contentSections = computed(() => {
  const content = getContent.value
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi
  const sections: { title: string; content: string; hasImage: boolean }[] = []

  let lastIndex = content.indexOf('<h2')
  if (lastIndex === -1) return sections

  let match
  const matches: { title: string; index: number }[] = []

  // Find all h2 tags
  while ((match = h2Regex.exec(content)) !== null) {
    matches.push({
      title: match[1].replace(/<[^>]*>/g, ''),
      index: match.index
    })
  }

  // Create sections
  matches.forEach((m, i) => {
    const startIndex = m.index
    const endIndex = i < matches.length - 1 ? matches[i + 1].index : content.length
    let sectionContent = content.slice(startIndex, endIndex)

    // Remove the h2 from content
    sectionContent = sectionContent.replace(/<h2[^>]*>.*?<\/h2>/i, '')

    // Add styling to nested h3
    sectionContent = sectionContent
      .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-roma-700 mt-6 mb-3">')
      .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4">')
      .replace(/<strong>/g, '<strong class="text-gray-900">')

    sections.push({
      title: m.title,
      content: sectionContent,
      hasImage: i < 4 // First 4 sections get images
    })
  })

  return sections
})

// Get image for section (cycle through available images)
const getSectionImage = (index: number) => {
  if (!article.value?.images) return article.value?.imageUrl || ''
  const images = [article.value.imageUrl, ...(article.value.images || [])]
  return images[index % images.length] || article.value.imageUrl
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
    'roma': 'bg-blue-100 text-blue-700',
    'appartamento': 'bg-green-100 text-green-700',
    'eventi': 'bg-purple-100 text-purple-700',
    'consigli': 'bg-orange-100 text-orange-700'
  }
  return classes[category] || 'bg-gray-100 text-gray-700'
}

const getCategoryBadgeClass = (category: string) => {
  const classes: Record<string, string> = {
    'roma': 'bg-blue-50 text-blue-600',
    'appartamento': 'bg-green-50 text-green-600',
    'eventi': 'bg-purple-50 text-purple-600',
    'consigli': 'bg-orange-50 text-orange-600'
  }
  return classes[category] || 'bg-gray-50 text-gray-600'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose-roma h3 {
  @apply text-xl font-semibold text-roma-700 mt-6 mb-3;
}

.prose-roma p {
  @apply text-gray-700 leading-relaxed mb-4;
}

.prose-roma strong {
  @apply text-gray-900 font-semibold;
}

.prose-roma ul, .prose-roma ol {
  @apply my-4 pl-6;
}

.prose-roma li {
  @apply mb-2 text-gray-700;
}

.prose-roma a {
  @apply text-roma-600 hover:text-roma-700 underline;
}
</style>
