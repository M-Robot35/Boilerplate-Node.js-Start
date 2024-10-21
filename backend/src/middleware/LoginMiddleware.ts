import { Request, Response, NextFunction } from "express"
import jwt from "../core/helpers/jwt"
import UserData from "../core/database/model-data/User"
import ResponseExpress from "../core/helpers/response-expres"
import { z as Zod } from 'zod';
import logSystem from "../core/config/Logs";

// insira e adeque como será feito o login em sua API

class Login {    

    async tokenGenerate(req: Request, res: Response, next: NextFunction) {        
        const resultResponse = new ResponseExpress(res);

        // Validação com Zod
        const schemaLogin = Zod.object({
            email: Zod.string()
                .trim()
                .email(),
            password: Zod.string().min(8)
        });

        const resultZod= schemaLogin.safeParse(req.body)

        if (!resultZod.success) {
            // Se a validação falhar, formatar os erros
            const formattedErrors = this.formatZodErrors(resultZod.error);
            return resultResponse.notFound(formattedErrors, 'Login inválido');
        }        
        
        const { email, password } = req.body;

        try {
            // Verifica se o usuário existe pelo telefone
            const usuario = await UserData.find_by_email(email);

            if (!usuario) {
                return resultResponse.notFound(null, 'Token inválido');
            }

            // Gera o token do usuário
            const generateToken = await jwt.tokenGenerate({ id: usuario.id });

            logSystem.success(`Token Create -- ${JSON.stringify(usuario)} / ${generateToken}`)

            return resultResponse.ok({
                user: usuario,
                token: generateToken
            });

        } catch (error) {
            logSystem.error(`Error ao Criar Token -- ${JSON.stringify(req.body)}`)
            return resultResponse.server_error(null, `Error ao Criar token`)
        }
    }


    // Esquema de validação para telefone
    private phoneSchema = Zod.object({
        email: Zod.string()
            .trim()
            .email(),
        password: Zod.string().min(8)
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