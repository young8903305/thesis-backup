import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})*/

@Injectable()
export class FormDataService {

    private storageSource = new BehaviorSubject<Object>([]);
    currentStorage = this.storageSource.asObservable();

    private flagSource = new BehaviorSubject<Object>([]);
    currentFlag = this.flagSource.asObservable();

    constructor() { }

    editSessionStorage(storageInput) {
        this.storageSource.next(storageInput);
    }

    changeFlag(flagInput) { // form edit object and store
        this.flagSource.next(flagInput);
    }

}
