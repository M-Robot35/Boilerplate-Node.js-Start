require('dotenv').config();

// npm_lifecycle_event: 'dev','start'

export const Env = {
    SERVER_PROD: process.env.npm_lifecycle_event? (process.env.npm_lifecycle_event == "start") : false,

    PORT: process.env.PORT ? Number(process.env.PORT): null,

    JWT_SECRET: process.env.JWT_SECRET,

    JWT_EXPIRATION: process.env.JWT_EXPIRATION,

    BCRIPT_SAULT: process.env.BCRIPT_SAULT ? Number(process.env.BCRIPT_SAULT): null,

    MP_ACCESS_TOKEN_DEV: process.env.MP_ACCESS_TOKEN_DEV ? process.env.MP_ACCESS_TOKEN_DEV?.toString(): null,
    
    MP_ACCESS_TOKEN_PROD: process.env.MP_ACCESS_TOKEN_PROD ? process.env.MP_ACCESS_TOKEN_PROD?.toString(): null,

    MP_PRODUCTION: process.env.MP_PRODUCTION ? (process.env.MP_PRODUCTION.toLowerCase() == "true") : false
}