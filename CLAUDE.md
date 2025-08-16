# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- **Development server**: `npm run dev`
- **Build for production**: `npm run build` 
- **Preview build**: `npm run preview`
- **TypeScript check**: `vue-tsc -b` (part of build process)

### Firebase Commands
- **Deploy functions**: `cd functions && npm run build && cd .. && npx firebase-tools deploy --only functions`
- **Check function config**: `npx firebase-tools functions:config:get`

## Architecture Overview

This is a Vue 3 + TypeScript single-page application for a luxury apartment rental in Rome. The app focuses on direct bookings through an integrated contact system.

### Key Technologies
- **Frontend**: Vue 3 with Composition API, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Email**: EmailJS for client-side email sending with Firebase Functions as backup
- **Routing**: Vue Router with Italian route names
- **Build**: Vite with vue-tsc for TypeScript checking

### Data Flow Architecture
1. **Contact Form** → Firebase Firestore (always saved) + EmailJS (notification)
2. **Admin Authentication** → Firebase Auth → Admin dashboard access
3. **Booking Management** → Firebase Firestore with real-time updates

### Core Store Pattern
The app uses composable stores in `src/stores/`:
- `bookings.ts`: Reactive booking management with Firestore integration
- `auth.ts`: Firebase authentication state
- `visitors.ts`: Visitor tracking

### Email System Architecture
Dual email system for reliability:
1. **Primary**: EmailJS (client-side, immediate feedback)
2. **Backup**: Firebase Functions with Gmail SMTP (server-side)

Both systems use the same template structure and handle problematic email domains (Hotmail/Outlook).

### Route Structure
- Italian route names (`/servizi`, `/galleria`, `/recensioni`, `/contatti`)
- SEO meta tags configured per route for content pages
- Admin area at `/admin` with authentication guard
- Smooth scroll behavior and hash navigation support

### Component Architecture
- **Page Components**: Views in `src/views/` for each route
- **Reusable Components**: `src/components/` with specific sections (Hero, Services, Gallery, etc.)
- **Preview Components**: Specialized components for home page previews of other sections

### Firebase Configuration
- **Authentication**: Email/password for admin access
- **Firestore**: `bookings` collection with automatic timestamps
- **Functions**: Email notification system (optional, EmailJS is primary)

### Styling System
- **Tailwind**: Extended with Roma/Roman color scheme (red/gold AS Roma colors)
- **Custom gradients**: Roma-themed background gradients
- **Responsive**: Mobile-first design with desktop enhancements

### Critical Files
- `src/firebase/config.ts`: Firebase setup (credentials are public/exposed)
- `src/services/email.ts`: EmailJS integration with detailed error logging
- `src/services/bookings.ts`: Firestore operations for booking management
- `src/router/index.ts`: Route definitions with SEO meta

### Environment Variables (VITE_)
Required for EmailJS functionality:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID` 
- `VITE_EMAILJS_PUBLIC_KEY`

Note: VITE_ variables are publicly exposed in the build.

### Error Handling Patterns
- EmailJS failures are logged but don't prevent booking save
- Problematic email domains (Hotmail/Outlook) have special handling
- Admin authentication failures redirect to login
- Database operations have try/catch with user feedback

### Deployment Notes
- Built for static hosting (Vercel/Netlify)
- Uses `_redirects` file for SPA routing support
- Firebase Functions require separate deployment
- All environment variables must be configured in hosting platform

## Important Files to Review
- `EMAILJS_SETUP.md`: Complete EmailJS configuration guide
- `FIREBASE_EMAIL_SETUP.md`: Firebase Functions email setup
- `src/types/index.ts`: TypeScript interfaces for Booking and other models
- `firestore.rules`: Database security rules