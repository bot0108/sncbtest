<script setup>
import { useI18n } from 'vue-i18n'
import CountdownTimer from './CountdownTimer.vue'

const props = defineProps({
  reservationNumber: { type: String, required: true },
  departureTime:     { type: String, required: true } // ISO string
})

const { locale, t } = useI18n()

const langs = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' }
]

function changeLocale(e) {
  locale.value = e.target.value
}
</script>

<template>
  <header class="w-full p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
    <!-- Left: titles -->
    <div class="space-y-1">
      <h1 class="text-3xl font-bold">{{ t('groupTrip') }}</h1>
      <p class="text-base">{{ t('subtitle') }}</p>
      <p class="text-sm opacity-80">{{ t('reservation', { num: reservationNumber }) }}</p>
    </div>

    <!-- Center: language selector with flags -->
    <div>
      <label for="lang" class="sr-only">Language</label>
      <select
        id="lang"
        v-model="locale"
        @change="changeLocale"
        class="bg-white text-gray-800 rounded px-3 py-2 font-medium"
      >
        <option
          v-for="l in langs"
          :key="l.code"
          :value="l.code"
        >
          {{ l.flag }} {{ l.label }}
        </option>
      </select>
    </div>

    <!-- Right: countdown -->
    <CountdownTimer :departure="props.departureTime" />
  </header>
</template>

<style scoped>
header select {
  min-width: 8rem;
}
</style>
