import {Component, forwardRef, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormFieldAbstractComponent} from '../form-field-abstract.component';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
})
export class SelectFieldComponent extends FormFieldAbstractComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }


}
