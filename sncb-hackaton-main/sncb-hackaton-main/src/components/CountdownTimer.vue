<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

const { t } = useI18n()

// Estado reactivo: momento de "salida" que siempre será 1h a partir de ahora
const departureTime = ref(dayjs().add(1, 'hour'))

// Cadena formateada HH:mm:ss
const remaining = ref('01:00:00')
let timer = null

function update() {
  const now = dayjs()
  let diff = departureTime.value.diff(now)

  // Si hemos llegado a 3 minutos de cuenta atrás (00:57:00 o menos), reiniciamos a +1h
  if (diff <= 3 * 60 * 1000) {
    departureTime.value = dayjs().add(1, 'hour')
    diff = departureTime.value.diff(now)
  }

  // Cálculo de horas, minutos y segundos restantes
  const hrs  = Math.floor(diff / 3_600_000)
  const mins = Math.floor((diff % 3_600_000) / 60_000)
  const secs = Math.floor((diff % 60_000) / 1000)

  remaining.value =
    String(hrs).padStart(2,'0') + ':' +
    String(mins).padStart(2,'0') + ':' +
    String(secs).padStart(2,'0')
}

onMounted(() => {
  update()
  timer = setInterval(update, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center">
    <span class="text-sm text-white">{{ t('timeToDeparture') }}</span>
    <span class="mt-1 text-2xl font-bold text-white">{{ remaining }}</span>
  </div>
</template>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
 