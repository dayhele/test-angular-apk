import { BaseModel } from './base-model';
import { Submenu } from './submenu';

export interface Menu extends BaseModel {
  destiny?: string;
  order?: number;
  submenu?: Submenu[];
  title?: string;
}
