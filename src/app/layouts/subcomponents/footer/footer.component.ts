import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'portal-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public date: Date = new Date();
  public env: any;
  @Input() transparent: Boolean = false;

  ngOnInit(): void {
    this.env = environment;
  }
}
