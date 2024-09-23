import configSystem from "./configSystem"
import FileMestre from '../helpers/files'
import dataCurrent from "../helpers/dataCurrent"
import path from 'path'
import fs from 'fs'


function logSave(data:any){
    const pathLog = path.join(__dirname, '../database/store/logs/logs.txt')
    if(!fs.existsSync(path.dirname(pathLog))){
        fs.mkdirSync(path.dirname(pathLog))
        FileMestre.write(pathLog, data)
        return
    }
    let arquiv= FileMestre.ready(pathLog)
    arquiv += data
    FileMestre.write(pathLog, arquiv) 
}

class Logs {
    async success(data: any){        
        if(configSystem.logControll.savaArquiveLogs){
            const l= `${dataCurrent.formatarDataHoraAtual()} [ SUCCESS ] ---> ${data}\n` 
            logSave(l)
        }

        if(!configSystem.logControll.success) return
        console.log(`[ SUCCESS ]\n ${data}`)
    }

    error(data:any){
        if(configSystem.logControll.savaArquiveLogs){
            const l= `${dataCurrent.formatarDataHoraAtual()} [ ERROR ] ---> ${data}\n`
            logSave(l)
        }
        if(!configSystem.logControll.error) return
        console.error(`[ ERROR ]\n ${data}`)
    }
}
 
const logSystem= new Logs()

export default logSystem 