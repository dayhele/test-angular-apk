import { Channel } from './now-channel';

export interface Channels {
  channels?: Channel[];
  total?: number;
  pages?: number;
  current_page?: number;
  page_size?: number;
  localTime?: string;
  genre_id?: number;
}
