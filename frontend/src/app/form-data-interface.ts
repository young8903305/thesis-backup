import { Observable } from 'rxjs';

export abstract class FormDataInterface {


    abstract currentFormValueMap: Observable< Map<string, string> >;

    abstract setFormValue(key, value): void;

    abstract getFormValue(): Map<string, string>;   // it's worked
}
