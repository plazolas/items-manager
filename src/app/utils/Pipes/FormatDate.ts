import {
    Pipe,
    PipeTransform
} from '@angular/core';
@Pipe({
    name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
    transform(value: string): any {
        const milliseconds = Date.parse(value);
        const dateFromMilliseconds = new Date(milliseconds);
        return dateFromMilliseconds.toString().slice(0, 25) + ' EST';
    }
}