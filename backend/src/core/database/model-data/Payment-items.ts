import DataIsoTransform from "../databaseBase";
import PaymentItemsQuery from "../query/paymentItemsQuery";
import { IPaymentCreateDto, IPaymentItemsOutputDto } from "../../dto/databaseDTO/payment-items";
import { IPaymentItemsInterface } from "../../dto/databaseDTO/payment-items";
import { statusPaymentEnum } from "../../dto/databaseDTO/transactionDto";

  
class PaymentItems extends DataIsoTransform implements IPaymentItemsInterface {
    
    
    constructor(private instance: IPaymentItemsInterface) {
      super();    
    }

  
    async create(data: IPaymentCreateDto): Promise<IPaymentItemsOutputDto> {
        const execute= await this.instance.create(data)

        if(execute){
          return this.dataIsoTransform(execute)
        }
        return execute
    }

  
    async findById(data: { id: number; }): Promise<IPaymentItemsOutputDto[]> {
      const execute= await this.instance.findById(data)

      if(execute){
        return this.dataIsoTransform(execute)
      }
      return execute        
    }


    async findByTransactionId(data: {userId: number, transactionId: string }): Promise<IPaymentItemsOutputDto | null> {
      const execute= await this.instance.findByTransactionId(data)

      if(execute){
        return this.dataIsoTransform(execute)
      }
      return execute 
    }

    async paymentItemsUpdate(transactionId: string , update: statusPaymentEnum): Promise<IPaymentItemsOutputDto[] | any> {
      const execute= await this.instance.paymentItemsUpdate(transactionId, update)

      if(execute){
        return this.dataIsoTransform(execute)
      }
      return execute 
    }
}


export default new PaymentItems(new PaymentItemsQuery)  