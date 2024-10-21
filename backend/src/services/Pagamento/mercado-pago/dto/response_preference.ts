const responsePreferenceData =  {
  "additional_info": "",
  "auto_return": "",
  "back_urls": {
    "failure": "",
    "pending": "",
    "success": ""
  },
  "binary_mode": false,
  "client_id": "2910722183774112",
  "collector_id": 173380512,
  "coupon_code": null,
  "coupon_labels": null,
  "date_created": "2024-10-20T18:15:09.170-04:00",
  "date_of_expiration": null,
  "expiration_date_from": null,
  "expiration_date_to": null,
  "expires": false,
  "external_reference": "",
  "id": "173380512-d0b0e13c-95fb-4f92-852c-d7668ea10ee3",
  "init_point": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=173380512-d0b0e13c-95fb-4f92-852c-d7668ea10ee3",
  "internal_metadata": null,
  "items": [
    {
      "id": "5",
      "category_id": "",
      "currency_id": "BRL",
      "description": "compra de teste",
      "title": "carrinho de compras",
      "quantity": 2,
      "unit_price": 10
    }
  ],
  "marketplace": "NONE",
  "marketplace_fee": 0,
  "metadata": {},
  "notification_url": null,
  "operation_type": "regular_payment",
  "payer": {
    "phone": {
      "area_code": "31",
      "number": "985019300"
    },
    "address": {
      "zip_code": "",
      "street_name": "",
      "street_number": null
    },
    "email": "thiago.teles725@gmail.com",
    "identification": {
      "number": "",
      "type": ""
    },
    "name": "thiago teles souza",
    "surname": "",
    "date_created": null,
    "last_purchase": null
  },
  "payment_methods": {
    "default_card_id": null,
    "default_payment_method_id": null,
    "excluded_payment_methods": [
      {
        "id": ""
      }
    ],
    "excluded_payment_types": [
      {
        "id": ""
      }
    ],
    "installments": null,
    "default_installments": null
  },
  "processing_modes": null,
  "product_id": null,
  "redirect_urls": {
    "failure": "",
    "pending": "",
    "success": ""
  },
  "sandbox_init_point": "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=173380512-d0b0e13c-95fb-4f92-852c-d7668ea10ee3",
  "site_id": "MLB",
  "shipments": {
    "default_shipping_method": null,
    "receiver_address": {
      "zip_code": "",
      "street_name": "",
      "street_number": null,
      "floor": "",
      "apartment": "",
      "city_name": null,
      "state_name": null,
      "country_name": null
    }
  },
  "total_amount": null,
  "last_updated": null,
  "financing_group": "",
  
}

export type IPaymentPreferenceResponse =  typeof responsePreferenceData 