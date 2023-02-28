export interface Subscription {
  planId?: number;
  planName?: string;
  planDetails?: string;
  planPrice?: string;
  discountPlanPrice: number;
  planBenefits?: {
    awesomeness?: boolean;
    directTvGo?: boolean;
    hboMax?: boolean;
    linearChannels?: boolean;
    medialand?: boolean;
    nsports?: boolean;
    paramount?: boolean;
    playOnMobile?: boolean;
    playOnPc?: boolean;
    playOnSmartTv?: boolean;
    playOnTablet?: boolean;
    resolution?: string;
    stingrayChannels?: boolean;
    videoQuality?: string;
    warnerBros?: boolean;
    xpeed?: boolean;
  }
}
