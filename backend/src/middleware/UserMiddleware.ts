import { Response, Request, NextFunction } from "express"
import ResponseExpress from "../core/helpers/response-expres"
import Zod from 'zod'


class UserMiddleware {

    async create(req:Request, res:Response, next:NextFunction ){
        const responseResult= new ResponseExpress(res)

        const result = this.userSchema.safeParse(req.body);

        if (!result.success) {
            // Formatar os erros retornados
            const formattedErrors = result.error.errors.map(err => ({
                path: err.path.join('.'),
                message: err.message
            }));

            return responseResult.notFound(formattedErrors, 'User Error')
        }
        next()
    }


    private userSchema = Zod.object({
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
}

export default new UserMiddleware()