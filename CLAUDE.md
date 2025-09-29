# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- **Development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview build**: `npm run preview`
- **TypeScript check**: `vue-tsc -b` (part of build process)

### Firebase Commands
- **Deploy functions**: `cd functions && npm run deploy`
- **Build and serve functions locally**: `cd functions && npm run serve`
- **Function logs**: `cd functions && npm run logs`
- **Check function config**: `npx firebase-tools functions:config:get`

## Architecture Overview

This is a Vue 3 + TypeScript single-page application for a luxury apartment rental in Rome. The app focuses on direct bookings through an integrated contact system with dual email notifications.

### Key Technologies
- **Frontend**: Vue 3 (Composition API only), TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Email**: EmailJS (primary) with Firebase Functions as backup
- **Routing**: Vue Router with Italian route names
- **Build**: Vite with vue-tsc for TypeScript checking
- **I18n**: Vue-i18n with Italian (primary) and English support

### Critical Constraint
**All components MUST use `<script setup lang="ts">` syntax exclusively.** Never use Options API.

## Data Flow Architecture

1. **Contact Form Submission**:
   - User submits form → Validation
   - Save to Firestore `bookings` collection (always, even if email fails)
   - Send dual emails via EmailJS (admin notification + customer confirmation)
   - Show success/error feedback to user

2. **Admin Authentication**:
   - Firebase Auth with email/password
   - Protected route at `/admin` with navigation guard
   - Admin dashboard for viewing/deleting bookings

3. **Concert Management**:
   - Firestore `concerts` collection (primary source)
   - 5-minute cache in `src/services/concerts.ts`
   - Automatic filtering of expired concerts (date < today)
   - Fallback to static concerts if Firestore unavailable

## Core Services & Stores

### Stores (`src/stores/`)
Composable stores using Vue 3 reactivity:
- `bookings.ts`: CRUD operations for bookings with Firestore
  - `addBooking()`: Creates booking in Firestore
  - `fetchBookings()`: Retrieves all bookings sorted by date
  - `deleteBooking()`: Removes booking from Firestore
- `auth.ts`: Firebase authentication state management
- `visitors.ts`: Visitor tracking for analytics

### Services (`src/services/`)
- `email.ts`: Dual EmailJS email system
  - Admin notification email (required)
  - Customer confirmation email (optional, configured via `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID`)
  - Special handling for problematic domains (Hotmail/Outlook/Live)
  - Detailed error logging for debugging
- `bookings.ts`: Wrapper around Firestore operations
- `concerts.ts`: Concert data with caching
  - `getAllConcerts()`: Fetch with 5-min cache
  - `getConcertsByVenue()`: Filter by venue ID
  - `refreshConcerts()`: Force cache invalidation

## Email System Architecture

**Dual email system for reliability:**

1. **Primary: EmailJS** (client-side)
   - Immediate feedback to user
   - Two templates: admin notification + customer confirmation
   - Known issue: Hotmail/Outlook/Live domains may fail (400 error)
   - Configuration in `.env`: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

2. **Backup: Firebase Functions** (server-side)
   - Nodemailer with Aruba SMTP or Gmail
   - More reliable but requires Firebase deployment
   - Configuration via `firebase functions:config:set`

**Important**: Booking is always saved to Firestore regardless of email success/failure.

## Route Structure

Italian route names (SEO optimized):
- `/` - Home page
- `/servizi` - Services
- `/galleria` - Gallery
- `/recensioni` - Reviews
- `/contatti` - Contact form
- `/concerti` - Concerts (with SEO meta)
- `/musei` - Museums (with SEO meta)
- `/ristoranti` - Restaurants (with SEO meta)
- `/admin` - Admin dashboard (protected)
- `/privacy` - Privacy policy
- `/cancellazione` - Cancellation policy (with SEO meta)

**Scroll behavior**: Smooth scroll with hash navigation support (`scrollBehavior` in router)

## Component Architecture

### Component Types
1. **Page Components** (`src/views/`): One per route
2. **Section Components** (`src/components/`): Reusable sections (Hero, Services, Gallery, Reviews, Contact, Footer, Header)
3. **Preview Components** (`src/components/`): Home page previews (ServicesPreview, GalleryPreview, ReviewsPreview, ConcertiPreview, MuseiPreview, RestaurantsPreview)

