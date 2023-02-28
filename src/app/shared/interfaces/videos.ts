import { BaseModel } from './base-model';

export interface Videos extends BaseModel {
  background?: string;
  cdn?: number;
  duration?: number;
  durationinfo?: string;
  highlight?: string;
  highlight2?: string;
  id_kaltura?: string;
  order?: number;
  synopsis?: string;
  title?: string;
  year?: number;
}
