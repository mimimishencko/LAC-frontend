import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public redirectToLogin(redirectURL: string): Observable<any> {
    return this.http.get(`${API_URL}api/v1/auth?redirectUrl=${redirectURL}`, { responseType: 'blob' });
  }
}
