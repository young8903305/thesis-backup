import { Component, OnInit } from '@angular/core';
import 'jstree';
import * as $ from 'jquery';

@Component({
  selector: 'app-jstree',
  templateUrl: './jstree.component.html',
  styleUrls: ['./jstree.component.css']
})
export class JstreeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('#using_json').jstree({
          'core': {
              "check_callback": true,
              'data': [
				]
          }
  }

}
