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

    // if user choose the different class, re-get from the server, and pass to the generate-form component
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
