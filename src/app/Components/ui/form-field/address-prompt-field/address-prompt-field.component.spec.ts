import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressPromptFieldComponent } from './address-prompt-field.component';

describe('SelectFieldComponent', () => {
  let component: AddressPromptFieldComponent;
  let fixture: ComponentFixture<AddressPromptFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressPromptFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressPromptFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
