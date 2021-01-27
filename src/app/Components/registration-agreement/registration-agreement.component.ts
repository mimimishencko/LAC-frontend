import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-agreement',
  templateUrl: './registration-agreement.component.html',
  styleUrls: ['./registration-agreement.component.scss']
})
export class RegistrationAgreementComponent implements OnInit {
 public wantToReg = false;
 public isUserAgree = false;
 public phoneNumberForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.phoneNumberForm = this.fb.group({
      phone: ['', Validators.required]
    });
  }

}
