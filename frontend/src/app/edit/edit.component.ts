import { Component, OnInit } from '@angular/core';
import { Edit, EditService } from './edit.service';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [ EditService ],
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

    headers: string[];
    edit: Edit;
    data: any;
    dataKeys: any;
    dataTypes: any;
    dataForm = this.fb.group({});
    FormView;

    constructor(
        private editService: EditService,
        private fb: FormBuilder) { }

    clear() {
        this.edit = undefined;
        this.headers = undefined;
        this.dataKeys = undefined;
        this.dataForm.reset();
    }

    ngOnInit() {}

    showConfigResponse() {
        this.editService.getEditResponse()
            // resp is of type `HttpResponse<Edit>`
            .subscribe(resp => {
                // display its headers
                const keys = resp.headers.keys();
                this.headers = keys.map(key =>
                    `${key}: ${resp.headers.get(key)}`);

                // access the body directly, which is typed as `Config`.
                this.edit = { ...resp.body };
            });
    }

    getData() {
        this.editService.getEditData()
        .subscribe(response => {
            this.dataTypes = response[0];
            this.dataKeys = Object.keys(response[1]);
            this.data = response[1];

            console.log(response[0]);
            console.log(response[1]);

            this.FormView = response[0];
            this.dataForm = this.fb.group(response[1]);
        });

    }

    // write submit event here
    onSubmit() {
        console.log(this.dataForm.value);
    }
}
