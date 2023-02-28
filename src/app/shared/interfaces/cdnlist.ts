import { BaseModel } from './base-model';

export interface Cdnlist extends BaseModel {
  value?: string;
}

export interface CdnItem {
  id?: number;
  value?: string;
}
