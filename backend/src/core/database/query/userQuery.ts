import logSystem from "../../config/Logs";
import { IUserCreateDto, IUserIdDto, IUserInterface, IUserOutputDto, IUserUpdateDto } from "../../dto/databaseDTO/user";
import prisma from "../connection";

export default class IUserQuery implements IUserInterface{
    
    async create<T extends IUserCreateDto  >(data: T): Promise<IUserOutputDto | null> {        
        try{
            const exec= prisma.users.create({
                data            
            })
                
            return exec

        }catch(error){
            logSystem.error(error)
            return null
        }
    }

    async delete_by_id<T= IUserIdDto>(userId: T): Promise<IUserOutputDto | null> {
        const exec= prisma.users.delete({
            where: {
                id: Number(userId)
            }          
        })

        return exec        
    }

    async find_by_id<T extends  IUserIdDto>(userId: T): Promise<IUserOutputDto | null> {
        const exec= prisma.users.findFirst({
            where: {
                id: Number(userId)
            }          
        })
        return exec        
    }

    async update<T extends  IUserUpdateDto>(userId: IUserIdDto, data: T): Promise<IUserOutputDto | null> {
        const exec= prisma.users.update({
            where: {
                id: Number(userId)
            },
            data
        })
        return exec        
    }

    async find_by_email<T =string>(email: T): Promise<IUserOutputDto | null> {
        if(!email) return null

        const exec= prisma.users.findFirst({
            where: {
                email: email
            }          
        })
        return exec  
    }
}