export interface Currency {
    currencyname: string;
    name: string;
    symbol: string;
}

export const Currencies: Currency[] = [
    { name: 'India (₹)', currencyname: 'INR',symbol:'₹' },
    { name: 'US Dollar (US$)', currencyname: 'USD',symbol:'US$' },
    { name: 'Afghani (؋)', currencyname: 'AFN',symbol:'؋' },
    { name: 'Malaysian Ringgit (RM)', currencyname: 'MYR',symbol:'RM' }
];