import {Component, Input, OnInit} from '@angular/core';
import { SafeResourceUrl} from '@angular/platform-browser';
import {PdfDocumentService} from '../../Services/pdf-document.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.scss']
})
export class PdfPageComponent implements OnInit {
  public document: SafeResourceUrl;

  constructor(private pdfDocumentService: PdfDocumentService, private router: Router) { }

  ngOnInit() {
    if (!this.pdfDocumentService.document) {
      this.router.navigateByUrl('/').then();
    }
    this.document = this.pdfDocumentService.document;
  }

}
