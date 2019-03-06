import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import { UploaderService } from './uploader.service';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

    uploader = this.fb.group({});
    fileToUpload;
    fileList;   // upload file is stored by list type in js

    // fileForm = this.fb.group({});
    fileForm: any;

    constructor(private fb: FormBuilder,
        private uploaderService: UploaderService,
        private http: HttpClient) { }

    ngOnInit() {}

    fileChange(fileList) {
        this.fileList = fileList;
        console.log('fileList', this.fileList);
    }

    submit() {
        console.log('fileList', this.fileList);
        this.fileToUpload = this.fileList[0];
        console.log('this.fileToUpload.name ', this.fileToUpload.name);
        const formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        console.log('formData', formData);
        this.uploaderService.uploadFile(formData).subscribe(response => {
            console.log('response', response);
            console.log('response.body', response.body);
            // this.fileForm = this.fb.group(response.body);
            this.fileForm = response.body;
        });
    }
}
