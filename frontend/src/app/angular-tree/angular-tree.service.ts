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

    constructor( private http: HttpClient ) { }

    getInputType() {
        return this.http.get(this.typeUrl);
    }

    getJavaStorageType() {
        return this.http.get(this.javaStorageTypeUrl);
    }

}
