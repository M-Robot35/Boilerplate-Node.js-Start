type MpCurrencyType= 'BRL'| 'ARS'| 'CLP'| 'MXN'| 'COP'| 'PEN'| 'UYU'

interface IPaymentIndentification {
    type?: string
    number?: number
}

export interface IPlayer {
    name?: string
    surname?:string
    email: string
    phone?: string
    indentification: IPaymentIndentification
}


export interface IMpInterfaceItems {
    id: string
    title: string
    description?: string
    picture_url?: string
    category_id?: string
    quantity: number
    currency_id?: MpCurrencyType
    unit_price: number
    payer?:IPlayer
}


export interface MpItems{
    title: string;
    description: string;
    currency_id: string;
    quantity: number;
    unit_price: number;
}

export interface inputItems{
  id?:string|number
  title: string;
  description: string;
  quantity: number;
  currency_id?: MpCurrencyType;
  unit_price: number;
}

export interface itemsInterface {
  id:string
  title: string;
  category_id: string,
  description: string;
  currency_id: string;
  quantity: number;
  unit_price: number;
}



export interface OutputPreferencFilter{
    id: string,
    init_point: string,
    sandbox_init_point: string,
    date_created: string,
    client_id: number,
    items: MpItems[]
}


// RETORNO MP Preference 
export interface IMpResponse {
  collector_id: number,
  items: itemsInterface[],
  payer: {
    phone: {},
    identification: {},
    address: {}
  },
  back_urls: {
    success: string,
    pending: string,
    failure: string
  },
  auto_return: string,
  payment_methods: {
    excluded_payment_methods: [
      {}
    ],
    excluded_payment_types: [
      {}
    ]
  },
  client_id: number,
  marketplace: string,
  marketplace_fee: number,
  shipments: {
    receiver_address: {}
  },
  notification_url: string,
  statement_descriptor: string,
  expiration_date_from: string,
  expiration_date_to: string,
  date_created: string,
  id: string,
  init_point: string,
  sandbox_init_point: string,
  metadata: {}
}