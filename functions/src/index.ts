import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as cheerio from 'cheerio';
import * as https from 'https';
import * as http from 'http';

// Initialize Firebase Admin
admin.initializeApp();

interface BookingData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
}

interface Concert {
  id: string;
  artist: string;
  venue: string;
  venueId: string;
  date: string;
  location: string;
  description: string;
  status: 'available' | 'sold-out' | 'few-tickets';
  ticketUrl: string;
  imageUrl?: string;
  price?: string;
  lastUpdated: admin.firestore.Timestamp;
}

// Configurazione SMTP Aruba
const smtpEmail = functions.config().smtp?.email || 'info@romacaputmundiapt.it';
const smtpPassword = functions.config().smtp?.password || '';

const transporter = nodemailer.createTransport({
  host: 'smtps.aruba.it',
  port: 465,
  secure: true,
  auth: {
    user: smtpEmail,
    pass: smtpPassword
  }
});

// Cloud Function per inviare email di notifica booking
export const sendBookingNotification = functions.https.onCall(async (data: BookingData, context) => {
  try {
    // Verifica che i dati richiesti siano presenti
    if (!data.name || !data.email || !data.checkIn || !data.checkOut) {
      throw new functions.https.HttpsError('invalid-argument', 'Dati richiesti mancanti');
    }

    // Calcola numero di notti
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Email 1: Notifica per admin
    const adminEmailHTML = createBookingEmailTemplate(data, nights);
    const adminMailOptions = {
      from: `"Roma Caput Mundi Booking" <${smtpEmail}>`,
      to: 'info@romacaputmundiapt.it',
      replyTo: data.email,
      subject: `🏛️ Nuova Prenotazione - ${data.name} (${checkIn.toLocaleDateString('it-IT')} - ${checkOut.toLocaleDateString('it-IT')})`,
      html: adminEmailHTML,
      text: createBookingEmailText(data, nights)
    };

    // Email 2: Conferma automatica per cliente
    const customerEmailHTML = createCustomerConfirmationTemplate(data, nights);
    const customerMailOptions = {
      from: `"Roma Caput Mundi Apartment" <${smtpEmail}>`,
      to: data.email,
      replyTo: 'info@romacaputmundiapt.it',
      subject: `✅ Richiesta ricevuta - Roma Caput Mundi Apartment`,
      html: customerEmailHTML,
      text: createCustomerConfirmationText(data, nights)
    };

    // Invia entrambe le email
    const [adminResult, customerResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log('✅ Email admin inviata:', adminResult.messageId);
    console.log('✅ Email conferma cliente inviata:', customerResult.messageId);

    return {
      success: true,
      adminMessageId: adminResult.messageId,
      customerMessageId: customerResult.messageId,
      message: 'Email di notifica e conferma inviate con successo'
    };

  } catch (error) {
    console.error('❌ Errore invio email:', error);
    throw new functions.https.HttpsError('internal', 'Errore nell\'invio email', error);
  }
});

// Funzione per creare template HTML email
function createBookingEmailTemplate(data: BookingData, nights: number): string {
  const bookingDate = new Date().toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuova Prenotazione - ${data.name}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8E1F2F, #cc2d56); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .booking-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #8E1F2F; }
        .value { color: #333; }
        .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #F0BC42; margin: 20px 0; }
        .action-box { background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏛️ Nuova Richiesta di Prenotazione</h1>
            <p>Roma Caput Mundi Apartment</p>
        </div>
        
        <div class="highlight">
            <strong>📧 Nuova richiesta ricevuta dal sito web</strong><br>
            Data e ora: ${bookingDate}
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">👤 Dati Cliente</h3>
            <div class="info-row">
                <span class="label">Nome:</span>
                <span class="value">${data.name}</span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
            </div>
            <div class="info-row">
                <span class="label">Telefono:</span>
                <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
            </div>
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">🗓️ Dettagli Soggiorno</h3>
            <div class="info-row">
                <span class="label">Check-in:</span>
                <span class="value">${new Date(data.checkIn).toLocaleDateString('it-IT')}</span>
            </div>
            <div class="info-row">
                <span class="label">Check-out:</span>
                <span class="value">${new Date(data.checkOut).toLocaleDateString('it-IT')}</span>
            </div>
            <div class="info-row">
                <span class="label">Notti:</span>
                <span class="value">${nights} ${nights === 1 ? 'notte' : 'notti'}</span>
            </div>
            <div class="info-row">
                <span class="label">Ospiti:</span>
                <span class="value">${data.guests} ${data.guests === 1 ? 'persona' : 'persone'}</span>
            </div>
        </div>

        ${data.message ? `
        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">💬 Messaggio del Cliente</h3>
            <p style="margin: 0; line-height: 1.6; background: white; padding: 15px; border-radius: 5px;">${data.message}</p>
        </div>
        ` : ''}

        <div class="action-box">
            <strong>⚡ Azione Richiesta:</strong><br>
            Rispondere entro 2 ore tramite:
            <ul style="margin: 10px 0;">
                <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/${data.phone.replace(/\D/g, '')}">${data.phone}</a></li>
            </ul>
        </div>

        <div class="footer">
            <p>Inviato automaticamente dal sito <strong>romacaputmundiapt.it</strong></p>
            <p>Roma Caput Mundi Apartment | Via R.R. Pereira n. 33 | Licenza: 058091-CAV-12914</p>
            <p style="margin-top: 10px; font-size: 10px; color: #999;">
                Per rispondere a questa email, clicca rispondi o scrivi direttamente a ${data.email}
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

// Funzione per creare versione testo email
function createBookingEmailText(data: BookingData, nights: number): string {
  const bookingDate = new Date().toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
🏛️ NUOVA RICHIESTA DI PRENOTAZIONE - Roma Caput Mundi

📧 Richiesta ricevuta dal sito web: ${bookingDate}

👤 DATI CLIENTE:
Nome: ${data.name}
Email: ${data.email}
Telefono: ${data.phone}

🗓️ DETTAGLI SOGGIORNO:
Check-in: ${new Date(data.checkIn).toLocaleDateString('it-IT')}
Check-out: ${new Date(data.checkOut).toLocaleDateString('it-IT')}
Notti: ${nights} ${nights === 1 ? 'notte' : 'notti'}
Ospiti: ${data.guests} ${data.guests === 1 ? 'persona' : 'persone'}

${data.message ? `💬 MESSAGGIO DEL CLIENTE:\n${data.message}\n\n` : ''}

⚡ AZIONE RICHIESTA:
Rispondere entro 2 ore tramite email (${data.email}) o WhatsApp (${data.phone})

---
Inviato automaticamente dal sito romacaputmundiapt.it
Roma Caput Mundi Apartment | Via R.R. Pereira n. 33 | Licenza: 058091-CAV-12914
  `.trim();
}

// Funzione per creare template HTML email di conferma per cliente
function createCustomerConfirmationTemplate(data: BookingData, nights: number): string {
  const bookingDate = new Date().toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Conferma Richiesta - Roma Caput Mundi</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8E1F2F, #cc2d56); color: white; padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 26px; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .welcome { background: #d4edda; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0; border-radius: 5px; }
        .booking-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #8E1F2F; }
        .value { color: #333; }
        .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #F0BC42; margin: 20px 0; border-radius: 5px; }
        .contact-info { background: #e7f3ff; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; line-height: 1.5; }
        .brand { color: #8E1F2F; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Richiesta Ricevuta!</h1>
            <p>Roma Caput Mundi Apartment</p>
        </div>

        <div class="welcome">
            <strong>Gentile ${data.name},</strong><br><br>
            Grazie per aver scelto <span class="brand">Roma Caput Mundi Apartment</span>!
            La sua richiesta di disponibilità è stata ricevuta con successo e sarà processata al più presto.
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">📋 Riepilogo della sua richiesta</h3>
            <div class="info-row">
                <span class="label">Periodo richiesto:</span>
                <span class="value">${new Date(data.checkIn).toLocaleDateString('it-IT')} - ${new Date(data.checkOut).toLocaleDateString('it-IT')}</span>
            </div>
            <div class="info-row">
                <span class="label">Durata soggiorno:</span>
                <span class="value">${nights} ${nights === 1 ? 'notte' : 'notti'}</span>
            </div>
            <div class="info-row">
                <span class="label">Numero ospiti:</span>
                <span class="value">${data.guests} ${data.guests === 1 ? 'persona' : 'persone'}</span>
            </div>
            <div class="info-row">
                <span class="label">Data richiesta:</span>
                <span class="value">${bookingDate}</span>
            </div>
        </div>

        <div class="highlight">
            <strong>⏰ Cosa succede ora?</strong><br>
            Il nostro team verificherà la disponibilità per le date richieste e le invieremo entro <strong>2 ore</strong> tutte le informazioni necessarie, inclusi:
            <ul style="margin: 10px 0;">
                <li><strong>Conferma disponibilità</strong> per il periodo richiesto</li>
                <li><strong>Prezzi dettagliati</strong> e eventuali offerte attive</li>
                <li><strong>Modalità di pagamento</strong> e condizioni di prenotazione</li>
                <li><strong>Informazioni logistiche</strong> su come raggiungerci</li>
                <li><strong>Servizi inclusi</strong> e opzioni aggiuntive</li>
            </ul>
        </div>

        <div class="contact-info">
            <h3 style="color: #0066cc; margin-top: 0;">📞 Contatti Rapidi</h3>
            <p><strong>Per urgenze o domande immediate:</strong></p>
            <ul style="margin: 10px 0;">
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/393204933807">+39 320 49 33 807</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@romacaputmundiapt.it">info@romacaputmundiapt.it</a></li>
                <li><strong>Telefono:</strong> +39 320 49 33 807</li>
            </ul>
            <p style="margin-top: 15px; font-size: 14px; color: #555;">
                <strong>Orari di risposta:</strong> Lunedì-Domenica 8:00-22:00<br>
                <strong>Tempo di risposta medio:</strong> 1-2 ore
            </p>
        </div>

        <div class="booking-info">
            <h3 style="color: #8E1F2F; margin-top: 0;">🏛️ Perché scegliere Roma Caput Mundi?</h3>
            <ul style="margin: 10px 0; line-height: 1.6;">
                <li><strong>Posizione strategica:</strong> A pochi passi dal centro di Roma</li>
                <li><strong>Comfort moderno:</strong> Appartamento completamente ristrutturato</li>
                <li><strong>Servizio personalizzato:</strong> Assistenza dedicata 7/7</li>
                <li><strong>Esperienza autentica:</strong> Vivi Roma come un locale</li>
            </ul>
        </div>

        <div class="footer">
            <p><strong>Roma Caput Mundi Apartment</strong></p>
            <p>📍 Via Romeo Rodriguez Pereira n. 33, 00136 Roma</p>
            <p>🏛️ Licenza: 058091-CAV-12914 | CIN: IT058091B4DGY9ABNC</p>
            <br>
            <p style="font-size: 11px; color: #999;">
                Questa è una email automatica di conferma. Per qualsiasi domanda,
                non esiti a contattarci ai recapiti sopra indicati.
            </p>
            <p style="font-size: 11px; color: #999;">
                Email ricevuta: ${data.email} | Richiesta del: ${bookingDate}
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

// Funzione per creare versione testo email di conferma per cliente
function createCustomerConfirmationText(data: BookingData, nights: number): string {
  const bookingDate = new Date().toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
✅ RICHIESTA RICEVUTA - Roma Caput Mundi Apartment

Gentile ${data.name},

Grazie per aver scelto Roma Caput Mundi Apartment!
La sua richiesta di disponibilità è stata ricevuta con successo.

📋 RIEPILOGO RICHIESTA:
Periodo: ${new Date(data.checkIn).toLocaleDateString('it-IT')} - ${new Date(data.checkOut).toLocaleDateString('it-IT')}
Durata: ${nights} ${nights === 1 ? 'notte' : 'notti'}
Ospiti: ${data.guests} ${data.guests === 1 ? 'persona' : 'persone'}
Data richiesta: ${bookingDate}

⏰ PROSSIMI PASSI:
Il nostro team verificherà la disponibilità e le invieremo entro 2 ore:
• Conferma disponibilità per il periodo richiesto
• Prezzi dettagliati e eventuali offerte attive
• Modalità di pagamento e condizioni
• Informazioni logistiche su come raggiungerci
• Servizi inclusi e opzioni aggiuntive

📞 CONTATTI RAPIDI:
WhatsApp: +39 320 49 33 807
Email: info@romacaputmundiapt.it
Telefono: +39 320 49 33 807

Orari: Lunedì-Domenica 8:00-22:00
Tempo di risposta medio: 1-2 ore

🏛️ PERCHÉ ROMA CAPUT MUNDI:
• Posizione strategica a pochi passi dal centro
• Appartamento completamente ristrutturato
• Servizio personalizzato 7/7
• Esperienza autentica di Roma

---
Roma Caput Mundi Apartment
Via Romeo Rodriguez Pereira n. 33, 00136 Roma
Licenza: 058091-CAV-12914 | CIN: IT058091B4DGY9ABNC

Email automatica di conferma - Per domande contattaci ai recapiti sopra
  `.trim();
}

// Cloud Function per scraping concerti manuale (HTTP)
export const scrapeConcerts = functions.https.onRequest(async (req, res) => {
  try {
    console.log('🎵 Inizio scraping concerti...');

    const concerts: Concert[] = [];
    const db = admin.firestore();

    // Scraping Auditorium Parco della Musica
    console.log('📍 Scraping Auditorium...');
    const auditoriumConcerts = await scrapeAuditorium();
    concerts.push(...auditoriumConcerts);

    // Scraping Santa Cecilia
    console.log('📍 Scraping Santa Cecilia...');
    const santaCeciliaConcerts = await scrapeSantaCecilia();
    concerts.push(...santaCeciliaConcerts);

    // Filtra eventi scaduti (eventi passati da più di 1 giorno)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const validConcerts = concerts.filter(concert => {
      const concertDate = new Date(concert.date);
      return concertDate >= today;
    });

    console.log(`✅ Trovati ${concerts.length} concerti, ${validConcerts.length} validi`);

    // Salva in Firestore
    const batch = db.batch();
    const concertsRef = db.collection('concerts');

    // Cancella concerti esistenti
    const existingConcerts = await concertsRef.get();
    existingConcerts.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Aggiungi nuovi concerti
    validConcerts.forEach(concert => {
      const docRef = concertsRef.doc(concert.id);
      batch.set(docRef, {
        ...concert,
        lastUpdated: admin.firestore.Timestamp.now()
      });
    });

    await batch.commit();

    console.log(`🎯 Salvati ${validConcerts.length} concerti in Firestore`);

    res.status(200).json({
      success: true,
      message: `Scraping completato: ${validConcerts.length} concerti salvati`,
      concerts: validConcerts.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Errore scraping:', error);
    res.status(500).json({
      success: false,
      error: 'Errore durante il scraping',
      details: error
    });
  }
});

// Helper function per HTTP requests
function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = url.startsWith('https://') ? https : http;
    request.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
      response.on('error', reject);
    }).on('error', reject);
  });
}

