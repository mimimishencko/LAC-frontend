import {Component, forwardRef, OnInit} from '@angular/core';
import {FormFieldAbstractComponent} from '../form-field-abstract.component';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

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
