import { Request, Response, NextFunction } from "express"
import ResponseExpress from "../core/helpers/response-expres";
import configSystem from "../core/config/configSystem";
import jwt from "../core/helpers/jwt";
import logSystem from "../core/config/Logs";
import { decrypt } from "../core/helpers/encrypt-id";


const OauthJwt = async (req:Request, res:Response, next:NextFunction )=>{
    const result = new ResponseExpress(res)
    
    if(configSystem.jwt.jwt_bypass) {
        logSystem.success(`BY PASS [ON]`)
        return next()
    }

    try{        
        const token = req.headers.authorization?.split(' ')[1]
                       
        if(!token) return result.unothorized(null, 'Necessário Token')        
        
        const getToken = await jwt.tokenValidate(token)        
        
        if(!getToken) return result.unothorized(null, 'Token inválido')
        
        const { encrypId }= configSystem.database
        
        const checkWords = /\D/.test(getToken)         
        
        if(encrypId || checkWords){
            const decrypId= decrypt(getToken['id'].toString())            
            if(!decrypId) {
                logSystem.error(`Error encrypId inválido -- ${token} // ${decrypId}`)
                return result.unothorized(null, 'Token inválido')
            }
            getToken['id']= decrypId
        }
        
        req.user = getToken

        next()

    }catch(err){
        return result.unothorized('', 'Token inválido')
    }
}
export default OauthJwt