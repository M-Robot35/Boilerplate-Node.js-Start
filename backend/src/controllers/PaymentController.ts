import { Response, Request } from "express"
import ResponseExpress from "../core/helpers/response-expres"
import Pagamento from "../services/Pagamento/Pagamento"
import UserData from "../core/database/model-data/User"
import { inputItems } from "../core/dto/mp-mercadoPagoDto"

class PaymentController {

    async createPix(req:Request, res:Response ){
        const responseResult= new ResponseExpress(res)
        const products= req.body

        const { id } = req.user
        
        const user= await UserData.find_by_id(id)        

        const { quantity, title, unit_price, description } = req.body[0]
        
        const payment= await Pagamento.pix({
            id: id.toString(),
            quantity,
            title,
            unit_price,
            description
        })

        if(!payment){
            return responseResult.notFound(null, "Erro ao Criar pagamento")
        }

        const resultPayment = payment

        responseResult.created(resultPayment)
    }


    async createPreference(req:Request, res:Response ){
        const responseResult= new ResponseExpress(res)
        const products= req.body

        const { id } = req.user
        
        const user= await UserData.find_by_id(id)
        
        if(!user)return // usuario não encontrado
        
        const pay = await paymentPrepareMp(id, products )        
        
        const payment= await Pagamento.preference(pay)

        if(!payment){
            return responseResult.notFound(null, "Erro ao Criar pagamento")
        }

        const resultPayment = payment

        responseResult.created(resultPayment)
    }
}
export default new PaymentController()


type optionsPaymentPrepareType ={
    back_urls?: {
        success?: string | null,
        pending?: string | null,
        failure?: string |null
    }
}


// -------------------------------------------------------------
// Prepara os dados para serem enviados para o MP --------------
// -------------------------------------------------------------
async function paymentPrepareMp(user_id:string|number, products:inputItems[], 
    options?:optionsPaymentPrepareType
){
    const user= await UserData.find_by_id(user_id)

    for(const item of products){
        // tipo de moeda
        item['currency_id']= 'BRL'
        item['id']= Number(user_id)
    }

    let paymentPrepare:Record<string, any> = {
        items:[]
    }
    
    if(user){
        paymentPrepare['payer']= {
            "name": user.nome,
            "surname": "",
            "email": user.email,
            "phone": {
            "area_code": user.telefone?.replace(/(\d{2})(\d+)/, '$1'),
            "number": user.telefone?.replace(/(\d{2})(\d+)/, '$2')
            }
        }
    }
    paymentPrepare['items']= products

    return paymentPrepare
}