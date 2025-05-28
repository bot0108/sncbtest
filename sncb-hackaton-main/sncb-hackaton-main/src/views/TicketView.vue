<script setup>
import TicketHeader    from '@/components/TicketHeader.vue'
import TicketForm      from '@/components/TicketForm.vue'
import OptionPreview   from '@/components/OptionPreview.vue'
import OptionResult    from '@/components/OptionResult.vue'
import { ref }         from 'vue'

const searchParams = ref(null)
const searchResults = ref([])

function handleSearch(params) {
  searchParams.value = params
  // Simulate fetching results:
  searchResults.value = [
    {
      id: 1,
      train: 'IC 734',
      departure: '12:27',
      arrival: '13:23',
      origin: params.origin,
      destination: params.destination,
      price: 38
    },
    {
      id: 2,
      train: 'IR 852',
      departure: '13:00',
      arrival: '14:00',
      origin: params.origin,
      destination: params.destination,
      price: 42
    }
  ]
}

function handleBook(option) {
  console.log('Booking train:', option)
  // TODO: redirect to reservation flow
}
</script>

<template>
  <main class="p-6 relative">
    <div class="max-w-4xl mx-auto space-y-8">
      <TicketHeader />

      <TicketForm @search="handleSearch" />

      <OptionPreview
        v-if="searchParams"
        :origin="searchParams.origin"
        :destination="searchParams.destination"
        :date="searchParams.date"
        :groupSize="searchParams.groupSize"
      />

      <OptionResult
        v-if="searchResults.length"
        :results="searchResults"
        @book="handleBook"
      />
    </div>
  </main>
</template>
