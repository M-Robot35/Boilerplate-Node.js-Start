import PaymentItems from "../../../core/database/model-data/Payment-items";
import Transaction from "../../../core/database/model-data/Transaction";
import logSystem from "../../../core/config/Logs";
import { IPaymentPreferenceResponse } from "./dto/response_preference";


// -------------------------------------------------------------
// Filtrar dados do preference vindos do MP---------------------
// -------------------------------------------------------------
export async function preferenceFilterData(data:IPaymentPreferenceResponse){
    const {id,init_point, sandbox_init_point,date_created, items, total_amount}= data
        
    const preference_filter =  {
        init_point,
        sandbox_init_point,
        date_created,
        total: total_amount?? data.total_amount,
    }

    try{
        // SALVAR A TRANSAÇÃO
        await Transaction.transactionCreate({
            userId: Number(items[0].id),
            transactionId: id!, 
            amount: total_amount? total_amount: 0,
            status:'pending',
            paymentType: 'preference',
            urlPayment: init_point!,
            createdAt: date_created,
            url_sandbox: sandbox_init_point!,
            url_production: init_point
        })
    }catch(error){
        logSystem.error('Error Transaction não foi transação')
    }
    
    try{
        // SALVAR OS ITEMS DESEJADOS
        items.forEach(async item =>{
            await PaymentItems.create({
                userId: Number(item.id),
                transactionId: id!,
                title: item.title,
                quantity: item.quantity,
                unit_price: item.unit_price,
                amount: data.total_amount? data.total_amount: (item.unit_price * item.quantity),
                status: 'pending',
                description: item.description
            })
        })

    }catch(error){
        logSystem.error('Error ao salvar items')
    }

    return preference_filter
}

