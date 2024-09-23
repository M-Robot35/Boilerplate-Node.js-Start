import { Request, Response, NextFunction } from "express"
import jwt from "../core/helpers/jwt"
import UserData from "../core/database/model-data/user"
import ResponseExpress from "../core/helpers/response-expres"
import { z as Zod } from 'zod';

// insira e adeque como será feito o login em sua API

class Login {    

    async tokenGenerate(req: Request, res: Response, next: NextFunction) {        
        const resultResponse = new ResponseExpress(res);

        // Validação com Zod
        const resultZod = this.phoneSchema.safeParse(req.body);

        if (!resultZod.success) {
            // Se a validação falhar, formatar os erros
            const formattedErrors = this.formatZodErrors(resultZod.error);
            return resultResponse.notFound(formattedErrors, 'Login inválido');
        }        
        
        const { telefone } = req.body;

        try {
            // Verifica se o usuário existe pelo telefone
            const usuario = await UserData.find_by_telefone(telefone);

            if (!usuario) {
                return resultResponse.notFound(null, 'Token inválido');
            }

            // Gera o token do usuário
            const generateToken = await jwt.tokenGenerate({ id: usuario.id });

            return resultResponse.ok({
                user: usuario,
                token: generateToken
            });

        } catch (error) {
            return resultResponse.server_error(null, "Ocorreu algum erro")
        }
    }


    // Esquema de validação para telefone
    private phoneSchema = Zod.object({
        telefone: Zod.string()
            .trim()
            .min(11, { message: 'Quantidade de números inválidos, esperado 11 dígitos.' })
    });
    

    // Função para formatar erros do Zod
    private formatZodErrors(errors: Zod.ZodError): { path: string, message: string }[] {
        return errors.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
        }));
    }

}

export default new Login();