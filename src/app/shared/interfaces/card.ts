export interface CardData {
  isLive?: boolean;
  logo?: string;
  ageRate?: string;
  censorship?: string;
  isConmebolLibertadores?: boolean;
  matchIsComingSoon?: boolean;
  id?: number;
  availability?: string;
  cdn?: number;
  cover?: string;
  duration?: number;
  entry_id?: string;
  expire?: string;
  genres?: string[];
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
  isComingSoon?: boolean;

  // card search
  titulo?: string;
  tipo?: string;
  generos?: string[];
  rentMovieTitle?: boolean;
  rentable?: boolean;

  route?: string;
  serieId?: number;

  episode_id?: number;

  expired?: boolean;
  price?: string;
  isNSports?: boolean;
  abrevReleaseDate?: string;
  isCompletalyReleased?: boolean;
  isPreSave?: boolean;
  isSaved?: boolean;
  titleWasPreSave?: boolean;
  isRentedTitleActive?: boolean;
}

export interface CardProperties {
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