// Funzione per scraping Auditorium
async function scrapeAuditorium(): Promise<Concert[]> {
  const concerts: Concert[] = [];

  try {
    // Prima prova con l'endpoint AJAX che abbiamo trovato
    const ajaxData = await httpGet('https://www.auditorium.com/en/ajax/events/list/');
    const data: any = JSON.parse(ajaxData);

    if (data.data && Array.isArray(data.data)) {
        data.data.forEach((event: any, index: number) => {
          if (event.title && event.event_date) {
            concerts.push({
              id: `auditorium-${event.id || index}`,
              artist: event.title,
              venue: 'Auditorium Parco della Musica',
              venueId: 'auditorium',
              date: event.event_date,
              location: event.room || 'Auditorium',
              description: cleanText(event.content || `${event.title} in concerto all'Auditorium Parco della Musica`),
              status: determineStatus(event.status, event.can_buy),
              ticketUrl: event.buy_link || event.url || 'https://www.auditorium.com/',
              imageUrl: event.image || undefined,
              price: event.minimum_price || undefined,
              lastUpdated: admin.firestore.Timestamp.now()
            });
          }
        });
      }

      console.log(`🎼 Trovati ${concerts.length} concerti Auditorium via API`);

  } catch (error) {
    console.error('⚠️ Errore scraping Auditorium API:', error);

    // Fallback: scraping HTML della pagina eventi
    try {
      const html = await httpGet('https://www.auditorium.com/it/eventi/');
      const $ = cheerio.load(html);

      $('.event-item, .evento, .card').each((index, element) => {
        const $event = $(element);
        const title = $event.find('h3, h2, .title, .event-title').first().text().trim();
        const dateText = $event.find('.date, .data, .event-date').first().text().trim();
        const location = $event.find('.location, .venue, .luogo').first().text().trim();
        const link = $event.find('a').first().attr('href');

        if (title && dateText) {
          const eventDate = parseItalianDate(dateText);
          if (eventDate) {
            concerts.push({
              id: `auditorium-html-${index}`,
              artist: title,
              venue: 'Auditorium Parco della Musica',
              venueId: 'auditorium',
              date: eventDate.toISOString().split('T')[0],
              location: location || 'Auditorium',
              description: `${title} in concerto all'Auditorium Parco della Musica`,
              status: 'available' as const,
              ticketUrl: link ? `https://www.auditorium.com${link}` : 'https://www.auditorium.com/',
              lastUpdated: admin.firestore.Timestamp.now()
            });
          }
        }
      });

      console.log(`🎼 Trovati ${concerts.length} concerti Auditorium totali`);

    } catch (htmlError) {
      console.error('⚠️ Errore anche con scraping HTML:', htmlError);
    }
  }

  return concerts;
}

