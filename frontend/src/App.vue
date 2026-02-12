<template>
  <div class="min-h-screen bg-pattern-cloud bg-gradient-to-br from-ivory-white via-paper-white to-ivory-white flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
    
    <!-- 背景装饰层 -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- 大型装饰性元素 -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-golden opacity-5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-imperial opacity-5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-foil/3 rounded-full blur-3xl"></div>
    </div>
    
    <!-- 浮动装饰元素 -->
    <div class="absolute top-16 left-16 opacity-8 text-gold-foil text-7xl animate-float" style="animation-delay: 0s;">
      ☁
    </div>
    <div class="absolute top-32 right-24 opacity-6 text-gold-foil text-9xl animate-float" style="animation-delay: 2s;">
      ☁
    </div>
    <div class="absolute bottom-32 left-24 opacity-6 text-gold-foil text-8xl animate-float" style="animation-delay: 4s;">
      ☁
    </div>
    <div class="absolute top-1/2 right-20 opacity-5 text-chinese-red text-6xl animate-float" style="animation-delay: 1s;">
      ✦
    </div>
    <div class="absolute bottom-20 right-1/3 opacity-5 text-gold-foil text-6xl animate-float" style="animation-delay: 3s;">
      ✦
    </div>

    <!-- 主卡片 -->
    <div class="bg-ivory-white/95 backdrop-blur-xl rounded-3xl shadow-floating border border-gold-foil/20 w-full max-w-[720px] p-8 sm:p-10 md:p-12 relative overflow-hidden animate-fade-in">
      
      <!-- 内层金色边框 -->
      <div class="absolute inset-1 border-2 border-gold-foil/20 rounded-3xl pointer-events-none"></div>
      
      <!-- 四角装饰 -->
      <div class="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-chinese-red rounded-tl-3xl"></div>
      <div class="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-chinese-red rounded-tr-3xl"></div>
      <div class="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-chinese-red rounded-bl-3xl"></div>
      <div class="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-chinese-red rounded-br-3xl"></div>
      
      <!-- 内部装饰线 -->
      <div class="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold-foil/40"></div>
      <div class="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-foil/40"></div>
      <div class="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold-foil/40"></div>
      <div class="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-foil/40"></div>

      <!-- 头部 -->
      <header class="text-center mb-10 relative">
        <!-- 马年装饰图标 -->
        <div class="relative inline-block">
          <div class="absolute inset-0 w-32 h-32 bg-gradient-golden opacity-20 rounded-full blur-2xl animate-pulse"></div>
          <div class="relative text-7xl sm:text-8xl animate-float">
            🐴
          </div>
        </div>
        
        <h1 class="font-serif-display text-5xl sm:text-6xl md:text-7xl font-bold text-ink-black mb-3 tracking-wide mt-6">
          马年祝福
        </h1>
        <p class="text-base sm:text-lg text-gray-500 font-sans-body tracking-widest">
          智能祝福文案生成器
        </p>
        
        <!-- 装饰线 -->
        <div class="flex items-center justify-center gap-4 mt-8">
          <div class="w-16 h-px bg-gradient-golden"></div>
          <span class="text-gold-foil text-2xl">✦</span>
          <div class="w-16 h-px bg-gradient-golden"></div>
        </div>
      </header>

      <!-- 表单 -->
      <BlessingForm 
        @generate="handleGenerate"
        :loading="loading"
      />

      <!-- 结果 -->
      <BlessingResult 
        :blessing="blessing"
        :loading="loading"
        :error="error"
        @retry="handleRetry"
      />
      
      <!-- 底部装饰性元素 -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gold-foil/20">
        <span class="text-4xl">✦</span>
      </div>
    </div>

    <!-- 底部祝福语 -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
      <div class="inline-flex items-center px-8 py-3 bg-ivory-white/80 backdrop-blur-md rounded-full shadow-lg border border-gold-foil/20">
        <span class="text-gold-foil text-xl mr-3">✨</span>
        <span class="text-gray-700 font-sans-body text-base tracking-wide">愿您马年大吉，万事如意</span>
        <span class="text-gold-foil text-xl ml-3">✨</span>
      </div>
    </div>

    <!-- 右下角装饰 -->
    <div class="absolute bottom-8 right-8 opacity-6 animate-float" style="animation-delay: 2s;">
      <div class="flex flex-col gap-1 items-center">
        <span class="text-gold-foil text-3xl">✦</span>
        <span class="text-chinese-red text-3xl">🐴</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlessingForm from './components/BlessingForm.vue'
import BlessingResult from './components/BlessingResult.vue'

const loading = ref(false)
const blessing = ref('')
const error = ref('')
const streaming = ref(false)

const handleGenerate = async (data) => {
  loading.value = true
  streaming.value = true
  error.value = ''
  blessing.value = ''
  
  try {
    const params = new URLSearchParams(data)
    const response = await fetch(`/api/blessings/generate?${params}`, {
      method: 'GET'
    }).catch(error => {
      if (error.response?.status === 405) {
        console.error('方法不允许，请检查服务端路由配置');
      }
    });

    if (!response.ok) {
      throw new Error('请求失败')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('event: ')) {
          const event = line.substring(7)
          if (event === 'start') {
            console.log('开始生成')
          } else if (event === 'complete') {
            console.log('生成完成')
          } else if (event === 'error') {
            error.value = '生成失败，请重试'
          }
        } else if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.substring(6))
            if (data.content) {
              blessing.value += data.content
            } else if (data.error) {
              error.value = data.error
            }
          } catch (e) {
            console.error('解析数据失败:', e)
          }
        }
      }
    }
  } catch (err) {
    error.value = '网络错误，请检查连接'
    console.error(err)
  } finally {
    loading.value = false
    streaming.value = false
  }
}

const handleRetry = () => {
  // Clear error and let user retry with same form data
  error.value = ''
}
</script>