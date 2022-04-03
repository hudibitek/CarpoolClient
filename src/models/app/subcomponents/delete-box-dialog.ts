export interface IDeleteBoxDialog {
  title: string;
  message: string;
  confirmationValue: string;
  onDeleteClick: () => void;
}
