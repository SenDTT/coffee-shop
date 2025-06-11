export interface SidebarProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface IGeneralSettings {
  shopAddress: string;
  shopDescription: string;
  shopEmail: string;
  shopPhone: string;
  shopName: string;
}

export interface IHompageSettings {
  bannerText: string;
  heroImage: string;
}

export interface ISetting {
  _id: string;
  key: string;
  group: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  __v: number;
}

export interface SettingsContextType {
  settings: IGeneralSettings | null;
  loading: boolean;
}
