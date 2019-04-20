import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { FormDataInterface } from './form-data-interface';

/*@Injectable({
  providedIn: 'root'
})*/

@Injectable()
export class FormDataService implements FormDataInterface {

    // ng-tree edit sessionStorage -> create
    private storageSource = new BehaviorSubject<Object>([]);
    currentStorage = this.storageSource.asObservable();

    // tree drag, form drop, pass the value
    private dragdropNode = new BehaviorSubject<Object>([]);
    currentNode = this.dragdropNode.asObservable();

    private flagSource = new BehaviorSubject<Object>([]);   // form finish edit and switch the flag
    currentFlag = this.flagSource.asObservable();

    // formValueMap will replace it
    private formValue = new BehaviorSubject<Object>([]);   // pass form value to ng-tree, for root
    currentFormValue = this.formValue.asObservable();

    private formValueMap: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(new Map<string, string>());
    // currentFormValueMap: Observable<Map<string, string>> = this.formValueMap;
    currentFormValueMap: Observable<Map<string, string>> = this.formValueMap.asObservable();

    constructor() { }

    // ng-tree send sessionStorage to form
    editSessionStorage(storageInput) {
        this.storageSource.next(storageInput);
    }

    passNodeVal(nodeVal) {  // drag & drop, pass the root name
        this.dragdropNode.next(nodeVal);
    }

    changeFlag(flagInput) { // form edit object and store, change flag into true
        this.flagSource.next(flagInput);
    }

    // formValueMap will replace it
    passFormValue(formValueInput) {    // pass form value to ng-tree, for root
        this.formValue.next(formValueInput);
    }

    // add formValue into shared FormValueMap
    setFormValue(key: string, value: string): void {
        this.formValueMap.next(this.formValueMap.getValue().set(key, value));
    }

    // get formValue from FromValueMap
    getFormValue(): Map<string, string> {
        return this.formValueMap.getValue();
    }

    // (discard)
    deleteFormValue(key: string): void {
        this.formValueMap.getValue().delete(key);
        this.formValueMap.next(this.formValueMap.getValue());
    }

    cleanFormValue(): void {
        this.formValueMap.getValue().clear();
        this.formValueMap.next(this.formValueMap.getValue());
    }
}
