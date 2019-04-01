import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})*/

@Injectable()
export class FormDataService {

    private storageSource = new BehaviorSubject<Object>([]);    // ng-tree -> create
    currentStorage = this.storageSource.asObservable();

    // tree drag, form drop, pass the value
    private dragdropNode = new BehaviorSubject<Object>([]);
    currentNode = this.dragdropNode.asObservable();

    private flagSource = new BehaviorSubject<Object>([]);   // form finish edit and switch the flag
    currentFlag = this.flagSource.asObservable();

    private formValue = new BehaviorSubject<Object>([]);   // pass form value to ng-tree, for root
    currentFormValue = this.formValue.asObservable();

    constructor() { }

    editSessionStorage(storageInput) {  // ng-tree send Storage to form
        this.storageSource.next(storageInput);
    }

    passNodeVal(nodeVal) {  // drag & drop, pass the root name
        this.dragdropNode.next(nodeVal);
    }

    changeFlag(flagInput) { // form edit object and store, change flag into true
        this.flagSource.next(flagInput);
    }

    passFormValue(formValueInput) {    // pass form value to ng-tree, for root
        this.formValue.next(formValueInput);
    }

}
