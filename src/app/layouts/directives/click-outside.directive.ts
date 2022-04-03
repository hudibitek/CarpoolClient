import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:mousedown', ['$event.target'])
  public onClick: (target: any) => void = (targetElement) => {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  };
}
