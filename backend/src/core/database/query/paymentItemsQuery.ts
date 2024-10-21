import prisma from "../connection";
import { IPaymentCreateDto, IPaymentItemsInterface } from "../../dto/databaseDTO/payment-items";
import { IPaymentItemsOutputDto } from "../../dto/databaseDTO/payment-items";
import { statusPaymentEnum } from "../../dto/databaseDTO/transactionDto";


export default class PaymentItemsQuery implements IPaymentItemsInterface{
    private paymentItem;

    constructor(){
        this.paymentItem= prisma.paymentItems
    }

    async create(data: IPaymentCreateDto): Promise<IPaymentItemsOutputDto> {
        const find= await this.paymentItem.create({
            data
        })
        return find
    }

    
    async findById(data: { id: number; }): Promise<IPaymentItemsOutputDto[]> {
        const find = await this.paymentItem.findMany({
            where: {
                id: data.id 
            }
        })        
        return find
    }


    async findByTransactionId(data: { transactionId: string; }): Promise<IPaymentItemsOutputDto | null> {
        const find = await this.paymentItem.findFirst({
            where:{
                transactionId: data.transactionId
            }
        })
        return find
    }

    async paymentItemsUpdate(transactionId: string, update:statusPaymentEnum): Promise<IPaymentItemsOutputDto[] | any  >{
        const find = await this.paymentItem.updateMany({
            where:{
                transactionId: transactionId
            },

            data: {
                status: update
            }
        })
        return find        
    }
}