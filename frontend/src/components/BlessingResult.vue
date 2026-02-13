<template>
  <!-- 加载状态 - 初始 -->
  <div v-if="loading && !blessing" class="text-center py-10 animate-fade-in">
    <div class="relative inline-block">
      <!-- 外圈光晕 -->
      <div class="absolute inset-0 w-24 h-24 bg-gradient-golden opacity-20 rounded-full blur-xl animate-pulse"></div>
      
      <!-- 旋转圆圈 -->
      <div class="w-20 h-20 rounded-full border-4 border-chinese-red/10 border-t-chinese-red animate-spin relative">
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-3xl animate-bounce">🎊</span>
        </div>
      </div>
    </div>
    
    <p class="mt-8 text-gray-600 font-sans-body text-xl font-medium">AI 正在为您精心创作...</p>
    
    <!-- 装饰性元素 -->
    <div class="mt-6 flex justify-center items-center gap-3">
      <span class="text-gold-foil text-2xl animate-float" style="animation-delay: 0s;">✦</span>
      <div class="flex gap-2">
        <span class="w-3 h-3 bg-gold-foil rounded-full animate-bounce shadow-md" style="animation-delay: 0ms;"></span>
        <span class="w-3 h-3 bg-gold-foil rounded-full animate-bounce shadow-md" style="animation-delay: 200ms;"></span>
        <span class="w-3 h-3 bg-gold-foil rounded-full animate-bounce shadow-md" style="animation-delay: 400ms;"></span>
      </div>
      <span class="text-gold-foil text-2xl animate-float" style="animation-delay: 1s;">✦</span>
    </div>
  </div>

  <!-- 错误状态 -->
  <div v-else-if="error" class="bg-red-50/90 backdrop-blur-md border-2 border-chinese-red/20 rounded-3xl p-8 animate-slide-up shadow-lg">
    <div class="flex items-start">
      <div class="w-14 h-14 bg-chinese-red/10 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0">
        <svg class="w-7 h-7 text-chinese-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <div>
        <p class="text-chinese-red font-bold text-lg mb-1">生成失败</p>
        <p class="text-gray-600">{{ error }}</p>
        <button
          @click="emit('retry')"
          class="mt-3 text-sm bg-chinese-red/10 hover:bg-chinese-red/20 text-chinese-red px-4 py-2 rounded-lg transition-colors duration-200"
        >
          重试
        </button>
      </div>
    </div>
  </div>

  <!-- 结果展示 -->
  <div v-else-if="blessing || loading" class="result-card p-8 relative overflow-hidden animate-slide-up">
    
    <!-- 装饰性背景光晕 -->
    <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-golden opacity-8 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-0 left-0 w-40 h-40 bg-gradient-imperial opacity-8 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    
    <!-- 装饰性边框 -->
    <div class="absolute inset-2 border border-gold-foil/10 rounded-2xl pointer-events-none"></div>
    
    <!-- 标题 -->
    <div class="flex items-start justify-between mb-6 relative z-10">
      <h3 class="font-serif-display text-2xl sm:text-3xl font-bold text-ink-black flex items-center">
        <span v-if="loading" class="flex items-center">
          <span class="mr-2">🎊</span>
          正在生成祝福
          <span class="ml-2 flex gap-1">
            <span class="w-2 h-2 bg-gold-foil rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
            <span class="w-2 h-2 bg-gold-foil rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
          </span>
        </span>
        <span v-else class="flex items-center">
          <span class="mr-2">🎊</span>
          马年专属祝福
          <span class="ml-3 text-gold-foil text-lg">✦</span>
        </span>
      </h3>
      <CopyButton v-if="!loading" :text="blessing" />
    </div>

    <!-- 祝福语内容 -->
    <div class="bg-paper-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg relative border border-gold-foil/20">
      <!-- 装饰性引号 -->
      <div class="absolute top-4 sm:top-6 left-3 sm:left-5 text-5xl sm:text-7xl text-gold-foil/8 font-serif-display leading-none select-none">"</div>
      <div class="absolute bottom-4 sm:bottom-6 right-3 sm:right-5 text-5xl sm:text-7xl text-gold-foil/8 font-serif-display leading-none select-none">"</div>
      
      <!-- 装饰性背景文字 -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span class="text-[80px] sm:text-[100px] md:text-[120px] text-gold-foil/5 font-serif-display font-bold select-none">福</span>
      </div>
      
      <!-- 内容 -->
      <p class="text-gray-800 leading-relaxed sm:leading-loose text-sm sm:text-base md:text-lg font-sans-body whitespace-pre-wrap relative z-10 pl-2 pr-2 py-3 font-medium">
        {{ blessing }}
        <span v-if="loading" class="inline-block w-3 h-4 bg-chinese-red ml-2 animate-pulse rounded-sm"></span>
      </p>
    </div>

    <!-- 底部装饰和操作 -->
    <div v-if="!loading" class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
      <!-- 装饰性文字 -->
      <div class="flex items-center flex-wrap justify-center sm:justify-start gap-x-2 text-xs text-gray-600">
        <span class="text-gold-foil">✦</span>
        <span class="font-sans-body">马年到</span>
        <span class="text-gold-foil">✦</span>
        <span class="font-sans-body">鸿运来</span>
        <span class="text-gold-foil">✦</span>
        <span class="font-sans-body">福气满满</span>
        <span class="text-gold-foil">✦</span>
      </div>

      <!-- 复制按钮 -->
      <button
        @click="copyText"
        class="flex items-center px-8 py-4 bg-gradient-imperial text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg group relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <svg v-if="copied" class="w-6 h-6 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-6 h-6 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <span class="relative z-10">{{ copied ? '已复制！' : '一键复制' }}</span>
      </button>
    </div>

    <!-- 装饰性角标 -->
    <div class="absolute top-4 right-4 flex flex-col gap-1">
      <span class="text-gold-foil/20 text-4xl animate-float" style="animation-delay: 0s;">✦</span>
      <span class="text-chinese-red/20 text-4xl animate-float" style="animation-delay: 0.5s;">✦</span>
    </div>
  </div>

  <!-- 空状态 -->
  <div v-else class="border-2 border-dashed border-gold-foil/20 rounded-3xl p-14 text-center animate-fade-in bg-paper-white/50 backdrop-blur-sm">
    <div class="relative inline-block">
      <!-- 光晕效果 -->
      <div class="absolute inset-0 w-28 h-28 bg-gradient-golden opacity-20 rounded-full blur-2xl animate-pulse"></div>
      
      <!-- 图标 -->
      <div class="relative w-24 h-24 mx-auto mb-6 bg-paper-white/90 rounded-2xl flex items-center justify-center shadow-lg border border-gold-foil/20">
        <span class="text-5xl animate-bounce">🎁</span>
      </div>
    </div>
    
    <h3 class="text-2xl font-serif-display font-bold text-ink-black mb-3">准备好生成祝福了吗？</h3>
    <p class="text-gray-500 font-sans-body text-lg">填写上方表单，为您生成专属马年祝福</p>
    
    <!-- 装饰性元素 -->
    <div class="mt-6 flex justify-center gap-4">
      <span class="text-gold-foil text-2xl animate-float" style="animation-delay: 0s;">✦</span>
      <span class="text-chinese-red text-2xl animate-float" style="animation-delay: 0.3s;">🐴</span>
      <span class="text-gold-foil text-2xl animate-float" style="animation-delay: 0.6s;">✦</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CopyButton from './CopyButton.vue'

const props = defineProps({
  blessing: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['retry'])

const copied = ref(false)

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(props.blessing)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>