<!-- src/components/OptionResult.vue -->
<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  results: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['book'])
const router = useRouter()

function bookTrain(option) {
  // navega a la ruta raíz
  router.push('/ticket')
  // opcional: emitir el evento si necesitas seguir manejándolo
  emit('book', option)
}
</script>

<template>
  <div class="space-y-4">
    <p v-if="!results.length" class="text-center text-gray-500 py-6">
      No trains found for the selected criteria.
    </p>
    <div v-else>
      <p class="text-sm text-gray-500 mb-2">Available trains</p>
      <ul class="space-y-4">
        <li
          v-for="option in results"
          :key="option.id"
          class="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center justify-between"
        >
          <div class="space-y-1">
            <h4 class="text-lg font-semibold text-gray-900">
              {{ option.train }} • {{ option.departure }} → {{ option.arrival }}
            </h4>
            <p class="text-sm text-gray-700">
              {{ option.origin }} to {{ option.destination }}
            </p>
          </div>
          <div class="mt-3 sm:mt-0 flex items-center space-x-4">
            <span class="text-xl font-bold text-gray-900">€{{ option.price }}</span>
            <button
              @click="bookTrain(option)"
              class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow"
            >
              Book
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind utilities cover styling */
</style>
