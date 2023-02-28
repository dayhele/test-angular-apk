import {CardListData, CategoryRouteData} from './card-home';
export interface CardDefault {
  id?: number;
  type?: string;
  title?: string;
  titleIcon?: string;
  order?: number;
  cardProperties?: CardProperties;
  hasCustomIcon?: string;
  hasCustomBanner?: string;
  description?: string;
  loadStatus?: number;
  data?: CardListData[];
  categoryData?: CategoryRouteData;
}

export interface CardProperties {
  smallCard?: boolean;
  orientation?: string;
  rentable?: boolean;
  movieLogo?: boolean;
  rentMovieTitle?: boolean;
  secondDescription?: boolean;
  sportTitle?: boolean;
  isLive?: boolean;
  day?: boolean;
  indicativeAge?: boolean;
  movieTitle?: boolean;
  hasProgressBar?: boolean;
  channelLogo?: boolean;
  hasWatchLogo?: boolean;
}

export interface RentSection {
  lists?: [
    {
      order?: number;
      id?: number;
      title?: string;
      destiny?: string;
      tag?: string;
      type?: string;
      hasCustomIcon?: string;
      cardProperties?: CardProperties;
      data?: CardDefault[];
    }
  ];
}

export interface RentSectionParams {
  id?: number;
  title?: string;
  type?: string;
  cardProperties?: CardProperties;
  data?: CardListData[];
}
