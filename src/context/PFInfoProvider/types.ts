export interface IFrameURLParams {
  disablePromo?: string;
  defaultPromo?: string;
  BID?: string;
  promo?: string;
  title?: string;
  utm?: string;
  ADDRESS?: string;
  pay?: string;
  url?: string;
  lk?: string;
  hideBC?: string;
  _SUM?: string;
  iframe?: string;
  _PERSONAL_ACCOUNT?: string;
  ps_name?: string;
  paidservice_id?: string;
  LS?: string;
  retry?: string;
  channel?: string;
  partner_id?: string;
  region_id?: string;
  count?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_medium?: string;
  utm_source?: string;
  promo_philips?: string;
  mobile?: string;
  is_promo?: string;
  supplier_id?: string;
  _ga?: string;
  bansendreadings?: string;
  closed?: string;
  elder?: string;
  summ?: string;
  yclid?: string;
  jwt?: string;
  waitConfig?: string;
  back_url?: string;
  back_title?: string;
  region?: string;
  forceEnabledCrossAuth?: string;
  stopGP?: string;
  offAP?: string;
  offGP?: string;
  isMobileApp?: string;
}

export interface IAppURLParams {
  paidservice_id: string;
  LS: string;
  _SUM: string;
  region_id: string;
  ADDRESS: string;
  url: string;
  pay: string;
  channel: string;
  lk: string;
  jwt: string;
}

export type TQueryParams = Map<keyof IAppURLParams, string>;

type TInitParams = {
  paidservice_id: string;
  partner_id: string;
  region_id?: string;
  channel?: string;
  count?: string;
};

type TCustomHeader = {
  enabled: boolean;
  externalUrl?: string;
  showByDefault: boolean;
  height: number;
};

type TCustomFooter = {
  enabled: boolean;
  html?: string;
};

type TCategorySettings = {
  enabled: boolean;
  countToShow?: number;
  positionNumber?: number;
};

type THideCategories = {
  communal?: TCategorySettings;
  gov?: TCategorySettings;
  other?: TCategorySettings;
  hideList?: string[];
};

type TFrameParams = {
  basket: boolean;
  allProviders: boolean;
  searchProviders: boolean;
  c2c?: boolean;
  mainProviderDirectPay?: boolean;
  hideGlavnayaCrumb?: boolean;
  hideEmail?: boolean;
  defaultPromo?: boolean;
  linksAsButtons?: boolean;
  BID?: string;
  tariffLink?: string;
  supportEmail?: string;
  providersAsHome?: string[];
};

type TTheme = {
  mainColor?: string;
  linkColor?: string;
  btnTextColor?: string;
  loaderColor?: string;
};

type TCrossAuth = {
  enabled?: boolean;
};

type TPaySettings = {
  enabled?: boolean;
  blackButton?: boolean;
};

type TPageSettings = {
  needButtons?: boolean;
  showAll?: boolean;
  buttonText?: string;
  headerText?: string;
};

type TRecommendedSettings = {
  recommendedOverPayButtonInBasket: boolean;
  showRecommendedAndSearchOnTop: boolean;
  hideRecommendedHeader: boolean;
  onlyRecommendedOnHomePage?: boolean;
  mainPageSettings: TPageSettings;
  basketSettings: TPageSettings;
  paySuccessSettings: TPageSettings;
  recommendedAddText?: string[];
};

type TTnsSettings = {
  tnsCalendar?: boolean;
  toBasketOnPayButton?: boolean;
};

export interface IAppConfig {
  version: string;
  title?: string;
  htmlTitle?: string;
  widgetUrl?: string;
  containerGTM?: string;
  jivosite?: string;
  initParams: TInitParams;
  frameParams: TFrameParams;
  crossAuth?: TCrossAuth;
  tnsSettings?: TTnsSettings;
  theme: TTheme;
  recommendedSettings?: TRecommendedSettings;
  recommended?: {
    id: string | number;
    src: string;
    name: string;
  }[];
  regions?: {
    enabled: boolean;
    list: {
      config: string;
      name: string;
    }[];
  };
  googlePaySettings?: TPaySettings;
  applePaySettings?: TPaySettings;
  customHeader?: TCustomHeader;
  customFooter?: TCustomFooter;
  categories?: THideCategories;
  customCssStyles?: string;
}

export type TClientInfo = {
  email: string;
}

export interface IPFInfoContext extends IPFInfo {}

type TClientConfig = {
  homeUrl: string;
  logo: string;
  companyName: string;
}
export interface IPFInfo {
  config: TClientConfig;
  transactionId?: string;
  description?: string;
  amount: number;
  fee: number;
  totalAmount: number;
  prId: number;
}
