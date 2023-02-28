import { BaseModel } from './base-model';

export interface MyList extends BaseModel {
  cdn?: number;
  cover?: string;
  highlight?: string;
  id?: number;
  order?: number;
  title?: string;
  type?: string;
}
