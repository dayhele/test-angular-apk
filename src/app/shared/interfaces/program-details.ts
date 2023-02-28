export interface DetailedProgram {
  id?: number;
  type?: string;
  subtype?: string;
  time?: string;
  duration?: string;
  members?: [
    {
      order?: number;
      type?: string;
      name?: string;
      role?: string;
    }
  ];
  titleFull?: string;
  titleOriginal?: string;
  description?: string;
  originalNetwork?: string;
  origAirDate?: string;
  episodeInfo?: string;
  episodeInfoSeason?: string;
  episodeInfoEpisode?: string;
  episodeInfoInSeries?: string;
  sportsInfo?: string;
  SportsInfogameDate?: string;
  SportsInfoGameTime?: string;
  SportsInfoGameTimeZone?: string;
  SportsInfoVenue?: string;
  SportsInfoTeam1?: string;
  SportsInfoTeam2?: string;
  SportsInfoSeason?: string;
  colorMode?: string;
  origAudioLang?: string;
  cdn?: number;
  cover?: string;
  censorship?: string;
  channelBrand?: string;
  channelId?: number;
}
