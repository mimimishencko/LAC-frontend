import {Component, EventEmitter, forwardRef, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormFieldAbstractComponent} from '../form-field-abstract.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {DadataConfig, DadataType} from '@kolkov/ngx-dadata';
import {DadataService} from '../../../../Services/dadata.service';
import {IAddressRequest, IAutocompleteValue, IDadataResponse} from '../../../../Interfaces/dadata.interface';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
})
export class SelectFieldComponent extends FormFieldAbstractComponent implements OnInit {

  @Output() index = new EventEmitter<number>();

  public options$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public dadataConfig: DadataConfig = {
    apiKey: '319411ed3286895a479d6faeaa1f6c2f1b5808ac',
    type: DadataType.address
  };

  constructor(private dadataService: DadataService) {
    super();
  }

  ngOnInit() {
  }

  getAddressPrompt(event) {
    const payload: IAddressRequest = {
      query: event,
      locations: this.regionRestriction(this.formControlName),
      restrict_value: true,
    };
    console.log(payload);
    this.dadataService.getAddressSuggestion(payload).subscribe((suggestions: IDadataResponse) => {
          console.log(suggestions);
          const valueArray = suggestions.suggestions.map(s => s.unrestricted_value);
          this.options$.next(valueArray);
        }
    );
  }

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

  log(event) {
    console.log(event);
  }
}
