import { IPayment } from "../../core/entities/pagamento"
import MercadoPago from "./mercado-pago/mp-pagamento"
import { IMpInterfaceItems,OutputPreferencFilter } from "../../core/dto/mp-mercadoPagoDto"

class Pagamento<T, U> implements IPayment{
    
    constructor(private instance:IPayment){ }

    async pix(data: T): Promise<U | null> {
        return await this.instance.pix(data)
    }

    async cartao(data: T): Promise<U | null> {
        return await this.instance.cartao(data)
    }

    async boleto(data: T): Promise<U | null> {
        return await this.instance.boleto(data)
    }

    async preference(data: any): Promise<any | null> {
        const payment= await this.instance.preference(data)
        return payment
    }
}
export default new Pagamento<IMpInterfaceItems, OutputPreferencFilter>(new MercadoPago)