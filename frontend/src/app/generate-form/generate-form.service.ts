import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateFormService {

    constructor(private http: HttpClient) { }

    outputUrl = '/ngFormOutput';

    ouputObject(output) {
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.post(this.outputUrl, output, { headers: httpHeaders, observe: 'response' });
    }
}
