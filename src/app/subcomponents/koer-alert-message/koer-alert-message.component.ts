import { Component, Input, OnInit } from '@angular/core';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';

@Component({
  selector: 'koer-alert-message',
  templateUrl: './koer-alert-message.component.html',
  styleUrls: ['./koer-alert-message.component.scss']
})
export class KoerAlertMessageComponent implements OnInit {
  @Input() data: IKoerAlertData;
  @Input() type: string = 'error';
  @Input() dismissible: boolean = true;

  readonly availableTypes: string[] = ['info', 'error', 'warning'];

  ngOnInit(): void {
    if (this.availableTypes.includes(this.type)) {
      return;
    }
    this.type = this.availableTypes[0];
  }

  dismiss(): void {
    this.data.message = null;
  }
}
