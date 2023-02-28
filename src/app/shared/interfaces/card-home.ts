import { CardDefault } from './card-default';
import { CardData } from 'src/app/shared/interfaces/card';

export interface CardsForhome {
  lists?: CardDefault[];
}

export interface CardsForSports {
  data?: CardDefault[];
  lists?: CardDefault[];
}

export interface SectionControlData extends CardDefault {
  data?: CardListData[];
  categoryData?: CategoryRouteData;
}
export interface CardListData {
  id?: number;
  availability?: string;
  cdn?: number;
  cover?: string;
  duration?: number;
  entry_id?: string;
  expire?: string;
  genres?: string[];
  genre?: string;
  highlight?: string;
  imageUrl?: string;
  livetvod?: boolean;
  order?: number;
  position?: number;
  progress?: number;
  title?: string;
  type?: string;
  team1?: string;
  team2?: string;
  time?: string;
  description?: string;
  timestamp?: string;

  // card search
  titulo?: string;
  tipo?: string;
  generos?: string[];
  rentMovieTitle?: boolean;
  rentable?: boolean;

  serieId?: number;

  dates?: any[];

  disabled?: boolean;

  small?: boolean;
  isNSports?: boolean;
  isPreSave?: boolean;
}

export interface SeasonEpisodeListData {
  id?: number;
  order?: number;
  title?: string;
  description?: string;
  availability?: string;
  cover?: string;
  highlight?: string;
  cdn?: number;
  videos?: any[];
}

export interface SectionCardListData {
  current_page?: number;
  list?: CardListData[];
  page_size?: number;
  pages?: number;
  total?: number;
}

export interface SectionSeasonListData {
  PageCustomBanner: string;
  PageCustomDescription: string;
  PageCustomIcon: string;
  PageCustomTitle: string;
  list?: SeasonEpisodeListData[];
  current_page?: number;
  page_size?: number;
  pages?: number;
  total?: number;
}

export interface SectionNovelasData {
  PageCustomBanner: string;
  PageCustomDescription: string;
  PageCustomIcon: string;
  PageCustomTitle: string;
  list?: CardListData[];
  current_page?: number;
  page_size?: number;
  pages?: number;
  total?: number;
}

export interface CategoryRouteData {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
  route?: string;
  hasCustomIcon?: string;
}


export interface MatchesByChampionshipListData {
  imageBanner: string;
  liveMatches: CardData[];
  previousMatches: CardData[];
  highlightMoments: CardData[];
}

export interface MatchesByGenresListData {
  allPreviousMatches?: CardData[];
  highlightMoments?: CardData[];
}
