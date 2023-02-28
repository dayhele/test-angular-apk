export interface AccountData {
  email?: string;
  recoveryEmail?: string;
  name?: string;
  gender?: string;
  cpf?: string;
  birthDate?: string;
  state?: string;
  city?: string;
  address?: string;
  phone?: string;
}

export interface AccountResponse {
  HasError?: boolean;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: AccountData;
}

export interface AccountUpdate {
  id: string;
  pNome: string;
  pEmail: string;
  pSexo: string;
  pTelefone: string;
  pNascimento: string;
  pCep: string;
  pPais: string;
  pEstado: string;
  pCidade: string;
  pEndereco: string;
  pNumero: string;
  pComplemento: string;
}

export interface AccountUpdateResponse {
  HasError?: boolean;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: {
    id?: string;
    nome?: string;
  };
}
