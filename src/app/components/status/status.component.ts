import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  public env: any;
  public date: Date;
  constructor() {
    this.env = environment;
    this.date = new Date();
  }
}
