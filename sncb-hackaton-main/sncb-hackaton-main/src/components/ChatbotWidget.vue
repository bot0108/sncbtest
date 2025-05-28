<!-- src/components/ChatbotWidget.vue -->
<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
function toggleChat() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    <!-- Chat panel -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-3"
      >
        <!-- Header -->
        <div class="flex items-center justify-between bg-blue-600 px-4 py-2">
          <h4 class="text-white font-medium">Need help?</h4>
          <button @click="toggleChat" class="text-white text-xl leading-none">×</button>
        </div>

        <!-- Messages area (fake) -->
        <div class="p-4 space-y-3 h-48 overflow-y-auto">
          <div class="bg-gray-100 p-2 rounded-lg text-gray-800 text-sm">
            👋 Hello! How can I assist your group today?
          </div>
          <div class="bg-blue-100 p-2 rounded-lg text-blue-800 text-sm self-end">
            I need guidance to my platform.
          </div>
          <div class="bg-gray-100 p-2 rounded-lg text-gray-800 text-sm">
            Sure! You’re on track 12 at Gent-Sint-Pieters.
          </div>
        </div>

        <!-- Input (disabled placeholder) -->
        <div class="px-4 py-2 border-t border-gray-200">
          <input
            type="text"
            placeholder="Type a message..."
            disabled
            class="w-full p-2 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed focus:outline-none"
          />
        </div>
      </div>
    </transition>

    <!-- Floating toggle button -->
    <button
      @click="toggleChat"
      class="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
      aria-label="Open chatbot"
    >
      💬
    </button>
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