// Funzione per scraping Santa Cecilia
async function scrapeSantaCecilia(): Promise<Concert[]> {
  const concerts: Concert[] = [];

  try {
    const html = await httpGet('https://www.santacecilia.it/it/concerti/');
    const $ = cheerio.load(html);

    $('.event, .concerto, .card').each((index, element) => {
      const $event = $(element);
      const title = $event.find('h3, h2, .title').first().text().trim();
      const dateText = $event.find('.date, .data').first().text().trim();
      const location = $event.find('.location, .venue, .sala').first().text().trim();
      const link = $event.find('a').first().attr('href');

      if (title && dateText) {
        const eventDate = parseItalianDate(dateText);
        if (eventDate) {
          concerts.push({
            id: `santa-cecilia-${index}`,
            artist: title,
            venue: 'Accademia Santa Cecilia',
            venueId: 'santa-cecilia',
            date: eventDate.toISOString().split('T')[0],
            location: location || 'Sala Santa Cecilia',
            description: `${title} con l'Orchestra di Santa Cecilia`,
            status: 'available' as const,
            ticketUrl: link ? `https://www.santacecilia.it${link}` : 'https://www.santacecilia.it/biglietteria',
            lastUpdated: admin.firestore.Timestamp.now()
          });
        }
      }
    });

    console.log(`🎻 Trovati ${concerts.length} concerti Santa Cecilia`);

  } catch (error) {
    console.error('⚠️ Errore scraping Santa Cecilia:', error);
  }

  return concerts;
}

