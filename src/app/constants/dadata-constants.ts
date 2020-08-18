/**
 * config constants
 */
export const customerInfoUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank';
export const sellerInfoUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
export const addressUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
export const addressValidation = 'https://cleaner.dadata.ru/api/v1/clean/address';

/**
 * request constants
 */

export const regionLocationRestriction = [
    {
        region_type_full: 'республика',
    },
    {
        region_type_full: 'область',
    },
    {
        region_type_full: 'край',
    },
    {
        region_type_full: 'автономная область',
    },
    {
        region_type_full: 'город федерального значения',
    },
    {
        region_type_full: 'автономный округ',
    },
];
