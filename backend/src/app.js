import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import blessingRoutes from './routes/blessing.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/blessings', blessingRoutes)

app.get('/', (req, res) => {
  res.json({
    message: '智能祝福文案生成器 API',
    version: '1.0.0',
    endpoints: {
      generate: 'POST /api/blessings/generate'
    }
  })
})

app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    error: '服务器内部错误'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`)
  console.log(`📚 API 文档: http://localhost:${PORT}/`)
})