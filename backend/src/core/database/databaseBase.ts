import dataCurrent from "../helpers/dataCurrent";
import { getOrGenerateHash } from "../helpers/encrypt-id";
import configSystem from "../config/configSystem";

const { database }= configSystem

class DataIsoTransform {
    /**
     * @param database 
     * @description tranforma a data de  ISO para  dd/mm/yyyy
     */
    dataIsoTransform<T extends Record<string, any>>(databaseInput: T){
        const transformKey: (keyof T)[] = ['created_at', 'update_at'];
        const removeKey: (keyof T)[] = database.removeKey.key ?? [ 'password', "update_at"];

        transformKey.forEach( transform => {
            if(databaseInput[transform]){
                databaseInput[transform]= dataCurrent.formatarDataISO8601(databaseInput[transform])
            }
        })

        if(!database.removeKey){
            return databaseInput
        }

        removeKey.forEach( transform => {
            if(databaseInput[transform]){
                delete databaseInput[transform]
            }
        })
        return databaseInput
    }    

    async encryptKey(data:Record<string, any>){
        if(!database.encrypId){
            return data
        }

        const dataEncrypt:string[]=['id']

        dataEncrypt.forEach(async key =>{
            if(data[key]){
                const {vi, encryptedData}= await getOrGenerateHash(data[key])
                data[key]= encryptedData
            }
        })
        return data
    }
}

export default DataIsoTransform