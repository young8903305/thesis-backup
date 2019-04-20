import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import { UploaderService } from './uploader.service';
import { FormDataInterface } from '../form-data-interface';
import { FormDataService } from '../form-data.service';

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
    checkMap = new Map<string, boolean>();  // <sessionStorage-key, used/wait>: for @ref, if used then just put @ref & @type
    javaStorageTypeMap;
    uploadFormValue = new Map<string, string>();    // <string-session-key, string-form-value>

    constructor(private fb: FormBuilder,
        private uploaderService: UploaderService,
        private formDataInterface: FormDataInterface,
        private formDataService: FormDataService) {}

    ngOnInit() {
        this.formDataInterface.currentFormValueMap.subscribe(formValueMapInput => this.formValueMap = formValueMapInput);
        this.uploaderService.getJavaStorageType().subscribe(response => {
            this.javaStorageTypeMap = response;
        });
    }

    fileChange(fileList) {
        this.fileList = fileList;
    }

    open() {
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
            this.formDataService.changeFlag(true);
        });
        this.uploadFormValue.clear();
    }

    // parse jsog into formValue & sessionStorage
    jsogToFormValue_sessionStorage() {
        console.log('this.upJsog: ', this.upJsog);
        if (this.upJsog instanceof Array) { // multiple objects
            console.log('multiple');
            for (const element of this.upJsog) {
                this.createObject(element);
            }
            this.setSessionStorage();
        } else if (this.upJsog instanceof Object) { // single object
            this.createObject(this.upJsog);
            this.setSessionStorage();
        }
    }

    setSessionStorage() {
        /*for (const  of virtualRoot.data.children) {
            if (element.pureName === this.editNode.parent.data.pureName) {
                element.formVal = this.editNode.parent.data.formVal;
            }
            this.checkMap.clear();
            const typeTemp = JSON.parse(this.javaStorageTypeMap[element.formVal['@type']]);
            formValueTemp = this.jsogGen(formValueTemp, typeTemp);
            console.log('formValueTemp: ', formValueTemp);
            sessionStorage.setItem(element.pureName, JSON.stringify(formValueTemp));
        }*/
        this.uploadFormValue.forEach((value: string, key: string) => {
            this.checkMap.clear();
            value = JSON.parse(value);
            const typeTemp = JSON.parse(this.javaStorageTypeMap[value['@type']]);
            console.log('typeTemp: ', typeTemp);
            const sessionFormValueTemp = this.jsogGen(value, typeTemp);
            console.log('sessionFormValueTemp: ', sessionFormValueTemp);
            sessionStorage.setItem(key, JSON.stringify(sessionFormValueTemp));
        });
        /*for (let i = 0; i < this.uploadFormValue.size; i++) {
            this.checkMap.clear();
            const value;
            const key;
            const typeTemp = JSON.parse(this.javaStorageTypeMap[value['@type']]);
            const sessionFormValueTemp = this.jsogGen(value, typeTemp);
            console.log('sessionFormValueTemp: ', sessionFormValueTemp);
            sessionStorage.setItem(key, JSON.stringify(sessionFormValueTemp));
        }*/
    }

    createObject(ob: Object) {
        let temp;
        let sessionKey;
        if (ob['@ref'] !== undefined) {
            temp = ob['@type'].concat(ob['@ref']);
        } else {
            temp = ob['@type'].concat(ob['@id']);
            sessionKey = temp.split('.')[temp.split('.').length - 1];
            sessionStorage.setItem(sessionKey, JSON.stringify(ob));
            const tempFormValue = {};
            for (const [key, value] of Object.entries(ob)) {
                if (value instanceof Array) {
                    const tempArrayRepresent = this.createArray(value);
                    tempFormValue[key] = tempArrayRepresent;
                } else if (value instanceof Object) {
                    if (value['@ref'] !== undefined) {  // has @ref
                        const aaa = value['@type'].concat(value['@ref']);
                        const bbb = aaa.split('.')[aaa.split('.').length - 1];
                        tempFormValue[key] = bbb;
                        // this.createObject(value);
                        const refOb = JSON.parse(sessionStorage.getItem(bbb));
                        ob[key] = refOb;
                        // sessionStorage.setItem(sessionKey, JSON.stringify(ob));
                    } else {    // has @id
                        const aaa = value['@type'].concat(value['@id']);
                        const bbb = aaa.split('.')[aaa.split('.').length - 1];
                        tempFormValue[key] = bbb;
                        this.createObject(value);
                    }
                } else {    // single string/boolean/number
                    tempFormValue[key] = value;
                }
            }
            console.log('tempFormValue: ', tempFormValue);
            this.formDataInterface.setFormValue(sessionKey, JSON.stringify(tempFormValue));
            this.uploadFormValue.set(sessionKey, JSON.stringify(tempFormValue));
        }

        /*const tempFormValue = {};
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
        this.formDataInterface.setFormValue(sessionKey, JSON.stringify(tempFormValue));*/
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

    jsogForSessionStorage(jsonInput: Object, typeCheck: Object) { // jsonInput(object): k-v pair of form, typeCheck: ob of outer ob's type
        // jsonInput-> { name: yang } typeCheck-> { age: long }
        // jsonInput-> { children:[p1, p2] } typeCheck-> { children: list PersonDemo }
        // console.log('jsonInput: ', jsonInput);
        const tempKey = Object.keys(jsonInput); //  age, children
        const tempVal = Object.values(jsonInput);  // 1, [p1, p2], [1, 2], ["1", "2"]
        const tempType = typeCheck[tempKey.toString()]; // long, list PersonDemo, list int, list string

        if (tempVal.toString() === '') {   // no value, put null
            return null;
        }
        if (tempType === 'byte' || tempType === 'short' || tempType === 'int' || tempType === 'long' // number, output directly
            || tempType === 'float' || tempType === 'double' || tempType === 'Byte' || tempType === 'Short'
            || tempType === 'Integer' || tempType === 'Long' || tempType === 'Float' || tempType === 'Double') {
            return +tempVal;
        } else if (tempType === 'boolean' || tempType === 'Boolean') {    // true & false
            if (tempVal.toString() === 'true') {
                return true;
            } else {
                return false;
            }
        } else {    // list or string
            const tempTypeArray = tempType.split(' ');  // split the type-value to array
            if (tempTypeArray[0] === 'List' || tempTypeArray[0].includes('[]')) { // list or array variable in java, use json list store
                const tempListVal = [];
                const tempSingleVal = tempVal.toString().split(', ');   // value split with ', '
                if ((tempSingleVal.length === 1) && (tempSingleVal[0] === '')) {
                    return tempListVal; // list have nothing, return empty list
                }
                for (let i = 0; i < tempSingleVal.length; i++) {
                    if (sessionStorage.getItem(tempSingleVal[i]) !== null) {   // sessionStorage has it. [p1, p2] list persondemo
                        if (this.checkMap.has(tempSingleVal[i])) { // used, add as @ref
                            const temp = {};
                            const refType = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@type'];
                            // temp['@ref'] = this.idMap.get(tempSingleVal[i]);
                            temp['@ref'] = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@id'];
                            temp['@type'] = refType;
                            tempListVal[i] = temp;
                            // console.log('tempListVal[i]: ', tempListVal[i]);
                        } else {    // haven't used it yet, set checkMap to true, and write it
                            this.checkMap.set(tempSingleVal[i], true);
                            // const typein = this.storageTypeMap.get(tempSingleVal[i]);
                            // const typein = JSON.parse(this.javaStorageTypeMap[tempSingleVal[i]]);
                            /* sessionStorage already been jsog, use it directly
                                tempListVal[i] = JSON.parse(sessionStorage.getItem(tempSingleVal[i]));
                            */
                            // tempListVal[i] = this.jsogGen(JSON.parse(sessionStorage.getItem(tempSingleVal[i])), typein);
                            // console.log('checkMap', this.checkMap);
                            const typeInJsog = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@type'];
                            const typein = JSON.parse(this.javaStorageTypeMap[typeInJsog]);
                            tempListVal[i] = this.jsogGen(JSON.parse(this.formValueMap.get(tempSingleVal[i])), typein);
                            console.log('tempListVal[i]: ', tempListVal[i]);
                        }
                    } else if (tempTypeArray[1] === 'byte' || tempTypeArray[1] === 'short' || tempTypeArray[1] === 'int'
                        || tempTypeArray[1] === 'long' || tempTypeArray[1] === 'float' || tempTypeArray[1] === 'double'
                        || tempTypeArray[1] === 'Byte' || tempTypeArray[1] === 'Short' || tempTypeArray[1] === 'Integer'
                        || tempTypeArray[1] === 'Long' || tempTypeArray[1] === 'Float' || tempTypeArray[1] === 'Double') {
                        // [1, 2] list int, change it to number
                        tempListVal[i] = +tempSingleVal[i];
                    } else if (tempTypeArray[1] === 'Boolean' || tempTypeArray[1] === 'boolean') {    // [t, f, t, f] list boolean
                        console.log('tempSingleVal.toString: ', tempSingleVal[i].toString());
                        if (tempSingleVal[i].toString() === 'true') {
                            tempListVal[i] = true;
                        } else {
                            tempListVal[i] = false;
                        }
                    } else {    // ["1", "2"] list string
                        tempListVal[i] = tempSingleVal[i];
                        // console.log('tempListVal: ', tempListVal);
                    }
                }
                console.log('tempListVal: ', tempListVal);
                return tempListVal;
            } else {    // string represent object
                const StrTempVal = tempVal.toString();
                if (sessionStorage.getItem(StrTempVal) !== null) {   // sessionStorage has it.
                    let reVal: any;
                    if (this.checkMap.has(StrTempVal)) { // used, add as @ref
                        const temp = {};
                        const refType = JSON.parse(sessionStorage.getItem(StrTempVal))['@type'];
                        temp['@ref'] = JSON.parse(sessionStorage.getItem(StrTempVal))['@id'];
                        temp['@type'] = refType;
                        reVal = temp;
                    } else {    // haven't used it yet, set checkMap to true, and write it
                        this.checkMap.set(StrTempVal, true);
                        // const typein = this.storageTypeMap.get(StrTempVal);
                        // this.storageTypeMap.get(StrTempVal);
                        const typein = JSON.parse(this.javaStorageTypeMap[JSON.parse(sessionStorage.getItem(StrTempVal))['@type']]);
                        // reVal = this.jsogGen(JSON.parse(sessionStorage.getItem(StrTempVal)), typein);
                        reVal = this.jsogGen(JSON.parse(this.formValueMap.get(StrTempVal)), typein);
                        // console.log('checkMap', this.checkMap);
                    }
                    // console.log('reVal: ', reVal);
                    return reVal;
                } else {
                    return StrTempVal;
                }
            }
        }
    }

    // formInput = this.form_receive.value (object); typein: object of outer type from storageTypeMap
    jsogGen(formInput: Object, typein: Object) {
        const jsogS = {};

        const aaa = formInput['@type'].concat(formInput['@id']);
        const bbb = aaa.split('.')[aaa.split('.').length - 1];
        this.checkMap.set(bbb, true);
        for (let i = 0; i < Object.keys(formInput).length; i++) {
            const tempKey = Object.keys(formInput)[i];
            if ((tempKey !== '@id') && (tempKey !== '@type')) {
                const single_KV_pair = {};
                single_KV_pair[tempKey] = formInput[tempKey];
                formInput[tempKey] = this.jsogForSessionStorage(single_KV_pair, typein);
            }
            jsogS[tempKey] = formInput[tempKey];
        }
        return jsogS;
    }

}
