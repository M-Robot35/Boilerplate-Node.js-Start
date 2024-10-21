import { Response, Request, NextFunction } from "express"
import ResponseExpress from "../core/helpers/response-expres"
import Zod from 'zod'
import logSystem from "../core/config/Logs"


class UserMiddleware {

    async create(req:Request, res:Response, next:NextFunction ){
        const responseResult= new ResponseExpress(res)
        
        try{
            const schemaCreate = Zod.object({
                nome: Zod.string()
                    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
                email: Zod.string()
                    .email({ message: "Formato de email inválido" })
                    .optional(),
                telefone: Zod.string()
                    .min(10, { message: "Telefone deve ter no mínimo 10 dígitos" }),
                password: Zod.string()
                    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
            });

            const result = schemaCreate.safeParse(req.body)

            if (!result.success) {
                // Formatar os erros retornados
                const formattedErrors = result.error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }));
                logSystem.success(`Token Criado  -- ${JSON.stringify(req.body)}`)
                return responseResult.notFound(formattedErrors, 'User Token Error')
            }
            next()

        }catch(error){
            logSystem.error(`user create login fail - ${JSON.stringify(req.body)}`)
            responseResult.server_error(null, 'Server error')
        }
    }
}

export default new UserMiddleware()