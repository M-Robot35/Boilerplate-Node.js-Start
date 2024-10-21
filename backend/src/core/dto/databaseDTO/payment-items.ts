import { statusPaymentEnum } from "./transactionDto";

export interface IPaymentItemsInterface {
    create(data:IPaymentCreateDto): Promise<IPaymentItemsOutputDto>
    
    findById(data: {id:number}): Promise<IPaymentItemsOutputDto[]>;
  
    findByTransactionId(data:{transactionId:string}): Promise<IPaymentItemsOutputDto | null>;
    
    paymentItemsUpdate(transactionId: string, update:statusPaymentEnum): Promise<IPaymentItemsOutputDto[] | any >;
}


export interface IPaymentCreateDto {
    transactionId: string;
    userId: number
    status: string;
    title: string;
    amount: number;
    description?: string | null;
    quantity: number | null;
    unit_price?: number | null;
}

export interface IPaymentItemsOutputDto {
    id: number;
    transactionId: string;
    status: string;
    title: string;
    amount: number;
    description?: string | null;
    createdAt?: string | null;
    expiresAt?: string | null;
    quantity: number | null;
    unit_price?: number | null;
    created_at: Date;
    update_at: Date;
}