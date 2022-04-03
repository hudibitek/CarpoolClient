import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { IMessageBoxButton } from 'models/app/subcomponents/message-box-button';
import { IMessageBoxDialog } from 'models/app/subcomponents/message-box-dialog';

@Component({
  selector: 'koer-message-box-dialog',
  templateUrl: './koer-message-box-dialog.component.html',
  styleUrls: ['./koer-message-box-dialog.component.scss']
})
export class KoerMessageBoxDialogComponent {
  public errorSummary: string;
  public koerAlertData: IKoerAlertData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMessageBoxDialog,
    public dialogRef: MatDialogRef<KoerMessageBoxDialogComponent>
  ) { }

  onClick(button: IMessageBoxButton): void {
    if (button.onClick) {
      button.onClick();
    }
    this.dialogRef.close();
  }
}
