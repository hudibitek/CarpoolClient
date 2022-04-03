import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOptionLink } from 'models/app/subcomponents/option-link';

@Component({
  selector: 'koer-page-header',
  templateUrl: './koer-page-header.component.html',
  styleUrls: ['./koer-page-header.component.scss']
})
export class KoerPageHeaderComponent {
  @Input() title: string = 'Create';
  @Input() createButtonLabel: string;
  @Output() onCreateButtonClick: EventEmitter<Function> = new EventEmitter();
  @Input() optionLinks: IOptionLink[];
  @Input() optionLinksContext: any;

  onClick(): void {
    this.onCreateButtonClick.emit();
  }
}
