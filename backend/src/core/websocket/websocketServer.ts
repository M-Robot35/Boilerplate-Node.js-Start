import { Server } from "socket.io";
import http from 'http'
import logSystem from "../config/Logs";


let io_server:Server | null= null;

export  const Wss = (http: http.Server)=>{
    const io = new Server(http,{
        cors:{
            origin:'*' // or [url, url ]
        }
    })

    io.on('connection',( socket )=>{
        
        // ao usuario desconnectar
        socket.on("disconnect", (event) => {
           logSystem.success('Websocket disconnect com sucesso')           
        });
    })
    io_server=io
}

export default function getIoServer(){
    if(io_server){        
        return io_server        
    }else{
        logSystem.error('Websocket Error ao connectar')
        throw new Error('WEBSOCKET NÃO INICIADO')
    }
}

// para enviar eventos via websocket