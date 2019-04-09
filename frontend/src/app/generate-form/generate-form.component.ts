import { Component, OnInit, Input, OnChanges, Output, EventEmitter, DoCheck} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupName } from '@angular/forms';
import { GenerateFormService } from './generate-form.service';
import { stringify } from 'querystring';
import { store, template } from '@angular/core/src/render3';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { clearModulesForTest } from '@angular/core/src/linker/ng_module_factory_loader';
import { FormDataService } from '../form-data.service';
import { FormDataInterface } from '../form-data-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css']
})
export class GenerateFormComponent implements OnInit, OnChanges {

    @Input() generate_form_receive;
    MemberKey = [];     // defaultValue: generate_form_receive[0]
    MemberStyle = {};   // styleNode
    MemberType = {};    // typeNode. use for list
    ValueTemp;          // for CheckStrToNum, store form value afthe this function
    form_receive = this.fb.group({});
    className = '';

    storageIndex = 1;
    storageMap = new Map<string, number>(); // <class-name, count>: record class' count
    idMap = new Map<string, string>();      // <sessionStorage-key, @id>: store id for @ref-using
    checkMap = new Map<string, boolean>();  // <sessionStorage-key, used/wait>: for @ref, if used then just put @ref & @type
    storageTypeMap = new Map<string, Object>(); // <element-name, memberType>: for jsog generate list, need to check if type is list or not
    formValueMap = new Map<string, string>();   // <session-key, object in string>
    isJsogMap = new Map<string, boolean>(); // (discard) <session-key, isJsog>: for jsogForSessionStorage, if it already been jsog or not
    jsog;
    dropNodeVal;

    // replace storageTypeMap
    javaStorageTypeMap; // Map<session-key-type-name: string, session-key-type-value: string>: store java type
    formValueMap$; // get FromValueMap

    constructor(private fb: FormBuilder,
        private subCreate: GenerateFormService,
        private formDataService: FormDataService,
        private formDataInterface: FormDataInterface ) {
        subCreate.getJavaStorageType().subscribe(response => {
            this.javaStorageTypeMap = response;
        });
    }

    ngOnInit() {
        this.formDataService.currentNode.subscribe(nodeIn => this.dropNodeVal = nodeIn);
        this.formDataInterface.currentFormValueMap.subscribe(formValueMapInput => this.formValueMap$ = formValueMapInput);
    }

    CheckStrToNum(input) {  // input = this.form_receive.value (Object)
        const className = input['@type'];
        const javaType = JSON.parse(this.javaStorageTypeMap[className]);
        for (const key in javaType) { // change string default value to number
            if (javaType[key] === 'byte' || javaType[key] === 'short' || javaType[key] === 'int' ||
                javaType[key] === 'long' || javaType[key] === 'float' || javaType[key] === 'double' ||
                javaType[key] === 'Byte' || javaType[key] === 'Short' || javaType[key] === 'Integer' ||
                javaType[key] === 'Long' || javaType[key] === 'Float' || javaType[key] === 'Double') {
                input[key] = +input[key];   // string to number
            }
        }
        return input;
    }

    // drop node value from ng-tree
    onNodeDrop(e: any) {
        e.dragData = this.dropNodeVal;
        const nodeName = e.nativeEvent.target.attributes['ng-reflect-name'].nodeValue;
        // console.log('e.nativeEvent.target.attributes: ', e.nativeEvent.target.attributes['ng-reflect-name'].nodeValue);
        const tempType = this.MemberType[ nodeName ];
        console.log('tempType: ', tempType);
        const tempTypeArray = tempType.split(' ');
        if (tempTypeArray[0] === 'List' || tempTypeArray[0].includes('[]')) {   // list or array in java, use json list to store
            if (e.nativeEvent.target.type === 'text' || e.nativeEvent.target.type === 'textarea') {
                if (e.nativeEvent.target.value === '') {
                    e.nativeEvent.target.value = this.dropNodeVal;
                    this.form_receive.value[nodeName] = e.nativeEvent.target.value;
                } else {
                    const str = ', '.concat(this.dropNodeVal);
                    e.nativeEvent.target.value = e.nativeEvent.target.value + str;
                    this.form_receive.value[nodeName] = e.nativeEvent.target.value;
                }
            }
        } else {
            e.nativeEvent.target.value = this.dropNodeVal;
            this.form_receive.value[nodeName] = e.nativeEvent.target.value;
        }
        // console.log('e: ', e);
    }

