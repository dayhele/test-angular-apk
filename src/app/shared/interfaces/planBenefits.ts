export interface Benefits {
  videoQuality?: string;
  resolution?: string;
  playOnSmartTV?: boolean;
  playOnPC?: boolean;
  playOnMobile?: boolean;
  playOnTablet?: boolean;
  cisnero?: boolean;
  europa_filmes?: boolean;

  awesomeness: boolean;
  directTvGo: boolean;
  hboMax: boolean;
  linearChannels: number;
  canaisAbertos: number;
  canaisEspeciais: number;
  medialand: boolean;
  nsports: boolean;
  paramount: boolean;
  stingrayChannels: boolean;
  warnerBros: boolean;
  xpeed: boolean;
  cnn: boolean;
  sony: boolean;
  bandsports: boolean;
  newco: boolean;
  canaisParamount: boolean;
}

export interface BenefitsPlus {
  [index: string]: string;
}
