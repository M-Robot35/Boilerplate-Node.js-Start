export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string ;
        JWT_EXPIRATION: string;
        BCRIPT_SAULT:number;
        PORT:number;
    }
  }
}