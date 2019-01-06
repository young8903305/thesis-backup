import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface Edit {
    age: string;
    firstName: string;
}

/*@Injectable({
  providedIn: 'root'
})*/

// get data from server
@Injectable()
export class EditService {

    editUrl = '/ngEdit';

    constructor( private http: HttpClient ) {}

    getEditResponse(): Observable<HttpResponse<Edit>> {
        return this.http.get<Edit>(
            this.editUrl, { observe: 'response' });
    }

    getEditData() {
        return this.http.get(this.editUrl);
    }
}
