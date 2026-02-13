<template>
  <form @submit.prevent="handleSubmit" class="space-y-7 mb-8">
    <!-- 祝福对象输入 -->
    <div class="animate-slide-up" style="animation-delay: 0.1s;">
      <div class="flex items-center justify-between mb-3">
        <label for="target" class="flex items-center">
          <span class="w-1.5 h-5 bg-chinese-red rounded-full mr-2 shadow-sm"></span>
          <span class="text-base font-bold text-ink-black">祝福对象</span>
          <span class="ml-2 text-xs bg-chinese-red/10 text-chinese-red px-2 py-1 rounded-full font-medium">必填</span>
        </label>
      </div>
      
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-golden opacity-0 group-focus-within:opacity-10 rounded-xl transition-opacity duration-300"></div>
        <input
          id="target"
          v-model="formData.target"
          type="text"
          required
          placeholder="例如：张三、李四、家人、朋友"
          class="input-elegant focus:border-chinese-red relative z-10 pr-12"
          :class="{ 'pr-20': formData.target }"
          :disabled="loading"
        />
        
        <!-- 图标 -->
        <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-chinese-red transition-colors duration-300 z-10">
          <span v-if="!formData.target" class="text-lg">✉️</span>
          <button
            v-else
            type="button"
            @click="clearTarget"
            class="text-gray-400 hover:text-chinese-red hover:scale-110 transition-all duration-200 focus:outline-none"
            :disabled="loading"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 关键词输入 -->
    <div class="animate-slide-up" style="animation-delay: 0.2s;">
      <div class="flex items-center justify-between mb-3">
        <label for="keywords" class="flex items-center">
          <span class="w-1.5 h-5 bg-gold-foil rounded-full mr-2 shadow-sm"></span>
          <span class="text-base font-bold text-ink-black">关键词</span>
          <span class="ml-2 text-xs bg-gold-foil/10 text-gold-foil px-2 py-1 rounded-full font-medium">可选</span>
        </label>
      </div>
      
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-golden opacity-0 group-focus-within:opacity-10 rounded-xl transition-opacity duration-300"></div>
        <input
          id="keywords"
          v-model="formData.keywords"
          type="text"
          placeholder="例如：新年快乐、身体健康"
          class="input-elegant focus:border-royal-gold relative z-10 pr-12"
          :class="{ 'pr-20': formData.keywords }"
          :disabled="loading"
        />
        
        <!-- 图标 -->
        <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-royal-gold transition-colors duration-300 z-10">
          <span v-if="!formData.keywords" class="text-lg">🏷️</span>
          <button
            v-else
            type="button"
            @click="clearKeywords"
            class="text-gray-400 hover:text-royal-gold hover:scale-110 transition-all duration-200 focus:outline-none"
            :disabled="loading"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 标签提示 -->
      <div class="flex gap-1.5 mt-2">
        <button
          type="button"
          @click="addKeyword('新年快乐')"
          class="text-[11px] bg-paper-white border border-gold-foil/20 px-2 py-1 rounded-lg text-gray-600 hover:bg-gold-foil/10 hover:text-gold-foil hover:border-gold-foil/40 transition-all duration-200 whitespace-nowrap"
          :disabled="loading"
        >
          🎊 新年快乐
        </button>
        <button
          type="button"
          @click="addKeyword('身体健康')"
          class="text-[11px] bg-paper-white border border-gold-foil/20 px-2 py-1 rounded-lg text-gray-600 hover:bg-gold-foil/10 hover:text-gold-foil hover:border-gold-foil/40 transition-all duration-200 whitespace-nowrap"
          :disabled="loading"
        >
          💪 身体健康
        </button>
        <button
          type="button"
          @click="addKeyword('工作顺利')"
          class="text-[11px] bg-paper-white border border-gold-foil/20 px-2 py-1 rounded-lg text-gray-600 hover:bg-gold-foil/10 hover:text-gold-foil hover:border-gold-foil/40 transition-all duration-200 whitespace-nowrap"
          :disabled="loading"
        >
          🚀 工作顺利
        </button>
      </div>
    </div>

    <!-- 生成按钮 -->
    <div class="animate-slide-up pt-3" style="animation-delay: 0.3s;">
      <button
        type="submit"
        :disabled="loading || !formData.target.trim()"
        class="btn-golden w-full text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-ink-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          正在为您精心创作...
        </span>
        <span v-else class="flex items-center justify-center">
          <span class="mr-2">✨</span>
          生成专属祝福
          <span class="ml-2">✨</span>
        </span>
      </button>
      
      <!-- 装饰性文字 -->
      <div class="text-center mt-4 text-sm text-gray-500">
        <span class="text-gold-foil mr-1">✦</span>
        马年大吉，万事如意
        <span class="text-gold-foil ml-1">✦</span>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['generate'])

const formData = reactive({
  target: '',
  keywords: ''
})

const handleSubmit = () => {
  emit('generate', {
    target: formData.target.trim(),
    keywords: formData.keywords.trim()
  })
}

const clearTarget = () => {
  formData.target = ''
}

const clearKeywords = () => {
  formData.keywords = ''
}

const addKeyword = (keyword) => {
  if (formData.keywords) {
    formData.keywords += '、' + keyword
  } else {
    formData.keywords = keyword
  }
}
</script>