import {
    Pipe,
    PipeTransform
} from '@angular/core';
@Pipe({
    name: 'asterisc'
})
export class AsteriscPipe implements PipeTransform {
    transform(value: string): any {
        return '* ' + value + ' *';
    }
}