    // receieve the class info form create component
    ngOnChanges() {
        if ( !(this.generate_form_receive instanceof Array) ) {
            this.generate_form_receive = JSON.parse(this.generate_form_receive);
        }
        this.MemberKey = Object.keys(this.generate_form_receive[0]);    // for html, don't delete
        this.MemberStyle = this.generate_form_receive[1];   // styleNode
        this.MemberType = this.generate_form_receive[2];    // typeNode
        this.className = this.generate_form_receive[3];
        this.form_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('MemberKey: ', this.MemberKey);
        console.log('MemberStyle: ', this.MemberStyle);
        console.log('MemberType: ', this.MemberType);
        console.log('className: ', this.className);
    }

    jsogForSessionStorage(jsonInput: Object, typeCheck: Object) { // jsonInput(object): k-v pair of form, typeCheck: ob of outer ob's type
        // jsonInput-> { name: yang } typeCheck-> { age: long }
        // jsonInput-> { children:[p1, p2] } typeCheck-> { children: list PersonDemo }
        console.log('jsonInput: ', jsonInput);
        const tempKey = Object.keys(jsonInput); //  age, children
        const tempVal = Object.values(jsonInput);  // 1, [p1, p2], [1, 2], ["1", "2"]
        const tempType = typeCheck[tempKey.toString()]; // long, list PersonDemo, list int, list string

        if ( tempVal.toString() === '') {   // no value, put null
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
                for (let i = 0; i < tempSingleVal.length; i++ ) {
                    if (sessionStorage.getItem(tempSingleVal[i]) !== null) {   // sessionStorage has it. [p1, p2] list persondemo
                        if (this.checkMap.has(tempSingleVal[i])) { // used, add as @ref
                            const temp = {};
                            const refType = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@type'];
                            temp['@ref'] = this.idMap.get(tempSingleVal[i]);
                            temp['@type'] = refType;
                            tempListVal[i] = temp;
                            // console.log('tempListVal[i]: ', tempListVal[i]);
                        } else {    // haven't used it yet, set checkMap to true, and write it
                            this.checkMap.set(tempSingleVal[i], true);
                            // const typein = this.storageTypeMap.get(tempSingleVal[i]);
                            console.log('JSON.parse(sessionStorage.getItem(tempSingleVal[i])): ',
                                JSON.parse(sessionStorage.getItem(tempSingleVal[i])));
                            /*if (this.isJsogMap.has(tempSingleVal[i])) { // sessionStorage already been jsog, use it directly
                                tempListVal[i] = JSON.parse(sessionStorage.getItem(tempSingleVal[i]));
                                console.log('////////////////////////////////isJSOG/////////////////////////');
                            } else {    // a new object
                                const typein = JSON.parse(this.javaStorageTypeMap[tempSingleVal[i]]);
                                tempListVal[i] = this.jsogGen(JSON.parse(sessionStorage.getItem(tempSingleVal[i])), typein);
                            }*/
                            const typeInJsog = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@type'];
                            const typein = JSON.parse(this.javaStorageTypeMap[typeInJsog]);
                            tempListVal[i] = this.jsogGen(JSON.parse(this.formValueMap$.get(tempSingleVal[i])), typein);
                            console.log('tempListVal[i]: ', tempListVal[i]);
                            // console.log('checkMap', this.checkMap);
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
                        temp['@ref'] = this.idMap.get(StrTempVal);
                        temp['@type'] = refType;
                        reVal = temp;
                    } else {    // haven't used it yet, set checkMap to true, and write it
                        this.checkMap.set(StrTempVal, true);
                        // const typein = this.storageTypeMap.get(StrTempVal);
                        const typein = JSON.parse(this.javaStorageTypeMap[JSON.parse(sessionStorage.getItem(StrTempVal))['@type']]);
                        // reVal = this.jsogGen(JSON.parse(sessionStorage.getItem(StrTempVal)), typein);
                        // reVal = this.jsogGen(this.formValueMap.get(StrTempVal), typein);
                        reVal = this.jsogGen(JSON.parse(this.formValueMap$.get(StrTempVal)), typein);
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
    jsogGen(formInput: any, typein: Object) {
        const jsogS = {};

        const aaa = formInput['@type'].concat(formInput['@id']);
        const bbb = aaa.split('.')[aaa.split('.').length - 1];
        this.checkMap.set(bbb, true);
        for (let i = 0; i < Object.keys(formInput).length; i++) {
            const tempKey = Object.keys(formInput)[i];
            if ( (tempKey !== '@id') && (tempKey !== '@type') ) {
                const single_KV_pair = {};
                single_KV_pair[tempKey] = formInput[tempKey];
                formInput[tempKey] = this.jsogForSessionStorage(single_KV_pair, typein);
            }
            jsogS[tempKey] = formInput[tempKey];
        }
        return jsogS;
    }

    // (discard) output object and transmit sessionStorage value & form value to server
    output() {
        for (let i = 0; i < sessionStorage.length; i++) {
            this.idMap.set(Object.keys(sessionStorage)[i], JSON.parse(Object.values(sessionStorage)[i])['@id']);
            // this.checkMap.set(Object.keys(sessionStorage)[i], false);
        }
        console.log('idMap ', this.idMap);
        console.log('checkMap', this.checkMap);
        console.log('length ', this.form_receive.value);

        /* tempType: sessionStorage's class type and index;
           key: split temp and use the last one be the real key */
        /*const tempType = this.form_receive.value['@type'].concat(
            this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
        const key = tempType.split('.')[tempType.split('.').length - 1];*/
        const tempType = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
        const key = tempType.split('.')[tempType.split('.').length - 1];
        console.log('key: ', key);  // print object with class and its class' count
        this.checkMap.set(key, true);

        console.log('storageTypeMap.get(key): ', this.storageTypeMap.get(key));
        this.jsog = this.jsogGen(this.form_receive.value, this.storageTypeMap.get(key) );

        this.checkMap.clear();
        console.log('jsog ', this.jsog);

        // output form value to server ngFormOutput
        this.subCreate.ouputObject( this.jsog ).subscribe(response => {
            console.log('output', response);
        });

        // sessionStorage pass to server ngSessionStorage
        this.subCreate.outputsessionStorage(sessionStorage).subscribe(response => {
            console.log('ngSessionStorage response', response);
        });
    }

    // sessionStorage just accept string type key/value
    store() {
        console.log('JSON.stringify(this.form_receive.value): ', JSON.stringify(this.form_receive.value));

        this.idMap.clear();
        for (let i = 0; i < sessionStorage.length; i++) {
            this.idMap.set(Object.keys(sessionStorage)[i], JSON.parse(Object.values(sessionStorage)[i])['@id']);
            // this.checkMap.set(Object.keys(sessionStorage)[i], false);
        }

        /* get object type => store object use its type-name and index
         * storageMap: count the same class-name object
         */
        let sessionKey;
        const aaa = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
        const bbb = aaa.split('.')[aaa.split('.').length - 1];
        if (sessionStorage.getItem(bbb) === null) { // sessionStorage don't have this item, create object
            /*if (this.storageMap.has(JSON.stringify(this.form_receive.value['@type']))) {    // already had the same class object
                let value = this.storageMap.get(JSON.stringify(this.form_receive.value['@type']));
                value++;
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), value);
                // this.form_receive.value['@id'] = value; // modified @id with class count
            } else {    // first object of this class
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), 1);
                // this.form_receive.value['@id'] = 1;
            }*/
            this.form_receive.value['@id'] = this.storageIndex.toString();

            const temp = this.form_receive.value['@type'].concat(this.storageIndex);    // use storage count as id postfix
            const key = temp.split('.')[temp.split('.').length - 1];
            // this.formValueMap.set(key, JSON.stringify(this.form_receive.value));
            this.formDataInterface.setFormValue(key, JSON.stringify(this.form_receive.value));
            // this.storageTypeMap.set(key, this.MemberType);
            this.ValueTemp = this.CheckStrToNum(this.form_receive.value);
            console.log('this.ValueTemp: ', this.ValueTemp);
            // console.log('this.storageTypeMap.get(key): ', this.storageTypeMap.get(key));
            // this.ValueTemp = this.jsogGen(this.ValueTemp, this.storageTypeMap.get(key));
            this.ValueTemp = this.jsogGen(this.ValueTemp, JSON.parse(this.javaStorageTypeMap[this.form_receive.value['@type']]));
            console.log('after: ', this.ValueTemp);
            sessionStorage.setItem(key, JSON.stringify(this.ValueTemp));
            // this.isJsogMap.set(key, true);
            // sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
            // console.log('this.storageTypeMap: ', this.storageTypeMap);
            this.storageIndex++;
            sessionKey = key;
        } else {    // sessioinStorage had this item, edit object, overwrite old value
            const temp = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
            const key = temp.split('.')[temp.split('.').length - 1];
            // this.formValueMap.set(key, JSON.stringify(this.form_receive.value));
            this.formDataInterface.setFormValue(key, JSON.stringify(this.form_receive.value));
            this.ValueTemp = this.CheckStrToNum(this.form_receive.value);
            console.log('this.ValueTemp: ', this.ValueTemp);
            // turn it to jsog then store it
            // this.ValueTemp = this.jsogGen(this.ValueTemp, this.storageTypeMap.get(key));
            this.ValueTemp = this.jsogGen(this.ValueTemp, JSON.parse(this.javaStorageTypeMap[this.form_receive.value['@type']]));
            console.log('after: ', this.ValueTemp);
            sessionStorage.setItem(key, JSON.stringify(this.ValueTemp));
            // sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
            // this.isJsogMap.set(key, true);
            sessionKey = key;
        }

        for (const k of Object.keys(sessionStorage)) {
            this.checkMap.clear();
            if (k !== sessionKey) {
                const typeIn = JSON.parse(this.javaStorageTypeMap[JSON.parse(sessionStorage.getItem(k))['@type']]);
                console.log('k: ', k, '\ntypeIn: ', typeIn);
                const jsog = this.jsogGen(JSON.parse(this.formValueMap$.get(k)), typeIn);
                sessionStorage.setItem(k, JSON.stringify(jsog));
            }
        }
        this.clearForm();
        // sessionStorage modified, change flag to ng-tree recomposed
        this.formDataService.changeFlag(true);
        // console.log('this.formValueMap: ', this.formValueMap);
        // this.formDataService.passFormValue(this.formValueMap);

        // update formValue. let formValueMap shared, replace formDataService.passFormValue to ng-tree
        // this.formDataInterface.addFormValue(sessionKey, JSON.stringify(this.form_receive.value));

        this.className = '';
        this.MemberKey = [];         // defaultValue: generate_form_receive[0]
        this.MemberStyle = {};    // styleNode
        this.MemberType = {};     // typeNode. use for list
        /*
         * change log:
         * parse into jsog when store.
         * every ob contain other ob, need to check whether it had been used or not, then clear the map.
        */
        this.checkMap.clear();
    }

    // clear the form data
    clearForm() {
        this.MemberKey = [];
        this.generate_form_receive.value = undefined;
        // this.generate_form_receive = {};
        this.form_receive = this.fb.group({});
        this.className = '';
    }

    clearSession() {
        sessionStorage.clear();
        this.storageMap.clear();
        // this.storageTypeMap.clear();
        this.storageIndex = 1;
        this.checkMap.clear();
        this.formDataService.changeFlag(true);
    }

    output2() {
        // output form value to server ngFormOutput
        this.subCreate.ouputObject2(sessionStorage.getItem(this.className)).subscribe(response => {
            console.log('output', response);
        });
        console.log(this.className);
    }

    outputAll() {
        const all = [];
        for (const value of Object.values(sessionStorage)) {
            all.push(JSON.parse(value));
        }
        console.log('length: ', all.length);
        this.subCreate.outputAll(JSON.stringify(all)).subscribe(response => {
            console.log('output', response);
        });
    }
}
