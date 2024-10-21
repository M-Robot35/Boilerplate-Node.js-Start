import e, { Response, Request } from "express"
import ResponseExpress from "../core/helpers/response-expres"
import UserData from "../core/database/model-data/User"
import { IUserCreateDto } from "../core/dto/databaseDTO/user"
import logSystem from "../core/config/Logs"
import bcriptHash from "../core/helpers/bcript"


class UserController {

    async create(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body
        
        let dataUser: IUserCreateDto = {
            nome,
            telefone,
            email: email ?? null,
            password: await bcriptHash.passHash(password)
        }
        

        const findEmailDuplicate= await UserData.find_by_email(email)
        
        if(findEmailDuplicate?.id){
            logSystem.error(`Error Usuário já Existe`)
            return result.forbiden(null, 'Usuário já Existe')
        }

        const userData= await UserData.create(dataUser)

        if(!userData){
            return result.server_error(null, 'Não foi possivel Criar usuário')
        }
        return result.created(userData)
    }


    async delete(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { id } = req.user

        if(!id){
            return await result.server_error(null, 'Necessita do ID do usuário a ser deletado')
        }
        const userData= await UserData.delete_by_id(id)
        if(!userData){
           return await result.server_error(userData, 'Usuário não foi deletado')
        }
        return await result.ok(userData)
    }

    async getUser(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { id } = req.user
        
        try{
            if(!id){
                logSystem.error(`ID não enviado`)
                return await result.forbiden(null, 'Necessita do ID do usuário a ser deletado')
            }
    
            const userData= await UserData.find_by_id(id)
    
            if(!userData){
                logSystem.error(`Get user não encontrado -- ID ${JSON.stringify(id)}`)
                return await result.notFound(userData, 'Usuário não foi encontrado')
            }

            logSystem.success(`Login Success -- ${JSON.stringify(id)}`)
            return await result.ok(userData)

        }catch(error){
            logSystem.error(`Get user SERVER Error -- ID ${JSON.stringify(id)}`)
            return result.server_error(null, 'Server Error')
        }
    }
}

export default new UserController()