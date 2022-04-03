import { IMessageBoxButton } from './message-box-button';

export interface IMessageBoxDialog {
  title: string;
  message: string;
  buttons: IMessageBoxButton[];
}
