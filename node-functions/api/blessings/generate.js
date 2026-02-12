export default async function handler(req, res) {
  const { method } = req
  
  if (method === 'POST' && req.url === '/api/blessings/generate') {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    
    // Handle preflight requests
    if (method === 'OPTIONS') {
      return res.status(200).end()
    }
    
    try {
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })
      
      req.on('end', async () => {
        try {
          const data = JSON.parse(body)
          res.setHeader('Content-Type', 'text/event-stream')
          res.setHeader('Cache-Control', 'no-cache')
          res.setHeader('Connection', 'keep-alive')
          
          const sendEvent = (type, data) => {
            res.write(`event: ${type}\n`)
            res.write(`data: ${JSON.stringify(data)}\n\n`)
          }
          
          sendEvent('start', { message: '开始生成祝福语...' })
          sendEvent('complete', {
            blessing: '测试祝福语：愿您心想事成，万事如意！',
            target: data.target || '朋友',
            keywords: data.keywords || ''
          })
          
          res.end()
        } catch (error) {
          console.error('Error generating blessing:', error)
          res.setHeader('Content-Type', 'application/json')
          return res.status(500).json({ error: 'Internal server error' })
        }
      })
    } catch (error) {
      console.error('Error parsing request:', error)
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  
  res.setHeader('Content-Type', 'application/json')
  return res.status(404).json({ error: 'Not found' })
}