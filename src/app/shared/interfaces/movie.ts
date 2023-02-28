import { BaseModel } from './base-model';

export interface Movie extends BaseModel {
  actors?: string;
  availability?: string;
  cdn?: number;
  censorship?: string;
  cover?: string;
  director?: string;
  duration?: number;
  genre?: string;
  genres?: string;
  highlight?: string;
  id?: number;
  id_kaltura?: string;
  price?: string;
  seasons?: SeriesSeasons[];
  synopsis?: string;
  title?: string;
  year?: number;
  position?: number;
  fullPrice?: string;
  finalPrice?: string;
  toRent?: boolean;
  rentalPeriod?: string;
  imageUrl?: string;
  favorite?: boolean;
  type?: string;
  warning?: string;
  highlight2?: string;
  isParamountFreemium?: any;
  isNSportsPayment?: any;
  isNSportsMatch?: boolean;
  isLiveMatch?: boolean;
  isConmebolLibertadoresMatch?: boolean;
  titleHasContentIsComing?: boolean;
  newContentDescription?: string;
  matchAlreadyHappened?: boolean;
}

export interface SeriesSeasons {
  availability?: string;
  cdn?: number;
  cover?: string;
  description?: string;
  highlight?: string;
  id?: number;
  order?: number;
  title?: string;
  videos: EpisodeData[];
  year?: number;
  warning?: boolean;
}

export interface EpisodeData {
  background?: string;
  cdn?: number;
  duration?: number;
  cover?: string;
  highlight?: string;
  highlight2?: string;
  id?: number;
  id_kaltura?: string;
  order?: number;
  synopsis?: string;
  title?: string;
  year?: number;
  imageUrl?: string;
  censorship?: string;
}

export interface SeriesMovies {
  background?: string;
  cdn?: number;
  duration?: number;
  cover?: string;
  highlight?: string;
  highlight2?: string;
  id?: number;
  id_kaltura?: string;
  order?: number;
  synopsis?: string;
  title?: string;
  year?: number;
  imageUrl?: string;

  censorship?: string;
  genre?: string;
  genres?: string;
  director?: string;
  position?: number;
}
