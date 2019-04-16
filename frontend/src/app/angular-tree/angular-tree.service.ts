import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

/*@Injectable({
    providedIn: 'root'
})*/
@Injectable()
export class AngularTreeService {

    typeUrl = '/ngInputType';
    javaStorageTypeUrl = '/ngJavaStorageType';
    outputUrl = '/ngFormOutput';
    outputAllUrl = '/ngOutputAll';
    outputFormValueMapUrl = '/ngOutputFormValueMap';

    httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });

    constructor( private http: HttpClient ) { }

    getInputType() {
        return this.http.get(this.typeUrl);
    }

    getJavaStorageType() {
        return this.http.get(this.javaStorageTypeUrl);
    }

    ouputObject(output) {
        return this.http.post(this.outputUrl, output, { headers: this.httpHeaders, observe: 'response' });
    }

    outputAll(outputAll) {
        return this.http.post(this.outputAllUrl, outputAll, { headers: this.httpHeaders, observe: 'response' });
    }

    outputFormValueMap (formValue) {
        return this.http.post(this.outputFormValueMapUrl, formValue, { headers: this.httpHeaders, observe: 'response' });
    }

}
