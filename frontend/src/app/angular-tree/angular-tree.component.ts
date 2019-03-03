import { Component, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { FormDataService } from '../form-data.service';
// import * as _ from 'lodash'; // _.remove.......

    /*const actionMapping: IActionMapping = {
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
            },
            click: (tree, node, $event) => {    // click root node, active and pass to server and parse the node storage
                $event.preventDefault();
                if (node.isRoot) {
                    TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
                    const xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            a = xhttp.responseText;     // universal variable for catch the response, then form the sessionStorage
                        }
                    };
                    xhttp.open('POST', '/ngEditSessionStorage', true);
                    xhttp.send(sessionStorage.getItem(node.data.name));
                }
            }
        }
    };*/

    let a;

@Component({
  selector: 'app-angular-tree',
  templateUrl: './angular-tree.component.html',
  styleUrls: ['./angular-tree.component.css']
})
export class AngularTreeComponent implements OnInit, DoCheck {


    constructor(private data: FormDataService) {
    }

    storageLength = 0;
    nodes;
    str;
    sessionStorageTemp;


    contextMenu: { node: TreeNode, x: number, y: number } = null;
    editNode: TreeNode = null;
    sourceNode: TreeNode = null;
    doCut = false;


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
        actionMapping: {
            mouse: {
                contextMenu: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
                    e.preventDefault();
                    if (this.contextMenu && treeNode === this.contextMenu.node) {
                        return this.closeMenu();
                    }
                    if (treeNode.isRoot) {
                        this.contextMenu = {
                            node: treeNode,
                            x: e.pageX,
                            y: e.pageY
                        };
                    }
                },
                click: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
                    e.preventDefault();
                    this.closeMenu();
                    if (treeNode.isRoot) {
                        TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
                        const xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                a = xhttp.responseText;     // universal variable for catch the response, then form the sessionStorage
                            }
                        };
                        xhttp.open('POST', '/ngEditSessionStorage', true);
                        xhttp.send(sessionStorage.getItem(treeNode.data.name));
                    }
                }
            }
        },
        allowDrag: (node) => node.isRoot,
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
                    parent.children.push({ name: item, val: item.toString()});
                }
                this.nodes.push(parent);
            }
        }
        this.storageLength = sessionStorage.length;
    }

    onEditClick() {   // edit sessionStorage, transmit info upward
        this.sessionStorageTemp = a;
        this.data.changeMessage(JSON.parse(this.sessionStorageTemp.toString()));
    }



    closeMenu = () => {
        this.contextMenu = null;
    }

    edit = () => {
        this.editNode = this.contextMenu.node;
        this.closeMenu();
    }

    stopEdit = () => {
        this.editNode = null;
    }

    copy = () => {
        this.sourceNode = this.contextMenu.node;
        this.doCut = false;
        const itemCopy = sessionStorage.getItem(this.contextMenu.node.data.name);
        sessionStorage.setItem(this.contextMenu.node.data.name + '123', itemCopy);  // need to set an unique seiral id
        this.closeMenu();
    }

    delete = (node) => {
        sessionStorage.removeItem(node.data.name);
        this.closeMenu();
    }

}
