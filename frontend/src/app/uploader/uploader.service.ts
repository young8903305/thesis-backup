import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

    uploadUrl = '/ngUploader';

    constructor(private http: HttpClient) { }

    uploadFile(upload) {
        return this.http.post(this.uploadUrl, upload, { observe: 'response' });
    }
}
