<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  departureStation:     { type: String, required: true },
  arrivalStation:       { type: String, required: true },
  departureIntro:       { type: String, default: 'The information below will be completed on the day of departure.' },
  departureTips:        { type: Array, default: () => [] },
  arrivalTips:          { type: Array, default: () => [] },
  arrivalDisembarkTips: { type: Array, default: () => [] },
  safetyTips:           { type: Array, default: () => [] },
  emergencyTips:        { type: Array, default: () => [] },
  reservedCoach:        { type: [String, Number], default: null },
  groupSize:            { type: Number, default: 0 }
})

const showDeparture = ref(false)
const showArrival   = ref(false)
const showSafety    = ref(false)
const showEmergency = ref(false)

const hasReserved  = computed(() => props.reservedCoach != null)
const needsDoorTip = computed(() => props.groupSize > 20)
</script>

<template>
  <div class="max-w-md bg-white p-6 rounded-2xl  space-y-6">
    <h3 class="text-2xl font-bold text-gray-900 text-center">Tips for a Smooth Train Journey</h3>

    <!-- Departure Accordion -->
    <div>
      <button
        @click="showDeparture = !showDeparture"
        class="w-full flex justify-between items-center bg-blue-100 px-4 py-2 rounded-lg"
      >
        <span class="font-semibold text-gray-800">At Departure from {{ departureStation }}</span>
        <svg
          :class="['w-5 h-5 text-blue-600 transform transition-transform', { 'rotate-180': showDeparture }]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <transition name="fade">
        <div v-show="showDeparture" class="mt-2 px-4">
          <p class="text-sm text-gray-600 italic mb-2">{{ departureIntro }}</p>
          <ul class="list-disc list-inside space-y-1 mb-2">
            <li v-for="(tip,i) in departureTips" :key="i" class="text-gray-700">{{ tip }}</li>
          </ul>
          <div v-if="hasReserved" class="flex items-center space-x-2 mb-2">
            <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Reserved</span>
            <span class="text-sm text-gray-700">Carriage No. {{ reservedCoach }} is reserved</span>
          </div>
          <ul v-if="needsDoorTip" class="list-disc list-inside space-y-1 text-gray-700">
            <li>Your group includes more than {{ groupSize }} participants. Use both doors when boarding the train.</li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Arrival Accordion -->
    <div>
      <button
        @click="showArrival = !showArrival"
        class="w-full flex justify-between items-center bg-green-100 px-4 py-2 rounded-lg"
      >
        <span class="font-semibold text-gray-800">Upon Arrival at {{ arrivalStation }}</span>
        <svg
          :class="['w-5 h-5 text-green-600 transform transition-transform', { 'rotate-180': showArrival }]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <transition name="fade">
        <div v-show="showArrival" class="mt-2 px-4">
          <ul class="list-disc list-inside space-y-1 mb-2">
            <li v-for="(tip,i) in arrivalTips" :key="i" class="text-gray-700">{{ tip }}</li>
          </ul>
          <h5 class="font-medium text-gray-800 mb-1">For Easy Disembarkation:</h5>
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li v-for="(tip,i) in arrivalDisembarkTips" :key="i">{{ tip }}</li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Safety Accordion -->
    <div>
      <button
        @click="showSafety = !showSafety"
        class="w-full flex justify-between items-center bg-red-100 px-4 py-2 rounded-lg"
      >
        <span class="font-semibold text-gray-800">For Your Safety</span>
        <svg
          :class="['w-5 h-5 text-red-600 transform transition-transform', { 'rotate-180': showSafety }]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <transition name="fade">
        <div v-show="showSafety" class="mt-2 px-4">
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li v-for="(tip,i) in safetyTips" :key="i">{{ tip }}</li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Emergency Accordion -->
    <div>
      <button
        @click="showEmergency = !showEmergency"
        class="w-full flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
      >
        <span class="font-semibold text-gray-800">What to Do if Something Goes Wrong?</span>
        <svg
          :class="['w-5 h-5 text-gray-600 transform transition-transform', { 'rotate-180': showEmergency }]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <transition name="fade">
        <div v-show="showEmergency" class="mt-2 px-4">
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li v-for="(tip,i) in emergencyTips" :key="i">{{ tip }}</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
