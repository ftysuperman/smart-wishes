import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
})

export const generateBlessingText = async (target, keywords, onChunk) => {
  try {
    const keywordsText = keywords ? `关键词：${keywords}\n` : ''
    
    const systemPrompt = '你是一个专业的祝福语生成助手，擅长创作温馨、真诚、富有创意的马年专属祝福语。'
    
    const userPrompt = `请为"${target}"生成一条马年专属祝福语。
${keywordsText}要求：
1. 体现马年特色（如：龙马精神、马到成功、一马当先、马年大吉等）
2. 温馨真诚，适合表达祝福
3. 100-150字左右
4. 语言简洁优美，富有感染力
5. 直接输出祝福语，不要有其他说明文字`

    const stream = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || 'qwen-plus',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      top_p: 0.9,
      max_tokens: 300,
      stream: true,
      stream_options: { include_usage: true }
    })

    let fullText = ''

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) {
        fullText += content
        if (onChunk) {
          onChunk(content)
        }
      }
    }

    const blessing = fullText.trim()

    if (!blessing) {
      throw new Error('AI 生成失败，未返回内容')
    }

    return blessing
  } catch (error) {
    console.error('阿里云百炼 API 调用失败:', error)
    
    if (error.message?.includes('401')) {
      throw new Error('API Key 无效，请检查配置')
    } else if (error.message?.includes('429')) {
      throw new Error('API 调用频率超限，请稍后重试')
    } else if (error.message?.includes('500')) {
      throw new Error('阿里云服务异常，请稍后重试')
    } else {
      throw new Error('生成祝福失败：' + (error.message || '未知错误'))
    }
  }
}