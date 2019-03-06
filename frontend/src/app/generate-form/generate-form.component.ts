import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupName } from '@angular/forms';
import { GenerateFormService } from './generate-form.service';
import { stringify } from 'querystring';
import { store } from '@angular/core/src/render3';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { clearModulesForTest } from '@angular/core/src/linker/ng_module_factory_loader';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css']
})
export class GenerateFormComponent implements OnInit, OnChanges {

    @Input() generate_form_receive;
    Member;         // defaultValueNode
    MemberStyle;    // styleNode
    MemberType;     // typeNode. use for list, not yet
    ValueTemp;
    form_receive = this.fb.group({});

    storageIndex = 1;
    storageMap = new Map<string, number>(); // <class-name, count> : record class' count
    idMap = new Map<string, string>();      // <sessionStorage-key, @id>
    checkMap = new Map<string, boolean>();  // <sessionStorage-key, used/wait>: for @ref
    storageTypeMap = new Map<string, Object>(); // <element-name, memberType>: for jsog generate list, need to check if type is list or not
    jsog;

    constructor(private fb: FormBuilder,
        private subCreate: GenerateFormService,
        private booleanFlag: FormDataService) {
    }

    ngOnInit() {
    }

    CheckStrToNum(input) {
        for (const key in this.MemberType) { // change string default value to number
            if (this.MemberType[key] === 'byte' || this.MemberType[key] === 'short' || this.MemberType[key] === 'int' ||
                this.MemberType[key] === 'long' || this.MemberType[key] === 'float' || this.MemberType[key] === 'double' ||
                this.MemberType[key] === 'Byte' || this.MemberType[key] === 'Short' || this.MemberType[key] === 'Integer' ||
                this.MemberType[key] === 'Long' || this.MemberType[key] === 'Float' || this.MemberType[key] === 'Double') {
                input[key] = +input[key];   // string to number
            }
        }
        return input;
    }

    // receieve the class info form create component
    ngOnChanges() {
        // this.defaultValueTemp = this.generate_form_receive[0];
        this.Member = Object.keys(this.generate_form_receive[0]);  // defaultValueNode
        this.MemberStyle = this.generate_form_receive[1];   // styleNode
        this.MemberType = this.generate_form_receive[2];    // typeNode
        this.form_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('Member: ', this.Member);
        console.log('MemberStyle: ', this.MemberStyle);
        console.log('MemberType: ', this.MemberType);
    }

    jsogForSessionStorage(jsonInput: any, typeCheck) { // jsonInput: the value of each key in json-type
        let tempArray = [];
        console.log('jsonInput: ', jsonInput);
        if (isNaN(jsonInput)) { // skip number, ouput number directly
            tempArray = jsonInput.split(', ');  // it will split the value
            // console.log('tempArray: ', tempArray);
            if (tempArray.length > 1) { // list variable, need to fix this condition
                for (let i = 0; i < tempArray.length; i++ ) {
                    if (sessionStorage.getItem(tempArray[i]) !== null) {   // sessionStorage has it.
                        if (this.checkMap.has(tempArray[i])) { // used, add as @ref
                            const temp = {};
                            const refType = JSON.parse(sessionStorage.getItem(tempArray[i]))['@type'];
                            temp['@ref'] = this.idMap.get(tempArray[i]);
                            temp['@type'] = refType;
                            tempArray[i] = temp;
                            console.log('tempArray[i]: ', tempArray[i]);
                        } else {    // haven't used it yet, set checkMap to true, and write it
                            // console.log('PersonDemo1 ', sessionStorage.getItem(formInput[tempKey]));
                            this.checkMap.set(tempArray[i], true);
                            tempArray[i] = this.jsogGen(JSON.parse(sessionStorage.getItem(tempArray[i])));
                            // form[tempKey] = JSON.parse(sessionStorage.getItem(form[tempKey]));
                            console.log('checkMap', this.checkMap);
                        }
                    }
                }
                return tempArray;
            } else {    // not list variable
                if (sessionStorage.getItem(jsonInput) !== null) {   // sessionStorage has it.
                    if (this.checkMap.has(jsonInput)) { // used, add as @ref
                        const temp = {};
                        const refType = JSON.parse(sessionStorage.getItem(jsonInput))['@type'];
                        temp['@ref'] = this.idMap.get(jsonInput);
                        temp['@type'] = refType;
                        jsonInput = temp;
                        console.log('jsonInput: ', jsonInput);
                    } else {    // haven't used it yet, set checkMap to true, and write it
                        this.checkMap.set(jsonInput, true);
                        jsonInput = this.jsogGen(JSON.parse(sessionStorage.getItem(jsonInput)));
                        console.log('checkMap', this.checkMap);
                    }
                }
                return jsonInput;
            }
        } else {
            return jsonInput;
        }
    }

