import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {PdfPageComponent} from './Components/pdf-page/pdf-page.component';
import { ComplaintFormComponent } from './Components/complaint-form/complaint-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SnackBarComponent } from './Components/ui/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { FormFieldAbstractComponent } from './Components/ui/form-field/form-field-abstract.component';
import { InputFormFieldComponent } from './Components/ui/form-field/input-form-field/input-form-field.component';
import { DatepickerComponent } from './Components/ui/form-field/datepicker/datepicker.component';
import { SelectFieldComponent } from './Components/ui/form-field/select-field/select-field.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { InputDirective } from './Components/ui/form-field/select-field/input.directive';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};


@NgModule({
  declarations: [
    AppComponent,
    PdfPageComponent,
    ComplaintFormComponent,
    SnackBarComponent,
    InputFormFieldComponent,
    DatepickerComponent,
    SelectFieldComponent,
    InputDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    NgxDadataModule,
    MatAutocompleteModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
