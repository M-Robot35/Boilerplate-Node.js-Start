import DataIsoTransform from "../databaseBase";
import { ITransactionCreate, ITransactionInterface, ITransactionOutputDto, statusPaymentEnum } from "../../dto/databaseDTO/transactionDto";
import TransactionQuery from "../query/transactionQuery";



class Transaction extends DataIsoTransform implements ITransactionInterface  {

    constructor(private instance:ITransactionInterface){
        super()
    }


    async transactionCreate(data: ITransactionCreate): Promise<ITransactionOutputDto> {
        const execute=  await this.instance.transactionCreate(data)
        if(execute){
            return this.dataIsoTransform(execute)
        }
        return execute        
    }


    async findTransactionId(transactionId:string): Promise<ITransactionOutputDto | null> {
        const execute= await this.instance.findTransactionId(transactionId)
        if(execute){
            return this.dataIsoTransform(execute)
        }
        return execute        
    }


    async findTransactionUserId(data: { userId: number; }): Promise<ITransactionOutputDto | null> {
        const execute= await this.instance.findTransactionUserId(data)
        if(execute){
            return this.dataIsoTransform(execute)
        }
        return execute
    }


    async transactionUpdate( transactionId: string , update:statusPaymentEnum): Promise<ITransactionOutputDto | null> {
        const execute= await this.instance.transactionUpdate(transactionId, update)
        if(execute){
            return this.dataIsoTransform(execute)
        }
        return execute
    }
}

export default new Transaction(new TransactionQuery)