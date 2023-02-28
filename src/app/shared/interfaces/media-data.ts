import { SeriesSeasons } from './movie';

export interface MediaData {
  actors?: string;
  availability?: string;
  cdn?: string;
  censorship?: string;
  cover?: string;
  director?: string;
  duration?: string;
  genre?: string;
  highlight?: string;
  highlight2?: string;
  id_kaltura?: string;
  price?: string;
  seasons?: SeriesSeasons[];
  synopsis?: string;
  title?: string;
  year?: number;
  background?: string;
  id?: number;
  order?: number;
  imageUrl?: string;
}
