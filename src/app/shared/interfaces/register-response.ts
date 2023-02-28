export interface RegisterResponse {
  HasError: boolean;
  ErrorMessage: string;
  ErrorNumber: number;
  IsValidationError: boolean;
  Result: {
    id: number;
    nome: string;
  };
}
