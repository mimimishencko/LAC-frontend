import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {PdfDocumentService} from '../../Services/pdf-document.service';
import {catchError, filter, mergeMap} from 'rxjs/operators';
import {forkJoin, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {SnackBarService} from '../ui/snack-bar/snack-bar.service';
import {DadataAddress, DadataConfig, DadataSuggestion, DadataType} from '@kolkov/ngx-dadata';
import * as formConstants from '../../constants/forms-constants';
import {FormFieldType} from '../../Interfaces/IFormField';
import {DadataService} from '../../Services/dadata.service';
import {addressFieldDisabled} from '../../constants/form-helpers';
import {IComplaint} from '../../Interfaces/complaint.interface';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegistrationAgreementComponent} from "../registration-agreement/registration-agreement.component";

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
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
    ]
})
export class ComplaintFormComponent implements OnInit {
    public fioForm: FormGroup;
    public addressForm: FormGroup;
    public credentialsForm: FormGroup;
    public productForm: FormGroup;
    public sellerInfoForm: FormGroup;
    public consumerInfoForm: FormGroup;

    public fioFields = formConstants.fioForm;
    public addressFields = formConstants.addressForm;
    public credentialsFields = formConstants.credentialsForm;
    public productFields = formConstants.productForm;

    public fieldTypes = FormFieldType;


    constructor(
                private domSanitizer: DomSanitizer,
                private pdfService: PdfDocumentService,
                private router: Router,
                private snackBarService: SnackBarService,
                private dadataService: DadataService,
                private fb: FormBuilder,
                private dialog: MatDialog) {}

    ngOnInit() {
        this.initForms();

        this.productForm.get('sellerINN').valueChanges.subscribe((value) => {
            if (!value.trim()) {
                this.sellerInfoForm.reset();
            }
            this.collectInformationAboutSeller();
        });

        this.credentialsForm.get('consumerInfo').valueChanges.subscribe((value) => {
            if (!value.trim()) {
                this.consumerInfoForm.reset();
            }
            this.collectInfoAboutConsumerBank();
        });
    }

    initForms(): void {
        this.fioForm = this.fb.group({
            firstName:  ['', Validators.required],
            middleName: [''],
            lastName:  ['', Validators.required]
        });

        this.addressForm = this.fb.group({
            address:  ['', Validators.required],
        });

        this.credentialsForm = this.fb.group({
            consumerInfo:  ['', Validators.required],
            customerAccountNumber:  ['', Validators.required],
            consumerBankBik:  ['', Validators.required],
            consumerBankName:  ['', Validators.required]
        });

        this.productForm = this.fb.group({
            purchaseData: ['', Validators.required],
            productName:  ['', Validators.required],
            sellerINN:  ['', Validators.required],
            sellerName:  ['', Validators.required],
            sellerAddress:  ['', Validators.required],
        });

        this.sellerInfoForm = this.fb.group({
            sellerAddress: ['', Validators.required],
            sellerName: ['', Validators.required]
        });
        this.consumerInfoForm = this.fb.group({
            consumerBankName: ['', Validators.required],
            consumerBankCorrAcc: ['', Validators.required]
        });
    }


    fakeSend() {
        const payload = {
            firstName: 'Глеб',
            middleName: 'Вадимович',
            lastName: 'Можайский',
            address: 'г. Санкт-Петербург ул. Адмирала Черокова 20/Aб 909',
            consumerBankBik: '044030790',
            consumerBankName: 'Банк Санкт-Петербург',
            consumerBankCorrAcc: '40817810390060017104',
            customerAccountNumber: '40817810390060017104',
            purchaseData: '2020-08-11T21:00:00.000Z',
            productName: 'Булчанка',
            sellerName: 'г. Санкт-Петербург, г. Петергоф ул. Ботаническая 77',
            sellerAddress: 'г. Санкт-Петербург ул. Адмирала Черокова 20/Aб 909',
            sellerINN: '2309085638',
            phoneNumber: '+79500498263',
            saveUserData: true
        };
        this.pdfService.generateDocument(payload).pipe(catchError(error => {
            this.snackBarService.snackBarStatus.next(error);
            return throwError(error);
        }))
            .subscribe((report) => {
                const mediaType = 'application/pdf';
                const blob = new Blob([report], {type: mediaType});
                this.pdfService.document = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
                this.router.navigateByUrl('pdf').then();
            });
    }


    collectInformationAboutSeller() {
        this.dadataService.getSellerInfo(this.productForm.controls.sellerINN.value)
            .pipe(
                filter(data => !!data.suggestions.length)
            )
            .subscribe(dadataInformation => {
                const sellerAddress = dadataInformation.suggestions[0].data.address.unrestricted_value;
                const sellerName = dadataInformation.suggestions[0].unrestricted_value;
                this.updateSellerInfoForm(sellerAddress, sellerName);
            });
    }

    collectInfoAboutConsumerBank() {
        this.dadataService.getBankInformation(this.credentialsForm.controls.consumerInfo.value)
            .pipe(
                filter(data => !!data.suggestions.length)
            )
            .subscribe((consumerBankInfo) => {
                const consumerBankName = consumerBankInfo.suggestions ? consumerBankInfo.suggestions[0].unrestricted_value : '';
                const consumerBankCorrAcc = consumerBankInfo.suggestions[0].data.correspondent_account;

                this.updateConsumerInfoForm(consumerBankName, consumerBankCorrAcc);

            });
    }

    combineDataForRequest(): IComplaint {
        return {
            ...this.fioForm.value,
            ...this.addressForm.value,
            ...this.credentialsForm.value,
            ...this.sellerInfoForm.value,
            ...this.consumerInfoForm.value
        };

    }


    openDialog() {
        this.validateForms();
        if (!this.isFormsValid()) {
            return;
        }
        const dialogRef = this.dialog.open(RegistrationAgreementComponent, {
            data: {
                ...this.fioForm,
                ...this.addressForm
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    private validateForms(): void {
     this.fioForm.markAllAsTouched();
     this.addressForm.markAllAsTouched();
     this.credentialsForm.markAllAsTouched();
     this.productForm.markAllAsTouched();
     this.sellerInfoForm.markAllAsTouched();
     this.consumerInfoForm.markAllAsTouched();
     console.log(this.sellerInfoForm);
    }

    private isFormsValid(): boolean {
        return this.fioForm.valid &&
        this.addressForm.valid &&
        this.credentialsForm.valid &&
        this.productForm.valid &&
        this.sellerInfoForm.valid &&
        this.consumerInfoForm.valid;
    }

    private updateSellerInfoForm(sellerAddress, sellerName): void {
        this.sellerInfoForm.patchValue({sellerAddress, sellerName});
    }

    private updateConsumerInfoForm(consumerBankName, consumerBankCorrAcc): void {
        this.consumerInfoForm.patchValue({consumerBankName, consumerBankCorrAcc});
    }
}

