import { BaseModel } from './base-model';

export interface KeepWatching extends BaseModel {
  duration?: number;
  episode?: number;
  episode_order?: number;
  order?: number;
  position?: number;
  season_order?: number;
  type?: string;
}

export interface MyList extends BaseModel {
  cdn?: number;
  cover?: string;
  highlight?: string;
  id?: number;
  order?: number;
  title?: string;
  type?: string;
}

export interface DataList extends BaseModel {
  keep_watching?: KeepWatching[];
  ks?: string;
  my_list?: MyList[];
  my_rent?: any[];
  updated?: number;
}
