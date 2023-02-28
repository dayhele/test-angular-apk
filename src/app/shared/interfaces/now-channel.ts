import { Date } from './date';
export interface Channel {
  id?: number;
  channel_number?: number;
  image?: string;
  white?: string;
  cdn?: number;
  dates?: Date[];
}
