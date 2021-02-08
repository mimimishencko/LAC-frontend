import { Component, OnInit } from '@angular/core';
import {APP_URL} from '../constants';
import {AuthService} from '../Services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public redirectToCognito(): void {
    this.authService.redirectToLogin(APP_URL).subscribe();
  }

  public navigateToComplaintFrom(): void {
    this.router.navigate(['/complaint-form']);
  }

}
