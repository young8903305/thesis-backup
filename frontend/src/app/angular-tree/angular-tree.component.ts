import { Component, OnInit, DoCheck, Output, EventEmitter, OnChanges } from '@angular/core';
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
    flagReceive;


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
                    if ((treeNode.data.pureName !== '@type') && (treeNode.data.pureName !== '@id') ) {
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
                    if (treeNode.isRoot) {  // root node to form
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
        allowDrag: (node) => {
            if (node.data.pureName !== '@id' && node.data.pureName !== '@type') {
                return true;
            }
        },
        allowDrop: (node) => false,
    };

    ngOnInit() {
        this.data.currentFlag.subscribe(flagInput => this.flagReceive = flagInput);
    }

    ngDoCheck() {     // check sessionStorage's length and generate ng-tree view
        if (this.storageLength !== sessionStorage.length || this.flagReceive === true) {
            // console.log('length: ', this.temp);
            this.nodes = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const parent = {
                    name: '',
                    'children': []
                };
                parent['name'] = Object.keys(sessionStorage)[i];

                for (const [key, value] of Object.entries(JSON.parse(Object.values(sessionStorage)[i]))) {
                    // if (key !== '@id' && key !== '@type') {
                        parent.children.push({
                            name: key + ': ' + value,
                            pureName: key,
                            val: value
                        });
                    // }
                }
                /*for (const item of Object.keys(JSON.parse(Object.values(sessionStorage)[i]))) {
                    parent.children.push({
                        name: item,
                        val: item.toString()
                    });
                }*/
                this.nodes.push(parent);
            }
            this.flagReceive = false;
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

    // no use
    edit = () => {
        this.editNode = this.contextMenu.node;
        this.closeMenu();
    }

    // no use
    stopEdit = () => {
        this.editNode = null;
    }

    copyValue = () => {
        if (this.isRoot()) {
            console.log('this.contextMenu.node.data.name ', this.contextMenu.node.data.name);
            document.addEventListener('copy', (e: ClipboardEvent) => {
                e.clipboardData.setData('text/plain', (this.contextMenu.node.data.name));
                e.preventDefault();
                document.removeEventListener('copy', null);
            });
            document.execCommand('copy');

            this.doCut = true;
            this.closeMenu();
        } else {
        this.sourceNode = this.contextMenu.node;

        /*const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.contextMenu.node.data.val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);*/

        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (this.contextMenu.node.data.val));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');

        this.doCut = true;
        this.closeMenu();
        }
    }

    copyObj = () => {
        if (!this.isRoot) {
            return false;
        }
        // this.sourceNode = this.contextMenu.node;
        this.doCut = false;
        const itemCopy = sessionStorage.getItem(this.contextMenu.node.data.name);
        const itemCopyJson = JSON.parse(itemCopy);
        const temp = {};
        for (let [k, v] of Object.entries(itemCopyJson )) {
            if (k === '@id') {
                v = v + '123';
            }
            temp[k] = v;
        }
        sessionStorage.setItem(this.contextMenu.node.data.name + '123', JSON.stringify(temp));  // need to set an unique seiral id
        this.closeMenu();
    }

    isRoot = () => {
        if (this.contextMenu.node.isRoot) {
            return true;
        }
        return false;
    }

    notRoot = () => {
        if (this.contextMenu.node.isRoot) {
            return false;
        }
        return true;
    }

    delete = (node) => {
        sessionStorage.removeItem(node.data.name);
        this.closeMenu();
    }

    pasteValue = () => {
        if (!this.canPaste()) {
            return;
        }
        /*this.doCut
            ? this.sourceNode.treeModel.moveNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 })
            : this.sourceNode.treeModel.copyNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 });*/
        if (this.doCut) {
            // console.log('this.contextMenu.node.parent.data.children', this.contextMenu.node.parent.data.children);
                const [name, pureName, val] = Object.entries(this.contextMenu.node.parent.data.children[1]);    // index 1: @type
                const [sourceName, sourcePureName, sourceVal] = Object.entries(this.sourceNode.parent.data.children[1]);  // index 1: @type
                if (val[1].toString() === sourceVal[1].toString()) {
                // if (this.contextMenu.node.parent.data.children[i]['type'] === this.sourceNode.parent.data.children[i]['type']) {
                    if (this.contextMenu.node.data.pureName === this.sourceNode.data.pureName) {
                        this.contextMenu.node.data.val = this.sourceNode.data.val;  // node's val
                        // node's view
                        this.contextMenu.node.data.name = this.contextMenu.node.data.pureName + ': ' + this.contextMenu.node.data.val;
                        const temp = {};
                        console.log('sessionStorage.getItem(this.contextMenu.node.parent.data.name: ',
                        sessionStorage.getItem(this.contextMenu.node.parent.data.name));
                        for ( let [key, value] of Object.entries(
                            JSON.parse(sessionStorage.getItem(this.contextMenu.node.parent.data.name)))) {
                            if (key === this.contextMenu.node.data.pureName) {
                                value = this.sourceNode.data.val;
                            }
                            temp[key] = value;
                        }
                        sessionStorage.setItem(this.contextMenu.node.parent.data.name, JSON.stringify(temp));
                        console.log('this.sourceNode.parent.data.children: ', this.sourceNode.parent.data.children);
                        console.log('this.contextMenu.node.parent: ', this.contextMenu.node.parent);
                    } else {
                        alert('not the same attribute');
                    }
                } else {
                    alert('not the same type object');
                }
        }
        this.doCut = false;
        this.sourceNode = null;
        this.closeMenu();
        this.ngDoCheck();
    }

    canPaste = () => {
        if (!this.sourceNode) {
            return false;
        }
        return this.sourceNode.treeModel.canMoveNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 });
    }

}
