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
    
}
