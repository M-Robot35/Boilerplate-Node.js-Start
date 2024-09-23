import { Response } from "express";
import { sender, statusResponse } from "../dto/ResponseExpress";


// ------------------------------------------------------------------------------
// ------- RESPONSE CLIENT ------------------------------------------------------
// ------------------------------------------------------------------------------

export default class ResponseExpress{

    constructor(private response:Response){}

    ok<T=any>( data: T): Response {
        return this.response.status(statusResponse.OK).json(sender<T>(data))
    }

    created<T=any>( data: T): Response {
        return this.response.status(statusResponse.CREATED).json(sender<T>(data))
    }

    forbiden<T=any>( data: T, message:string): Response {        
        return this.response.status(statusResponse.FORBIDEN).json(sender<T>(data, message, true))
    }

    notFound<T=any>( data: T, message:string): Response {        
        return this.response.status(statusResponse.NOT_FOUND).json(sender<T>(data, message, true))
    }

    unothorized<T=any>( data: T, mensage: string): Response {               
        return this.response.status(statusResponse.UNAUTHORIZED).json(sender<T>(data, mensage, true))
    }

    notContent(): Response {
        return this.response.status(statusResponse.NOT_CONTENT).end()
    }

    server_error<T=any>( data: T, message:string): Response {        
        return this.response.status(statusResponse.NOT_FOUND).json(sender<T>(data, message, true))
    }
}