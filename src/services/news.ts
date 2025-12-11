import type { NewsArticle } from '../types'
import newsData from '../data/news.json'

const news: NewsArticle[] = newsData as NewsArticle[]

export function getAllNews(): NewsArticle[] {
  return news.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getFeaturedNews(): NewsArticle[] {
  return news.filter(article => article.featured)
}

export function getNewsByCategory(category: NewsArticle['category']): NewsArticle[] {
  return news
    .filter(article => article.category === category)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export function getNewsById(id: string): NewsArticle | undefined {
  return news.find(article => article.id === id)
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find(article => article.slug === slug)
}

export function getLatestNews(count: number = 3): NewsArticle[] {
  return getAllNews().slice(0, count)
}

export function getRelatedNews(currentId: string, category: NewsArticle['category'], count: number = 3): NewsArticle[] {
  return news
    .filter(article => article.id !== currentId && article.category === category)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count)
}
