import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateFormService {

    constructor(private http: HttpClient) { }

    outputUrl = '/ngFormOutput';
    outputAllUrl = '/ngOutputAll';
    sessionStorageUrl = '/ngSessionStorage';
    javaStorageTypeUrl = '/ngJavaStorageType';

    httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });

    // (discard)
    ouputObject(output) {
        return this.http.post(this.outputUrl, output, { headers: this.httpHeaders, observe: 'response' });
    }

    ouputObject2(output) {
        return this.http.post(this.outputUrl, output, { headers: this.httpHeaders, observe: 'response' });
    }

    outputAll(outputAll) {
        return this.http.post(this.outputAllUrl, outputAll, { headers: this.httpHeaders, observe: 'response' });
    }

    outputsessionStorage(session) {
        return this.http.post(this.sessionStorageUrl, session, { headers: this.httpHeaders, observe: 'response' });
    }

    getJavaStorageType() {
        return this.http.get(this.javaStorageTypeUrl);
    }
}
