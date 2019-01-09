import { Component, OnInit, AfterViewInit} from '@angular/core';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-jstree',
  templateUrl: './jstree.component.html',
  styleUrls: ['./jstree.component.css']
})
export class JstreeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
      $('#using_json').jstree({
          'core': {
              'check_callback': true,
              'data': [
                  'Simple root node',
                  {
                      'text': 'Root node 2',
                      'state': {
                          'opened': true,
                          'selected': true
                      },
                      'children': [
                          { 'text': 'Child 1' },
                          'Child 2'
                      ]
                  }
              ]
          }
        });
    }
}
