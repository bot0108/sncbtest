<!-- src/components/SharePlatformQR.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
  link: {
    type: String,
    required: true
  }
})

const canvasRef = ref(null)
const inputRef  = ref(null)
const qrError   = ref(null)

// Función para generar el QR
async function generateQR() {
  qrError.value = null
  try {
    await QRCode.toCanvas(canvasRef.value, props.link, {
      width: 200,
      margin: 2
    })
  } catch (err) {
    qrError.value = 'Failed to generate QR'
    console.error(err)
  }
}

// Regenera al montar y cuando cambie el link
onMounted(generateQR)
watch(() => props.link, generateQR)

// Copiar link al portapapeles
function copyLink() {
  navigator.clipboard.writeText(props.link)
    .then(() => {
      inputRef.value.select()
      document.execCommand('copy')
    })
    .catch(() => {
      qrError.value = 'Copy failed'
    })
}
</script>

<template>
  <section class="max-w-sm bg-white p-4  mx-auto">
    <h3 class="text-lg font-semibold text-gray-900 mb-3">Share this group link</h3>

    <div class="flex justify-center mb-4">
      <canvas ref="canvasRef" class="w-48 h-48 bg-white"></canvas>
    </div>

    <div class="flex items-center space-x-2 mb-2">
      <input
        ref="inputRef"
        :value="link"
        readonly
        class="flex-1 px-2 py-1 border rounded text-sm text-gray-700"
      />
      <button
        @click="copyLink"
        class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        Copy
      </button>
    </div>

    <p v-if="qrError" class="text-red-600 text-sm">{{ qrError }}</p>
  </section>
</template>
