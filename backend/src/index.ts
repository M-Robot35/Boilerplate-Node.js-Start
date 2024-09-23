require('./core/config/boot')
import Cluster from "cluster"
import os from 'os'
import path from 'path'
import configSystem from "./core/config/configSystem"
import logSystem from "./core/config/Logs"


if(configSystem.cluster){
    const pathFile= path.join(__dirname, 'server.js')

    function Work(){
        const cpusLength= os.cpus().length * 2

        for (let i = 0; i < cpusLength; i++) {
            Cluster.fork()
        }

        Cluster.on('exit',(worker, code, signal)=> {
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                logSystem.error(`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`);
                logSystem.success('Starting a new worker');
                Cluster.fork();
            }            
        })
    }

    async function Slave(){
        await require(pathFile)
    }

    Cluster.isPrimary? Work() : Slave()

}else{
    require('./server')
}