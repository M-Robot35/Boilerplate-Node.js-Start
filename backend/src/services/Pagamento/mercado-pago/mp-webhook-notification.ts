import logSystem from "../../../core/config/Logs";
import Transaction from "../../../core/database/model-data/Transaction";
import ResponseExpress from "../../../core/helpers/response-expres";
import PaymentItems from "../../../core/database/model-data/Payment-items";
import UserData from "../../../core/database/model-data/User";
import { Request, Response } from "express";
import { MpConfig } from "./mp-pagamento";
import { EventStatusPayment } from "../../../core/events/events-payments";

class MpPaymentNotification {

    async notification(req:Request, res:Response){
        const response= new ResponseExpress(res)
        const notification= req.body
                 
        const paymentID= notification['data']['id']
        
        const paymentVerify= await getTransactionPayment(paymentID)
        const paymentExiste= await Transaction.findTransactionId(paymentID)
        
        if(!paymentExiste){
            logSystem.error(`Transação não encontrada no bando de dados [ ${paymentExiste} ]`)
            response.notFound(null, 'Transação não desconhecida')
        }

        switch (paymentVerify) {
            case 'pending':
                logSystem.success(`Pagamento PENDENTE -- ${JSON.stringify(paymentID)}`)
                if(paymentExiste?.status !== paymentVerify){
                    const usuario= await UserData.find_by_id(paymentExiste!.userId)
                    EventStatusPayment.emit('PENDING', usuario)
                    await Transaction.transactionUpdate( paymentID  ,'pending')
                    await PaymentItems.paymentItemsUpdate(paymentID, 'pending')
                }
                break;

            case 'approved':
                logSystem.success(`Pagamento APROVADO -- ${JSON.stringify(paymentID)}`)
                if(paymentExiste?.status !== paymentVerify){
                    const usuario= await UserData.find_by_id(paymentExiste!.userId)
                    EventStatusPayment.emit('APROVADO', usuario)
                    await Transaction.transactionUpdate( paymentID  ,'approved') 
                    await PaymentItems.paymentItemsUpdate(paymentID, 'approved')
                }
                break;

            case 'rejected':
                logSystem.success(`Pagamento REJEITADO -- ${JSON.stringify(paymentID)}`)
                if(paymentExiste?.status !== paymentVerify){
                    const usuario= await UserData.find_by_id(paymentExiste!.userId)
                    EventStatusPayment.emit('REJECTED', usuario)
                    await Transaction.transactionUpdate( paymentID  ,'rejected')
                    await PaymentItems.paymentItemsUpdate(paymentID, 'rejected')
                }
                break;

            case 'cancelled':
                logSystem.success(`Pagamento CANCELADO -- ${JSON.stringify(paymentID)}`)
                if(paymentExiste?.status !== paymentVerify){
                    const usuario= await UserData.find_by_id(paymentExiste!.userId)
                    EventStatusPayment.emit('CANCELLED', usuario)
                    await Transaction.transactionUpdate( paymentID  ,'cancelled')
                    await PaymentItems.paymentItemsUpdate(paymentID, 'cancelled')
                }
                break;

            case 'refunded':
                logSystem.success(`Pagamento REFUNDED -- ${JSON.stringify(paymentID)}`)
                if(paymentExiste?.status !== paymentVerify){
                    const usuario= await UserData.find_by_id(paymentExiste!.userId)
                    EventStatusPayment.emit('REFUNDED', usuario)
                    await Transaction.transactionUpdate( paymentID  ,'refunded') 
                    await PaymentItems.paymentItemsUpdate(paymentID, 'refunded')
                }
                break;

            default:
                console.log('Status desconhecido:', paymentVerify);
                logSystem.error(`Pagamento desconhecido  --- ${JSON.stringify(paymentVerify)}`)
        }        
        
        response.notContent()
    }
}

export default new MpPaymentNotification()



async function getTransactionPayment(transactionId:string){

    // ------------------------------------------------------------
    // verificar pagamentos feitos por PREFERENCE
    // ------------------------------------------------------------
    if(transactionId.includes('-')){
        const getPaymentId = await fetch(`https://api.mercadopago.com/checkout/preferences/${transactionId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${MpConfig().access_token}`, 
              'Content-Type': 'application/json'
            }} 
        )
        const preferencePayment= await getPaymentId.json()
        return preferencePayment.auto_return
    }

    // ------------------------------------------------------------
    // verificar pagamentos feitos por PIX
    // ------------------------------------------------------------
    const getPaymentId = await fetch(`https://api.mercadopago.com/v1/payments/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MpConfig().access_token}`, 
          'Content-Type': 'application/json'
        }} 
    )
    const pixPayment= await getPaymentId.json()
    return pixPayment.status
}
