import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})*/

@Injectable()
export class FormDataService {

    private messageSource = new BehaviorSubject<Object>([]);
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(message) {
        this.messageSource.next(message);
    }
}
