import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UserRegistrationData {
firstName: string;
middleName: string;
lastName: string;
address: string;
}

@Component({
  selector: 'app-registration-agreement',
  templateUrl: './registration-agreement.component.html',
  styleUrls: ['./registration-agreement.component.scss']
})
export class RegistrationAgreementComponent implements OnInit {
 public wantToReg = false;
 public isUserAgree = false;
 public phoneNumberForm: FormGroup;
 public step: number;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: UserRegistrationData) { }

  ngOnInit() {
    this.phoneNumberForm = this.fb.group({
      phone: ['', Validators.required],
        code: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    });
    this.step = 1;
  }

    sendCode() {
        this.step = 2;
    }

}
