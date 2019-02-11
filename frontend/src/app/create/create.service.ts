import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})*/

@Injectable()
export class CreateService {

    createUrl = '/ngClassNames';
    sendUrl = '/ngNameCreateForm';

    constructor( private http: HttpClient ) { }

    getClassName() {
        return this.http.get(this.createUrl);
    }

    postClass(input) {
        const httpHeaders = new HttpHeaders({ 'Content-Type' : 'text/plain' });
        return this.http.post(this.sendUrl, input, {headers: httpHeaders, observe: 'response'});
    }
}
