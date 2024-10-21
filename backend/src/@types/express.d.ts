export {}

declare global {
    declare namespace Express {
        interface Request {
            user: {
                id:string | number
            };            
        }
    }
}