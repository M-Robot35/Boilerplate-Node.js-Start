import prisma from "../connection";
import { ITransactionOutputDto,ITransactionCreate,ITransactionInterface, ITransactionUpdateDto,statusPaymentEnum } from "../../dto/databaseDTO/transactionDto";


export default class TransactionQuery implements ITransactionInterface{
    private transaction;

    constructor(){
        this.transaction= prisma.transactions
    }

    async transactionCreate(data: ITransactionCreate): Promise<ITransactionOutputDto> {
        const create= await this.transaction.create({
            data
        })        

        return create
    }


    async findTransactionId(transactionId:string): Promise<ITransactionOutputDto|null> {
        const find= await this.transaction.findFirst({
            where: {
                transactionId: transactionId
            }
        })
        return find
    }

    async findTransactionUserId(data: {userId: number, transactionId: string }): Promise<ITransactionOutputDto | null> {
        const find= await this.transaction.findFirst({
            where: {
                userId: data.userId,
                transactionId: data.transactionId
            }
        })
        return find
    }

    async transactionUpdate( transactionId: string , update: statusPaymentEnum): Promise<ITransactionOutputDto | null> {
        try {
            const find = await this.transaction.update({
                where: {
                    transactionId: transactionId  // Usar o transactionId recebido
                },
                data: {
                    status: update  // Atualizar o status com o valor recebido
                }
            });
            return find;
            
        } catch (error) {
            console.error('Erro ao atualizar a transação:', error); // Fornecer uma mensagem de erro mais clara
            return null;
        }
    }
}