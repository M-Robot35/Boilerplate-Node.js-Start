import fs from 'fs'
import logSystem from '../config/Logs'


class FileMaster {    

    ready(pathFile:string){
        if (fs.existsSync(pathFile)) {
            const cronData:any= fs.readFileSync(pathFile, {encoding: 'utf-8'});
            return cronData
        }
        logSystem.error(`[ ready ] - not found arquive ${pathFile}`)
        return null
    }



    write(pathFile:string, data:any){
        fs.writeFileSync(pathFile, data, {encoding: 'utf-8'});
    }



    writeJson(pathFile:string,data: Record<string, any>){
        fs.writeFileSync(pathFile, JSON.stringify(data, null, 2), {encoding: 'utf-8'});
    }



    readyJson<U=any>(pathFile:string):U | null{
        if (fs.existsSync(pathFile)) {
            const cronData:any= fs.readFileSync(pathFile, {encoding: 'utf-8'});
            return JSON.parse(cronData);
        }
        logSystem.error(`[ readyJson ] - not found arquive ${pathFile}`)
        return null
    }

}

export default new FileMaster()