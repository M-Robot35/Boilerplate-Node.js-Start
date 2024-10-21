`

// --------------------------------------------------------------
// [SEND INPUT WEBHOOK ]  MP WEBHOOK STATUS PAYMENT
// --------------------------------------------------------------
{
	"accounts_info": null,
	"acquirer_reconciliation": [],
	"additional_info": {
		"authentication_code": null,
		"available_balance": null,
		"ip_address": "168.195.25.205",
		"items": [
			{
				"category_id": null,
				"description": "compra de teste",
				"id": "5",
				"picture_url": null,
				"quantity": "1",
				"title": "carrinho de compras",
				"unit_price": "25.9"
			}
		],
		"nsu_processadora": null
	},
	"authorization_code": "301299",
	"binary_mode": false,
	"brand_id": null,
	"build_version": "3.72.0-rc-3",
	"call_for_authorize_id": null,
	"captured": true,
	"card": {
		"cardholder": {
			"identification": {
				"number": "12345678909",
				"type": "CPF"
			},
			"name": "APRO"
		},
		"country": null,
		"date_created": "2024-10-06T20:38:25.000-04:00",
		"date_last_updated": "2024-10-06T20:38:25.000-04:00",
		"expiration_month": 11,
		"expiration_year": 2025,
		"first_six_digits": "423564",
		"id": null,
		"last_four_digits": "5682",
		"tags": null
	},
	"charges_details": [
		{
			"accounts": {
				"from": "collector",
				"to": "mp"
			},
			"amounts": {
				"original": 1.29,
				"refunded": 0
			},
			"client_id": 0,
			"date_created": "2024-10-06T20:38:25.000-04:00",
			"id": "1319823994-001",
			"last_updated": "2024-10-06T20:38:25.000-04:00",
			"metadata": {
				"source": "rule-engine"
			},
			"name": "mercadopago_fee",
			"refund_charges": [],
			"reserve_id": null,
			"type": "fee"
		}
	],
	"collector_id": 173380512,
	"corporation_id": null,
	"counter_currency": null,
	"coupon_amount": 0,
	"currency_id": "BRL",
	"date_approved": "2024-10-06T20:38:26.095-04:00",
	"date_created": "2024-10-06T20:38:25.538-04:00",
	"date_last_updated": "2024-10-06T20:38:26.095-04:00",
	"date_of_expiration": null,
	"deduction_schema": null,
	"description": "carrinho de compras",
	"differential_pricing_id": null,
	"external_reference": null,
	"fee_details": [
		{
			"amount": 1.29,
			"fee_payer": "collector",
			"type": "mercadopago_fee"
		}
	],
	"financing_group": null,
	"id": 1319823994,
	"installments": 1,
	"integrator_id": null,
	"issuer_id": "25",
	"live_mode": false,
	"marketplace_owner": null,
	"merchant_account_id": null,
	"merchant_number": null,
	"metadata": {},
	"money_release_date": "2024-10-06T20:38:26.095-04:00",
	"money_release_schema": null,
	"money_release_status": "released",
	"notification_url": null,
	"operation_type": "regular_payment",
	"order": {
		"id": "23608978997",
		"type": "mercadopago"
	},
	"payer": {
		"identification": {
			"number": "32659430",
			"type": "DNI"
		},
		"entity_type": null,
		"phone": {
			"number": null,
			"extension": null,
			"area_code": null
		},
		"last_name": null,
		"id": "2024586328",
		"type": null,
		"first_name": null,
		"email": "test_user_80507629@testuser.com"
	},
	"payment_method": {
		"data": {
			"routing_data": {
				"merchant_account_id": "2033"
			}
		},
		"id": "visa",
		"issuer_id": "25",
		"type": "credit_card"
	},
	"payment_method_id": "visa",
	"payment_type_id": "credit_card",
	"platform_id": null,
	"point_of_interaction": {
		"business_info": {
			"branch": "Merchant Services",
			"sub_unit": "checkout_pro",
			"unit": "online_payments"
		},
		"transaction_data": {
			"e2e_id": null
		},
		"type": "CHECKOUT"
	},
	"pos_id": null,
	"processing_mode": "aggregator",
	"refunds": [],
	"release_info": null,
	"shipping_amount": 0,
	"sponsor_id": null,
	"statement_descriptor": "Mercadopago*fake",
	"status": "approved",
	"status_detail": "accredited",
	"store_id": null,
	"tags": null,
	"taxes_amount": 0,
	"transaction_amount": 25.9,
	"transaction_amount_refunded": 0,
	"transaction_details": {
		"acquirer_reference": null,
		"external_resource_url": null,
		"financial_institution": null,
		"installment_amount": 25.9,
		"net_received_amount": 24.61,
		"overpaid_amount": 0,
		"payable_deferral_period": null,
		"payment_method_reference_id": null,
		"total_paid_amount": 25.9
	}
}

// --------------------------------------------------------------
// [SEND OUTPUT POST ]  MP PREFERENCE PAYMENT CREATE
// --------------------------------------------------------------
{
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
    "date_created": "2024-10-07T21:15:37.846-04:00",
    "date_of_expiration": null,
    "expiration_date_from": null,
    "expiration_date_to": null,
    "expires": false,
    "external_reference": "",
    "id": "173380512-222905dd-b65b-49fc-b70d-e46ffc28f278",
    "init_point": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=173380512-222905dd-b65b-49fc-b70d-e46ffc28f278",
    "internal_metadata": null,
    "items": [
        {
            "id": "5",
            "category_id": "",
            "currency_id": "BRL",
            "description": "compra de teste",
            "title": "carrinho de compras",
            "quantity": 1,
            "unit_price": 25.9
        }
    ],
    "marketplace": "NONE",
    "marketplace_fee": 0,
    "metadata": {},
    "notification_url": null,
    "operation_type": "regular_payment",
    "payer": {
        "phone": {
            "area_code": "",
            "number": ""
        },
        "address": {
            "zip_code": "",
            "street_name": "",
            "street_number": null
        },
        "email": "",
        "identification": {
            "number": "",
            "type": ""
        },
        "name": "",
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
    "sandbox_init_point": "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=173380512-222905dd-b65b-49fc-b70d-e46ffc28f278",
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
    "api_response": {
        "status": 201,
        "headers": {
            "date": [
                "Tue, 08 Oct 2024 01:15:37 GMT"
            ],
            "content-type": [
                "application/json; charset=utf-8"
            ],
            "content-length": [
                "764"
            ],
            "connection": [
                "keep-alive"
            ],
            "content-encoding": [
                "gzip"
            ],
            "vary": [
                "Accept-Encoding"
            ],
            "x-content-type-options": [
                "nosniff"
            ],
            "x-request-id": [
                "48f80f8d-acd0-44f8-a08d-049391df7be6"
            ],
            "x-xss-protection": [
                "1; mode=block"
            ],
            "strict-transport-security": [
                "max-age=16070400; includeSubDomains; preload"
            ],
            "access-control-allow-origin": [
                "*"
            ],
            "access-control-allow-headers": [
                "Content-Type"
            ],
            "access-control-allow-methods": [
                "PUT, GET, POST, DELETE, OPTIONS"
            ],
            "access-control-max-age": [
                "86400"
            ],
            "timing-allow-origin": [
                "*"
            ]
        }
    }
}

`