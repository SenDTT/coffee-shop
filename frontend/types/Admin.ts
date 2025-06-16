import { Category } from "./Product";
import { User } from "./User";

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

export interface BlogPost {
  _id: string,
  title: string;
  content: string;
  category: Category;
  tags: string[];
  slug?: string;

  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaImage?: string;
  metaUrl?: string;
  metaAuthor?: string;
  metaPublishedAt?: Date | null;
  metaPublished?: boolean;
  metaRobots?: "index" | "noindex";
  metaCanonical?: string;

  author: User;
  image?: string;
  publishedAt?: Date | null;
}
