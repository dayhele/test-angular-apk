export interface SubscribesResponse {
  success?: {
    type?: string;
    data?: {
      tickets?: Ticket[];
      expirationMessage?: string;
      nextPayment?: string;
    };
    marketPlace?: {
      hbo?: boolean,
      stingraymusic?: boolean,
      sucess?: boolean,
      uolbanca?: boolean,
      SocialIdUolBanca?: string
    };
  };
}

export interface Ticket {
  type?: string;
  vencimento?: string;
  unit?: string;
  description?: string;
  partnerUrl?: string;
}
