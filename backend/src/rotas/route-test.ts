import { Router } from 'express'

import { Request, Response } from 'express';
import ResponseExpress from '../core/helpers/response-expres';


const routerTest= Router()

// -----------------------------------------------------------
// --- TESTES DE FUNÇÕES DE ROTAS
// -----------------------------------------------------------
routerTest.post('/test', (req:Request, res:Response)=>{
    const resultResponse= new ResponseExpress(res)

    const content = req.body['data']

    const itemsContent= content['items']

    for(const item of itemsContent){
        console.log(item)
    }

    resultResponse.notContent()
})


export default routerTest