import { Injectable } from '@angular/core';
import {DadataConfig, DadataType} from '@kolkov/ngx-dadata';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as dadata from '../constants/dadata-constants';
import {IAddressRequest} from "../Interfaces/dadata.interface";

@Injectable({
  providedIn: 'root'
})
export class DadataService {

  public dadataConfig: DadataConfig = {
    apiKey: '319411ed3286895a479d6faeaa1f6c2f1b5808ac',
    type: DadataType.address
  };

  constructor(private http: HttpClient) { }

  public getAddressSuggestion(payload: IAddressRequest): Observable<any> {
    return this.http.post(dadata.addressUrl, payload,
        {headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + this.dadataConfig.apiKey}
            )
        });
  }

  public checkAddress(query): Observable<any> {
      return this.http.post(dadata.addressValidation, {query: [query]});
  }
}
