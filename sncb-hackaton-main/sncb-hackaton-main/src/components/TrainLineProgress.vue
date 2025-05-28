<!-- src/components/TrainLineProgress.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Define the stops along the line
const stops = [
  "Gent-Sint-Pieters",
  "Waregem",
  "Sint-Niklaas",
  "Antwerpen-Centraal"
]

// Track the current stop index
const currentIndex = ref(0)

// Compute the train's horizontal position as a percentage
const trainPosition = computed(() => {
  const pct = currentIndex.value / (stops.length - 1)
  return `${pct * 100}%`
})

let intervalId = null

onMounted(() => {
  // Advance the train every 3 seconds, looping back to start
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % stops.length
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="relative w-full h-24 px-4">
    <!-- Track line -->
    <div class="absolute inset-x-0 top-1/2 h-1 bg-blue-400 transform -translate-y-1/2"></div>

    <!-- Stops -->
    <div class="relative z-10 flex justify-between items-center h-full">
      <div
        v-for="(stop, i) in stops"
        :key="stop"
        class="flex flex-col items-center text-center w-1/4"
      >
        <div
          :class="[
            'w-4 h-4 rounded-full border-2 transition-colors duration-500',
            i < currentIndex ? 'bg-gray-400 border-gray-400' :
            i === currentIndex ? 'bg-orange-500 border-orange-500' :
                                 'bg-blue-600 border-blue-600'
          ]"
        ></div>
        <span class="mt-1 text-xs text-gray-700">{{ stop }}</span>
      </div>
    </div>

    <!-- Train icon as image, moving slowly -->
    <div
      class="absolute top-1/3 transform -translate-y-1/3"
      :style="{
        left: trainPosition,
        transition: 'left 3000ms linear'
      }"
    >
      <img src="/train5.png" alt="Train" class="w-8 h-8" />
    </div>
  </div>
</template>
