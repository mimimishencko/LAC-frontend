import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {PdfDocumentService} from '../../Services/pdf-document.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import { default as _rollupMoment} from 'moment';

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
  ]
})
export class ComplaintFormComponent implements OnInit {
  public form: FormGroup;
  constructor( private http: HttpClient,
               private domSanitizer: DomSanitizer,
               private pdfService: PdfDocumentService,
               private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName:  new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
      addressGroup:  new FormGroup({
        city: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        building: new FormControl('', [Validators.required]),
        flat: new FormControl(''),
      }),
      consumerInfo: new FormControl('', [Validators.required]),
      customerAccountNumber: new FormControl('', [Validators.required]),
      sellerINN: new FormControl('', [Validators.required]),
      purchaseData: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      address: new FormControl(''),
    });
  }

  ngOnInit() {
    this.form.controls.purchaseData.valueChanges.subscribe((data) => console.log(this.setTime()));
  }

  dateFilter = (d: Date | null): boolean => {
    return d < new Date();
  };

  send() {
    this.form.controls.address.markAllAsTouched();
    if(this.form.valid) {
      const address = this.addressGenerating();
      this.form.patchValue({address});
      this.form.removeControl('addressGroup');
      this.form.patchValue({purchaseData: this.setTime()});
      this.pdfService.generateDocument(this.form.value).pipe(catchError(error => {
        return throwError(error);
      }))
          .subscribe((report) => {
            const mediaType = 'application/pdf';
            const blob = new Blob([report], {type: mediaType});
            this.pdfService.document = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            this.router.navigateByUrl('pdf').then();
          });
    }
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
      purchaseData: '04.08.2020',
      sellerINN: '2309085638',
    };
    this.pdfService.generateDocument(payload).pipe(catchError(error => {
      return throwError(error);
    }))
        .subscribe((report) => {
          const mediaType = 'application/pdf';
          const blob = new Blob([ report ], {type: mediaType});
          this.pdfService.document = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          this.router.navigateByUrl('pdf').then();
        });
  }

  private addressGenerating() {
    const address = [];
    for ( const key in this.form.get('addressGroup').value ) {
      address.push(this.form.get('addressGroup').value[key]);
      }

    return address.join(', ');
    }
    // TODO search for better way
    private setTime() {
    const time = this.form.controls.purchaseData.value;
    return(moment(time).format( 'DD.MM.yyyy'));
    }
  }

