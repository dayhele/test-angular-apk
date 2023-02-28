import { Banners } from './banners';
import { Menu } from './menu';

export interface MainStructure {
  banners?: Banners[];
  cdnlist?: any;
  menu?: Menu[];
  hasLiveChannels?: boolean;
  isAmericanet?: boolean;
  isLigga?: boolean;
}
