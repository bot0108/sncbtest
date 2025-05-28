<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  userName: {
    type: String,
    default: 'Traveler'
  },
  groupName: {
    type: String,
    default: ''
  },
  reservationNumber: {
    type: String,
    default: ''
  }
})

const { t } = useI18n()

// simple fade-in on mount
const isVisible = ref(false)
onMounted(() => {
  setTimeout(() => isVisible.value = true, 50)
})

// smooth scroll handler
function scrollToLiveTracking() {
  const el = document.getElementById('live-tracking')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative max-w-4xl mx-auto overflow-hidden shadow-lg">
    <!-- Hero background with gradient overlay -->
    <div class="relative h-64 sm:h-80">
      <img
        src="/welcome.png"
        alt="Train hero"
        class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"></div>
      <!-- Overlay text -->
      <div
        class="absolute inset-0 flex flex-col justify-center items-center px-6 text-center text-white space-y-3 transition-opacity duration-700"
        :class="isVisible ? 'opacity-100' : 'opacity-0'"
      >
        <h2 class="text-2xl sm:text-3xl font-bold">
          <template v-if="props.groupName">
            {{ t('welcome.helloGroup', { name: props.userName, group: props.groupName }) }}
          </template>
          <template v-else>
            {{ t('welcome.hello', { name: props.userName }) }}
          </template>
        </h2>
        <p class="text-sm sm:text-base max-w-md">
          {{ t('welcome.thankYou') }}<br />
          {{ t('welcome.reservation', { num: props.reservationNumber }) }}
        </p>
      </div>
    </div>

    <!-- Body content -->
    <div class="bg-white p-6 space-y-4">
      <p class="text-gray-800 text-lg font-semibold">
        {{ t('welcome.subtitleTitle') }}
      </p>
      <p class="text-gray-700 leading-relaxed">
        {{ t('welcome.subtitleText') }}
      </p>
      <!-- CTA button -->
      <div class="text-center">
        <button
          @click="scrollToLiveTracking"
          class="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          {{ t('welcome.cta') }}
        </button>
      </div>
    </div>
  </section>
</template>
