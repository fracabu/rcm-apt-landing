import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ServicesPage from '../views/ServicesPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import ReviewsPage from '../views/ReviewsPage.vue'
import ContactPage from '../views/ContactPage.vue'
import ConcertiPage from '../views/ConcertiPage.vue'
import MuseiPage from '../views/MuseiPage.vue'
import RestaurantsPage from '../views/RestaurantsPage.vue'
import AdminPage from '../views/AdminPage.vue'
// Lazy load privacy/cancellation to avoid build issues
const PrivacyPage = () => import('../views/PrivacyPage.vue')
const CancellationPage = () => import('../views/CancellationPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/servizi',
      name: 'services',
      component: ServicesPage
    },
    {
      path: '/galleria',
      name: 'gallery',
      component: GalleryPage
    },
    {
      path: '/recensioni',
      name: 'reviews',
      component: ReviewsPage
    },
    {
      path: '/contatti',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/concerti',
      name: 'concerts',
      component: ConcertiPage,
      meta: {
        title: 'Concerti Roma 2025-2026 | Sconto 20% Auditorium',
        description: 'Tutti i concerti a Roma 2025-2026: Auditorium, Circo Massimo, Stadio Olimpico. Sconto esclusivo 20% per ospiti.',
        keywords: 'concerti roma 2025, auditorium roma, circo massimo concerti, stadio olimpico, santa cecilia'
      }
    },
    {
      path: '/musei',
      name: 'museums',
      component: MuseiPage,
      meta: {
        title: 'Musei e Siti Archeologici Roma | Biglietti e Visite',
        description: 'Scopri i principali musei di Roma: Vaticani, Colosseo, Capitolini, Galleria Borghese. Prenota biglietti e salta la fila!',
        keywords: 'musei roma, musei vaticani, colosseo, pantheon, galleria borghese, capitolini, biglietti musei roma'
      }
    },
    {
      path: '/ristoranti',
      name: 'restaurants',
      component: RestaurantsPage,
      meta: {
        title: 'Ristoranti e Trattorie Romane | Cucina Autentica',
        description: 'Scopri le migliori trattorie romane vicine al nostro appartamento. Carbonara, amatriciana, cacio e pepe: i veri sapori di Roma.',
        keywords: 'ristoranti roma, trattorie romane, carbonara, amatriciana, cacio e pepe, cucina romana'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPage
    },
    {
      path: '/cancellazione',
      name: 'cancellation',
      component: CancellationPage,
      meta: {
        title: 'Politica di Cancellazione | Roma Caput Mundi Apartment',
        description: 'Politica di cancellazione trasparente: rimborso 100% fino a 7 giorni prima. Procedura semplice via WhatsApp o email.',
        keywords: 'cancellazione prenotazione, rimborso, politica cancellazione appartamento roma'
      }
    }
  ],
  scrollBehavior(to, _, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router