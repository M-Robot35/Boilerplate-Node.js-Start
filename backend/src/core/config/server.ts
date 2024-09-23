import { Env } from './Env'
import cors from 'cors'

export const serverConfig = {
    port: Env.PORT ?? 3000,
    urlBase: 'http://localhost',

    cors: cors({
        origin: '*',
        // allowedHeaders: '',
        // credentials:false,
        // exposedHeaders: '', // string | string[]
        // maxAge: 0,
        // methods: '', // string | string[] / 'GET,HEAD,PUT,PATCH,POST,DELETE'
        // optionsSuccessStatus: 0, // number | undefined
        // preflightContinue: true //  boolean | undefined
    })
}

export const frontEndServer= {
    urlBase: 'http://',
    port: 3001
}