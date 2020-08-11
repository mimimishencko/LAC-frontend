import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



export interface SafeResourceUrl {
  changingThisBreaksApplicationSecurity: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LAC';
  pdfDocument: SafeResourceUrl;

  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {
  }
}
