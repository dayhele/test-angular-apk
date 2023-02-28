export interface ChangePasswordResponse {
  success?: boolean;
  message?: string;
  HasError?: boolean;
  ErrorMessage?: string;
  error:{
    message?: string;
  }
}
