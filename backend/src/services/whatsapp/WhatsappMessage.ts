import { IWhatsappMessageDto } from "../../core/dto/whatsappMessageDto";
import Evolution from "./EvolutionApi/Evolution";


class WhatsappMessage<T, U> implements IWhatsappMessageDto {
    
    constructor(private instance: IWhatsappMessageDto){}

    async messageText<T = any, U = any>(data: T): Promise<U|null> {
        return await this.instance.messageText(data)
    }


    async messageAudio<T = any, U = any>(data: T): Promise<U|null> {
        return await this.instance.messageAudio(data)
    }


    async messageVideo<T = any, U = any>(data: T): Promise<U|null> {
        return await this.instance.messageVideo(data)
    }
}


export default new WhatsappMessage(new Evolution())