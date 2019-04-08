import { Observable } from 'rxjs';

export abstract class FormDataInterface {


    abstract currentFormValueMap: Observable< Map<string, string> >;

    abstract setFormValue(key: string, value: string): void;

    abstract getFormValue(): Map<string, string>;   // it's worked
}
