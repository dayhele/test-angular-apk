export interface CardSportsHighlights {
  order?: number;
  id?: number;
  title?: string;
  destiny?: string;
  tag?: string;
  type?: string;
  cardProperties?: CardPropertiesHighlights;
}

export interface CardPropertiesHighlights {
  orientation?: string;
  channelLogo?: boolean;
  hasWatchLogo?: boolean;
  smallCard?: boolean;
  movieLogo?: boolean;
  indicativeAge?: boolean;
  movieTitle?: boolean;
  hasProgressBar?: boolean;
  sportTitle?: boolean;
  isLive?: boolean;
  secondDescription?: boolean;
  day?: boolean;
  rentable?: boolean;
  rentMovieTitle?: boolean;
}
