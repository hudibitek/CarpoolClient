export interface ISubMenu {
  title?: string;
  isExpanded?: boolean;
  items: Array<{
    name: string;
    icon?: string;
    link?: string;
    queryParams?: object;
    onClickFunc?: any;
  }>;
};
