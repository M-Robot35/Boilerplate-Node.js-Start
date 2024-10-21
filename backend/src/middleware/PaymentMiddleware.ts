import { Response, Request, NextFunction } from "express"
import ResponseExpress from "../core/helpers/response-expres"
import logSystem from "../core/config/Logs"
import Z from 'zod'


class PaymentMiddleware {

    async create(req:Request, res:Response, next:NextFunction ){
        const responseResult= new ResponseExpress(res)

        try{
            const schemaPayment = Z.object({
                quantity: Z.number({message: "quantity deve ser um número"}),        
                title: Z.string().min(1,{message:'title Deve ter no minimo 3 letras'}),        
                unit_price: Z.number({message:'unit_price deve ser um número'}),
                description: Z.string({message:'description Deve ser passada'})
            });
    
            const result= schemaPayment.safeParse(req.body)
    
            if (!result.success) {
                // Formatar os erros retornados
                const formattedErrors = result.error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }));
                logSystem.success(`Token Criado  -- ${JSON.stringify(req.body)}`)
                return responseResult.notFound(formattedErrors, 'Error Create Payment PIX')
            }
            next()

        }catch(error){
            logSystem.error(`Error [Payment Middleware] -- ${req.body}`)
            return responseResult.server_error(null, 'Server error')

        }
    }
}

export default new PaymentMiddleware()