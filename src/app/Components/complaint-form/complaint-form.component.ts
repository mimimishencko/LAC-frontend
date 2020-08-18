import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {PdfDocumentService} from '../../Services/pdf-document.service';
import {catchError } from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import { default as _rollupMoment} from 'moment';
import {SnackBarService} from '../ui/snack-bar/snack-bar.service';
import {DadataAddress, DadataConfig, DadataSuggestion, DadataType} from '@kolkov/ngx-dadata';
import * as formConstants from '../../constants/forms-constants';
import {FormFieldType} from '../../Interfaces/IFormField';
import {DadataService} from '../../Services/dadata.service';
import {addressFieldDisabled} from '../../constants/form-helpers';

const moment = _rollupMoment || _moment;

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


@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class ComplaintFormComponent implements OnInit {
  public fioForm: FormGroup;
  public addressForm: FormGroup;
  public credentialsForm: FormGroup;
  public productForm: FormGroup;
  public sellerAddressForm: FormGroup;

  public fioFields = formConstants.fioForm;
  public addressFields = formConstants.addressForm;
  public credentialsFields = formConstants.credentialsForm;
  public productFields = formConstants.productForm;

  public fieldTypes = FormFieldType;



  constructor( private http: HttpClient,
               private domSanitizer: DomSanitizer,
               private pdfService: PdfDocumentService,
               private router: Router,
               private snackBarService: SnackBarService,
               private dadataService: DadataService,
               private cdr: ChangeDetectorRef) {
    this.fioForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });

    this.addressForm =  new FormGroup({
        address: new FormControl('', [Validators.required]),
        // city: new FormControl('', [Validators.required]),
        // index: new FormControl('', [Validators.required]),
        // street: new FormControl('', [Validators.required]),
        // building: new FormControl('', [Validators.required]),
        // flat: new FormControl(''),
      });

    this.credentialsForm = new FormGroup({
      consumerInfo: new FormControl('', [Validators.required]),
      customerAccountNumber: new FormControl('', [Validators.required]),
      sellerINN: new FormControl('', [Validators.required])
    });

    this.productForm = new FormGroup({
      purchaseData: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.addressForm.valueChanges.subscribe(() => {
      console.log('change detection');
      this.cdr.detectChanges();
    });
  }


  fakeSend() {
    const payload = {
      address: 'г. Санкт-Петербург, ул. Адмирала Черокова, д. 20, лит.А, кв.909',
      consumerInfo: '044030790',
      customerAccountNumber: '40817810390060017104',
      firstName: 'Анастасия',
      lastName: 'Мищенко',
      middleName: 'Дмитриевна',
      productName: 'лисица канадская 1шт',
      purchaseData: '2020-08-11T21:00:00.000Z',
      sellerINN: '2309085638',
    };
    this.pdfService.generateDocument(payload).pipe(catchError(error => {
      console.log(error);
      this.snackBarService.snackBarStatus.next(error);
      return throwError(error);
    }))
        .subscribe((report) => {
          const mediaType = 'application/pdf';
          const blob = new Blob([ report ], {type: mediaType});
          this.pdfService.document = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          this.router.navigateByUrl('pdf').then();
        });
  }

  addressFieldDisabled(formField: string): boolean {
    return addressFieldDisabled(formField, this.addressForm);
  }

  }