// Utility functions
function cleanText(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim().slice(0, 200);
}

function determineStatus(status: any, canBuy: boolean): 'available' | 'sold-out' | 'few-tickets' {
  if (!canBuy || status === 'sold-out' || status === 'esaurito') return 'sold-out';
  if (status === 'few-tickets' || status === 'pochi-posti') return 'few-tickets';
  return 'available';
}

function parseItalianDate(dateStr: string): Date | null {
  try {
    // Cerca pattern come "15 settembre 2025" o "15/09/2025" o "2025-09-15"
    const months = [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];

    // Pattern "15 settembre 2025"
    const italianMatch = dateStr.match(/(\d{1,2})\s+(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\s+(\d{4})/i);
    if (italianMatch) {
      const day = parseInt(italianMatch[1]);
      const monthIndex = months.findIndex(m => m.toLowerCase() === italianMatch[2].toLowerCase());
      const year = parseInt(italianMatch[3]);
      return new Date(year, monthIndex, day);
    }

    // Pattern "15/09/2025" o "2025-09-15"
    const numericMatch = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})|(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (numericMatch) {
      if (numericMatch[1]) {
        // DD/MM/YYYY
        return new Date(parseInt(numericMatch[3]), parseInt(numericMatch[2]) - 1, parseInt(numericMatch[1]));
      } else {
        // YYYY/MM/DD
        return new Date(parseInt(numericMatch[4]), parseInt(numericMatch[5]) - 1, parseInt(numericMatch[6]));
      }
    }

    return null;
  } catch (error) {
    console.error('Errore parsing data:', dateStr, error);
    return null;
  }
}

// Per ora rimuoviamo la funzione schedulata per evitare i costi del Cloud Scheduler
// Usiamo la funzione HTTP manuale o implementiamo una chiamata esterna gratuita
//
// NOTA: Per auto-aggiornamento automatico, utilizzare servizi esterni come:
// 1. GitHub Actions con cron (gratis)
// 2. Cron-job.org (gratis)
// 3. Vercel Cron (gratis per progetti piccoli)
//
// Questi servizi possono chiamare l'endpoint HTTP scrapeConcerts ogni giorno