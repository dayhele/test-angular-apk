import { BaseModel } from './base-model';
import { Images } from './images';

enum CTAPositions {
  Top_Left = "top_left",
  Top_Center = "top_center",
  Top_Right = "top_right",
  Middle_Left = "middle_left",
  Middle_Center = "middle_center",
  Middle_Right = "middle_right",
  Bottom_Left = "bottom_left",
  Bottom_Center = "bottom_center",
  Bottom_Right = "bottom_right"
}

export enum BannerSecondaryTypes {
  Blank = "blank",
  Title_Description = "title_description",
  Logo = "logo",
  OnlyCTA = "onlyCTA",
}

export interface Banners extends BaseModel {
  availability?: string;
  cdn?: number;
  cover?: string;
  duration?: string;
  censorship?: string;
  genres?: string[];
  destiny?: string;
  position?: number;
  hightlight?: number;
  images?: Images;
  order?: number;
  title?: string;
  type?: string;
  secondaryType?: BannerSecondaryTypes;
  year?: string;
  favorite?: boolean;
  isPreSave?: boolean;
  preSaveId?: number | null;
  highlightPreSaveIsSaved?: boolean;
  cta_name?: string;
  cta_position?: CTAPositions;
  link_banner?: string;
}

export interface PageBanner {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
}
