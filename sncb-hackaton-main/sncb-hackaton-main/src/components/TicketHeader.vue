<template>
  <header
    class="relative overflow-hidden bg-gradient-to-r from-blue-800 to-blue-600 py-6 pb-10 px-2 md:px-4 text-white font-raleway rounded-3xl"
  >
    <!-- Language Switcher -->
    <div class="relative z-80 max-w-4xl mx-auto flex justify-end mb-8">
      <!-- ↑ Changed mb-3 to mb-8 to move switcher further down -->
      <div
        class="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="currentLanguage = lang.code"
          :class="[
            'px-2 py-1 text-xs font-medium rounded-lg transition-all duration-200',
            currentLanguage === lang.code
              ? 'bg-white text-blue-800 shadow-lg'
              : 'text-white/80 hover:text-white hover:bg-white/10',
          ]"
        >
          {{ lang.label }}
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="relative z-30 max-w-3xl mx-auto text-center space-y-4">
      <div class="mx-auto w-12 h-12 flex items-center justify-center">
        <img src="/SNCB_logo.png" alt="SNCB NMBS Logo" class="w-20 h-20 object-contain" />
      </div>

      <div
        class="inline-flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs border border-white/20"
      >
        <svg class="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ translations[currentLanguage].badge }}</span>
      </div>

      <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
        {{ translations[currentLanguage].title }}
      </h1>

      <p class="text-base md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
        {{ translations[currentLanguage].subtitle }}
      </p>

      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <div
          v-for="feature in translations[currentLanguage].features"
          :key="feature"
          class="flex items-center space-x-1 text-xs bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
        >
          <svg class="w-3 h-3 text-green-300" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ feature }}</span>
        </div>
      </div>
    </div>

    <!-- Top railway tracks -->
    <div class="absolute inset-x-0 top-2 h-8 rails-container z-10"></div>
    <!-- Top train moving left to right -->
    <div
      class="absolute inset-x-0 top-0 h-8 flex items-center overflow-hidden pointer-events-none z-20"
    >
      <div class="train-wrapper-top">
        <img src="/train3.png" alt="train" class="h-16 drop-shadow-xl" />
      </div>
    </div>

    <!-- Bottom railway tracks -->
    <div class="absolute inset-x-0 bottom-0 h-10 rails-container z-10"></div>
    <!-- Bottom train moving right to left -->
    <div
      class="absolute inset-x-0 bottom-0 h-14 flex items-center overflow-hidden pointer-events-none z-20"
    >
      <div class="train-wrapper-bottom">
        <img src="/train4.png" alt="train" class="h-16 drop-shadow-xl" />
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-1/4 left-8 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
    <div
      class="absolute top-1/3 right-12 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-1000"
    ></div>
    <div
      class="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"
    ></div>
    <div
      class="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-700"
    ></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const currentLanguage = ref('en')

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'nl', label: 'NL' },
]

const translations = {
  en: {
    badge: 'Group Travel Booking',
    title: 'Plan your group trip',
    subtitle: 'Select origin, destination, date and number of passengers to begin.',
    features: ['Special group rates', 'Flexible booking', 'Dedicated support'],
  },
  fr: {
    badge: 'Réservation de voyage de groupe',
    title: 'Planifiez votre voyage de groupe',
    subtitle:
      "Sélectionnez l'origine, la destination, la date et le nombre de passagers pour commencer.",
    features: ['Tarifs de groupe spéciaux', 'Réservation flexible', 'Support dédié'],
  },
  nl: {
    badge: 'Groepsreis Reservering',
    title: 'Plan uw groepsreis',
    subtitle: 'Selecteer vertrek, bestemming, datum en aantal passagiers om te beginnen.',
    features: ['Speciale groepstarieven', 'Flexibele boeking', 'Toegewijde ondersteuning'],
  },
}
</script>

<style scoped>
.font-raleway {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Railway tracks pattern */
.rails-container {
  background:
    linear-gradient(to bottom, transparent 44%, white 44%, white 47%, transparent 47%),
    linear-gradient(to bottom, transparent 53%, white 53%, white 56%, transparent 56%);
}

/* Train animations */
@keyframes trainMoveForward {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(125%);
  }
}

.train-wrapper-top {
  display: flex;
  width: 150%;
  animation: trainMoveForward 30s linear infinite;
}

@keyframes trainMoveBackward {
  0% {
    transform: translateX(125%);
  }
  100% {
    transform: translateX(-25%);
  }
}

.train-wrapper-bottom {
  display: flex;
  width: 150%;
  animation: trainMoveBackward 30s linear infinite;
}
</style>
