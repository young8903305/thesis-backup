import { Component, OnInit } from '@angular/core';
import { CreateService } from './create.service';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [ CreateService ],
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

    constructor(private createService: CreateService,
                private fb: FormBuilder) {
        this.createService.getClassName()
            .subscribe(response => {
                this.dataClassName = Object.values(response);
                console.log('className', this.dataClassName);
            });
    }

    dataClassName: any;
    receive;

    ngOnInit() {}

    /*getClass() {
        this.createService.getClassName()
            .subscribe(response => {
                this.dataClassName = Object.keys(response);
                console.log(this.dataClassName);
            });
    }*/

    postClass(item) {
        const obItem = {'name': item};
        console.log(obItem);
        this.createService.postClass(obItem).subscribe(response => {
            console.log('response: ', response);
            this.receive = response.body;
            console.log('receive.body: ', this.receive);
        });
    }
}
