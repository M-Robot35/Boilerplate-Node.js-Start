import bcrypt  from 'bcrypt'
import configSystem from "../config/configSystem"


const bcriptHash= {
    compare: ( password:string, passHash:string )=>{
        const result = bcrypt.compare(password, passHash)
        return result
    },

    passHash: async( password:string )=>{
        const sault = await bcrypt.genSalt(Number(configSystem.bcript.sault))
        const encrip = await bcrypt.hash(password, sault)
        return encrip
    }
}
export default bcriptHash