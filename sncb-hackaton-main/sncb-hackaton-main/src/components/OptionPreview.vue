<!-- src/components/OptionPreview.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  groupSize: {
    type: Number,
    required: true
  }
})

// Format the date as e.g. Jan 13, 2025
const formattedDate = computed(() => {
  const d = new Date(props.date)
  return d.toLocaleDateString('en-GB', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
})
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
    <div class="space-y-1">
      <p class="text-sm text-gray-500">Trip summary</p>
      <h3 class="text-lg font-semibold text-gray-900">
        {{ origin }} → {{ destination }}
      </h3>
      <p class="text-sm text-gray-700">{{ formattedDate }} • {{ groupSize }} passengers</p>
    </div>
    <button
      class="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow"
    >
      Edit search
    </button>
  </div>
</template>

<style scoped>
/* No extra CSS—Tailwind utilities handle styling */
</style>
