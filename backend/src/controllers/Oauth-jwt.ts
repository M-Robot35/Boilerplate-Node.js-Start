import { Request, Response, NextFunction } from "express"
import ResponseExpress from "../core/helpers/response-expres";
import configSystem from "../core/config/configSystem";
import jwt from "../core/helpers/jwt";


const OauthJwt = async (req:Request, res:Response, next:NextFunction )=>{
    const result = new ResponseExpress(res)

    if(configSystem.jwt.jwt_bypass) return next()

    try{
        const token = req.headers.authorization?.split(' ')[1]   
                       
        if(!token) return result.unothorized(null, 'Necessário Token')
        
        const getToken = await jwt.tokenValidate(token)
        
        if(!getToken) return result.unothorized(null, 'Token inválido')

        req.userId = getToken
        next()

    }catch(err){
        return result.unothorized('', 'Token inválido')
    }
}

export default OauthJwt