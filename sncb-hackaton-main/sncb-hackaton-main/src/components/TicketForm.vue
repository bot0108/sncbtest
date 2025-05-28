<!-- src/components/TicketForm.vue -->
<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['search'])

const form = reactive({
  origin: '',
  destination: '',
  date: '',
  groupSize: 1
})

const showLargeGroup = computed(() => form.groupSize > 20)

function handleSubmit() {
  emit('search', {
    origin: form.origin,
    destination: form.destination,
    date: form.date,
    groupSize: form.groupSize
  })
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="relative bg-white p-6 rounded-lg shadow space-y-6
           bg-[url('/tracks-pattern.svg')] bg-repeat-x bg-opacity-5"
    novalidate
  >
    <!-- Origin & Destination -->
    <div class="grid sm:grid-cols-2 gap-6">
      <!-- Origin -->
      <div>
        <label for="origin" class="block text-sm font-medium text-gray-700 mb-1">
          From
        </label>
        <div class="relative">
          <!-- Icon -->
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M7 17h10"/>
            </svg>
          </span>
          <select
            id="origin"
            v-model="form.origin"
            required
            class="pl-10 w-full border border-gray-300 bg-white py-2 px-3 rounded-md shadow-sm
                   focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-600"
          >
            <option value="" disabled>Select departure station</option>
            <option>Gent-Sint-Pieters</option>
            <option>Waregem</option>
            <option>Sint-Niklaas</option>
            <option>Antwerpen-Centraal</option>
          </select>
        </div>
      </div>

      <!-- Destination -->
      <div>
        <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">
          To
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 17V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10"/>
            </svg>
          </span>
          <select
            id="destination"
            v-model="form.destination"
            required
            class="pl-10 w-full border border-gray-300 bg-white py-2 px-3 rounded-md shadow-sm
                   focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-600"
          >
            <option value="" disabled>Select arrival station</option>
            <option>Antwerpen-Centraal</option>
            <option>Sint-Niklaas</option>
            <option>Waregem</option>
            <option>Gent-Sint-Pieters</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Rail divider -->
    <div class="my-4 h-1 bg-[repeating-linear-gradient(to right,theme(colors.blue.600),theme(colors.blue.600)4px,transparent 4px,transparent 8px)]"></div>

    <!-- Date & Group Size -->
    <div class="grid sm:grid-cols-2 gap-6">
      <!-- Date -->
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700 mb-1">
          Travel Date
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10m-5 4v2m0-6v2"/>
            </svg>
          </span>
          <input
            id="date"
            type="date"
            v-model="form.date"
            required
            class="pl-10 w-full border border-gray-300 py-2 px-3 rounded-md shadow-sm
                   focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-600"
            aria-describedby="dateHelp"
          />
        </div>
      </div>

      <!-- Group Size -->
      <div>
        <label for="groupSize" class="block text-sm font-medium text-gray-700 mb-1">
          Group Size
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7"/>
            </svg>
          </span>
          <input
            id="groupSize"
            type="number"
            v-model.number="form.groupSize"
            min="1"
            required
            class="pl-10 w-full border border-gray-300 py-2 px-3 rounded-md shadow-sm
                   focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-600"
            aria-describedby="groupSizeHelp"
          />
        </div>
        <p
          v-if="showLargeGroup"
          id="groupSizeHelp"
          class="mt-1 text-sm text-orange-600"
          role="alert"
        >
          Large group booking may require extra processing time.
        </p>
      </div>
    </div>

    <!-- Submit button with steam animation -->
    <div>
      <button
        type="submit"
        class="steam-btn relative w-full inline-flex justify-center py-3 px-6 bg-blue-600 hover:bg-blue-700
               text-white font-medium rounded-md shadow focus:outline-none focus:ring focus:border-blue-300"
      >
        Search trains
      </button>
    </div>
  </form>
</template>

<style scoped>
.steam-btn::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 100%;
  width: 12px;
  height: 12px;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  transform: translateX(-50%);
  animation: steam 1s ease-out infinite;
}
@keyframes steam {
  0%   { bottom: 100%; opacity: 1; }
  100% { bottom: 120%; opacity: 0; }
}
</style>
