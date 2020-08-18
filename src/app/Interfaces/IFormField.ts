import {FormGroup} from '@angular/forms';

export enum FormFieldType {
    DATE = 'date',
    SELECT = 'select',
    COMMON = 'common',
}

export interface IFormField {
    label: string;
    placeholder?: string;
    form?: FormGroup;
    formControlName: string;
    value?: string | number;
    class?: string;
    required: boolean;
    type?: FormFieldType.DATE | FormFieldType.SELECT | FormFieldType.COMMON;
    disabled?: boolean;
}
