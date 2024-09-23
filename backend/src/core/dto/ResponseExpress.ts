
export enum statusResponse {
    "OK"= 200,
    "CREATED"= 201,
    "NOT_CONTENT"= 204,
    "UNAUTHORIZED"= 401,
    "FORBIDEN"= 403,
    "NOT_FOUND"= 404,
    "SERVER_ERROR"= 500
}


export interface ISend<T> {
    ok:boolean
    error:boolean
    message:string
    data: T
}



export const sender= <T>(data:T, message:string='error', error:boolean=false):ISend<T>=>{
    if(error){
        return {
            ok: false,
            error: true,
            message: message,
            data: data
        }
    }

    return {
        ok: true,
        error: false,
        message:'success',
        data: data
    }
}