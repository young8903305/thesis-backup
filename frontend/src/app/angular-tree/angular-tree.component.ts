import { Component, OnInit, DoCheck, Output, EventEmitter, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeComponent } from 'angular-tree-component';
import { FormDataService } from '../form-data.service';
import { AngularTreeService } from './angular-tree.service';
import { nodeChildrenAsMap } from '@angular/router/src/utils/tree';

let a;

@Component({
  selector: 'app-angular-tree',
  templateUrl: './angular-tree.component.html',
  styleUrls: ['./angular-tree.component.css']
})
export class AngularTreeComponent implements OnInit, DoCheck {


    constructor(private data: FormDataService,
                private ngTreeService: AngularTreeService) {
                    this.ngTreeService.getInputType().subscribe( response => {
                        this.InputTypeMap = response;
                    });
                    this.ngTreeService.getJavaStorageType().subscribe( response => {
                        this.javaStorageTypeMap = response;
                    });
    }


    storageLength = 0;
    nodes;
    str;
    sessionStorageTemp;
    flagReceive;    // in form-data service, for resize the component if sessionStorage been motified
    // formReceive;    // form pass the form-value, use on root node
    formValueMap;   // <session-key, string-form-value>

    contextMenu: { node: TreeNode, x: number, y: number } = null;
    editNode: TreeNode = null;
    sourceNode: TreeNode = null;
    doCut = false;
    finishPaste = true;
    InputTypeMap: any;
    javaStorageTypeMap;

