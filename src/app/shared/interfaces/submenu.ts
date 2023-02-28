import { BaseModel } from './base-model';

export interface Submenu extends BaseModel {
  id?: number;
  destiny?: string;
  order?: number;
  tag?: string;
  title?: string;
}
