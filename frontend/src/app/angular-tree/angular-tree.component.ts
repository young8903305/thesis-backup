import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-tree',
  templateUrl: './angular-tree.component.html',
  styleUrls: ['./angular-tree.component.css']
})
export class AngularTreeComponent implements OnInit {

  constructor() { }

    nodes = [
        {
            name: 'PersonDemo',
            'children': [
                {
                    name: '@id'
                },
                {
                    name: 'age',
                },
                {
                    name: 'lastName',

                },
                {
                    name: 'firstName',

                },
                {
                    name: 'password',

                },
                {
                    name: 'email',

                },
                {
                    name: 'color',

                },
                {
                    name: 'test',
                },
            ]
        }
    ];
    options = {};

  ngOnInit() {
  }

}
