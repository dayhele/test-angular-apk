import { LiveChannel } from './live-channel';

export interface LiveChannelsList {
  current_page?: number;
  list?: LiveChannel[];
  page_size?: number;
  pages?: number;
  total?: number;
}
