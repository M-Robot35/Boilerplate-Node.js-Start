import { Router } from 'express'
import WebhookControll from '../controllers/WebhookController'
import MpPaymentNotification from '../services/Pagamento/mercado-pago/mp-webhook-notification'


const webhookRouter= Router()

webhookRouter.post('/webhook/evolution', WebhookControll.evolution)

webhookRouter.post('/webhook/mp/notification', MpPaymentNotification.notification)



export default webhookRouter