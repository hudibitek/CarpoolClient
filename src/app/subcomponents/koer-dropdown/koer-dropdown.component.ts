import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PathHelper as path } from 'core/helpers/path-helper';
import { ValidationErrorHelper } from 'core/helpers/validation-error-helper';
import { IKoerAlertData } from 'core/models/web/koer-alert-data';
import { PoolEntityService } from 'core/services/poolEntity.service';
import { interval } from 'rxjs/internal/observable/interval';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounce, finalize } from 'rxjs/operators';

const defaultAutoload = true;
const defaultModelPropertyName = 'id';
const defaultReloadDebouncerSleep = 1;

@Component({
  selector: 'koer-dropdown',
  templateUrl: './koer-dropdown.component.html',
  styleUrls: ['./koer-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: KoerDropdownComponent,
    multi: true
  }]
})
export class KoerDropdownComponent implements ControlValueAccessor, OnInit {
  @Input() autoload: boolean = defaultAutoload;
  @Input() placeholder: string;
  @Input() entityService: PoolEntityService<object, object, object>;
  @Input() entityLoadProperties: string[] = [];
  @Input() entityOrderBy: string[];
  @Input() itemDisplayProperty: string;
  @Input() itemDisplayFunc: any;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() selectedItemTemplate: TemplateRef<any>;
  @Input() createFilterRequestFunc: any;
  @Input() parentId: string;
  @Input() parentIdValue: string;
  @Input() modelPropertyName: string = defaultModelPropertyName;
  @Input() isDisabled: boolean;
  @Input() validationFieldPrefix: string;
  @Input() validationFieldSuffix: string;
  @Input() nullItemName: string;
  @Output() onSelectedChange: EventEmitter<any> = new EventEmitter<any>();
  private reloadDebouncer: Subject<number> = new Subject<number>();
  private dropdownInteractionSubscription: Subscription;
  private formGroup: FormGroupDirective;

  private _model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  get model(): any {
    return this._model;
  }
  set model(value: any) {
    this._model = value;
  }

  private _selectedItem: any;
  get selectedItem(): any {
    return this._selectedItem;
  }
  set selectedItem(value: any) {
    if (this.filteredItems) {
      const oldModel = this._model;
      this._model = value ? path.getObjectNestedProperty(value, this.modelPropertyName) : null;
      if (oldModel !== this._model) {
        this.onChange(this._model);
      }
      this.onSelectedChange.emit(value);
      this._selectedItem = value;
    }
  }

  public isLoading: boolean = false;
  public noItems: boolean = false;
  public filteredItems: any[];
  public validationField: string;
  public koerAlertData: IKoerAlertData;

  constructor(
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formGroup = this.injector.get(FormGroupDirective, null);
  }

  ngOnInit(): void {
    this.validationField = ValidationErrorHelper.getValidationField(this.injector, this.validationFieldPrefix, this.validationFieldSuffix);

    if (!this.entityLoadProperties.includes(this.modelPropertyName)) {
      this.entityLoadProperties.push(this.modelPropertyName);
    }

    this.reloadDebouncer.pipe(debounce<number>((sleep) => interval(sleep))).subscribe(() => {
      this.reload();
    });

    if (this.autoload) {
      this.reload();
    }
  }

  reload(): void {
    let request = {};
    if (this.createFilterRequestFunc) {
      request = this.createFilterRequestFunc(request);
    }
    if (request == null) {
      return;
    }

    this.isLoading = true;
    this.changeDetectorRef.detach();
    this.entityService.filter(request, true).pipe(
      finalize(() => {
        this.isLoading = false;
        this.changeDetectorRef.reattach();
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe(
      response => {
        const responseData = response.body.data;
        if (this.nullItemName != null) {
          const customMatOption = {};
          customMatOption[this.itemDisplayProperty] = this.nullItemName;
          customMatOption[this.modelPropertyName] = null;
          responseData.unshift(customMatOption);
        }
        if (responseData.length > 0) {
          this.filteredItems = responseData;
          this.selectItemFromModel();
          this.noItems = false;
        } else {
          this.clear();
          this.noItems = true;
        }
      },
      error => {
        this.koerAlertData = { message: ValidationErrorHelper.handleResponseError(error) };
      });
  }

  reloadWithDebouncer(): void {
    this.isLoading = true;
    this.reloadDebouncer.next(defaultReloadDebouncerSleep);
  }

  clear(): void {
    this.selectedItem = null;
    this.filteredItems = null;
    this.noItems = false;
  }

  getOptionTemplateContext(item: any): any {
    if (this.itemTemplate) {
      return { item: item };
    }

    if (this.itemDisplayFunc) {
      return { item: this.itemDisplayFunc({ item: item, isSelectedItem: false }) };
    }

    if (this.itemDisplayProperty) {
      return { item: path.getObjectNestedProperty(item, this.itemDisplayProperty) };
    }

    return { item: item };
  }

  getSelectedOptionTemplateContext(item: any): any {
    if (this.selectedItemTemplate) {
      return { item: item };
    }

    if (this.itemDisplayProperty) {
      return { item: path.getObjectNestedProperty(item, this.itemDisplayProperty) };
    }

    return { item: item };
  }

  selectItemFromModel(): void {
    if (this._model === null) {
      this.selectedItem = null;
    }

    if (this.filteredItems && this.filteredItems.length > 0) {
      const selected = this.filteredItems.find(e => path.getObjectNestedProperty(e, this.modelPropertyName) === this._model);
      this.selectedItem = selected;
      this.onTouched();
    }
  }

  OnDestroy(): void {
    this.dropdownInteractionSubscription.unsubscribe();
  }

  onChange = (delta: any): void => { };

  onTouched = (): void => { };

  writeValue(newModel: any): void {
    this._model = newModel;
    this.selectItemFromModel();
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  isErrorState(): boolean {
    if (this.formGroup && this.validationField) {
      return this.formGroup.control.get(this.validationField).errors != null;
    }
    return false;
  }
}
