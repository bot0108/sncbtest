<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  from:     { type: String, required: true },
  to:       { type: String, required: true },
  datetime: { type: String, required: true },
  train:    { type: String, required: true },
  onChange: { type: Function, default: null }
})

const { t } = useI18n()
</script>

<template>
  <div class="border-2 border-dashed border-blue-300 rounded-lg p-6 relative">
    <h2 class="flex justify-between items-center text-lg font-semibold mb-4">
      <span>{{ t('tripSummary.title') }}</span>
      <button
        @click="onChange"
        class="flex items-center text-blue-600 hover:underline text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                   M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        <span class="ml-1">{{ t('common.modify') }}</span>
      </button>
    </h2>
    <div class="flex items-start text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600 mr-3" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 2c-3.866 0-7 3.134-7 7v7a5 5 0 005 5h4a5 5 0 005-5V9
                 c0-3.866-3.134-7-7-7z"/>
      </svg>
      <div>
        <p class="font-medium">{{ props.from }} → {{ props.to }}</p>
        <p class="text-sm text-gray-500">{{ props.datetime }} – {{ props.train }}</p>
      </div>
    </div>
  </div>
</template>
