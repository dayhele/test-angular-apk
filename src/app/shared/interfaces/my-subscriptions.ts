export interface MySubscriptions {
  success?: Success;
}

interface Success {
  data?: Data;
  marketPlace?: {
    hbo?: boolean;
    stingraymusic?: boolean;
    sucess?: boolean;
    uolbanca?: boolean;
    SocialIdUolBanca?: string;
    hasParamount?: boolean;
    directv_go?: boolean;
    nsports?: boolean;
  };
}

interface Data {
  tickets?: Tickets[];
  subscriptions?: Subscriptions;
}

interface Tickets {
  type?: string;
  vencimento?: string;
  unit?: string;
  description?: string;
  plano_id?: number;
  plan_type?: string;
}

interface Subscriptions {
  infoPlan?: string;
  planocriado?: string;
  price?: string;
  plano_id?: number;
  id?: number;
  expirationMessage?: string;
  nextPayment?: string;
}
