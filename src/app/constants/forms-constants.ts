import {FormFieldType, IFormField} from '../Interfaces/IFormField';

export const fioForm: IFormField[] = [
    {
        label: 'Фамилия',
        placeholder: 'Иванов',
        formControlName: 'lastName',
        required: true,
    },
    {
        label: 'Имя',
        placeholder: 'Иван',
        formControlName: 'firstName',
        required: true,
    },
    {
        label: 'Отчество',
        placeholder: 'Иванович',
        formControlName: 'middleName',
        required: false,
    },
];


export const addressForm: IFormField[] = [
    {
        label: 'Область / регион / край / республика',
        placeholder: 'Ростовская область',
        formControlName: 'region',
        required: true,
        type: FormFieldType.SELECT,
    },
    {
        label: 'Населенный пункт',
        placeholder: 'г. Ростова-на-Дону',
        formControlName: 'city',
        required: true,
        type: FormFieldType.SELECT,
    },
    {
        label: 'Улица',
        placeholder: 'Большая Садовая',
        formControlName: 'street',
        required: false,
        type: FormFieldType.SELECT,
    },
    {
        label: 'Дом',
        placeholder: 'д. 1',
        formControlName: 'building',
        required: true,
        type: FormFieldType.SELECT,
    },
    {
        label: 'Квартира',
        placeholder: 'кв. 1',
        formControlName: 'flat',
        required: false,
        type: FormFieldType.SELECT,
    },
];

export const credentialsForm: IFormField[] = [
    {
        label: 'ИНН / Swift / БИК вашего банка',
        formControlName: 'consumerInfo',
        required: true,
    },
    {
        label: 'Номер вашего банковского счета',
        formControlName: 'customerAccountNumber',
        required: true,
    },
    {
        label: 'ИНН продавца',
        formControlName: 'sellerINN',
        required: true,
    }
];

export const productForm: IFormField[] = [
    {
        label: 'Наименование товара',
        formControlName: 'productName',
        required: true,
    },
    {
        label: 'Дата покупки',
        formControlName: 'purchaseData',
        placeholder: '01.01.2020',
        required: true,
        type: FormFieldType.DATE,
    }
];
