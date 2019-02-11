import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import * as _ from 'lodash'; // _.remove.......

const actionMapping: IActionMapping = {
    mouse: {    // mouse action
        contextMenu: (tree, node, $event) => {  // right click
            // In case you want to open your own context menu, you must first run $event.preventDefault() within the callback.
            $event.preventDefault();
            if (node.isRoot) {
                const x = confirm('Delete ?');
                if (x) {
                    // remove from original nodes array
                    // _.remove(node.parent.data.children, node.data);
                    sessionStorage.removeItem(node.data.name);
                }
            }
            tree.update();
        }
    }
};

@Component({
  selector: 'app-angular-tree',
  templateUrl: './angular-tree.component.html',
  styleUrls: ['./angular-tree.component.css']
})
export class AngularTreeComponent implements OnInit, DoCheck {

  constructor() { }

  storageLength = 0;
  nodes;

    /*nodes = [
        {
            name: 'PersonDemo1',
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
        },
        {
            name: 'PersonDemo2',
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
    ];*/

    options: ITreeOptions = {
        actionMapping
    };

  ngOnInit() {
  }

  ngDoCheck() {     // check sessionStorage's length and generate ng-tree view
      if (this.storageLength !== sessionStorage.length) {
          // console.log('length: ', this.temp);

          this.nodes = [];
          for (let i = 0; i < sessionStorage.length; i++) {
              // console.log('Key: ', Object.keys(sessionStorage)[i]);
              const parent = { name: '', 'children': [] };
              parent['name'] = Object.keys(sessionStorage)[i];
              for (const item of Object.keys(JSON.parse( Object.values(sessionStorage)[i])) ) {
                  // console.log('content: ', item, '\nvalue: ', item.toString());
                  parent.children.push({ name: item, val: item.toString()});
              }
              this.nodes.push(parent);
          }
          // console.log('nodes: ', this.nodes);
      }
      this.storageLength = sessionStorage.length;
  }

  sessionForm() {
      console.log();
  }

}
