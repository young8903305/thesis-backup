import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})*/


@Injectable()
export class AppService {

    constructor(private http: HttpClient) { }

    outputAllUrl = '/ngOutputAll';

    httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });

    outputAll(outputAll) {
        return this.http.post(this.outputAllUrl, outputAll, { headers: this.httpHeaders, observe: 'response' });
    }

}
