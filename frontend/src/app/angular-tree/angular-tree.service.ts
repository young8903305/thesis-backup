import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AngularTreeService {

    constructor() { }

    httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });
    EditSessionUrl = '/ngEditSessionStorage';
}
