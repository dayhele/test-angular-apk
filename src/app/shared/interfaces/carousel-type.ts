import { BaseModel } from './base-model';
import { CardProperties } from './card-home';

export interface CarouselType extends BaseModel {
  isCarouselMain?: boolean;
  isLiveChannels?: boolean;
  isWatchForYou?: boolean;
  isKeepWatching?: boolean;
  isRented?: boolean;
  isReleases?: boolean;
  isSpecificAdvertising?: boolean;
  isMostWatched?: boolean;
  isToWatchAll?: boolean;
  isComingSoon?: boolean;
  isSport?: boolean;
  isSuggestions?: boolean;
  isForCouples?: boolean;
  isKids?: boolean;
  isToRent?: boolean;
  cardProperties?: CardProperties;
  isJump?: boolean;
}
