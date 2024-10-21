import { Env } from './Env'
import { rateLimit } from 'express-rate-limit'
import cors from 'cors'

export const serverConfig = {
    port: Env.PORT ?? 3000,
    urlBase: 'http://localhost',    

    cors: cors({
        origin: '*',
        // allowedHeaders: '',
        // credentials:false,
        // exposedHeaders: '',      // string | string[]
        // maxAge: 0,
        // methods: '',             // string | string[] / 'GET,HEAD,PUT,PATCH,POST,DELETE'
        // optionsSuccessStatus: 0, // number | undefined
        // preflightContinue: true  //  boolean | undefined
    }),


    // link da documentação no arquivo READY ME
    rateLimite : {
        activeRateLimit: true,
        limite: rateLimit({
            windowMs: 15 * 60 * 1000,   // 15 minutes
            limit: 100,                 // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            message:'sua mensagem',     // Resposta para quando o usuario exeder o limit
            standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
            legacyHeaders: false,       // Disable the `X-RateLimit-*` headers.
            // store: ... ,             // Redis, Memcached, etc. See below.
        })
    }
}


    

export const frontEndServer= {
    urlBase: 'http://',
    port: 3001
}