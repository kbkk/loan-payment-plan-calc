import * as DecimalJS from 'decimal.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DecimalMoney = DecimalJS.Decimal.clone({precision: 20});

export type DecimalMoney = DecimalJS.default;
