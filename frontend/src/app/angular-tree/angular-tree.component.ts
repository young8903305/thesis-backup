import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

const actionMapping: IActionMapping = {
    mouse: {
        contextMenu: (tree, node, $event) => {
            $event.preventDefault();
            alert(`context menu for ${node.data.name}`);
        },
        dblClick: (tree, node, $event) => {
            if (node.hasChildren) {
                TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            }
        },
        click: (tree, node, $event) => {
            $event.shiftKey
                ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
                : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
        }
    },
    keys: {
        [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
};

@Component({
  selector: 'app-angular-tree',
  templateUrl: './angular-tree.component.html',
  styleUrls: ['./angular-tree.component.css']
})
export class AngularTreeComponent implements OnInit, OnChanges, DoCheck {

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

  ngDoCheck() {
      if (this.storageLength !== sessionStorage.length) {
          // console.log('length: ', this.temp);

          this.nodes = [];
          for (let i = 0; i < sessionStorage.length; i++) {
              // console.log('Key: ', Object.keys(sessionStorage)[i]);
              const parent = { name: '', 'children': [] };
              parent['name'] = Object.keys(sessionStorage)[i];
              for (const item of Object.keys(JSON.parse( Object.values(sessionStorage)[i]) )) {
                  // console.log('content: ', item);
                  parent.children.push({ name: item });
              }
              this.nodes.push(parent);
          }
          // console.log(this.nodes);
      }
      this.storageLength = sessionStorage.length;
  }

  ngOnChanges() {
  }

}
