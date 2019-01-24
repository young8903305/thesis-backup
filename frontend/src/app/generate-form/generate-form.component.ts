import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupName } from '@angular/forms';
import { GenerateFormService } from './generate-form.service';
import { stringify } from 'querystring';
import { store } from '@angular/core/src/render3';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css']
})
export class GenerateFormComponent implements OnInit, OnChanges {

    @Input() generate_form_receive;
    classMember;
    MemberStyle;
    MemberType; // use for list, not yet
    form_receive = this.fb.group({});

    storageIndex = 1;
    storageMap = new Map<string, number>(); // <class-name, count>
    idMap = new Map<string, string>();      // <sessionStorage-key, @id>
    checkMap = new Map<string, boolean>();  // <sessionStorage-key, used/wait>
    jsog;

    constructor(private fb: FormBuilder,
        private subCreate: GenerateFormService) {
    }

    ngOnInit() {
    }

    // receieve the class info form create component
    ngOnChanges() {
        this.classMember = Object.keys(this.generate_form_receive[0]);  //
        this.MemberStyle = this.generate_form_receive[1];   //
        this.MemberType = this.generate_form_receive[2];
        this.form_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('classMember: ', this.classMember);
        console.log('MemberStyle: ', this.MemberStyle);
        console.log('MemberType: ', this.MemberType);
    }

    jsogGen(form) {   // form = this.form_receive.value (object)
        const jsogS = {};

        for (let i = 0; i < Object.keys(form).length; i++) {
            const tempKey = Object.keys(form)[i];
            if ( (tempKey !== '@id') && (tempKey !== '@type') ) {
                if (sessionStorage.getItem(form[tempKey]) !== null) {   // sessionStorage has it.
                    if (this.checkMap.has(form[tempKey])) { // used
                        const temp = {};
                        temp['@ref'] = this.idMap.get(form[tempKey]);
                        temp['@type'] = 'jetty.demo.PersonDemo'; // sessionStorage.getItem(form[tempKey];
                        form[tempKey] = temp;
                        console.log('form[tempKey]: ', form[tempKey]);
                    } else {    // haven't used it yet
                        console.log('PersonDemo1 ', sessionStorage.getItem(form[tempKey]));
                        this.checkMap.set(form[tempKey], true);
                        form[tempKey] = this.jsogGen(JSON.parse(sessionStorage.getItem(form[tempKey])));
                        // form[tempKey] = JSON.parse(sessionStorage.getItem(form[tempKey]));
                        console.log('checkMap', this.checkMap);
                    }
                }
            }
                jsogS[tempKey] = form[tempKey];
        }
        return jsogS;
    }

    output() {

        for (let i = 0; i < sessionStorage.length; i++) {
            this.idMap.set(Object.keys(sessionStorage)[i], JSON.parse(Object.values(sessionStorage)[i])['@id']);
            // this.checkMap.set(Object.keys(sessionStorage)[i], false);
        }
        console.log('idMap ', this.idMap);
        console.log('checkMap', this.checkMap);
        console.log('length ', this.form_receive.value);

        /* temp: sessionStorage's class type and index;
           key: split temp and use the last one be the real key */
        const tempType = this.form_receive.value['@type'].concat(
            this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
        const key = tempType.split('.')[tempType.split('.').length - 1];
        console.log('key: ', key);
        this.checkMap.set(key, true);
        this.jsog = this.jsogGen( this.form_receive.value );
        this.checkMap.clear();
        console.log('jsog ', this.jsog);

        // output form value to ngFormOutput
        console.log('form.value: ', this.form_receive.value);
        // this.subCreate.ouputObject(this.form_receive.value).subscribe(response => {
        this.subCreate.ouputObject( this.jsog ).subscribe(response => {
            console.log('output', response);
        });

        // sessionStorage pass to server ngSessionStorage
        // console.log('sessionStorage: ', sessionStorage);
        this.subCreate.outputsessionStorage(sessionStorage).subscribe(response => {
            console.log('ngSessionStorage response', response);
        });
    }

    // sessionStorage just accept string type key/value
    store() {
        console.log('this.form_receive.value: ', JSON.stringify(this.form_receive.value['@type']));

        // get object type => store object use its type-name and index, storageMap count the same class-name object
        // console.log('this.form_receive.get(type)', JSON.stringify(this.form_receive.value['@type']));
        if (this.storageMap.has(JSON.stringify(this.form_receive.value['@type']))) {
            // console.log(this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
            let value = this.storageMap.get(JSON.stringify(this.form_receive.value['@type']));
            value++;
            this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), value);
            // this.form_receive.value['@id'] = value; // modified @id with class count
        } else {
            this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), 1);
            // this.form_receive.value['@id'] = 1;
        }
        this.form_receive.value['@id'] = this.storageIndex.toString();
        this.storageIndex++;

        /* temp: sessionStorage's class type and index;
           key: split temp and use the last one be the real key */
        const temp = this.form_receive.value['@type'].concat(
            this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
        const key = temp.split('.')[temp.split('.').length - 1];
        sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
    }

    // clear the form data
    clearForm() {
        this.classMember = undefined;
        this.generate_form_receive.value = undefined;
        this.form_receive = this.fb.group({});
    }

    clearSession() {
        sessionStorage.clear();
        this.storageMap.clear();
        this.storageIndex = 1;
    }
}
