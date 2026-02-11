import express from 'express'
import { generateBlessing } from '../controllers/blessingController.js'

const router = express.Router()

router.post('/generate', generateBlessing)

export default router