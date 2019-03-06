import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})*/

@Injectable()
export class FormDataService {

    private messageSource = new BehaviorSubject<Object>([]);
    currentMessage = this.messageSource.asObservable();

    private flagSource = new BehaviorSubject<Object>([]);
    currentFlag = this.flagSource.asObservable();

    constructor() { }

    changeMessage(message) {
        this.messageSource.next(message);
    }

    changeFlag(flagInput) {
        this.flagSource.next(flagInput);
    }

}
