import { Response, Request } from "express"
import ResponseExpress from "../core/helpers/response-expres"


class WebhookControll {

    async evolution(req:Request, res:Response ){
        // inserir validações para receber uma webhook desejada
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body

        return result.notContent()
    }
}

export default new WebhookControll()