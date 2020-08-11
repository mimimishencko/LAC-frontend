import { TestBed } from '@angular/core/testing';

import { PdfDocumentService } from './pdf-document.service';

describe('PdfDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfDocumentService = TestBed.get(PdfDocumentService);
    expect(service).toBeTruthy();
  });
});
