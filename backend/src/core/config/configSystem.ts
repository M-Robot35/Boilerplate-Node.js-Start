import { Env } from "./Env"

const configSystem= {

    cluster: false,

    logControll: {
        savaArquiveLogs: true,
        success: true,
        error: true
    },

    jwt: {
        jwt_bypass: true, // desabilita jwt-token
        secret: Env.JWT_SECRET ?? 'secret132',
        expiration: Env.JWT_EXPIRATION ?? '8h'
    },

    bcript: {
        sault: Env.BCRIPT_SAULT ?? 10
    },

    websocketClient: {
        url: 'localhost:3005', // url que irá se connectar para receber os dados via wss
        delayReconnect: 10000
    }
}

export default configSystem