import { KeepWatching } from './keep-watching';
import { MyList } from './my-list';

export interface Data {
  keep_watching?: KeepWatching[];
  ks?: string;
  my_list: MyList[];
  my_rent: [];
  updated?: number;
}