    checkMap = new Map<string, boolean>();  // <sessionStorage-key, used/wait>: for @ref, if used then just put @ref & @type
    idMap = new Map<string, string>();      // <sessionStorage-key, @id>: store id for @ref-using
    isJsogMap = new Map<string, boolean>(); // <session-key, isJsog>: for jsogForSessionStorage, if it already been jsog or not
    editSession;


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
                        console.log('treeNode: ', treeNode);
                    }
                    this.closeMenu();
                    /*if (treeNode.isRoot) {  // root node to form
                        // TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
                        const xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                a = xhttp.responseText;     // universal variable for catch the response, then form the sessionStorage
                            }
                        };
                        xhttp.open('POST', '/ngEditSessionStorage', true);
                        xhttp.send(sessionStorage.getItem(treeNode.data.name));
                    }*/
                    if (treeNode.data.formVal !== undefined) {
                        const temp = JSON.stringify(treeNode.data.formVal);
                        const xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                a = xhttp.responseText;     // universal variable for catch the response, then form the sessionStorage
                            }
                        };
                        xhttp.open('POST', '/ngEditSessionStorage', true);
                        xhttp.send(temp);
                    }
                },
                drag: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
                    if (treeNode.isRoot) {
                        this.data.passNodeVal(treeNode.data.name);
                    } else {
                        this.data.passNodeVal(treeNode.data.val);
                    }
                }
                /*drop: (treeModel: TreeModel, treeNode: TreeNode, $event: any, { from, to }) => {
                    if (from.isRoot) {
                        console.log('from: ', from);
                        console.log('to: ', to);
                        if (to.parent.data.type.includes(from.data.type)) {
                            to.parent.data.val = from.data.val;
                            // sessionStorage.setItem(to.parent.);
                            // array put value, object put value
                        }
                        // this.data.passNodeVal(from.data.name); service, do not delete
                    } else if (from.isLeaf) {
                        if (from.isLeaf && to.isLeaf) {
                            // to.parent.data.val = from.data.val;
                        }
                        console.log('from: ', from);
                        console.log('to: ', to);
                        // this.data.passNodeVal(from.data.val); service, do not delete
                    }
                }*/
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
        this.data.currentFormValue.subscribe(formValueMapInput => this.formValueMap = formValueMapInput);
    }

    // generate ng-tree childGen( sessionStorage's inputtype, jsog-in-sessionStorage )
    childGen(InputTypeValIn: Object, sessionStorageSingleIn) {
        const reArray = [];
        console.log('InputTypeValIn: ', InputTypeValIn);
        for (let [key, value] of sessionStorageSingleIn) {
            console.log('key: ', key, '\nvalue: ', value);
                let typeTemp: any = key.match(/\([^)]+\)/); // catch string in () include (), used in type check
                // console.log('typeTemp: ', typeTemp);
                if (value === null) {
                    value = '';
                }
                if (key.includes('[]') || key.includes('List') || value instanceof Array) { // array of object,  value instanceof Array
                    // array of object
                    const temp = {
                        name: '',  // for view
                        pureName: key,
                        val: value,
                        editVal: '',
                        style: InputTypeValIn[key],
                        type: typeTemp[0].toString(),
                        canEdit: true,
                        children: []
                    };
                    let viewNameTemp = '';
                    let count = 1;
                    const length = value.length;
                    for ( const obElement of value) {
                        let aaa;
                        let bbb: string;
                        for (const k of Object.keys(obElement)) {
                            if ( k === '@id') {
                                aaa = obElement['@type'].concat(obElement['@id']);
                                bbb = aaa.split('.')[aaa.split('.').length - 1];
                            } else if (k === '@ref') {
                                aaa = obElement['@type'].concat(obElement['@ref']);
                                bbb = aaa.split('.')[aaa.split('.').length - 1];
                            }
                        }
                        /*temp.children.push(
                            this.makeRootNode(
                                bbb, JSON.parse(sessionStorage.getItem(bbb.toString())), this.InputTypeMap[obElement['@type']]
                            )
                        );*/
                        /*console.log('1');
                        console.log('this.formValueMap: ', this.formValueMap);
                        console.log('this.InputTypeMap[obElement[@type]]: ', this.InputTypeMap[obElement['@type']]);
                        console.log('this.formValueMap.get(bbb)', this.formValueMap.get(bbb));*/
                        temp.children.push(
                            this.makeRootNode(
                                bbb, obElement, JSON.parse(this.InputTypeMap[obElement['@type']]), JSON.parse(this.formValueMap.get(bbb))
                            )
                        );
                        if (count !== length) {
                            viewNameTemp = viewNameTemp + bbb + ', ';
                            count++;
                        } else {
                            viewNameTemp = viewNameTemp + bbb;
                        }
                    }
                    temp.name = key + ': ' + viewNameTemp;
                    temp.editVal = viewNameTemp;
                    // array of value, need
                    // array of array, need
                    reArray.push(
                        temp
                    );
                } else {    // simple value on leaf node
                    if (value instanceof Object) {  // a object
                        // console.log('value: ', value);
                        const temp = {
                            name: '',  // for view
                            pureName: key,
                            val: value,
                            editVal: '',
                            style: InputTypeValIn[key],
                            type: 'null',
                            canEdit: true,
                            children: []
                        };
                        console.log('value: ', value);
                        console.log('value[@type]: ', value['@type']);
                        const childType = this.InputTypeMap[value['@type']];
                        console.log('childType: ', childType);
                        let aaa;
                        if (value['@id'] === undefined) {
                            aaa = value['@type'].concat(value['@ref']);
                        } else {
                            aaa = value['@type'].concat(value['@id']);
                        }
                        const bbb = aaa.split('.')[aaa.split('.').length - 1];

                        temp.name = key + ': ' + bbb;
                        temp.editVal = bbb;
                        console.log('this.formValueMap.get(bbb)): ', this.formValueMap.get(bbb));
                        // console.log('2');
                        temp.children.push( this.makeRootNode(bbb, value, JSON.parse(childType), JSON.parse(this.formValueMap.get(bbb))) );
                        reArray.push(temp);
                    } else {    // just value
                        if (typeTemp === null) {
                            typeTemp = 'null';
                            reArray.push(
                                {
                                    name: key + ': ' + value,
                                    pureName: key,
                                    val: value,
                                    editVal: value,
                                    style: InputTypeValIn[key],
                                    type: typeTemp,
                                    canEdit: true
                                }
                            );
                        } else {
                            reArray.push(
                                {
                                    name: key + ': ' + value,
                                    pureName: key,
                                    val: value,
                                    editVal: value,
                                    style: InputTypeValIn[key],
                                    type: typeTemp[0].toString(),
                                    canEdit: true
                                }
                            );
                        }
                    }
                }
        }
        return reArray;
    }

    // nodeName: key in sessionStorage, nodeData: object of sessionStorage, childInputType: node's child Input type
    makeRootNode (nodeName: string, nodeData: Object, childInputType: Object, rootFormValue: string) {
        const node = {    // root node
            name: '',
            pureName: '',
            // val: nodeData,
            val: rootFormValue,
            editVal: '',
            formVal: rootFormValue,
            style: '',
            type: '',
            canEdit: false,
            'children': []
        };
        node.name = nodeName;
        node.pureName = nodeName;
        node.type = nodeData['@type'].split('.')[ nodeData['@type'].split('.').length - 1 ];
        // console.log('3');
        node.children = this.childGen(childInputType, Object.entries(nodeData));

        return node;
    }

    ngDoCheck() {     // check sessionStorage's length and generate ng-tree view
        if (this.storageLength !== sessionStorage.length || this.flagReceive === true) {
            // console.log('length: ', this.temp);
            this.nodes = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                /*const parent = {    // root node
                    name: '',
                    type: '',
                    'children': []
                };*/
                // parent['name'] = Object.keys(sessionStorage)[i];
                const sessionValTemp = JSON.parse(Object.values(sessionStorage)[i]);
                const InputTypeVal = JSON.parse( this.InputTypeMap[sessionValTemp['@type']] );
                // parent['type'] = sessionValTemp['@type'].split('.')[sessionValTemp['@type'].split('.').length - 1];
                // parent.children = this.childGen(InputTypeVal, Object.entries(JSON.parse(Object.values(sessionStorage)[i])));
                console.log('Object.keys(sessionStorage)[i]): ', Object.keys(sessionStorage)[i]);
                const k = this.makeRootNode(
                    Object.keys(sessionStorage)[i], sessionValTemp,
                    InputTypeVal, JSON.parse(this.formValueMap.get(Object.keys(sessionStorage)[i]))
                );
                /*for (const [key, value] of Object.entries(JSON.parse(Object.values(sessionStorage)[i]))) {
                    let typeTemp: any = key.match(/\([^)]+\)/);
                    if (typeTemp === null) {
                        typeTemp = 'null';
                        parent.children.push({
                            name: key + ': ' + value,
                            pureName: key,
                            val: value,
                            style: InputTypeVal[key],
                            type: typeTemp
                        });
                    } else {
                        parent.children.push({
                            name: key + ': ' + value,
                            pureName: key,
                            val: value,
                            style: InputTypeVal[key],
                            type: typeTemp[0].toString()
                        });
                    }
                } */
                // this.nodes.push(parent);
                this.nodes.push(k);
            }
            this.flagReceive = false;   // finish resize ng-tree, turn it to false
        }
        this.storageLength = sessionStorage.length;
    }

    // edit whole sessionStorage, transmit information to create-component, it will transmit to generate-form-component
    onEditClick() {
        /*this.sessionStorageTemp = a;
        this.data.editSessionStorage(JSON.parse(this.sessionStorageTemp.toString()));*/
        console.log('edit Object: ', a);
        this.data.editSessionStorage(a);
    }

    closeMenu = () => {
        this.contextMenu = null;
    }

    // copy the contextNode's editVal
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
        } else {    // not a root Node
            this.sourceNode = this.contextMenu.node;

            /*
            const selBox = document.createElement('textarea');
            selBox.style.position = 'fixed';
            selBox.style.left = '0';
            selBox.style.top = '0';
            selBox.style.opacity = '0';
            selBox.value = this.contextMenu.node.data.val;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
            */

            // use clipboard EventListener send val to clipboard
            document.addEventListener('copy', (e: ClipboardEvent) => {
                e.clipboardData.setData('text/plain', (this.contextMenu.node.data.editVal));
                e.preventDefault();
                document.removeEventListener('copy', null);
            });
            document.execCommand('copy');

            this.doCut = true;
            this.closeMenu();
        }
    }

    // copy object, then add its formValue into Map
    copyObj = () => {
        if (!this.isRoot) {
            return false;
        }
        // this.sourceNode = this.contextMenu.node;
        this.doCut = false;
        const itemCopy = sessionStorage.getItem(this.contextMenu.node.data.pureName);
        const itemCopyJsog = JSON.parse(itemCopy);
        const temp = {};
        for (let [k, v] of Object.entries(itemCopyJsog )) {
            if (k === '@id') {
                v = v + '123';
            }
            temp[k] = v;
        }
        sessionStorage.setItem(this.contextMenu.node.data.pureName + '123', JSON.stringify(temp));  // need to set an unique seiral id
        const itemCopyFormValue = this.formValueMap.get(this.contextMenu.node.data.pureName);
        this.formValueMap.set(this.contextMenu.node.data.name + '123', itemCopyFormValue);
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

    // use to check show 'Delete Value', delete editValue, so check the editVal
    hasVal = () => {
        if (this.contextMenu.node.data.editVal === '') {
            return false;
        } else {
            return true;
        }
    }

    deleteObject = (node) => {
        sessionStorage.removeItem(node.data.name);
        this.closeMenu();
    }

    // simple version of stopEdit()
    deleteValue = (node) => {
        const temp = {};
        for (let [key, value] of Object.entries(JSON.parse(sessionStorage.getItem(node.parent.data.pureName)))) {
            if (key === node.data.pureName) {
                // edit for view & formVal
                node.data.name = node.data.pureName + ': ' + '';
                node.data.val = '';
                node.data.editVal = '';
                node.parent.data.formVal[node.data.pureName] = '';
                console.log('this.editNode.parent.data.formVal: ', node.parent.data.formVal);
                this.formValueMap.set(node.parent.data.pureName.toString(), JSON.stringify(node.parent.data.formVal));
                /*console.log('this.editNode.parent.data.formVal[this.editNode.data.pureName]: ',
                this.editNode.parent.data.formVal[this.editNode.data.pureName]);*/
                // edit for sessionStorage
                value = '';
            }
            temp[key] = value;
        }
        // sessionStorage.setItem(node.parent.data.name, JSON.stringify(temp));
        /*node.data.val = '';
        node.data.editVal = '';
        node.data.name = node.data.pureName + ': ' + node.data.val;

        node.parent.data.val[node.data.pureName] = '';
        node.parent.data.formVal[node.data.pureName] = '';*/

        this.formValueMap.set(node.parent.data.pureName, JSON.stringify(node.parent.data.formVal));

        let virtualRoot = node.parent;
        while (virtualRoot.parent !== null) {
            virtualRoot = virtualRoot.parent;
        }
        // console.log('this.javaStorageTypeMap: ', this.javaStorageTypeMap);
        for (let i = 1; i <= virtualRoot.data.children.length; i++) {
        for (const element of virtualRoot.data.children) {
            if (element.pureName.includes(i.toString())) {
            /*console.log('JSON.parse(this.InputTypeMap[element.formVal[@type]]): ',
            JSON.parse(this.InputTypeMap[element.formVal['@type']]));*/
            if (element.pureName === node.parent.data.pureName) {
                element.formVal = node.parent.data.formVal;
            } /*else {
                console.log('element.formVal: ', element.formVal);
                console.log('JSON.parse(this.javaStorageTypeMap[element.formVal[@type]]): ',
                    JSON.parse(this.javaStorageTypeMap[element.formVal['@type']]));
                const typeTemp = JSON.parse(this.javaStorageTypeMap[element.formVal['@type']]);
                let formValueTemp = this.CheckStrToNum(element.formVal);
                console.log('ValueTemp: ', formValueTemp);
                formValueTemp = this.jsogGen(formValueTemp, typeTemp);
                console.log('ValueTemp: ', formValueTemp);
                sessionStorage.setItem(element.pureName, JSON.stringify(formValueTemp));
            }*/
            console.log('element.pureName: ', element.pureName);
            const typeTemp = JSON.parse(this.javaStorageTypeMap[element.formVal['@type']]);
            let formValueTemp = this.CheckStrToNum(element.formVal);
            formValueTemp = this.jsogGen(formValueTemp, typeTemp);
            sessionStorage.setItem(element.pureName, JSON.stringify(formValueTemp));
        }
        }
    }

        // make tree to reload
        this.flagReceive = true;
        this.closeMenu();
    }

    // replace the value in sessionStorage directly, edit the name attr of ng-tree directly
    pasteValue = () => {
        if (!this.canPaste()) {
            alert('no value to paste!');
            this.closeMenu();
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
        // console.log('this.editNode.data.style: ', this.editNode.data.style);
        const temp = {};
        for (let [key, value] of Object.entries(
            JSON.parse(sessionStorage.getItem(this.editNode.parent.data.pureName)))) {
            if (key === this.editNode.data.pureName) {
                // edit for view & formVal
                this.editNode.data.name = this.editNode.data.pureName + ': ' + this.editNode.data.editVal;
                this.editNode.data.val = this.editNode.data.editVal;
                this.editNode.parent.data.formVal[this.editNode.data.pureName] = this.editNode.data.editVal;
                console.log('this.editNode.parent.data.formVal: ', this.editNode.parent.data.formVal);
                this.formValueMap.set(this.editNode.parent.data.pureName.toString(), JSON.stringify(this.editNode.parent.data.formVal));
                /*console.log('this.editNode.parent.data.formVal[this.editNode.data.pureName]: ',
                    this.editNode.parent.data.formVal[this.editNode.data.pureName]);*/
                // edit for sessionStorage
                value = this.editNode.data.editVal;
            }
            temp[key] = value;
        }
        // sessionStorage.setItem(this.editNode.parent.data.name, JSON.stringify(temp));
        // console.log('this.editNode.data.editVal: ', this.editNode.data.editVal);
        // console.log(this.jsogGen(this.editNode.parent.data.formVal, JSON.parse(this.javaStorageTypeMap[temp['@type']])));
        /*sessionStorage.setItem(
            this.editNode.parent.data.pureName,
            JSON.stringify(this.jsogGen(this.editNode.parent.data.formVal, JSON.parse(this.javaStorageTypeMap[temp['@type']])))
        );*/

        let virtualRoot = this.editNode.parent;
        while (virtualRoot.parent !== null) {
            virtualRoot = virtualRoot.parent;
        }
        // console.log('this.javaStorageTypeMap: ', this.javaStorageTypeMap);
        // reload in order, to make sure all elements been update.
        for (let i = 1; i <= virtualRoot.data.children.length; i++) {
            for (const element of virtualRoot.data.children) {
                if (element.pureName.includes(i.toString())) {
                    /*console.log('JSON.parse(this.InputTypeMap[element.formVal[@type]]): ',
                    JSON.parse(this.InputTypeMap[element.formVal['@type']]));*/
                    if (element.pureName === this.editNode.parent.data.pureName) {
                        element.formVal = this.editNode.parent.data.formVal;
                    } /*else {
                        console.log('element.formVal: ', element.formVal);
                        console.log('JSON.parse(this.javaStorageTypeMap[element.formVal[@type]]): ',
                            JSON.parse(this.javaStorageTypeMap[element.formVal['@type']]));
                        const typeTemp = JSON.parse(this.javaStorageTypeMap[element.formVal['@type']]);
                        let formValueTemp = this.CheckStrToNum(element.formVal);
                        console.log('ValueTemp: ', formValueTemp);
                        formValueTemp = this.jsogGen(formValueTemp, typeTemp);
                        console.log('ValueTemp: ', formValueTemp);
                        sessionStorage.setItem(element.pureName, JSON.stringify(formValueTemp));
                    }*/
                    const typeTemp = JSON.parse(this.javaStorageTypeMap[element.formVal['@type']]);
                    let formValueTemp = this.CheckStrToNum(element.formVal);
                    formValueTemp = this.jsogGen(formValueTemp, typeTemp);
                    sessionStorage.setItem(element.pureName, JSON.stringify(formValueTemp));
                }
            }
        }

        // make tree to reload
        this.flagReceive = true;
        this.editNode = null;

        /*
         * change log:
         * parse into jsog when store.
         * every ob contain other ob, need to check whether it had been used or not, then clear the map.
        */
        this.checkMap.clear();
    }

    preventDe($event) {
        $event.stopPropagation();
    }

    CheckStrToNum(input) {  // input = this.form_receive.value (Object)
        const className = input['@type'];
        const javaType = JSON.parse(this.javaStorageTypeMap[className]);
        for (const key in javaType) { // change string default value to number
            if (javaType[key] === 'byte' || javaType[key] === 'short' || javaType[key] === 'int' ||
                javaType[key] === 'long' || javaType[key] === 'float' || javaType[key] === 'double' ||
                javaType[key] === 'Byte' || javaType[key] === 'Short' || javaType[key] === 'Integer' ||
                javaType[key] === 'Long' || javaType[key] === 'Float' || javaType[key] === 'Double') {
                input[key] = +input[key];   // string to number
            }
        }
        return input;
    }

    jsogForSessionStorage(jsonInput: Object, typeCheck: Object) { // jsonInput(object): k-v pair of form, typeCheck: ob of outer ob's type
        // jsonInput-> { name: yang } typeCheck-> { age: long }
        // jsonInput-> { children:[p1, p2] } typeCheck-> { children: list PersonDemo }
        // console.log('jsonInput: ', jsonInput);
        const tempKey = Object.keys(jsonInput); //  age, children
        const tempVal = Object.values(jsonInput);  // 1, [p1, p2], [1, 2], ["1", "2"]
        const tempType = typeCheck[tempKey.toString()]; // long, list PersonDemo, list int, list string

        if (tempVal.toString() === '') {   // no value, put null
            return null;
        }
        if (tempType === 'byte' || tempType === 'short' || tempType === 'int' || tempType === 'long' // number, output directly
            || tempType === 'float' || tempType === 'double' || tempType === 'Byte' || tempType === 'Short'
            || tempType === 'Integer' || tempType === 'Long' || tempType === 'Float' || tempType === 'Double') {
            return +tempVal;
        } else if (tempType === 'boolean' || tempType === 'Boolean') {    // true & false
            if (tempVal.toString() === 'true') {
                return true;
            } else {
                return false;
            }
        } else {    // list or string
            const tempTypeArray = tempType.split(' ');  // split the type-value to array
            if (tempTypeArray[0] === 'List' || tempTypeArray[0].includes('[]')) { // list or array variable in java, use json list store
                const tempListVal = [];
                const tempSingleVal = tempVal.toString().split(', ');   // value split with ', '
                if ((tempSingleVal.length === 1) && (tempSingleVal[0] === '')) {
                    return tempListVal; // list have nothing, return empty list
                }
                for (let i = 0; i < tempSingleVal.length; i++) {
                    if (sessionStorage.getItem(tempSingleVal[i]) !== null) {   // sessionStorage has it. [p1, p2] list persondemo
                        if (this.checkMap.has(tempSingleVal[i])) { // used, add as @ref
                            const temp = {};
                            const refType = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@type'];
                            // temp['@ref'] = this.idMap.get(tempSingleVal[i]);
                            temp['@ref'] = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@id'];
                            temp['@type'] = refType;
                            tempListVal[i] = temp;
                            // console.log('tempListVal[i]: ', tempListVal[i]);
                        } else {    // haven't used it yet, set checkMap to true, and write it
                            this.checkMap.set(tempSingleVal[i], true);
                            // const typein = this.storageTypeMap.get(tempSingleVal[i]);
                            // const typein = JSON.parse(this.javaStorageTypeMap[tempSingleVal[i]]);
                            // sessionStorage already been jsog, use it directly
                            tempListVal[i] = JSON.parse(sessionStorage.getItem(tempSingleVal[i]));
                            // tempListVal[i] = this.jsogGen(JSON.parse(sessionStorage.getItem(tempSingleVal[i])), typein);
                            // console.log('checkMap', this.checkMap);
                        }
                    } else if (tempTypeArray[1] === 'byte' || tempTypeArray[1] === 'short' || tempTypeArray[1] === 'int'
                        || tempTypeArray[1] === 'long' || tempTypeArray[1] === 'float' || tempTypeArray[1] === 'double'
                        || tempTypeArray[1] === 'Byte' || tempTypeArray[1] === 'Short' || tempTypeArray[1] === 'Integer'
                        || tempTypeArray[1] === 'Long' || tempTypeArray[1] === 'Float' || tempTypeArray[1] === 'Double') {
                        // [1, 2] list int, change it to number
                        tempListVal[i] = +tempSingleVal[i];
                    } else if (tempTypeArray[1] === 'Boolean' || tempTypeArray[1] === 'boolean') {    // [t, f, t, f] list boolean
                        console.log('tempSingleVal.toString: ', tempSingleVal[i].toString());
                        if (tempSingleVal[i].toString() === 'true') {
                            tempListVal[i] = true;
                        } else {
                            tempListVal[i] = false;
                        }
                    } else {    // ["1", "2"] list string
                        tempListVal[i] = tempSingleVal[i];
                        // console.log('tempListVal: ', tempListVal);
                    }
                }
                console.log('tempListVal: ', tempListVal);
                return tempListVal;
            } else {    // string represent object
                const StrTempVal = tempVal.toString();
                if (sessionStorage.getItem(StrTempVal) !== null) {   // sessionStorage has it.
                    let reVal: any;
                    if (this.checkMap.has(StrTempVal)) { // used, add as @ref
                        const temp = {};
                        const refType = JSON.parse(sessionStorage.getItem(StrTempVal))['@type'];
                        temp['@ref'] = this.idMap.get(StrTempVal);
                        temp['@type'] = refType;
                        reVal = temp;
                    } else {    // haven't used it yet, set checkMap to true, and write it
                        this.checkMap.set(StrTempVal, true);
                        // const typein = this.storageTypeMap.get(StrTempVal);
                        // this.storageTypeMap.get(StrTempVal);
                        const typein = JSON.parse(this.javaStorageTypeMap[JSON.parse(sessionStorage.getItem(StrTempVal))['@type']]);
                        console.log('typein: ', typein);
                        reVal = this.jsogGen(JSON.parse(sessionStorage.getItem(StrTempVal)), typein);
                        // console.log('checkMap', this.checkMap);
                    }
                    // console.log('reVal: ', reVal);
                    return reVal;
                } else {
                    return StrTempVal;
                }
            }
        }
    }

    // formInput = this.form_receive.value (object); typein: object of outer type from storageTypeMap
    jsogGen(formInput: any, typein: Object) {
        const jsogS = {};

        for (let i = 0; i < Object.keys(formInput).length; i++) {
            const tempKey = Object.keys(formInput)[i];
            if ((tempKey !== '@id') && (tempKey !== '@type')) {
                const single_KV_pair = {};
                single_KV_pair[tempKey] = formInput[tempKey];
                formInput[tempKey] = this.jsogForSessionStorage(single_KV_pair, typein);
            }
            jsogS[tempKey] = formInput[tempKey];
        }
        return jsogS;
    }

    outputObject(node) {
        if (node.isRoot) {
            // output form value to server ngFormOutput
            this.ngTreeService.ouputObject(sessionStorage.getItem(node.data.pureName)).subscribe(response => {
                console.log('output', response);
            });
        }
        this.closeMenu();
    }

}
