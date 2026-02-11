<template>
  <button
    @click="copyToClipboard"
    :disabled="copied"
    class="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
    :class="copied ? 'bg-jade-green text-white' : 'bg-paper-white border-2 border-gold-foil/30 hover:border-gold-foil hover:text-gold-foil text-gray-500'"
    :title="copied ? '已复制' : '复制祝福语'"
  >
    <svg v-if="copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const copied = ref(false)

const copyToClipboard = async () => {
  if (copied.value) return
  
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>