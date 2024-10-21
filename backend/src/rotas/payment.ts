import { Router } from 'express'
import PaymentController from '../controllers/PaymentController';
import PaymentMiddleware from '../middleware/PaymentMiddleware';


const payment= Router()

payment.post('/user/payment/pix', PaymentController.createPix)

// payment.post('/user/payment/preference', PaymentMiddleware.create, PaymentController.createPreference)
payment.post('/user/payment/preference', PaymentController.createPreference)


export default payment