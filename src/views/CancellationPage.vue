<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-xl font-serif font-bold text-roman-700">{{ $t('cancellation.back_to_home') }}</span>
          </router-link>
          <h1 class="text-2xl font-bold text-gray-900">{{ $t('cancellation.title') }}</h1>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <div class="prose prose-lg max-w-none">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ $t('cancellation.title') }}</h1>
          
          <p class="text-gray-600 mb-8">
            <strong>{{ $t('cancellation.effective_date') }}</strong> {{ currentDate }}
          </p>

          <div class="bg-green-50 p-6 rounded-lg border border-green-200 mb-8">
            <h2 class="text-2xl font-semibold text-green-800 mb-4 flex items-center">
              <CheckCircleIcon class="mr-3 h-6 w-6" />
              {{ $t('cancellation.sections.full_refund.title') }}
            </h2>
            <p class="text-green-700 text-lg">
              {{ $t('cancellation.sections.full_refund.description') }}
            </p>
          </div>
          
          <div class="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
            <h2 class="text-2xl font-semibold text-amber-800 mb-4 flex items-center">
              <AlertTriangleIcon class="mr-3 h-6 w-6" />
              {{ $t('cancellation.sections.cancellation_penalty.title') }}
            </h2>
            <p class="text-amber-700 text-lg">
              {{ $t('cancellation.sections.cancellation_penalty.description') }}
            </p>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
            <h2 class="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
              <MessageCircleIcon class="mr-3 h-6 w-6" />
              {{ $t('cancellation.sections.refund_request.title') }}
            </h2>
            <p class="text-blue-700 text-lg mb-4">
              {{ $t('cancellation.sections.refund_request.description') }}
            </p>
            <div class="space-y-3">
              <div class="flex items-center bg-white p-4 rounded-lg">
                <MessageCircleIcon class="mr-3 h-5 w-5 text-green-600" />
                <div>
                  <strong class="text-gray-900">{{ $t('cancellation.sections.refund_request.contacts.whatsapp').split(':')[0] }}:</strong>
                  <a href="https://wa.me/393204933807" class="text-blue-600 hover:text-blue-800 ml-2">{{ $t('cancellation.sections.refund_request.contacts.whatsapp').split(':')[1] }}</a>
                </div>
              </div>
              <div class="flex items-center bg-white p-4 rounded-lg">
                <MailIcon class="mr-3 h-5 w-5 text-blue-600" />
                <div>
                  <strong class="text-gray-900">{{ $t('cancellation.sections.refund_request.contacts.email').split(':')[0] }}:</strong>
                  <a href="mailto:info@romacaputmundiapt.it" class="text-blue-600 hover:text-blue-800 ml-2">{{ $t('cancellation.sections.refund_request.contacts.email').split(':')[1] }}</a>
                </div>
              </div>
            </div>
            <div class="mt-4 p-4 bg-blue-100 rounded border border-blue-300">
              <p class="text-sm text-blue-800">
                {{ $t('cancellation.sections.refund_request.paypal_note') }}
              </p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <ShieldCheckIcon class="mr-3 h-6 w-6" />
              {{ $t('cancellation.sections.legal_protection.title') }}
            </h2>
            <p class="text-gray-700 text-lg">
              {{ $t('cancellation.sections.legal_protection.description') }}
            </p>
          </div>

          <div class="bg-roma-50 p-6 rounded-lg border border-roma-200">
            <h2 class="text-2xl font-semibold text-roma-800 mb-4">{{ $t('cancellation.sections.booking_process.title') }}</h2>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li>{{ $t('cancellation.sections.booking_process.steps.availability') }}</li>
              <li>{{ $t('cancellation.sections.booking_process.steps.confirmation') }}</li>
              <li>{{ $t('cancellation.sections.booking_process.steps.payment') }}</li>
              <li>{{ $t('cancellation.sections.booking_process.steps.final_confirmation') }}</li>
              <li>{{ $t('cancellation.sections.booking_process.steps.checkin_info') }}</li>
            </ol>
          </div>

          <div class="mt-8 text-center">
            <router-link 
              to="/contatti" 
              class="inline-flex items-center px-6 py-3 bg-roma-600 text-white font-semibold rounded-lg hover:bg-roma-700 transition-colors"
            >
              <MessageCircleIcon class="mr-2 h-5 w-5" />
              {{ $t('cancellation.sections.contact_cta') }}
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  MessageCircleIcon,
  MailIcon,
  ShieldCheckIcon
} from 'lucide-vue-next'

const { locale } = useI18n()

const currentDate = computed(() => {
  return new Date().toLocaleDateString(locale.value === 'it' ? 'it-IT' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>