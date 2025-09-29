import { db } from '../firebase/config'
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'

export interface Concert {
  id: string
  artist: string
  venue: string
  venueId: string
  date: string
  location: string
  description: string
  status: 'available' | 'sold-out' | 'few-tickets'
  ticketUrl: string
  imageUrl?: string
  price?: string
  lastUpdated: Timestamp
}

// Cache per evitare troppe chiamate a Firestore
let cachedConcerts: Concert[] = []
let cacheTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minuti

/**
 * Ottiene tutti i concerti da Firestore con cache
 */
export async function getAllConcerts(): Promise<Concert[]> {
  // Usa cache se valida
  if (cachedConcerts.length > 0 && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedConcerts
  }

  try {
    const concertsRef = collection(db, 'concerts')
    const q = query(concertsRef, orderBy('date', 'asc'))
    const querySnapshot = await getDocs(q)

    const concerts: Concert[] = []
    querySnapshot.forEach((doc) => {
      concerts.push({
        id: doc.id,
        ...doc.data()
      } as Concert)
    })

    // Filtra concerti non scaduti
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const validConcerts = concerts.filter(concert => {
      const concertDate = new Date(concert.date)
      return concertDate >= today
    })

    // Aggiorna cache
    cachedConcerts = validConcerts
    cacheTime = Date.now()

    console.log(`🎵 Caricati ${validConcerts.length} concerti da Firestore`)
    return validConcerts

  } catch (error) {
    console.error('❌ Errore caricamento concerti da Firestore:', error)

    // Fallback ai concerti statici se Firestore fallisce
    return getFallbackConcerts()
  }
}

/**
 * Ottiene concerti filtrati per venue
 */
export async function getConcertsByVenue(venueId: string): Promise<Concert[]> {
  if (venueId === 'all') {
    return getAllConcerts()
  }

  const allConcerts = await getAllConcerts()
  return allConcerts.filter(concert => concert.venueId === venueId)
}

/**
 * Forza refresh del cache e ricarica da Firestore
 */
export async function refreshConcerts(): Promise<Concert[]> {
  cachedConcerts = []
  cacheTime = 0
  return getAllConcerts()
}

/**
 * Concerti di fallback se Firestore non è disponibile
 */
function getFallbackConcerts(): Concert[] {
  return [
    // Roma Summer Fest 2025 (Auditorium)
    {
      id: '1',
      artist: 'Patti Smith',
      venue: 'Auditorium Parco della Musica',
      venueId: 'auditorium',
      date: '2025-09-15',
      location: 'Cavea',
      description: 'La leggendaria poetessa del rock in concerto nella suggestiva cornice dell\'Auditorium.',
      status: 'available',
      ticketUrl: 'https://www.auditorium.com/it/eventi/patti-smith-quartet/',
      lastUpdated: Timestamp.now()
    },
    {
      id: '2',
      artist: 'Stereophonics',
      venue: 'Auditorium Parco della Musica',
      venueId: 'auditorium',
      date: '2025-08-29',
      location: 'Cavea',
      description: 'I giganti del rock gallese tornano a Roma con il loro sound inconfondibile.',
      status: 'few-tickets',
      ticketUrl: 'https://www.auditorium.com/it/eventi/stereophonics/',
      lastUpdated: Timestamp.now()
    },
    {
      id: '3',
      artist: 'Morrissey',
      venue: 'Auditorium Parco della Musica',
      venueId: 'auditorium',
      date: '2025-07-28',
      location: 'Sala Santa Cecilia',
      description: 'L\'ex frontman degli Smiths in un concerto esclusivo e imperdibile.',
      status: 'available',
      ticketUrl: 'https://www.auditorium.com/it/eventi/morrissey/',
      lastUpdated: Timestamp.now()
    },
    // Santa Cecilia 2025/26
    {
      id: '5',
      artist: 'Wagner - La Valchiria',
      venue: 'Accademia Santa Cecilia',
      venueId: 'santa-cecilia',
      date: '2025-10-23',
      location: 'Sala Santa Cecilia',
      description: 'L\'Opera immortale di Wagner diretta da Antonio Pappano con cast internazionale.',
      status: 'available',
      ticketUrl: 'https://www.santacecilia.it/it/concerti/wagner-la-valchiria/',
      lastUpdated: Timestamp.now()
    },
    {
      id: '6',
      artist: 'Mahler - Sinfonia n.3',
      venue: 'Accademia Santa Cecilia',
      venueId: 'santa-cecilia',
      date: '2025-12-18',
      location: 'Sala Santa Cecilia',
      description: 'La monumentale Terza Sinfonia di Mahler con l\'Orchestra di Santa Cecilia.',
      status: 'few-tickets',
      ticketUrl: 'https://www.santacecilia.it/it/concerti/mahler-sinfonia-3/',
      lastUpdated: Timestamp.now()
    }
  ]
}

/**
 * Utility per verificare se i concerti sono aggiornati di recente
 */
export function isConcertDataFresh(): boolean {
  return Date.now() - cacheTime < CACHE_DURATION
}

/**
 * Ottiene timestamp ultimo aggiornamento
 */
export function getLastUpdateTime(): Date | null {
  return cacheTime > 0 ? new Date(cacheTime) : null
}