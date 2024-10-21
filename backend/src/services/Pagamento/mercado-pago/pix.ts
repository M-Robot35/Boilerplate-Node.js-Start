import PaymentItems from "../../../core/database/model-data/Payment-items";
import Transaction from "../../../core/database/model-data/Transaction";
import logSystem from "../../../core/config/Logs";
import { IPaymentPixResponse } from "./dto/response_pix";
import UserData from "../../../core/database/model-data/User";
import { inputItems } from "../../../core/dto/mp-mercadoPagoDto";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";


// -------------------------------------------------------------
// Filtrar dados do pix vindos do MP---------------------
// -------------------------------------------------------------
export async function pixFilterData(userId:string | number, data:IPaymentPixResponse, items:inputItems): Promise<PaymentResponse | any>{
    const user= await UserData.find_by_id(Number(userId))
    
    let filter:Record<string, any>=Object();
    
   
    //filter['id']=data.id
    filter['currency_id']=data.currency_id
    filter['payment_method_id']=data.payment_method_id
    filter['description']=data.description
    filter['value']=data.transaction_amount
    filter['status']=data.status
    filter['qr_code']=data.point_of_interaction.transaction_data.qr_code
    filter['ticket_url']=data.point_of_interaction.transaction_data.ticket_url
    filter['qr_code_base64']=data.point_of_interaction.transaction_data.qr_code_base64 

    try{
        // SALVAR A TRANSAÇÃO
        await Transaction.transactionCreate({
            amount: data.transaction_amount!,
            paymentType: data.payment_method.id,
            userId: Number(userId),
            transactionId: data.id!.toString(),
            status: data.status,
            qrCodeBase64: data.point_of_interaction?.transaction_data?.qr_code_base64!,
            urlPayment:data.point_of_interaction?.transaction_data?.ticket_url!,
            qrCodeLink: data.point_of_interaction?.transaction_data?.qr_code!,
            createdAt: data.date_created!,
            //expiresAt: data.date_of_expiration
        })
    }catch(error){
        logSystem.error('Error Transaction não foi transação PIX')
    }
    
    try{
        // SALVAR OS ITEM DESEJADOS
        await PaymentItems.create({
            transactionId: data.id!.toString(),
            amount: data.transaction_amount!,
            quantity: items.quantity,
            title: items.title,
            description: items.description,
            unit_price: items.unit_price,
            status: data.status,
            userId: Number(userId),
        }) 

    }catch(error){
        logSystem.error('Error ao salvar items  PIX')
    }

    return filter
}

