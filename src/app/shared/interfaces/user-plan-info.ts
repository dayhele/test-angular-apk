export interface UserPlanInfo {
  HasError: false;
  ErrorMessage: string;
  ErrorNumber: number;
  IsValidationError: false;
  Result: {
    status: string;
    date_paymment: string;
    payment_forecast: string;
    subscription_type: string;
    id_plano: number;
    preco: string;
    id: number;
    id_sub: number;
    recurrentpaymentid: string;
    titulo_plano: string;
    access_end_date: string;
  };
}
