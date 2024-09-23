import { Router } from 'express'
import WebhookControll from '../controllers/WebhookController'

const webhookRouter= Router()

webhookRouter.post('/webhook/evolution', WebhookControll.evolution)



export default webhookRouter