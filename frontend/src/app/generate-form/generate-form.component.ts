import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupName } from '@angular/forms';
import { GenerateFormService } from './generate-form.service';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css']
})
export class GenerateFormComponent implements OnInit, OnChanges {

    @Input() generate_form_receive;
    classFields;
    fieldStyle;
    form_sub_receive = this.fb.group({});

    storageIndex = 0;
    display_storage = sessionStorage;

    constructor(private fb: FormBuilder,
        private subCreate: GenerateFormService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        // this.classFields = Object.keys( this.sub_receive.value[0] );
        this.classFields = Object.keys(this.generate_form_receive[0]);
        this.fieldStyle = this.generate_form_receive[1];
        this.form_sub_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('classFields: ', this.classFields);
        console.log('fieldStyle: ', this.fieldStyle);
        console.log('this.generate_form_receive[0]', this.generate_form_receive[0]);
        console.log('this.generate_form_receive[1]', this.generate_form_receive[1]);
    }

    output() {
        // console.log('origin', this.sub_receive.value);
        /*this.subCreate.ouputObject(this.sub_receive.value).subscribe( response => {
            console.log( 'out', response );
        });*/
        console.log('form values', this.form_sub_receive);
        this.subCreate.ouputObject(this.form_sub_receive.value).subscribe(response => {
            console.log('output', response);
        });
    }


    sessionStorage() {
        console.log('this.form_sub_receive.value: ', JSON.stringify(this.form_sub_receive.value));
        sessionStorage.setItem(this.storageIndex.toString(), JSON.stringify(this.form_sub_receive.value));
        this.storageIndex++;
        for (let i = 0; i < this.display_storage.length; i++) {
            console.log('display_storage', i, JSON.parse(Object.values(this.display_storage)[i]));
        }
    }
    clear() {
        this.classFields = undefined;
        this.generate_form_receive.value = undefined;
        this.form_sub_receive = this.fb.group({});
    }
}
