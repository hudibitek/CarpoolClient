export interface IOptionLink {
  label: string;
  link?: string;
  clickFunc?: any;
  isVisibleFunc?: (item: any) => boolean;
}
