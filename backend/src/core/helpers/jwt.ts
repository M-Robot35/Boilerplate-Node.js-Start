import jw from "jsonwebtoken"
import logSystem from "../config/Logs"
import configSystem from "../config/configSystem"


type jwtType = {
    id:string | number
}

class Jwt {
    private secretKey = configSystem.jwt.secret
    private expiration = configSystem.jwt.expiration   
    
    async tokenGenerate( id:jwtType ) {
        return await jw.sign({
            id
        }, this.secretKey, { expiresIn: this.expiration });
    }

    async tokenValidate( token:string ):Promise<jwtType|null>{    
        if(!token) {
            logSystem.error('Informe o Token')
            return null
        } 
        const { id }:any =  jw.verify(token, this.secretKey );
        logSystem.success(id)
        return id      
    }
}
export default new Jwt()