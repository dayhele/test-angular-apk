import { Benefits, BenefitsPlus } from './planBenefits';

export interface Plan {
  planId?: number;
  planName?: string;
  planBenefits?: Benefits;
  planBenefitsPlus?: BenefitsPlus;
  planDetails?: string;
  planPrice?: number;
  discountPlanPrice?: number;
  planStatus?: string;
}

export interface MediaPlan {
  HasError?: boolean;
  ErrorMessage?: string;
  ErrorNumber?: number;
  IsValidationError?: boolean;
  Result?: MediaPlanDetails;
}

export interface MediaPlanDetails {
  nomemarketplace?: string;
  titulo?: string;
  details?: any;
  status?: string;
  descricao?: string;
  preco_formatado?: string;
  preco?: string;
  highlight?: string;
  over?: string;
  watermark?: string;
}

export interface MenuPlan {
  id: number;
  title: string;
  active: boolean;
  channelsContained: number[];
}
