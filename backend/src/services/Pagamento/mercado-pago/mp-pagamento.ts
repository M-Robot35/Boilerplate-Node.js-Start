import MercadoPagoConfig, {Preference, Payment} from "mercadopago"
import logSystem from "../../../core/config/Logs";
import UserData from "../../../core/database/model-data/User";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { IMpInterfaceItems, OutputPreferencFilter } from "../../../core/dto/mp-mercadoPagoDto";
import { preferenceFilterData } from "./preference";
import { pixFilterData } from "./pix";
import { IPayment } from "../../../core/entities/pagamento";
import { Env } from "../../../core/config/Env";

// mp documentação PIX
//   https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/integrate-with-pix#editor_8


// Documentação
//  https://www.mercadopago.com.br/developers/en/reference/preferences/_checkout_preferences/post


export function MpConfig(prod:boolean = Env.MP_PRODUCTION) {
    if (!prod) {
        return {
            // TOKEN ACCESS DE TESTE
            access_token: Env.MP_ACCESS_TOKEN_DEV ?? ""
        };
    } 

    return {
        // TOKEN DE PRODUÇÃO
        access_token: Env.MP_ACCESS_TOKEN_PROD ?? "" 
    };
}


export default class MercadoPago<T extends IMpInterfaceItems, U=OutputPreferencFilter> implements IPayment {
    
    private apiKeyMp = MpConfig()
    private client:MercadoPagoConfig

    constructor(){
        this.client= new MercadoPagoConfig({ accessToken: this.apiKeyMp.access_token, options: { timeout: 5000 } });
    }

    async preference(data: T): Promise<U | null> { 
          
        try {
            const bodyPrepare:any ={
                body: data
            }                    
            const preference = new Preference(this.client);
            const result = await preference.create(bodyPrepare)
            
            if(!result.id){
                logSystem.error(`MP - Error('Error Request Mercado Pago')`)
                return null
            }
            
            logSystem.success(`Mp Pix Criado com sucesso - ${JSON.stringify(bodyPrepare)}`)
            return await preferenceFilterData(result)  as any
        
        } catch (error) {
            logSystem.error(`MP - Erro ao processar pagamento via PIX: ${JSON.stringify(error)} `);
            return null  
        }
    }    


    async pix(data: T): Promise< PaymentResponse | null> {
        const user= await UserData.find_by_id(data.id)
        
        try{
            const preference = new Payment(this.client);
            const result = await preference.create({
                body: {
                    transaction_amount: (data.unit_price * data.quantity), 
                    description: data.description,                   
                    payment_method_id: 'pix', 
                    payer: {
                        email: user?.email,
                    }
                }
            })  

            if(result){
                return pixFilterData(data.id, result, data)
            }
            return null
 
        }catch(error){
            logSystem.error(`MP - Erro ao processar pagamento via PIX: ${JSON.stringify(error)} - ${data}`);
            return null
        }
    } 


    async cartao<T, U>(data: T): Promise<U | null> {
        // Aqui você deve implementar a lógica do pagamento via CARTÃO
        return null; 
    }


    async boleto<T, U>(data: T): Promise<U | null> {
        // Aqui você deve implementar a lógica do pagamento via BOLETO
        return null; 
    }    
}