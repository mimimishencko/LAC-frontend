import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfDocumentService {
  public document: SafeResourceUrl;

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public generateDocument(userInfo): Observable<ArrayBuffer> {
    return this.http.post(`${this.API_URL}/documents/generate_pretrial_appeal/`, userInfo, {
      responseType: 'arraybuffer'});
  }
}

