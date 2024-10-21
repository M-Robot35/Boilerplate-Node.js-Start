const responsePixData =  {
  "accounts_info": null,
  "acquirer_reconciliation": [],
  "additional_info": {
    "authentication_code": null,
    "available_balance": null,
    "nsu_processadora": null
  },
  "authorization_code": null,
  "binary_mode": false,
  "brand_id": null,
  "build_version": "3.74.0-rc-3",
  "call_for_authorize_id": null,
  "callback_url": null,
  "captured": true,
  "card": {},
  "charges_details": [
    {
      "accounts": {
        "from": "collector",
        "to": "mp"
      },
      "amounts": {
        "original": 0.1,
        "refunded": 0
      },
      "client_id": 0,
      "date_created": "2024-10-20T15:20:01.105-04:00",
      "id": "1319973686-001",
      "last_updated": "2024-10-20T15:20:01.105-04:00",
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
  "date_approved": null,
  "date_created": "2024-10-20T15:20:01.101-04:00",
  "date_last_updated": "2024-10-20T15:20:01.101-04:00",
  "date_of_expiration": "2024-10-21T15:20:00.876-04:00",
  "deduction_schema": null,
  "description": "compra de teste",
  "differential_pricing_id": null,
  "external_reference": null,
  "fee_details": [],
  "financing_group": null,
  "id": 1319973686,
  "installments": 1,
  "integrator_id": null,
  "issuer_id": "12501",
  "live_mode": false,
  "marketplace_owner": null,
  "merchant_account_id": null,
  "merchant_number": null,
  "metadata": {},
  "money_release_date": null,
  "money_release_schema": null,
  "money_release_status": "released",
  "notification_url": null,
  "operation_type": "regular_payment",
  "order": {},
  "payer": {
    "email": null,
    "entity_type": null,
    "first_name": null,
    "id": "1664124048",
    "identification": {
      "number": null,
      "type": null
    },
    "last_name": null,
    "phone": {
      "area_code": null,
      "extension": null,
      "number": null
    },
    "type": null
  },
  "payment_method": {
    "id": "pix",
    "issuer_id": "12501",
    "type": "bank_transfer"
  },
  "payment_method_id": "pix",
  "payment_type_id": "bank_transfer",
  "platform_id": null,
  "point_of_interaction": {
    "application_data": {
      "name": null,
      "version": null
    },
    "business_info": {
      "branch": null,
      "sub_unit": "sdk",
      "unit": "online_payments"
    },
    "location": {
      "source": null,
      "state_id": null
    },
    "transaction_data": {
      "bank_info": {
        "collector": {
          "account_holder_name": "THQGWm bsxES",
          "account_id": null,
          "long_name": null,
          "transfer_account_id": null
        },
        "is_same_bank_account_owner": null,
        "origin_bank_id": null,
        "origin_wallet_id": null,
        "payer": {
          "account_holder_name": null,
          "account_id": null,
          "external_account_id": null,
          "id": null,
          "identification": {
            "number": null,
            "type": null
          },
          "long_name": null
        }
      },
      "bank_transfer_id": null,
      "e2e_id": null,
      "financial_institution": null,
      "qr_code": "00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b61520400005303986540510.005802BR5911TE35069Wi056014Begz kGOBJEUte62230519mpqrinter1319973686630407F5",
      "qr_code_base64": "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",
      "ticket_url": "https://www.mercadopago.com.br/sandbox/payments/1319973686/ticket?caller_id=1664124048&hash=2d2955cc-bee6-4183-b8fd-61eef4dfc256",
      "transaction_id": null
    },
    "type": "OPENPLATFORM"
  },
  "pos_id": null,
  "processing_mode": "aggregator",
  "refunds": [],
  "release_info": null,
  "shipping_amount": 0,
  "sponsor_id": null,
  "statement_descriptor": null,
  "status": "pending",
  "status_detail": "pending_waiting_transfer",
  "store_id": null,
  "tags": null,
  "taxes_amount": 0,
  "transaction_amount": 10,
  "transaction_amount_refunded": 0,
  "transaction_details": {
    "acquirer_reference": null,
    "bank_transfer_id": null,
    "external_resource_url": null,
    "financial_institution": null,
    "installment_amount": 0,
    "net_received_amount": 0,
    "overpaid_amount": 0,
    "payable_deferral_period": null,
    "payment_method_reference_id": null,
    "total_paid_amount": 10,
    "transaction_id": null
  }  
}

export type IPaymentPixResponse =  typeof responsePixData 