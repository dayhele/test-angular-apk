export interface PlanAccessControl {
  hasParamount: boolean | undefined;
  hasHBO: boolean;
  hasLiveChannels: boolean;
  hasUolBanca: boolean;
  hasStingrayMusic: boolean;
  hasDirectvGO: boolean | undefined;
  hasNSports: boolean;
}

export interface NSportsOptionSelectedData {
  arrowRotate: boolean;
  primaryDescription: string;
  secondaryDescription?: string;
  textButton: string;
  linkButton: () => void;
}

export interface NSportsOptionSelectedListData {
  [index: string]: NSportsOptionSelectedData;
}