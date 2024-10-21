import EventDefault from "./defaultEvent";

export interface IUserInterface {
    id: number;
    nome: string;
    telefone: string | null;
    email: string ;
    created_at: Date;
}

export type EventsTypesPayment= "APROVADO" | "PENDING" | "REJECTED" | "CANCELLED" | "REFUNDED"
export const EventStatusPayment= new EventDefault<EventsTypesPayment>()


EventStatusPayment.on('APROVADO', ( event:IUserInterface[] )=>{  
    // pode notificar o usuario por whatsapp ou email ao surgir o evento  
    const usuario= event[0]
    console.log('EVENTO ACIONADO -- ', event)
})

EventStatusPayment.on('CANCELLED', ( event:IUserInterface[] )=>{    
    // pode notificar o usuario por whatsapp ou email ao surgir o evento  
    const usuario= event[0]
    console.log('EVENTO ACIONADO -- ', event)
})


EventStatusPayment.on('PENDING', ( event:IUserInterface[] )=>{    
    // pode notificar o usuario por whatsapp ou email ao surgir o evento  
    const usuario= event[0]
    console.log('EVENTO ACIONADO -- ', event)
})


EventStatusPayment.on('REFUNDED', ( event:IUserInterface[] )=>{   
    // pode notificar o usuario por whatsapp ou email ao surgir o evento   
    const usuario= event[0]
    console.log('EVENTO ACIONADO -- ', event)
})


EventStatusPayment.on('REJECTED', ( event:IUserInterface[] )=>{    
    // pode notificar o usuario por whatsapp ou email ao surgir o evento 
    const usuario= event[0] 
    console.log('EVENTO ACIONADO -- ', event)
})