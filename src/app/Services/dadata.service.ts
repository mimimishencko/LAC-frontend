import { Injectable } from '@angular/core';
import {DadataConfig, DadataType} from '@kolkov/ngx-dadata';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as dadata from '../constants/dadata-constants';
import {IAddressRequest} from '../Interfaces/dadata.interface';
import { environment } from '../../environments/environment';
import {dadataConfig} from '../dadata.config';

@Injectable({
  providedIn: 'root'
})
export class DadataService {

  constructor(private http: HttpClient) { }

  public getAddressSuggestion(payload: IAddressRequest): Observable<any> {
    return this.http.post(dadata.addressUrl, payload,
        {headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + dadataConfig.apiKey}
            )
        });
  }

  public checkAddress(query): Observable<any> {
      return this.http.post(dadata.addressValidation, {query: [query]});
  }

  public getBankInformation(query): Observable<any> {
      return this.http.post(dadata.customerInfoUrl, {query}, {headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Token ' + dadataConfig.apiKey}
          )
      });
  }

  public getSellerInfo(query): Observable<any> {
      return this.http.post(dadata.sellerInfoUrl, {query}, {headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Token ' + dadataConfig.apiKey}
          )
      });
  }

  public getDadataApiKey(): Observable<any> {
      return this.http.get(`${environment.API_URL}/api/v1/admin/get_api_token`);
  }
}
