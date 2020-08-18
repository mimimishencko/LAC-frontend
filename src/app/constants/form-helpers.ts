import {FormGroup} from '@angular/forms';

export const addressFieldDisabled = (field: string, addressFormGroup: FormGroup) => {
    switch (field) {
        case 'index':
            return addressFormGroup.controls.region.value.trim() === '' || addressFormGroup.controls.city.value.trim() === '' ;
        case 'city':
            return addressFormGroup.controls.region.value.trim() === '';
        case 'street':
            return addressFormGroup.controls.region.value.trim() === '' || addressFormGroup.controls.city.value.trim() === '';
        case 'building':
            return addressFormGroup.controls.region.value.trim() === '' || addressFormGroup.controls.city.value.trim() === '';
        default:
            return false;
    }
};