### Composition API Pattern
All components use `<script setup lang="ts">`:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Define props with TypeScript
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Define emits with TypeScript
const emit = defineEmits<{
  submit: [value: string]
}>()

// Composables
const { t, locale } = useI18n()

// Reactive state
const isOpen = ref(false)
</script>
```

## Firebase Configuration

### Firestore Collections
- `bookings`: Contact form submissions
  - Fields: `name`, `email`, `phone`, `checkIn`, `checkOut`, `guests`, `message`, `status`, `createdAt`
  - Status: `'pending' | 'confirmed' | 'cancelled'`
- `concerts`: Concert listings
  - Fields: `artist`, `venue`, `venueId`, `date`, `location`, `description`, `status`, `ticketUrl`, `imageUrl?`, `price?`, `lastUpdated`
  - Automatically filtered by date (past concerts hidden)

### Firebase Auth
- Email/password authentication for admin access
- Single admin user (no user registration)

### Firebase Functions (Optional)
- `sendBookingEmail`: Backup email notification
- Uses Nodemailer with SMTP (Aruba or Gmail)

## Styling System

### Tailwind Configuration
Custom color palette inspired by AS Roma:
- `roma` / `roma-red`: Red shades (primary brand color #8E1F2F)
- `gold` / `roma-gold`: Gold accents (#F0BC42)
- `neutral`: Grayscale palette
- `cream`: Soft cream tones
- `sage`: Muted green accents

### Custom Gradients
- `bg-gradient-roma`: Main brand gradient
- `bg-gradient-hero`: Subtle hero section overlay
- `bg-gradient-warm`: Warm section backgrounds

### Mobile Optimization
- Safari/iPhone compatibility fixes in form components
- Touch-friendly interactions
- Responsive design with Tailwind breakpoints

## I18n Implementation

### Language Detection
1. Check `localStorage.getItem('preferred-language')`
2. Fallback to browser language (`navigator.language`)
3. Default to Italian if neither available

### Translation Files
- `src/i18n/locales/it.json`: Italian (primary)
- `src/i18n/locales/en.json`: English (secondary)

### Usage in Components
```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>

<template>
  <h1>{{ t('hero.title') }}</h1>
  <button @click="locale = locale === 'it' ? 'en' : 'it'">
    {{ locale === 'it' ? 'EN' : 'IT' }}
  </button>
</template>
```

## Environment Variables

Required for EmailJS (all `VITE_*` variables are publicly exposed in build):
```bash
VITE_EMAILJS_SERVICE_ID=service_rcm_booking
VITE_EMAILJS_TEMPLATE_ID=template_booking
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_customer_confirmation  # Optional
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Security Note**: Firebase config in `src/firebase/config.ts` is intentionally public (required for client-side Firebase SDK).

## Error Handling Patterns

### EmailJS Errors
- All errors logged to console with detailed context
- Problematic domains (Hotmail/Outlook/Live) detected and logged
- Email failure does NOT prevent booking save
- User sees generic success message (booking saved) even if email fails

### Firestore Errors
- Try/catch blocks with user-friendly error messages
- Loading states managed via `isLoading` refs
- Admin authentication failures redirect to login

## Deployment

### Static Hosting (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Configure environment variables in hosting platform
4. Add `_redirects` file for SPA routing: `/* /index.html 200`

### Firebase Functions (Optional)
1. Build: `cd functions && npm run build`
2. Deploy: `cd functions && npm run deploy`
3. Configure: `npx firebase-tools functions:config:set gmail.email="your-email" gmail.password="app-password"`

## Development Notes

- **No ESLint/Prettier**: Not currently configured
- **No tests**: Consider adding Vitest for component testing
- **TypeScript strict mode**: Enabled with unused variable checking
- **Git branch**: `main` (use for PRs)

## Important Reference Files

- `EMAILJS_SETUP.md`: Step-by-step EmailJS configuration with template HTML
- `FIREBASE_EMAIL_SETUP.md`: Firebase Functions email setup with Gmail app password
- `src/types/index.ts`: TypeScript interfaces (`Booking`, `Concert`, `Service`, `Testimonial`)
- `tailwind.config.js`: Complete color palette and custom utilities