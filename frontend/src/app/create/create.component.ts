import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CreateService } from './create.service';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [ CreateService ],
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

    constructor(private createService: CreateService,
                private fb: FormBuilder,
                private data: FormDataService) {
        this.createService.getClassName()
            .subscribe(response => {
                this.dataClassName = Object.values(response);
                // console.log('classNames', this.dataClassName);
            });
    }

    dataClassName: any;
    receive: any;

    ngOnInit() {
        this.data.currentStorage.subscribe(storageIn => this.receive = storageIn);
    }

    /* if user choose the different class, re-get from the server, and pass to the generate-form component
     * item: the object which user clicked, { name: classname }
     */
    postClass(item: any) {
        const obItem = {'name': item};
        console.log(obItem);
        this.createService.postClass(obItem).subscribe(response => {
            console.log('response: ', response);
            this.receive = response.body;   // [] consist of three object from server： {defaultValue}, {styleNode}, {typeNode}
            console.log('receive.body: ', this.receive);
        });
    }
}
