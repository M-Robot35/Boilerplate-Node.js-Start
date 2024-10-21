import { IWhatsappMessageDto } from "../../../core/dto/whatsappMessageDto";
import logSystem from "../../../core/config/Logs";


export default class Evolution implements IWhatsappMessageDto{
    
    constructor(){}

    async messageText<T = any, U = any>(data: T): Promise<U | null> {
        // implementar logica
        return null
    }


    async messageAudio<T = any, U = any>(data: T): Promise<U | null> {
        // implementar logica
        return null
    }



    async messageVideo<T = any, U = any>(data: T): Promise<U | null> {
        // implementar logica
        return null
    }

    
}

