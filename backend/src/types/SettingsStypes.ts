export interface ISettingParams {
  group?: string;
  key?: string;
}

export interface IGeneralSettings {
  shopName: string;
  shopEmail: string;
  shopPhone: string;
  shopAddress: string;
  shopDescription: string;
}

export interface IHompageSettings {
  bannerText: string;
  heroImage?: string;
}

export interface ISettingsBody {
  group: string;
  data: IDataOfSettingBody;
}

export type IDataOfSettingBody = IGeneralSettings | IHompageSettings;
