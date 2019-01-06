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

  uploader = this.fb.group({ });
  fileToUpload;
  fileList;

  fileForm = this.fb.group({});

  constructor(private fb: FormBuilder,
              private uploaderService: UploaderService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  fileChange(fileList) {
    this.fileList = fileList;
  }

  submit() {
    console.log('fileList', this.fileList);
    this.fileToUpload = this.fileList[0];
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log('formData', formData);
    this.uploaderService.uploadFile(formData).subscribe(response => {
        console.log('response', response);
        this.fileForm = this.fb.group(response.body);
    });
  }
}


