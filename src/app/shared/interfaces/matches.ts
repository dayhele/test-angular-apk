import { CardData } from './card';

export interface Matches {
  liveMatches: {
    title?: string;
    data: CardData[];
  };

  isComingSoonMatches: {
    title?: string;
    data: CardData[];
  };
}

export interface PhaseList {
  id: number;
  title: string;
  order: number;
  data: CardData[];
}

export interface HomeBnnerList {
  PageCustomBanner?: string;
  PageCustomDescription?: string;
  PageCustomIcon?: string;
  PageCustomTitle?: string;
  current_page: number;
  list: CardData[];
  page_size: number;
  pages: number;
  total: number;
}
