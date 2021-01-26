import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {FormFieldAbstractComponent} from '../form-field-abstract.component';

@Component({
  selector: 'app-input-form-field',
  templateUrl: './input-form-field.component.html',
  styleUrls: ['./input-form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormFieldComponent),
      multi: true,
    },
  ],
})
export class InputFormFieldComponent extends FormFieldAbstractComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
