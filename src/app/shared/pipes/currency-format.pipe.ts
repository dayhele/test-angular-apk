import { Pipe } from '@angular/core';

@Pipe({
    name: 'currencyFormat',
})
export class CurrencyFormat {
    transform(
        value: number,
        currencySign: string = 'R$ ',
        decimalLength: number = 2,
        chunkDelimiter: string = '.',
        decimalDelimiter: string = ',',
        chunkLength: number = 3
    ): string {
        if (value == undefined || value == null || isNaN(value)) {
            return '';
        }

        let result =
            '\\d(?=(\\d{' +
            chunkLength +
            '})+' +
            (decimalLength > 0 ? '\\D' : '$') +
            ')';
        let num = value.toFixed(Math.max(0, ~~decimalLength));

        return (
            currencySign +
            (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(
                new RegExp(result, 'g'),
                '$&' + chunkDelimiter
            )
        );
    }
}