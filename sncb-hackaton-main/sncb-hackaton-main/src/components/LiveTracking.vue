<template>
  <section class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow relative">
    <h2 class="text-xl font-semibold mb-4">Follow your train in real time</h2>

    <!-- Toasts -->
    <div class="fixed top-6 right-6 space-y-2 z-50">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="bg-gray-800 text-white px-4 py-2 rounded shadow"
      >
        {{ t.message }}
      </div>
    </div>

    <!-- Simulated location -->
    <div v-if="userPosition" class="mb-4 text-sm text-gray-600">
      Your location: Track 12 at Gent-Sint-Pieters.
    </div>

    <div class="relative pl-8">
      <!-- Vertical line -->
      <div class="absolute left-3 top-0 bottom-0 w-px bg-blue-600"></div>

      <ul class="space-y-12">
        <li v-for="(stop, i) in stops" :key="i" class="relative">
          <!-- Marker circle -->
          <div
            :class="[
              'absolute -left-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-500',
              stop.type==='live'         ? 'bg-white border-blue-600' :
              stop.type==='intermediate' ? 'bg-white border-gray-300' :
              stop.highlight==='orange'  ? 'bg-orange-500 border-orange-500' :
                                           'bg-blue-600 border-blue-600'
            ]"
          ></div>

          <div class="ml-6 space-y-1">
            <!-- Time -->
            <div class="flex items-baseline space-x-3">
              <span class="font-medium">{{ stop.time }}</span>
              <span v-if="stop.subText" class="text-sm text-red-600">{{ stop.subText }}</span>
            </div>

            <!-- Live location -->
            <div v-if="stop.type==='live'" class="flex items-center text-blue-600 font-medium">
              <div class="w-5 h-5 mr-2 bg-blue-600 rounded-sm flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Live location</span>
            </div>

            <!-- Station label -->
            <div v-else-if="stop.type==='station' && !stop.showComposition && !stop.highlight">
              <p class="font-medium">
                {{ stop.station }}<span v-if="stop.track"> track {{ stop.track }}</span>
              </p>
            </div>

            <!-- Composition with enhanced train visual -->
            <div v-else-if="stop.showComposition" class="space-y-4">
              <p class="font-medium">{{ stop.station }} track {{ stop.track }}</p>
              
              <!-- Train Visual with Reserved Seats Indicator -->
              <div class="bg-gray-50 p-4 rounded-lg border">
                <div class="mb-3">
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Train Composition</h4>
                  <div class="flex items-center space-x-1 mb-2">
                    <div class="w-3 h-3 bg-green-500 rounded"></div>
                    <span class="text-xs text-gray-600">Your reserved seats</span>
                    <div class="w-3 h-3 bg-blue-600 rounded ml-4"></div>
                    <span class="text-xs text-gray-600">Other carriages</span>
                  </div>
                </div>

                <!-- Enhanced Train Visual -->
                <div class="relative">
                  <!-- Train track -->
                  <div class="absolute inset-y-1/2 left-0 right-0 h-1 bg-gray-400 rounded-full z-0"></div>
                  
                  <!-- Train with locomotive and wagons, evenly spaced -->
                  <div class="flex items-center justify-between w-full relative z-10">
                    <!-- Locomotive -->
                    <div class="relative">
                      <svg width="40" height="32" viewBox="0 0 40 32" class="drop-shadow-sm">
                        <rect x="8" y="8" width="32" height="16" rx="2" fill="#374151" />
                        <path d="M8 12 L4 16 L8 20 Z" fill="#374151" />
                        <rect x="12" y="10" width="6" height="4" rx="1" fill="#60A5FA" />
                        <rect x="20" y="10" width="6" height="4" rx="1" fill="#60A5FA" />
                        <rect x="28" y="10" width="6" height="4" rx="1" fill="#60A5FA" />
                        <circle cx="6" cy="16" r="2" fill="#FDE047" />
                        <circle cx="12" cy="26" r="3" fill="#1F2937" />
                        <circle cx="20" cy="26" r="3" fill="#1F2937" />
                        <circle cx="28" cy="26" r="3" fill="#1F2937" />
                        <circle cx="36" cy="26" r="3" fill="#1F2937" />
                      </svg>
                    </div>
                    
                    <!-- Carriages evenly filling remaining space -->
                    <div class="flex justify-between flex-1 mx-4">
                      <div
                        v-for="(wagon, wi) in composition.wagons"
                        :key="wi"
                        class="relative"
                      >
                        <svg width="48" height="32" viewBox="0 0 48 32" class="drop-shadow-sm">
                          <rect 
                            x="2" 
                            y="6" 
                            width="44" 
                            height="18" 
                            rx="2" 
                            :fill="composition.reservedCarriages.includes(wi) ? '#10B981' : '#2563EB'"
                            stroke="#fff" 
                            stroke-width="1"
                          />
                          <rect x="6" y="8" width="6" height="4" rx="1" fill="#E5E7EB" opacity="0.9" />
                          <rect x="14" y="8" width="6" height="4" rx="1" fill="#E5E7EB" opacity="0.9" />
                          <rect x="22" y="8" width="6" height="4" rx="1" fill="#E5E7EB" opacity="0.9" />
                          <rect x="30" y="8" width="6" height="4" rx="1" fill="#E5E7EB" opacity="0.9" />
                          <rect x="38" y="8" width="6" height="4" rx="1" fill="#E5E7EB" opacity="0.9" />
                          <rect x="10" y="14" width="8" height="8" rx="1" fill="#D1D5DB" opacity="0.8" />
                          <rect x="30" y="14" width="8" height="8" rx="1" fill="#D1D5DB" opacity="0.8" />
                          <circle cx="17" cy="18" r="0.5" fill="#6B7280" />
                          <circle cx="31" cy="18" r="0.5" fill="#6B7280" />
                          <text 
                            x="24" 
                            y="20" 
                            text-anchor="middle" 
                            class="text-xs font-bold" 
                            :fill="composition.reservedCarriages.includes(wi) ? '#fff' : '#fff'"
                          >
                            {{ wagon }}
                          </text>
                          <circle cx="12" cy="26" r="3" fill="#1F2937" />
                          <circle cx="20" cy="26" r="3" fill="#1F2937" />
                          <circle cx="28" cy="26" r="3" fill="#1F2937" />
                          <circle cx="36" cy="26" r="3" fill="#1F2937" />
                          <circle cx="12" cy="26" r="1.5" fill="#4B5563" />
                          <circle cx="20" cy="26" r="1.5" fill="#4B5563" />
                          <circle cx="28" cy="26" r="1.5" fill="#4B5563" />
                          <circle cx="36" cy="26" r="1.5" fill="#4B5563" />
                          <rect x="0" y="15" width="2" height="2" fill="#6B7280" />
                          <rect x="46" y="15" width="2" height="2" fill="#6B7280" />
                        </svg>
                        
                        <div 
                          v-if="composition.reservedCarriages.includes(wi)"
                          class="absolute -top-2 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                        >
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Seat Information -->
                <div class="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-sm font-medium text-green-800">Your Reserved Seats</span>
                  </div>
                  <div class="mt-2 text-sm text-green-700">
                    <p>Carriage 3 - Seats {{ composition.seatNumbers.join(', ') }}</p>
                    <p class="text-xs mt-1">{{ composition.seatType }}</p>
                  </div>
                </div>

                <!-- Occupancy visualization -->
                <div class="mt-4">
                  <h5 class="text-sm font-medium text-gray-700 mb-2">Expected Occupancy</h5>
                  <div class="flex items-end space-x-1 h-12 bg-white p-2 rounded border">
                    <div
                      v-for="(level, idx) in composition.occupancyLevels"
                      :key="idx"
                      :class="[
                        'flex-1 transition-all duration-300',
                        composition.reservedCarriages.includes(idx) 
                          ? 'bg-green-400' 
                          : level > 0.7 ? 'bg-red-400' : level > 0.4 ? 'bg-yellow-400' : 'bg-green-400'
                      ]"
                      :style="{ height: `${level * 100}%` }"
                      :title="`Carriage ${composition.wagons[idx]}: ${Math.round(level * 100)}% full`"
                    ></div>
                  </div>
                  <div class="mt-2 text-xs text-gray-600">{{ composition.occupancy }}</div>
                </div>
              </div>
            </div>

            <!-- Intermediate -->
            <div v-else-if="stop.type==='intermediate'" class="text-gray-500 italic">
              {{ stop.time }}
            </div>

            <!-- Highlight -->
            <div v-else-if="stop.highlight==='orange'" class="flex items-center space-x-2">
              <p class="font-medium">{{ stop.station }}</p>
              <div class="w-4 h-4 bg-orange-500 rounded-sm rotate-45"></div>
              <span class="text-gray-600 text-sm">{{ stop.label }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// Stops data
const stops = [
  { time: '12:09', station: 'Waregem', subText: '+1', type: 'normal' },
  { time: 'Live location', station: null, type: 'live' },
  { 
    time: '12:27', 
    station: 'Gent-Sint-Pieters', 
    track: '12', 
    type: 'station', 
    showComposition: true,
  },
  { time: '5 intermediate stops', station: null, type: 'intermediate' },
  { 
    time: '13:03', 
    station: 'Sint-Niklaas', 
    type: 'station', 
    highlight: 'orange', 
    label: 'Get ready to disembark',
  },
  { 
    time: '13:23', 
    station: 'Antwerpen-Centraal', 
    track: '1', 
    type: 'station',
  },
]

// Enhanced composition data with reservation information
const composition = {
  wagons: ['2','2','1','2','2'],
  occupancy: 'Expected occupancy: low to moderate',
  occupancyLevels: [0.3, 0.5, 0.2, 0.8, 0.4],
  reservedCarriages: [2], // indices of carriages with reserved seats
  seatNumbers: ['15A', '15B', '23C', '23D'],
  seatType: 'Window seats, facing forward'
}

// Toast notifications
const toasts = ref([])
let toastId = 0

function showToast(msg) {
  const id = toastId++
  toasts.value.push({ id, message: msg })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3000)
}

// Geolocation simulation
const userPosition = ref(null)

onMounted(() => {
  userPosition.value = { latitude: 51.05, longitude: 3.72 }
  setTimeout(() => {
    showToast(`Your seats are in carriage ${composition.wagons[composition.reservedCarriages[0]]}`)
  }, 1000)
})

// Automated next-step loop
const currentIndex = ref(0)
function nextStop() {
  currentIndex.value = (currentIndex.value + 1) % stops.length
}
let autoInterval = null
onMounted(() => {
  autoInterval = setInterval(nextStop, 3000)
})
onBeforeUnmount(() => {
  clearInterval(autoInterval)
})

// Compute train icon position
const trainTop = computed(() => {
  const pct = currentIndex.value / (stops.length - 1)
  return `${pct * 100}%`
})
</script>
