import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {APP_URL} from "../../constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}


}