    jsogGen(formInput: any) {   // formInput = this.form_receive.value (object)
        const jsogS = {};

        for (let i = 0; i < Object.keys(formInput).length; i++) {
            const tempKey = Object.keys(formInput)[i];
            if ( (tempKey !== '@id') && (tempKey !== '@type') ) {
                /*let tempArray = [];
                console.log('formInput[tempKey]: ', formInput[tempKey]);
                tempArray = formInput[tempKey].split(', ');
                console.log('tempArray: ', tempArray);*/
                // console.log('type: ', this.MemberStyle[tempKey]);
                console.log('type input', this.storageTypeMap.get(formInput[tempKey]));
                formInput[tempKey] = this.jsogForSessionStorage(formInput[tempKey], this.storageTypeMap.get(formInput[tempKey]));
                /*if (sessionStorage.getItem(formInput[tempKey]) !== null) {   // sessionStorage has it.
                    if (this.checkMap.has(formInput[tempKey])) { // used, add as @ref
                        const temp = {};
                        const refType = JSON.parse(sessionStorage.getItem(formInput[tempKey]))['@type'] ;
                        temp['@ref'] = this.idMap.get(formInput[tempKey]);
                        temp['@type'] = refType;
                        formInput[tempKey] = temp;
                        console.log('form[tempKey]: ', formInput[tempKey]);
                    } else {    // haven't used it yet, set checkMap to true, and write it
                        // console.log('PersonDemo1 ', sessionStorage.getItem(formInput[tempKey]));
                        this.checkMap.set(formInput[tempKey], true);
                        formInput[tempKey] = this.jsogGen(JSON.parse(sessionStorage.getItem(formInput[tempKey])));
                        // form[tempKey] = JSON.parse(sessionStorage.getItem(form[tempKey]));
                        console.log('checkMap', this.checkMap);
                    }
                }*/
            }
            jsogS[tempKey] = formInput[tempKey];
        }
        return jsogS;
    }

    // output object and transmit sessionStorage value & form value to server
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

        this.jsog = this.jsogGen( this.form_receive.value );

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
    store($event: any) {
        console.log('this.form_receive.value: ', JSON.stringify(this.form_receive.value['@type']));

        /* get object type => store object use its type-name and index
         * storageMap: count the same class-name object
         */
        const aaa = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
        const bbb = aaa.split('.')[aaa.split('.').length - 1];
        if (sessionStorage.getItem(bbb) === null) { // sessionStorage don't have this item, create object
            if (this.storageMap.has(JSON.stringify(this.form_receive.value['@type']))) {    // already had the same class object
                let value = this.storageMap.get(JSON.stringify(this.form_receive.value['@type']));
                value++;
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), value);
                // this.form_receive.value['@id'] = value; // modified @id with class count
            } else {    // first object of this class
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), 1);
                // this.form_receive.value['@id'] = 1;
            }
            this.form_receive.value['@id'] = this.storageIndex.toString();

            /* temp: sessionStorage's class type and index;
               key: split temp and use the last one be the tree-root/sessionStorage key */
            /*const temp = this.form_receive.value['@type'].concat(
                this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));*/
            const temp = this.form_receive.value['@type'].concat(this.storageIndex);    // use storage count as id postfix
            const key = temp.split('.')[temp.split('.').length - 1];
            this.ValueTemp = this.CheckStrToNum(this.form_receive.value);
            sessionStorage.setItem(key, JSON.stringify(this.ValueTemp));
            // sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
            this.storageTypeMap.set(key, this.MemberType);
            console.log('this.storageTypeMap: ', this.storageTypeMap);
            this.storageIndex++;
        } else {    // sessioinStorage had this item, edit object, overwrite old value
            const temp = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
            const key = temp.split('.')[temp.split('.').length - 1];
            this.ValueTemp = this.CheckStrToNum(this.form_receive.value);
            sessionStorage.setItem(key, JSON.stringify(this.ValueTemp));
            // sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
        }
        this.clearForm();
        this.booleanFlag.changeFlag(true);
    }

    // clear the form data
    clearForm() {
        this.Member = undefined;
        this.generate_form_receive.value = undefined;
        this.form_receive = this.fb.group({});
    }

    clearSession() {
        sessionStorage.clear();
        this.storageMap.clear();
        this.storageIndex = 1;
    }

    onDrop($event) {
        // Dropped $event.element
    }

    allowDrop(element) {
        return true;
    }
}
