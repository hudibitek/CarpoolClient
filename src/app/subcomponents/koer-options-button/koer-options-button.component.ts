import { Component, Input, OnInit } from '@angular/core';
import { IOptionLink } from 'models/app/subcomponents/option-link';

@Component({
  selector: 'koer-options-button',
  templateUrl: './koer-options-button.component.html',
  styleUrls: ['./koer-options-button.component.scss']
})
export class KoerOptionsButtonComponent implements OnInit {
  @Input() items: IOptionLink[];
  @Input() context: any;
  @Input() faIcon: string;
  @Input() backgroundColor: string;
  @Input() title: string;

  ngOnInit(): void {
    this.validateInput();
  }

  validateInput(): void {
    if (this.items) {
      this.items.forEach(item => {
        if (item.clickFunc && item.link) {
          throw new Error('Error: The property "click" cannot be set together with the property "link".');
        }
        if (!item.clickFunc && !item.link) {
          throw new Error('Error: Options item must have either "click" or "link" property.');
        }
      });
    }
  }

  onClick(item: any): void {
    item.clickFunc(this.context);
  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
