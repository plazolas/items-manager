import {
    Pipe,
    PipeTransform
} from '@angular/core';
@Pipe({
    name: 'stripTags',
})
export class StripTagsPipe implements PipeTransform {
    transform(value: string): any {
        let tmp: string = value.replace(/<[^>]*>/g, '');
        tmp = tmp.replace(/\[.*]/,'');
        return tmp;
    }
}