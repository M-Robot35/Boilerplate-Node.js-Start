require('dotenv').config();


export const Env = {
    PORT: process.env.PORT ? Number(process.env.PORT):null,

    JWT_SECRET: process.env.JWT_SECRET,

    JWT_EXPIRATION: process.env.JWT_EXPIRATION,

    BCRIPT_SAULT: process.env.BCRIPT_SAULT ? Number(process.env.BCRIPT_SAULT): null
}