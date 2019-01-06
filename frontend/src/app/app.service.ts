import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})*/


@Injectable()
export class AppService {

    constructor(private http: HttpClient) { }

}
