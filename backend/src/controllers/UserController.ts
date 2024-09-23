import { Response, Request } from "express"
import ResponseExpress from "../core/helpers/response-expres"
import UserData from "../core/database/model-data/user"
import { IUserCreateDto } from "../core/dto/databaseDTO/user"


class UserController {

    async create(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body

        const dataUser: IUserCreateDto = {
            nome,
            telefone,
            email: email ?? null,
            password
        }
        const userData= await UserData.create(dataUser)
        if(!userData){
            return result.server_error(null, 'Não foi possivel Criar usuário')
        }
        return result.created(userData)
    }


    async delete(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { id } = req.userId

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
        const { id } = req.userId

        if(!id){
            return await result.server_error(null, 'Necessita do ID do usuário a ser deletado')
        }

        const userData= await UserData.find_by_id(id)

        if(!userData){
           return await result.notFound(userData, 'Usuário não foi encontrado')
        }
        return await result.ok(userData)
    }
}

export default new UserController()