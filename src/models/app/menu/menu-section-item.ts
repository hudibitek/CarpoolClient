import { ISubMenu } from './sub-menu';

export interface IMenuSectionItem {
  name: string;
  icon?: string;
  isActive?: boolean;
  link?: string;
  queryParams?: object;
  onClickFunc?: any;
  subMenu?: ISubMenu;
}
