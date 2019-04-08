import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import { UploaderService } from './uploader.service';
import { FormDataInterface } from '../form-data-interface';
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

    upJsog;
    formValueMap;   // <string-session-key, string-form-value>
    tempSingleFormValue = {};

    constructor(private fb: FormBuilder,
        private uploaderService: UploaderService,
        private formDataInterface: FormDataInterface) { }

    ngOnInit() {
        this.formDataInterface.currentFormValueMap.subscribe(formValueMapInput => this.formValueMap = formValueMapInput);
    }

    fileChange(fileList) {
        this.fileList = fileList;
    }

    upload() {
        console.log('fileList', this.fileList);
        this.fileToUpload = this.fileList[0];
        // console.log('this.fileToUpload.name ', this.fileToUpload.name);
        const formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        console.log('formData', formData);
        this.uploaderService.uploadFile(formData).subscribe(response => {
            this.upJsog = response.body;
            /*const tempType = this.upJsog['@type'].concat(this.upJsog['@id']);
            const key = tempType.split('.')[tempType.split('.').length - 1];
            console.log('key: ', key);
            sessionStorage.setItem(key, JSON.stringify(this.upJsog));*/
            this.jsogToFormValue_sessionStorage();
        });
    }

    // parse jsog into formValue & sessionStorage
    jsogToFormValue_sessionStorage() {
        console.log('this.upJsog: ', this.upJsog);
        if (this.upJsog instanceof Array) { // multiple objects
            console.log('multiple');
        } else if (this.upJsog instanceof Object) { // single object
            this.createObject(this.upJsog);
        }
    }

    createObject(ob: Object) {
        let temp;
        if (ob['@ref'] !== undefined) {
            temp = ob['@type'].concat(ob['@ref']);
        } else {
            temp = ob['@type'].concat(ob['@id']);
        }
        const sessionKey = temp.split('.')[temp.split('.').length - 1];
        sessionStorage.setItem(sessionKey, JSON.stringify(ob));

        const tempFormValue = {};
        for (const [key, value] of Object.entries(ob)) {
            if (value instanceof Array) {
                const tempArrayRepresent = this.createArray(value);
                tempFormValue[key] = tempArrayRepresent;
            } else if (value instanceof Object) {
                const aaa = value['@type'].concat(value['@id']);
                const bbb = aaa.split('.')[aaa.split('.').length - 1];
                tempFormValue[key] = bbb;
                this.createObject(value);
            } else {    // single string/boolean/number
                tempFormValue[key] = value;
            }
        }
        console.log('tempFormValue: ', tempFormValue);
        this.formDataInterface.setFormValue(sessionKey, JSON.stringify(tempFormValue));
    }

    createArray(arrayIn) {
        let arrayRepresent = '';
        for (let i = 0; i < arrayIn.length; i++) {
            console.log('element: ', arrayIn[i]);
            if (arrayIn[i] instanceof Object) { // array of object
                let aaa;
                if (arrayIn[i]['@ref'] !== undefined) {
                    aaa = arrayIn[i]['@type'].concat(arrayIn[i]['@ref']);
                } else {
                    aaa = arrayIn[i]['@type'].concat(arrayIn[i]['@id']);
                    this.createObject(arrayIn[i]);
                }
                const bbb = aaa.split('.')[aaa.split('.').length - 1];

                if (i !== arrayIn.length - 1) {
                    arrayRepresent = arrayRepresent + bbb + ', ';
                } else {
                    arrayRepresent = arrayRepresent + bbb;
                }
            } else {    // array of string, array of boolean
                arrayRepresent = arrayRepresent + arrayIn[i];
            }
        }
        console.log('arrayRepresent: ', arrayRepresent);
        return arrayRepresent;
    }

}
