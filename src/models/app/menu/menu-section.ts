import { IMenuSectionItem } from './menu-section-item';

export interface IMenuSection {
  title?: string;
  subtitle?: string;
  items: IMenuSectionItem[];
}
