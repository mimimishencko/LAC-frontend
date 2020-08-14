import {Component, Directive, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

export abstract class FormFieldAbstractComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() form: FormGroup;
  @Input() formControlName: string;
  @Input() value: string | number;
  @Input() class: string;
  @Input() required: boolean;

  constructor() { }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  ngOnInit() {}


  change(value: any) {
    this.value = value || null;
  }
}
