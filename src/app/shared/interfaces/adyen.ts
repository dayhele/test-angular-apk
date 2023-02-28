export interface CheckoutAdyen {
  userid?: number;
  idplano?: number;
  frequency?: string;
  voucher?: string;
  item_id?: number;
  cupom?: string;
  flow?: string;
}

export interface CheckoutAdyenResponse {
  HasError?: false;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: {
    shopperReference?: string;
    clientKey?: string;
    price?: number;
    billingDay?: string;
    endsAt?: string;
    frequency?: string;
    startsAt?: string;
    shopperEmail?: string;
    environment?: string;
    reference?: string;
    voucher?: string;
  };
  status?: string;
  msg?: string;
}

export interface SessionAdyen {
  shopperReference?: string;
  shopperEmail?: string;
  reference?: string;
  type?: string;
  price?: number;
  valor?: number;
}

export interface SessionAdyenResponse {
  amount?: {
    currency?: string;
    value?: number;
  };
  blockedPaymentMethods?: string[];
  countryCode?: string;
  enableRecurring?: boolean;
  expiresAt?: string;
  id?: string;
  merchantAccount?: string;
  merchantOrderReference?: string;
  recurringProcessingModel?: string;
  reference?: string;
  returnUrl?: string;
  shopperEmail?: string;
  shopperLocale?: string;
  shopperReference?: string;
  sessionData?: string;
}

export interface confirmAdyen {
  userid?: number;
  item_id?: number;
  cupom?: string;
}

export interface confirmAdyenResponse {
  HasError?: false;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: {
    token?: string;
    shopperReference?: string;
    clientKey?: string;
    price?: number;
    billingDay?: string;
    endsAt?: string;
    frequency?: string;
    startsAt?: string;
    shopperEmail?: string;
    environment?: string;
    reference?: string;
    voucher?: string;
  };
  status?: string;
  msg?: string;
}

export interface PaymentResultResponse {
  resultCode: string;
  sessionData: string;
}

export interface PaymentAdyen {
  userId?: number;
  item_id?: number;
  cupom?: number;
}

export interface PaymentDataResponse {
  HasError?: boolean;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: {
    token?: string;
  };
}

export interface CouponResponse {
  message?: string;
  price?: string;
  success?: true;
}

export interface MediaFinalizeResponse {
  status?: boolean;
  msg?: string;
}
