import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupName } from '@angular/forms';
import { GenerateFormService } from './generate-form.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css']
})
export class GenerateFormComponent implements OnInit, OnChanges {

    @Input() generate_form_receive;
    classFields;
    fieldStyle;
    form_receive = this.fb.group({});

    storageIndex = 0;
    display_storage = sessionStorage;
    storageMap = new Map<string, number>();

    constructor(private fb: FormBuilder,
        private subCreate: GenerateFormService) {
    }

    ngOnInit() {
    }

    // receieve the class info form create component
    ngOnChanges() {
        // this.classFields = Object.keys( this.sub_receive.value[0] );
        this.classFields = Object.keys(this.generate_form_receive[0]);
        this.fieldStyle = this.generate_form_receive[1];
        this.form_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('classFields: ', this.classFields);
        console.log('fieldStyle: ', this.fieldStyle);
        console.log('this.generate_form_receive[0]', this.generate_form_receive[0]);
        console.log('this.generate_form_receive[1]', this.generate_form_receive[1]);
    }

    output() {

        // simple output form value
        console.log('form.value: ', this.form_receive.value);
        this.subCreate.ouputObject(this.form_receive.value).subscribe(response => {
            console.log('output', response);
        });

        // sessionStorage pass to server
        console.log('sessionStorage: ', sessionStorage);
        this.subCreate.outputsessionStorage(sessionStorage).subscribe(response => {
            console.log('session response', response);
        });
    }

    // sessionStorage just accept string type key/value
    sessionStore() {
        console.log('this.form_receive.value: ', JSON.stringify(this.form_receive.value));

        // get object type => store object use its type-name and index, storageMap count the same class-name object
        console.log('this.form_receive.get(type)', JSON.stringify(this.form_receive.value['@type']));
        if (this.storageMap.has(JSON.stringify(this.form_receive.value['@type']))) {
            console.log(this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
            let value = this.storageMap.get(JSON.stringify(this.form_receive.value['@type']));
            value++;
            this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), value);
            console.log('map', this.storageMap);
        } else {
            this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), 1);
        }

        // temp: sessionStorage's type and index;
        // key: split temp and use the last one be the real key
        const temp = this.form_receive.value['@type'].concat(
            this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
        const key = temp.split('.')[temp.split('.').length - 1];
        sessionStorage.setItem( key, JSON.stringify(this.form_receive.value));
        for (let i = 0; i < sessionStorage.length; i++) {
            console.log('display_storage', i, JSON.parse(Object.values(sessionStorage)[i]));
        }
    }

    // clear the form data
    clear() {
        this.classFields = undefined;
        this.generate_form_receive.value = undefined;
        this.form_receive = this.fb.group({});
    }
}
