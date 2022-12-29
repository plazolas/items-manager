import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {throwError} from 'rxjs';

export class CommonUtils {

    public static removeProp(obj: any, prop: string): object | false {
        if (!(obj === null || typeof obj === 'undefined' || Object.keys(obj).length === 0 ||
            prop === null || prop === '' || typeof prop === undefined)) {
            return false;
        }
        if (obj !== null && obj.hasOwnProperty(prop)) {
            delete obj.prop;
            return obj;
        } else {
            return false;
        }
    }

    public static testArgs(value: any): boolean {
        let res: boolean;
        if (arguments.length === 0) {
            res = false;
        } else if (arguments.length === 1) {
            res = (!(arguments[0] === null || typeof (arguments[0]) === 'undefined' || Object.keys(arguments[0]).length === 0));
        } else {
            res = true;
        }
        return res;
    }

    public static httpErrorHandler(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            msg = 'A client side error occurs. The error message is ' + error.message;
        } else if (error instanceof HttpErrorResponse) {
            const status: number = error.status;
            const message: string = error.statusText;
            const type: HttpEventType = error.type;

            msg = 'An error happened in server. The HTTP status code is ' + status +
                '\n message:  ' + message +
                '\n type: ' + type +
                '\n body: '  + 'body'
            // }
        } else {
            msg = 'An error happened in server.';
        }
        return throwError( msg );
    }

    public static isEmptyStr(str: any): boolean {
         return str === null || str === undefined || typeof str !== 'string'
    }
    
}
