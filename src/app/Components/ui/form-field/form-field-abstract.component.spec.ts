import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldAbstractComponent } from './form-field-abstract.component';

describe('FormFieldComponent', () => {
  let component: FormFieldAbstractComponent;
  let fixture: ComponentFixture<FormFieldAbstractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldAbstractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
