import { generateBlessing } from '../controllers/blessingController.js'

export default async function handler(req, res) {
  const { method } = req
  
  if (method === 'POST' && req.url === '/api/blessings/generate') {
    try {
      const data = JSON.parse(req.body || '{}')
      const result = await generateBlessing(data)
      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json(result)
    } catch (error) {
      console.error('Error generating blessing:', error)
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  
  res.setHeader('Content-Type', 'application/json')
  return res.status(404).json({ error: 'Not found' })
}