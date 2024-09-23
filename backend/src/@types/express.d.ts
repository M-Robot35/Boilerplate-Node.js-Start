export {}

declare global {
    declare namespace Express {
        interface Request {
            userId: {
                id:string | number
            };            
        }
    }
}