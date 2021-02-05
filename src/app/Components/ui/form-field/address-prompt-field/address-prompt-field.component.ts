import {Component, EventEmitter, forwardRef, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormFieldAbstractComponent} from '../form-field-abstract.component';
import {FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {DadataConfig, DadataType} from '@kolkov/ngx-dadata';
import {DadataService} from '../../../../Services/dadata.service';
import {IAddressRequest, IDadataResponse} from '../../../../Interfaces/dadata.interface';
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
      control: FormControl | null,
      form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
        control &&
        control.invalid &&
        (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-address-prompt-field',
  templateUrl: './address-prompt-field.component.html',
  styleUrls: ['./address-prompt-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressPromptFieldComponent),
      multi: true,
    },
  ],
})
export class AddressPromptFieldComponent extends FormFieldAbstractComponent implements OnInit {

  @Output() index = new EventEmitter<number>();
  matcher = new MyErrorStateMatcher();

  public options$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);


  constructor(private dadataService: DadataService) {
    super();
  }

  ngOnInit() {}

  getAddressPrompt(event) {
    const payload: IAddressRequest = {
      query: event,
      locations: this.regionRestriction(this.formControlName),
      restrict_value: true,
    };
    this.dadataService.getAddressSuggestion(payload).subscribe((suggestions: IDadataResponse) => {
          const valueArray = suggestions.suggestions.map(s => s.unrestricted_value);
          this.options$.next(valueArray);
        }
    );
  }

  // Next code is  for separate address fields, not used for now

  getGeoObjectFromRespose(response) {
    switch (this.formControlName) {
      case 'region':
        return response.region_with_type;
      case 'city':
        return response.city_with_type;
      case 'street':
        return response.street_with_type;
    }
  }

  regionRestriction = (formControlName: string) => {
    switch (formControlName) {
      case 'city':
        return [
          {
            region: this.getPureGeoObj(this.form.controls.region.value),
          }
        ];
      case 'street':
        return [{
          region: this.getPureGeoObj(this.form.controls.region.value),
        },
          {
            city: this.getPureGeoObj(this.form.controls.city.value),
          }
        ];
      default:
        return [];
    }
  };

  getPureGeoObj(name: string) {
    return name.split(' ').filter( v => {
      return (v !== 'Респ') && (v !== 'обл') &&  (v !== 'г') && (v !== 'Аобл') && (v !== 'край');
    }).join();
  }
}
