export interface IDadataResponse {
   suggestions: ISuggestion[];
}

export interface IAddressRequest {
    query: string;
    locations: {}[];
    restrict_value: boolean;
}

interface ISuggestion {
    data: {
        region: string;
        region_with_type: string;
        city_with_type?: string;
        street_with_type?: string;
        postal_code: number;
    };
    unrestricted_value: string;
    value: string;
}
