export interface ITransactionInterface {
    transactionCreate(data:ITransactionCreate):Promise<ITransactionOutputDto>
    
    findTransactionId(transactionId: string ):Promise<ITransactionOutputDto | null>

    findTransactionUserId(data:{userId:number}):Promise<ITransactionOutputDto | null>

    transactionUpdate(transactionId:string, update:statusPaymentEnum):Promise<ITransactionOutputDto | null>
}

export type statusPaymentEnum = 
| 'pending'
| 'approved'
| 'authorized'
| 'in_process'
| 'in_mediation'
| 'rejected'
| 'cancelled'
| 'refunded'
| 'charged_back'
| 'partially_refunded'
| 'created'
| 'waiting_payment'
| 'pending_contingency'
| 'pending_review_manual';



export interface ITransactionCreate {
    userId:number
    transactionId:string
    paymentType:string
    amount:number
    status?:string 
    createdAt?: string ;
    qrCodeLink?: string ;
    qrCodeBase64?:string 
    urlPayment?:string 
    url_sandbox?:string 
    url_production?: string  
}


export interface ITransactionUpdateDto {
    userId:number 
    status?:string
}


export interface ITransactionOutputDto {
    id: number;
    userId: number;
    transactionId:string;
    status: string | null;
    paymentType: string;
    amount: number;
    createdAt: string | null;
    expiresAt: string | null;
    qrCodeBase64: string | null;
    qrCodeLink: string | null;
    urlPayment: string | null;
    url_sandbox: string | null;
    url_production: string | null;
    created_at: Date;
    update_at: Date;
}