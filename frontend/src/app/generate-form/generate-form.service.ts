import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateFormService {

    constructor(private http: HttpClient) { }

    outputUrl = '/ngFormOutput';
    sessionStorageUrl = '/ngSessionStorage';
    httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });

    ouputObject(output) {
        // const httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.post(this.outputUrl, output, { headers: this.httpHeaders, observe: 'response' });
    }

    outputsessionStorage(session) {
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'text/json' });
        return this.http.post(this.sessionStorageUrl, session, { headers: httpHeaders, observe: 'response' });
    }
}
