import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import blessingRoutes from '../routes/blessing.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// 路由定义 - 处理 /api/blessings/generate
app.use('/blessings', blessingRoutes)

app.get('/', (req, res) => {
  res.json({
    message: '智能祝福文案生成器 API',
    version: '1.0.0',
    endpoints: {
      generate: 'POST /api/blessings/generate'
    }
  })
})

// 导出处理函数
export default async function handler(req, res) {
  console.log('Request received:', req.method, req.url)
  return app(req, res)
}