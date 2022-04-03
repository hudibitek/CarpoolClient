import { Component, Injector, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'koer-validation-errors',
  templateUrl: './koer-validation-errors.component.html',
  styleUrls: ['./koer-validation-errors.component.scss']
})
export class KoerValidationErrorsComponent {
  @Input() field: string;

  public formGroup: FormGroupDirective;

  constructor(private injector: Injector) {
    this.formGroup = injector.get(FormGroupDirective, null);
  }
}
