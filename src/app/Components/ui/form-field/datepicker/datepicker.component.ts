import {Component, forwardRef, OnInit} from '@angular/core';
import {FormFieldAbstractComponent} from '../form-field-abstract.component';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent extends FormFieldAbstractComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  filter = (d: Date | null): boolean => {
    return d <= new Date();
  };
}
