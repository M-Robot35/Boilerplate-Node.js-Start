import { IUserCreateDto, IUserIdDto, IUserUpdateDto, IUserOutputDto, IUserInterface } from "../../dto/databaseDTO/user";
import IUserQuery from "../query/userQuery";
import logSystem from "../../config/Logs";
import DataIsoTransform from "../databaseBase";

class Users extends DataIsoTransform implements IUserInterface{

    constructor(private instance: IUserInterface ){
        super()
    }

    async create<T extends IUserCreateDto>(data: T): Promise<IUserOutputDto | null> {
        try{
            let result= await this.instance.create(data)
            // inserir validações ou filtros caso precise
            
            if(result){
                await this.encryptKey(result)
                return this.dataIsoTransform(result)
            }
            
            return result
        }catch(error){
            logSystem.error(`Database Error Create`)
            return null
        }
    }

    async find_by_id<T extends IUserIdDto>(userId: T): Promise<IUserOutputDto | null> {
        let result= await this.instance.find_by_id(userId)
        // inserir validações ou filtros caso precise

        if(result){
            await this.encryptKey(result)
            return this.dataIsoTransform(result)
        }
        return result
    }

    async update<T extends IUserUpdateDto>(userId: IUserIdDto, data: T): Promise<IUserOutputDto | null> {
        let result= await this.instance.update(userId, data)
        
        // inserir validações ou filtros caso precise
        if(result){
            return this.dataIsoTransform(result)
        }
        return result
    }

    async delete_by_id<T extends IUserIdDto>(userId: T): Promise<IUserOutputDto | null> {
        let result= await this.instance.delete_by_id(userId)
        
        // inserir validações ou filtros caso precise
        if(result){
            return this.dataIsoTransform(result)
        }
        return result
    }

    async find_by_email<T = string>(email: T): Promise<IUserOutputDto | null> {
        if(!email) return null

        let result= await this.instance.find_by_email!(email)
        // inserir validações ou filtros caso precise
        if(result){
            await this.encryptKey(result)
            return this.dataIsoTransform(result)
        }
        return result
    }

    async find_by_telefone<T =string>(telefone: T): Promise<IUserOutputDto | null> {
        if(!telefone) return null

        let result= await this.instance.find_by_telefone!(telefone)
        // inserir validações ou filtros caso precise
        if(result){
            await this.encryptKey(result)
            return this.dataIsoTransform(result)
        }
        return result
    }
}

const  UserData= new Users(new IUserQuery)

export default UserData