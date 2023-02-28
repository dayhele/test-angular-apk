import { Params } from '@angular/router';

export interface Toast {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  showToast?: boolean;
  queryParams?: Params;
  colorToast?: string;
  toastTime?: string;
  toastDesc?: string;
  toastTitle?: string;
  toastClass?: string;
}
