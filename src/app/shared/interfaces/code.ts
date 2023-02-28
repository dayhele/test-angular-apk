export interface ValidateCodeResponse {
  HasError?: boolean;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: {
    days_use?: string;
    activation_date?: string;
    idplano?: number;
    id_plano?: number;
    userid?: number;
    price?: string;
    email?: string;
    voucher?: string;
  };
}

export interface NewCodeResponse {
  HasError?: boolean;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: {
    activation_date?: string;
    idplano?: number;
    userid?: number;
    price?: string;
    email?: string;
    voucher?: string;
  };
}
