
export interface IWhatsappMessageDto {
    messageText<T=any, U=any>(data:T): Promise<U|null>

    messageAudio<T=any, U=any>(data:T): Promise<U|null>

    messageVideo<T=any, U=any>(data:T): Promise<U|null>
}