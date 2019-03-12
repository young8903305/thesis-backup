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

    private dragdropNode = new BehaviorSubject<Object>([]); // drag & drop, pass the value
    currentNode = this.dragdropNode.asObservable();

    private flagSource = new BehaviorSubject<Object>([]);   // form finish edit and switch the flag
    currentFlag = this.flagSource.asObservable();

    constructor() { }

    editSessionStorage(storageInput) {  // ng-tree send Storage to form
        this.storageSource.next(storageInput);
    }

    passNodeVal(nodeVal) {
        this.dragdropNode.next(nodeVal);
    }

    changeFlag(flagInput) { // form edit object and store, change flag into true
        this.flagSource.next(flagInput);
    }

}
