import { generateBlessingText } from '../services/aiService.js'

export const generateBlessing = async (req, res) => {
  try {
    const { target, keywords } = req.body

    if (!target || target.trim() === '') {
      return res.status(400).json({
        success: false,
        error: '祝福对象不能为空'
      })
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const sendEvent = (type, data) => {
      res.write(`event: ${type}\n`)
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    sendEvent('start', { message: '开始生成祝福语...' })

    let fullText = ''
    
    try {
      await generateBlessingText(target, keywords, (chunk) => {
        fullText += chunk
        sendEvent('chunk', { content: chunk })
      })

      sendEvent('complete', {
        blessing: fullText,
        target: target.trim(),
        keywords: keywords?.trim() || ''
      })
    } catch (error) {
      sendEvent('error', { error: error.message || '生成失败' })
    }

    res.end()
  } catch (error) {
    console.error('生成祝福失败:', error)
    res.status(500).json({
      success: false,
      error: error.message || '生成祝福失败，请重试'
    })
  }
}