<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-xl font-serif font-bold text-roman-700">{{ $t('privacy.back_to_home') }}</span>
          </router-link>
          <h1 class="text-2xl font-bold text-gray-900">{{ $t('privacy.title') }}</h1>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <div class="prose prose-lg max-w-none">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ $t('privacy.title') }}</h1>
          
          <p class="text-gray-600 mb-8">
            <strong>{{ $t('privacy.effective_date') }}</strong> {{ currentDate }}
          </p>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.data_collection.title') }}</h2>
            <p class="text-gray-700 mb-4">
              {{ $t('privacy.sections.data_collection.description') }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>{{ $t('privacy.sections.data_collection.items.personal').split(':')[0] }}:</strong> {{ $t('privacy.sections.data_collection.items.personal').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.data_collection.items.stay').split(':')[0] }}:</strong> {{ $t('privacy.sections.data_collection.items.stay').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.data_collection.items.communications').split(':')[0] }}:</strong> {{ $t('privacy.sections.data_collection.items.communications').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.data_collection.items.technical').split(':')[0] }}:</strong> {{ $t('privacy.sections.data_collection.items.technical').split(':')[1] }}</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.data_usage.title') }}</h2>
            <p class="text-gray-700 mb-4">
              {{ $t('privacy.sections.data_usage.description') }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>{{ $t('privacy.sections.data_usage.items.bookings') }}</li>
              <li>{{ $t('privacy.sections.data_usage.items.communication') }}</li>
              <li>{{ $t('privacy.sections.data_usage.items.support') }}</li>
              <li>{{ $t('privacy.sections.data_usage.items.improvements') }}</li>
              <li>{{ $t('privacy.sections.data_usage.items.legal') }}</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.cookies.title') }}</h2>
            <p class="text-gray-700 mb-4">
              {{ $t('privacy.sections.cookies.description') }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>{{ $t('privacy.sections.cookies.items.essential').split(':')[0] }}:</strong> {{ $t('privacy.sections.cookies.items.essential').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.cookies.items.performance').split(':')[0] }}:</strong> {{ $t('privacy.sections.cookies.items.performance').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.cookies.items.functionality').split(':')[0] }}:</strong> {{ $t('privacy.sections.cookies.items.functionality').split(':')[1] }}</li>
            </ul>
            <p class="text-gray-700 mt-4">
              {{ $t('privacy.sections.cookies.management') }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.data_sharing.title') }}</h2>
            <p class="text-gray-700 mb-4">
              {{ $t('privacy.sections.data_sharing.description') }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>{{ $t('privacy.sections.data_sharing.items.legal') }}</li>
              <li>{{ $t('privacy.sections.data_sharing.items.protection') }}</li>
              <li>{{ $t('privacy.sections.data_sharing.items.providers') }}</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.gdpr_rights.title') }}</h2>
            <p class="text-gray-700 mb-4">
              {{ $t('privacy.sections.gdpr_rights.description') }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>{{ $t('privacy.sections.gdpr_rights.items.access').split(':')[0] }}:</strong> {{ $t('privacy.sections.gdpr_rights.items.access').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.gdpr_rights.items.rectification').split(':')[0] }}:</strong> {{ $t('privacy.sections.gdpr_rights.items.rectification').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.gdpr_rights.items.erasure').split(':')[0] }}:</strong> {{ $t('privacy.sections.gdpr_rights.items.erasure').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.gdpr_rights.items.restriction').split(':')[0] }}:</strong> {{ $t('privacy.sections.gdpr_rights.items.restriction').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.gdpr_rights.items.portability').split(':')[0] }}:</strong> {{ $t('privacy.sections.gdpr_rights.items.portability').split(':')[1] }}</li>
              <li><strong>{{ $t('privacy.sections.gdpr_rights.items.objection').split(':')[0] }}:</strong> {{ $t('privacy.sections.gdpr_rights.items.objection').split(':')[1] }}</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.data_security.title') }}</h2>
            <p class="text-gray-700">
              {{ $t('privacy.sections.data_security.description') }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.data_retention.title') }}</h2>
            <p class="text-gray-700">
              {{ $t('privacy.sections.data_retention.description') }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.minors.title') }}</h2>
            <p class="text-gray-700">
              {{ $t('privacy.sections.minors.description') }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.policy_changes.title') }}</h2>
            <p class="text-gray-700">
              {{ $t('privacy.sections.policy_changes.description') }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('privacy.sections.contact.title') }}</h2>
            <p class="text-gray-700 mb-4">
              {{ $t('privacy.sections.contact.description') }}
            </p>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-700"><strong>{{ $t('privacy.sections.contact.details.email').split(':')[0] }}:</strong> {{ $t('privacy.sections.contact.details.email').split(':')[1] }}</p>
              <p class="text-gray-700"><strong>{{ $t('privacy.sections.contact.details.phone').split(':')[0] }}:</strong> {{ $t('privacy.sections.contact.details.phone').split(':')[1] }}</p>
              <p class="text-gray-700"><strong>{{ $t('privacy.sections.contact.details.address').split(':')[0] }}:</strong> {{ $t('privacy.sections.contact.details.address').split(':')[1] }}</p>
            </div>
          </section>

          <div class="border-t pt-6 mt-8">
            <p class="text-sm text-gray-500">
              {{ $t('privacy.compliance') }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentDate = computed(() => {
  return new Date().toLocaleDateString(locale.value === 'it' ? 'it-IT' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})
</script>