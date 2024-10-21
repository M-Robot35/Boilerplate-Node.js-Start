import { Response, Request } from "express"
import ResponseExpress from "../core/helpers/response-expres"
import Schendule from "../core/helpers/schedule"


class SchenduleController {


    async add(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body
        //const { id } = req.user

        const sc= new Schendule('22')
        sc.schenduleAdd('', 'USER_ALL' )

        result.notContent()
    }


    async start(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body        
        //const { id } = req.user

        const sc= new Schendule('22')
        sc.schenduleStart('USER_ALL')

        result.notContent() 
    }



    async stop(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body   
        //const { id } = req.user   
        
        
        const sc= new Schendule('22')
        sc.schenduleStop('USER_ALL')

        result.notContent()
    }



    async remove(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body
        //const { id } = req.user

        const sc= new Schendule('22')
        sc.schenduleRemove('USER_ALL')

        result.notContent()
    }



    async all(req:Request, res:Response ){
        const result= new ResponseExpress(res)
        const { nome, password, telefone, email}= req.body
        //const { id } = req.user


        result.notContent()

    }
}


export default new SchenduleController()