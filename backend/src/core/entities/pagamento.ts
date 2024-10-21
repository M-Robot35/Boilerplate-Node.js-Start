export interface IPayment {
    pix(data:any):Promise<any | null>
    
    cartao(data:any): Promise<any | null>
    
    boleto(data:any): Promise<any | null>

    preference(data:any): Promise<any | null>
}