export interface PreSaves {
  id?: number;
  type?: string;
  title_id?: number | null;
  season_id?: number | null;
  video_id?: number | null;
  title?: string;
  censorship?: string;
  description?: string;
  icon_notification?: string;
  cover?: string;
  highlight?: string;
  release_date?: string;
  status?: number;
  genres?: string[];
  isPreSave?: boolean;
  isSaved?: boolean;
  isCompletalyReleased?: boolean;
  fullReleaseDate?: string;
  abrevReleaseDate?: string;
  imageUrl?: string;
  titleWasPreSave?: boolean;
}
