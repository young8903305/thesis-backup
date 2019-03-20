import { Component, OnInit, DoCheck, Output, EventEmitter, OnChanges } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { FormDataService } from '../form-data.service';
import { AngularTreeService } from './angular-tree.service';

let a;

@Component({
  selector: 'app-angular-tree',
  templateUrl: './angular-tree.component.html',
  styleUrls: ['./angular-tree.component.css']
})
export class AngularTreeComponent implements OnInit, DoCheck {


    constructor(private data: FormDataService,
                private ngTreeService: AngularTreeService) {
                    this.ngTreeService.getType().subscribe( response => {
                        this.typeMap = response;
                    });
    }


    storageLength = 0;
    nodes;
    str;
    sessionStorageTemp;
    flagReceive;    // in form-data service, for resize the component if sessionStorage been motified

    contextMenu: { node: TreeNode, x: number, y: number } = null;
    editNode: TreeNode = null;
    sourceNode: TreeNode = null;
    doCut = false;
    finishPaste = true;
    typeMap: any;


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
                        console.log('treeNode.data: ', treeNode.data);
                    }
                },
                click: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
                    e.preventDefault();
                    if ((treeNode.data.pureName !== '@id' && treeNode.data.pureName !== '@type') || treeNode.isRoot) {
                        TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
                    }
                    this.closeMenu();
                    if (treeNode.isRoot) {  // root node to form
                        // TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
                        const xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                a = xhttp.responseText;     // universal variable for catch the response, then form the sessionStorage
                            }
                        };
                        xhttp.open('POST', '/ngEditSessionStorage', true);
                        xhttp.send(sessionStorage.getItem(treeNode.data.name));
                    }
                },
                drag: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
                    if (treeNode.isRoot) {
                        this.data.passNodeVal(treeNode.data.name);
                    } else {
                        this.data.passNodeVal(treeNode.data.val);
                    }
                }
            }
        },
        allowDrag: (node) => {
            if (node.data.pureName !== '@id' && node.data.pureName !== '@type') {
                return true;
            }
        },
        allowDrop: false
        // allowDrop: (node) => false
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
                const sessionValTemp = JSON.parse(Object.values(sessionStorage)[i]);
                const typeVal = JSON.parse( this.typeMap[sessionValTemp['@type']] );
                for (const [key, value] of Object.entries(JSON.parse(Object.values(sessionStorage)[i]))) {
                        parent.children.push({
                            name: key + ': ' + value,
                            pureName: key,
                            val: value,
                            style: typeVal[key]
                        });
                }
                this.nodes.push(parent);
            }
            this.flagReceive = false;   // finish resize ng-tree, turn it to false
        }
        this.storageLength = sessionStorage.length;
    }

    onEditClick() {   // edit sessionStorage, transmit info to create component, it will transmit to generate-form
        this.sessionStorageTemp = a;
        this.data.editSessionStorage(JSON.parse(this.sessionStorageTemp.toString()));
    }

    closeMenu = () => {
        this.contextMenu = null;
    }

    copyValue = () => {
        if (this.isRoot()) {    // for root node, copy its name to represent the whole object
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

            // use clipboard EventListener send val to clipboard
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

    hasVal = () => {
        if (this.contextMenu.node.data.val === '') {
            return false;
        } else {
            return true;
        }
    }

    deleteObject = (node) => {
        sessionStorage.removeItem(node.data.name);
        this.closeMenu();
    }

    deleteValue = (node) => {
        const temp = {};
        for (let [key, value] of Object.entries(JSON.parse(sessionStorage.getItem(node.parent.data.name)))) {
            if (key === node.data.pureName) {
                value = '';
            }
            temp[key] = value;
        }
        sessionStorage.setItem(node.parent.data.name, JSON.stringify(temp));
        node.data.val = '';
        node.data.name = node.data.pureName + ': ' + node.data.val;
        this.closeMenu();
    }

    // replace the value in sessionStorage directly, edit the name attr of ng-tree directly
    pasteValue = () => {
        if (!this.canPaste()) {
            return;
        }
        if (this.doCut) {
            const [name, pureName, val] = Object.entries(this.contextMenu.node.parent.data.children[1]);    // index 1: get @type val
            const [sourceName, sourcePureName, sourceVal] = Object.entries(this.sourceNode.parent.data.children[1]);
            if (val[1].toString() === sourceVal[1].toString()) {
                if (this.contextMenu.node.data.pureName === this.sourceNode.data.pureName) {
                    this.contextMenu.node.data.val = this.sourceNode.data.val;  // node's val
                    // node's view
                    this.contextMenu.node.data.name = this.contextMenu.node.data.pureName + ': ' + this.contextMenu.node.data.val;
                    const temp = {};
                    // console.log('sessionStorage.getItem(this.contextMenu.node.parent.data.name: ',
                    // sessionStorage.getItem(this.contextMenu.node.parent.data.name));
                    for ( let [key, value] of Object.entries(
                        JSON.parse(sessionStorage.getItem(this.contextMenu.node.parent.data.name)))) {
                        if (key === this.contextMenu.node.data.pureName) {
                            value = this.sourceNode.data.val;
                        }
                        temp[key] = value;
                    }
                    sessionStorage.setItem(this.contextMenu.node.parent.data.name, JSON.stringify(temp));
                    this.doCut = false;
                    this.sourceNode = null;
                } else {
                    alert('not the same attribute');
                }
            } else {
                alert('not the same type object');
            }
        }
        this.closeMenu();
    }

    canPaste = () => {
        if (!this.sourceNode) {
            return false;
        }
        return this.sourceNode.treeModel.canMoveNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 });
    }

    editValue() {
        this.editNode = this.contextMenu.node;
        this.closeMenu();
    }
    stopEdit() {
        console.log('this.editNode.data.style: ', this.editNode.data.style);
        const temp = {};
        for (let [key, value] of Object.entries(
            JSON.parse(sessionStorage.getItem(this.editNode.parent.data.name)))) {
            if (key === this.editNode.data.pureName) {
                this.editNode.data.name = this.editNode.data.pureName + ': ' + this.editNode.data.val;
                value = this.editNode.data.val;
            }
            temp[key] = value;
        }
        sessionStorage.setItem(this.editNode.parent.data.name, JSON.stringify(temp));
        this.editNode = null;
    }

    preventDe($event) {
        $event.stopPropagation();
    }

}
