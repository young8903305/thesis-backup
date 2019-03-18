(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/angular-tree/angular-tree.component.css":
/*!*********************************************************!*\
  !*** ./src/app/angular-tree/angular-tree.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".menu {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.9);\n  padding: 7px;\n  border-radius: 5px;\n  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\nli {\n  padding: 7px;\n  border-radius: 3px;\n  cursor: pointer;\n}\n\nli:hover {\n  background-color: aliceblue;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYW5ndWxhci10cmVlL2FuZ3VsYXItdHJlZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLG9DQUFvQztFQUNwQyxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsU0FBUztBQUNYOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCIiwiZmlsZSI6InNyYy9hcHAvYW5ndWxhci10cmVlL2FuZ3VsYXItdHJlZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgcGFkZGluZzogN3B4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJveC1zaGFkb3c6IDAgMCAycHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxudWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbmxpIHtcbiAgcGFkZGluZzogN3B4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxubGk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhbGljZWJsdWU7XG59Il19 */"

/***/ }),

/***/ "./src/app/angular-tree/angular-tree.component.html":
/*!**********************************************************!*\
  !*** ./src/app/angular-tree/angular-tree.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tree-root [nodes]=\"nodes\" [options]=\"options\" [focused]=\"true\" draggable>\n    <ng-template #treeNodeTemplate let-node=\"node\">\n        <span *ngIf=\"node === editNode\">{{ node.data.pureName }}\n            <input *ngIf=\" (node.data.style!=='textarea') \" type={{node.data.style}} autofocus [(ngModel)]=\"node.data.val\" (blur)=\"stopEdit()\" (keyup.enter)=\"stopEdit()\" />\n            <textarea *ngIf=\" node.data.style === 'textarea' \" autofocus [(ngModel)]=\"node.data.val\" (blur)=\"stopEdit()\" (keyup.enter)=\"stopEdit()\"></textarea>\n        </span>\n        <span *ngIf=\"node !== editNode\">{{ node.data.name }}</span>\n    </ng-template>\n</tree-root>\n\n<button *ngIf=\"storageLength!==0\" (click)=\"onEditClick()\">Edit Object</button>\n\n<div class=\"menu\" *ngIf=\"contextMenu\" [style.left.px]=\"contextMenu.x\" [style.top.px]=\"contextMenu.y\">\n  <div *ngIf=\"notRoot()\">Menu for {{ contextMenu.node.data.pureName }}</div>\n  <div *ngIf=\"isRoot()\">Menu for {{ contextMenu.node.data.name }}</div>\n  <hr>\n  <ul>\n    <li (click)=\"editValue()\"><a [style.opacity]=\"notRoot() && 1 || 0.3\">Edit value</a></li>\n    <li (click)=\"copyValue()\"><a [style.opacity]=\"hasVal() && notRoot() && 1 || 0.3\">Copy value</a></li>\n    <li (click)=\"copyObj()\"><a [style.opacity]=\"isRoot() && 1 || 0.3\">Copy object</a></li>\n    <li (click)=\"pasteValue()\"><a [style.opacity]=\"notRoot() && canPaste() && 1 || 0.3\">Paste value</a></li>\n    <li (click)=\"deleteValue(contextMenu.node)\"><a [style.opacity]=\"hasVal() && notRoot() && 1 || 0.3\">Delete value</a></li>\n    <li (click)=\"deleteObject(contextMenu.node)\"><a [style.opacity]=\"isRoot() && 1 || 0.3\">Delete object</a></li>\n  </ul>\n</div>\n\n<script>\n</script>"

/***/ }),

/***/ "./src/app/angular-tree/angular-tree.component.ts":
/*!********************************************************!*\
  !*** ./src/app/angular-tree/angular-tree.component.ts ***!
  \********************************************************/
/*! exports provided: AngularTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularTreeComponent", function() { return AngularTreeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
/* harmony import */ var _form_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../form-data.service */ "./src/app/form-data.service.ts");
/* harmony import */ var _angular_tree_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./angular-tree.service */ "./src/app/angular-tree/angular-tree.service.ts");





var a;
var AngularTreeComponent = /** @class */ (function () {
    function AngularTreeComponent(data, ngTreeService) {
        var _this = this;
        this.data = data;
        this.ngTreeService = ngTreeService;
        this.storageLength = 0;
        this.contextMenu = null;
        this.editNode = null;
        this.sourceNode = null;
        this.doCut = false;
        this.finishPaste = true;
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
        this.options = {
            actionMapping: {
                mouse: {
                    contextMenu: function (treeModel, treeNode, e) {
                        e.preventDefault();
                        if (_this.contextMenu && treeNode === _this.contextMenu.node) {
                            return _this.closeMenu();
                        }
                        if ((treeNode.data.pureName !== '@type') && (treeNode.data.pureName !== '@id')) {
                            _this.contextMenu = {
                                node: treeNode,
                                x: e.pageX,
                                y: e.pageY
                            };
                            console.log('treeNode.data: ', treeNode.data);
                        }
                    },
                    click: function (treeModel, treeNode, e) {
                        e.preventDefault();
                        if ((treeNode.data.pureName !== '@id' && treeNode.data.pureName !== '@type') || treeNode.isRoot) {
                            angular_tree_component__WEBPACK_IMPORTED_MODULE_2__["TREE_ACTIONS"].TOGGLE_ACTIVE(treeModel, treeNode, e);
                        }
                        _this.closeMenu();
                        if (treeNode.isRoot) { // root node to form
                            // TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
                            var xhttp_1 = new XMLHttpRequest();
                            xhttp_1.onreadystatechange = function () {
                                if (this.readyState === 4 && this.status === 200) {
                                    a = xhttp_1.responseText; // universal variable for catch the response, then form the sessionStorage
                                }
                            };
                            xhttp_1.open('POST', '/ngEditSessionStorage', true);
                            xhttp_1.send(sessionStorage.getItem(treeNode.data.name));
                        }
                    },
                    drag: function (treeModel, treeNode, e) {
                        if (treeNode.isRoot) {
                            _this.data.passNodeVal(treeNode.data.name);
                        }
                        else {
                            _this.data.passNodeVal(treeNode.data.val);
                        }
                    }
                }
            },
            allowDrag: function (node) {
                if (node.data.pureName !== '@id' && node.data.pureName !== '@type') {
                    return true;
                }
            },
            allowDrop: false
            // allowDrop: (node) => false
        };
        this.closeMenu = function () {
            _this.contextMenu = null;
        };
        this.copyValue = function () {
            if (_this.isRoot()) { // for root node, copy its name to represent the whole object
                console.log('this.contextMenu.node.data.name ', _this.contextMenu.node.data.name);
                document.addEventListener('copy', function (e) {
                    e.clipboardData.setData('text/plain', (_this.contextMenu.node.data.name));
                    e.preventDefault();
                    document.removeEventListener('copy', null);
                });
                document.execCommand('copy');
                _this.doCut = true;
                _this.closeMenu();
            }
            else {
                _this.sourceNode = _this.contextMenu.node;
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
                document.addEventListener('copy', function (e) {
                    e.clipboardData.setData('text/plain', (_this.contextMenu.node.data.val));
                    e.preventDefault();
                    document.removeEventListener('copy', null);
                });
                document.execCommand('copy');
                _this.doCut = true;
                _this.closeMenu();
            }
        };
        this.copyObj = function () {
            if (!_this.isRoot) {
                return false;
            }
            // this.sourceNode = this.contextMenu.node;
            _this.doCut = false;
            var itemCopy = sessionStorage.getItem(_this.contextMenu.node.data.name);
            var itemCopyJson = JSON.parse(itemCopy);
            var temp = {};
            for (var _i = 0, _a = Object.entries(itemCopyJson); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (k === '@id') {
                    v = v + '123';
                }
                temp[k] = v;
            }
            sessionStorage.setItem(_this.contextMenu.node.data.name + '123', JSON.stringify(temp)); // need to set an unique seiral id
            _this.closeMenu();
        };
        this.isRoot = function () {
            if (_this.contextMenu.node.isRoot) {
                return true;
            }
            return false;
        };
        this.notRoot = function () {
            if (_this.contextMenu.node.isRoot) {
                return false;
            }
            return true;
        };
        this.hasVal = function () {
            if (_this.contextMenu.node.data.val === '') {
                return false;
            }
            else {
                return true;
            }
        };
        this.deleteObject = function (node) {
            sessionStorage.removeItem(node.data.name);
            _this.closeMenu();
        };
        this.deleteValue = function (node) {
            var temp = {};
            for (var _i = 0, _a = Object.entries(JSON.parse(sessionStorage.getItem(node.parent.data.name))); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (key === node.data.pureName) {
                    value = '';
                }
                temp[key] = value;
            }
            sessionStorage.setItem(node.parent.data.name, JSON.stringify(temp));
            node.data.val = '';
            node.data.name = node.data.pureName + ': ' + node.data.val;
            _this.closeMenu();
        };
        // replace the value in sessionStorage directly, edit the name attr of ng-tree directly
        this.pasteValue = function () {
            if (!_this.canPaste()) {
                return;
            }
            if (_this.doCut) {
                var _a = Object.entries(_this.contextMenu.node.parent.data.children[1]), name_1 = _a[0], pureName = _a[1], val = _a[2]; // index 1: get @type val
                var _b = Object.entries(_this.sourceNode.parent.data.children[1]), sourceName = _b[0], sourcePureName = _b[1], sourceVal = _b[2];
                if (val[1].toString() === sourceVal[1].toString()) {
                    if (_this.contextMenu.node.data.pureName === _this.sourceNode.data.pureName) {
                        _this.contextMenu.node.data.val = _this.sourceNode.data.val; // node's val
                        // node's view
                        _this.contextMenu.node.data.name = _this.contextMenu.node.data.pureName + ': ' + _this.contextMenu.node.data.val;
                        var temp = {};
                        // console.log('sessionStorage.getItem(this.contextMenu.node.parent.data.name: ',
                        // sessionStorage.getItem(this.contextMenu.node.parent.data.name));
                        for (var _i = 0, _c = Object.entries(JSON.parse(sessionStorage.getItem(_this.contextMenu.node.parent.data.name))); _i < _c.length; _i++) {
                            var _d = _c[_i], key = _d[0], value = _d[1];
                            if (key === _this.contextMenu.node.data.pureName) {
                                value = _this.sourceNode.data.val;
                            }
                            temp[key] = value;
                        }
                        sessionStorage.setItem(_this.contextMenu.node.parent.data.name, JSON.stringify(temp));
                        _this.doCut = false;
                        _this.sourceNode = null;
                    }
                    else {
                        alert('not the same attribute');
                    }
                }
                else {
                    alert('not the same type object');
                }
            }
            _this.closeMenu();
        };
        this.canPaste = function () {
            if (!_this.sourceNode) {
                return false;
            }
            return _this.sourceNode.treeModel.canMoveNode(_this.sourceNode, { parent: _this.contextMenu.node, index: 0 });
        };
        this.ngTreeService.getType().subscribe(function (response) {
            _this.typeMap = response;
        });
    }
    AngularTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentFlag.subscribe(function (flagInput) { return _this.flagReceive = flagInput; });
    };
    AngularTreeComponent.prototype.ngDoCheck = function () {
        if (this.storageLength !== sessionStorage.length || this.flagReceive === true) {
            // console.log('length: ', this.temp);
            this.nodes = [];
            for (var i = 0; i < sessionStorage.length; i++) {
                var parent_1 = {
                    name: '',
                    'children': []
                };
                parent_1['name'] = Object.keys(sessionStorage)[i];
                var sessionValTemp = JSON.parse(Object.values(sessionStorage)[i]);
                var typeVal = JSON.parse(this.typeMap[sessionValTemp['@type']]);
                for (var _i = 0, _a = Object.entries(JSON.parse(Object.values(sessionStorage)[i])); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    parent_1.children.push({
                        name: key + ': ' + value,
                        pureName: key,
                        val: value,
                        style: typeVal[key]
                    });
                }
                this.nodes.push(parent_1);
            }
            this.flagReceive = false; // finish resize ng-tree, turn it to false
        }
        this.storageLength = sessionStorage.length;
    };
    AngularTreeComponent.prototype.onEditClick = function () {
        this.sessionStorageTemp = a;
        this.data.editSessionStorage(JSON.parse(this.sessionStorageTemp.toString()));
    };
    AngularTreeComponent.prototype.editValue = function () {
        this.editNode = this.contextMenu.node;
        this.closeMenu();
    };
    AngularTreeComponent.prototype.stopEdit = function () {
        console.log('this.editNode.data.style: ', this.editNode.data.style);
        var temp = {};
        for (var _i = 0, _a = Object.entries(JSON.parse(sessionStorage.getItem(this.editNode.parent.data.name))); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key === this.editNode.data.pureName) {
                this.editNode.data.name = this.editNode.data.pureName + ': ' + this.editNode.data.val;
                value = this.editNode.data.val;
            }
            temp[key] = value;
        }
        sessionStorage.setItem(this.editNode.parent.data.name, JSON.stringify(temp));
        this.editNode = null;
    };
    AngularTreeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-angular-tree',
            template: __webpack_require__(/*! ./angular-tree.component.html */ "./src/app/angular-tree/angular-tree.component.html"),
            styles: [__webpack_require__(/*! ./angular-tree.component.css */ "./src/app/angular-tree/angular-tree.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_form_data_service__WEBPACK_IMPORTED_MODULE_3__["FormDataService"],
            _angular_tree_service__WEBPACK_IMPORTED_MODULE_4__["AngularTreeService"]])
    ], AngularTreeComponent);
    return AngularTreeComponent;
}());



/***/ }),

/***/ "./src/app/angular-tree/angular-tree.service.ts":
/*!******************************************************!*\
  !*** ./src/app/angular-tree/angular-tree.service.ts ***!
  \******************************************************/
/*! exports provided: AngularTreeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularTreeService", function() { return AngularTreeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



/*@Injectable({
    providedIn: 'root'
})*/
var AngularTreeService = /** @class */ (function () {
    function AngularTreeService(http) {
        this.http = http;
        this.typeUrl = '/ngType';
    }
    AngularTreeService.prototype.getType = function () {
        return this.http.get(this.typeUrl);
    };
    AngularTreeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AngularTreeService);
    return AngularTreeService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _create_create_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create/create.component */ "./src/app/create/create.component.ts");
/* harmony import */ var _edit_edit_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit/edit.component */ "./src/app/edit/edit.component.ts");
/* harmony import */ var _uploader_uploader_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uploader/uploader.component */ "./src/app/uploader/uploader.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contextmenu/contextmenu.component */ "./src/app/contextmenu/contextmenu.component.ts");








var routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'create', component: _create_create_component__WEBPACK_IMPORTED_MODULE_3__["CreateComponent"] },
    {
        path: 'edit',
        component: _edit_edit_component__WEBPACK_IMPORTED_MODULE_4__["EditComponent"],
    },
    { path: 'uploader', component: _uploader_uploader_component__WEBPACK_IMPORTED_MODULE_5__["UploaderComponent"] },
    { path: 'contextmenu', component: _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_7__["ContextmenuComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
            providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_6__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_6__["HashLocationStrategy"] }]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1 {\n  font-size: 1.2em;\n  color: #999;\n  margin-bottom: 0;\n}\n\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0;\n}\n\nnav a {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px;\n}\n\nnav a:visited,\na:link {\n  color: #607d8b;\n}\n\nnav a:hover {\n  color: #039be5;\n  background-color: #cfd8dc;\n}\n\nnav a.active {\n  color: #039be5;\n}\n\n.main {\n  margin-left: 200px;\n  /* Same as the width of the sidenav */\n}\n\n.sidenav div:hover {\n  color: #f1f1f1;\n}\n\n.sidenav div {\n  padding: 6px 6px 6px 32px;\n  text-decoration: none;\n  font-size: 16px;\n  color: #818181;\n  display: block;\n}\n\n.sidenav {\n  height: 100%;\n  width: 200px;\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: #111;\n  overflow-x: hidden;\n  padding-top: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxhQUFhO0VBQ2IsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBOztFQUVFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxQ0FBcUM7QUFDdkM7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsY0FBYztFQUNkLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGVBQWU7RUFDZixVQUFVO0VBQ1YsTUFBTTtFQUNOLE9BQU87RUFDUCxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDEge1xuICBmb250LXNpemU6IDEuMmVtO1xuICBjb2xvcjogIzk5OTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaDIge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luLXRvcDogMDtcbiAgcGFkZGluZy10b3A6IDA7XG59XG5cbm5hdiBhIHtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbm5hdiBhOnZpc2l0ZWQsXG5hOmxpbmsge1xuICBjb2xvcjogIzYwN2Q4Yjtcbn1cblxubmF2IGE6aG92ZXIge1xuICBjb2xvcjogIzAzOWJlNTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcbn1cblxubmF2IGEuYWN0aXZlIHtcbiAgY29sb3I6ICMwMzliZTU7XG59XG5cbi5tYWluIHtcbiAgbWFyZ2luLWxlZnQ6IDIwMHB4O1xuICAvKiBTYW1lIGFzIHRoZSB3aWR0aCBvZiB0aGUgc2lkZW5hdiAqL1xufVxuXG4uc2lkZW5hdiBkaXY6aG92ZXIge1xuICBjb2xvcjogI2YxZjFmMTtcbn1cblxuLnNpZGVuYXYgZGl2IHtcbiAgcGFkZGluZzogNnB4IDZweCA2cHggMzJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiAjODE4MTgxO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLnNpZGVuYXYge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAyMDBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTE7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<head>\n    <title>Frontend</title>\n\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n</head>\n\n<div class=\"sidenav\">\n    <nav >\n        <!--<a routerLink=\"/edit\" (click)=\"noWelcome()\">Edit</a>\n        <br>-->\n        <a routerLink=\"/create\">Create</a>\n        <br>\n        <a routerLink=\"/\" (click)=\"gotoindex()\">Home</a>\n    </nav>\n</div>\n\n<div class=\"main\">\n    <h1>Welcome!!</h1>\n    <router-outlet></router-outlet>\n<!--\n    <div ng-controller='myCtrl'>\n        <div js-tree=\"treeConfig\" ng-model=\"treeData\" should-apply=\"ignoreModelChanges()\" tree=\"treeInstance\" tree-events=\"ready:readyCB;create_node:createNodeCB\"></div>\n    </div>\n-->\n\n<!--<app-angular-tree (sessionStorageEditInfo)=\"childEventClicked($event)\"></app-angular-tree>-->\n    <app-angular-tree></app-angular-tree>\n<!--<app-contextmenu></app-contextmenu>-->\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.service */ "./src/app/app.service.ts");




// declare let $: any; // 當然 let 也可以
var AppComponent = /** @class */ (function () {
    function AppComponent(router, appService) {
        this.router = router;
        this.appService = appService;
        this.title = 'ng-test';
        this.pathValue = '';
        this.welcomeMessage = true;
        this.dataClassShow = false;
        sessionStorage.clear();
    }
    AppComponent.prototype.gotoindex = function () {
        this.welcomeMessage = true;
        sessionStorage.clear();
        this.router.navigate(['/']);
    };
    AppComponent.prototype.ngOnChanges = function () {
    };
    AppComponent.prototype.childEventClicked = function (event) {
        this.clickedEvent = event;
        console.log('app print: ', this.clickedEvent);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            providers: [_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]],
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _edit_edit_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./edit/edit.component */ "./src/app/edit/edit.component.ts");
/* harmony import */ var _create_create_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create/create.component */ "./src/app/create/create.component.ts");
/* harmony import */ var _uploader_uploader_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./uploader/uploader.component */ "./src/app/uploader/uploader.component.ts");
/* harmony import */ var _generate_form_generate_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./generate-form/generate-form.component */ "./src/app/generate-form/generate-form.component.ts");
/* harmony import */ var _jstree_jstree_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./jstree/jstree.component */ "./src/app/jstree/jstree.component.ts");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
/* harmony import */ var _angular_tree_angular_tree_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./angular-tree/angular-tree.component */ "./src/app/angular-tree/angular-tree.component.ts");
/* harmony import */ var _form_data_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./form-data.service */ "./src/app/form-data.service.ts");
/* harmony import */ var _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./contextmenu/contextmenu.component */ "./src/app/contextmenu/contextmenu.component.ts");
/* harmony import */ var ng_drag_drop__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-drag-drop */ "./node_modules/ng-drag-drop/index.js");
/* harmony import */ var ng_drag_drop__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(ng_drag_drop__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _angular_tree_angular_tree_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./angular-tree/angular-tree.service */ "./src/app/angular-tree/angular-tree.service.ts");


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _edit_edit_component__WEBPACK_IMPORTED_MODULE_7__["EditComponent"],
                _create_create_component__WEBPACK_IMPORTED_MODULE_8__["CreateComponent"],
                _uploader_uploader_component__WEBPACK_IMPORTED_MODULE_9__["UploaderComponent"],
                _generate_form_generate_form_component__WEBPACK_IMPORTED_MODULE_10__["GenerateFormComponent"],
                _jstree_jstree_component__WEBPACK_IMPORTED_MODULE_11__["JstreeComponent"],
                _angular_tree_angular_tree_component__WEBPACK_IMPORTED_MODULE_13__["AngularTreeComponent"],
                _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_15__["ContextmenuComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                angular_tree_component__WEBPACK_IMPORTED_MODULE_12__["TreeModule"].forRoot(),
                ng_drag_drop__WEBPACK_IMPORTED_MODULE_16__["NgDragDropModule"].forRoot(),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
            ],
            providers: [
                _form_data_service__WEBPACK_IMPORTED_MODULE_14__["FormDataService"],
                _angular_tree_angular_tree_service__WEBPACK_IMPORTED_MODULE_17__["AngularTreeService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.service.ts":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



/*@Injectable({
  providedIn: 'root'
})*/
var AppService = /** @class */ (function () {
    function AppService(http) {
        this.http = http;
    }
    AppService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./src/app/contextmenu/contextmenu.component.css":
/*!*******************************************************!*\
  !*** ./src/app/contextmenu/contextmenu.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".menu {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.9);\n  padding: 7px;\n  border-radius: 5px;\n  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\nli {\n  padding: 7px;\n  border-radius: 3px;\n  cursor: pointer;\n}\n\nli:hover {\n  background-color: aliceblue;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGV4dG1lbnUvY29udGV4dG1lbnUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixvQ0FBb0M7RUFDcEMsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3QiIsImZpbGUiOiJzcmMvYXBwL2NvbnRleHRtZW51L2NvbnRleHRtZW51LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xuICBwYWRkaW5nOiA3cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm94LXNoYWRvdzogMCAwIDJweCAycHggcmdiYSgwLCAwLCAwLCAwLjIpO1xufVxuXG51bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxubGkge1xuICBwYWRkaW5nOiA3cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5saTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFsaWNlYmx1ZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/contextmenu/contextmenu.component.html":
/*!********************************************************!*\
  !*** ./src/app/contextmenu/contextmenu.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tree-root [focused]=\"true\" [options]=\"options\" [nodes]=\"nodes\">\n  <ng-template #treeNodeTemplate let-node=\"node\">\n    <span *ngIf=\"node === editNode\">\n      <input autofocus [(ngModel)]=\"node.data.name\" (blur)=\"stopEdit()\" (keyup.enter)=\"stopEdit()\" />\n    </span>\n    <span *ngIf=\"node !== editNode\">{{ node.data.name }}</span>\n  </ng-template>\n</tree-root>\n<div class=\"menu\" *ngIf=\"contextMenu\" [style.left.px]=\"contextMenu.x\" [style.top.px]=\"contextMenu.y\">\n  <div>Menu for {{ contextMenu.node.data.name }}</div>\n  <hr>\n  <ul>\n    <li (click)=\"edit()\"><a>Edit</a></li>\n    <li (click)=\"copy()\"><a>Copy</a></li>\n    <li (click)=\"cut()\"><a>Cut</a></li>\n    <li (click)=\"paste()\"><a [style.opacity]=\"canPaste() && 1 || 0.3\">Paste</a></li>\n  </ul>\n</div>\n<br>\n<p>Keys:</p>\ndown | up | left | right | space | enter"

/***/ }),

/***/ "./src/app/contextmenu/contextmenu.component.ts":
/*!******************************************************!*\
  !*** ./src/app/contextmenu/contextmenu.component.ts ***!
  \******************************************************/
/*! exports provided: ContextmenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextmenuComponent", function() { return ContextmenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");



var ContextmenuComponent = /** @class */ (function () {
    function ContextmenuComponent() {
        var _this = this;
        this.contextMenu = null;
        this.sourceNode = null;
        this.editNode = null;
        this.doCut = false;
        this.nodes = [
            {
                name: 'root1',
                children: [
                    { name: 'child1' },
                    { name: 'child2' }
                ]
            },
            {
                name: 'root2',
                children: [
                    { name: 'child2.1', children: [] },
                    { name: 'child2.2', children: [
                            { name: 'grandchild2.2.1' }
                        ] }
                ]
            },
            { name: 'root3' },
            { name: 'root4', children: [] },
            { name: 'root5', children: null }
        ];
        this.options = {
            actionMapping: {
                mouse: {
                    contextMenu: function (treeModel, treeNode, e) {
                        e.preventDefault();
                        if (_this.contextMenu && treeNode === _this.contextMenu.node) {
                            return _this.closeMenu();
                        }
                        _this.contextMenu = {
                            node: treeNode,
                            x: e.pageX,
                            y: e.pageY
                        };
                    },
                    click: function (treeModel, treeNode, e) {
                        _this.closeMenu();
                        angular_tree_component__WEBPACK_IMPORTED_MODULE_2__["TREE_ACTIONS"].TOGGLE_ACTIVE(treeModel, treeNode, e);
                    }
                }
            }
        };
        this.closeMenu = function () {
            _this.contextMenu = null;
        };
        this.edit = function () {
            _this.editNode = _this.contextMenu.node;
            _this.closeMenu();
        };
        this.stopEdit = function () {
            console.log('this.editNode: ', _this.editNode.data.name);
            _this.editNode = null;
        };
        this.copy = function () {
            _this.sourceNode = _this.contextMenu.node;
            _this.doCut = false;
            _this.closeMenu();
        };
        this.cut = function () {
            _this.sourceNode = _this.contextMenu.node;
            _this.doCut = true;
            _this.closeMenu();
        };
        this.paste = function () {
            if (!_this.canPaste()) {
                return;
            }
            _this.doCut
                ? _this.sourceNode.treeModel.moveNode(_this.sourceNode, { parent: _this.contextMenu.node, index: 0 })
                : _this.sourceNode.treeModel.copyNode(_this.sourceNode, { parent: _this.contextMenu.node, index: 0 });
            _this.sourceNode = null;
            _this.closeMenu();
        };
        this.canPaste = function () {
            if (!_this.sourceNode) {
                return false;
            }
            return _this.sourceNode.treeModel.canMoveNode(_this.sourceNode, { parent: _this.contextMenu.node, index: 0 });
        };
    }
    ContextmenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contextmenu',
            template: __webpack_require__(/*! ./contextmenu.component.html */ "./src/app/contextmenu/contextmenu.component.html"),
            styles: [__webpack_require__(/*! ./contextmenu.component.css */ "./src/app/contextmenu/contextmenu.component.css")]
        })
    ], ContextmenuComponent);
    return ContextmenuComponent;
}());

function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}


/***/ }),

/***/ "./src/app/create/create.component.css":
/*!*********************************************!*\
  !*** ./src/app/create/create.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sidenav div:hover {\n  color: #f1f1f1;\n}\n\n.sidenav div {\n  padding: 6px 6px 6px 32px;\n  text-decoration: none;\n  font-size: 25px;\n  color: #818181;\n  display: block;\n}\n\n.sidenav {\n  height: 100%;\n  width: 200px;\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: #111;\n  overflow-x: hidden;\n  padding-top: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLGNBQWM7RUFDZCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixlQUFlO0VBQ2YsVUFBVTtFQUNWLE1BQU07RUFDTixPQUFPO0VBQ1Asc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2lkZW5hdiBkaXY6aG92ZXIge1xuICBjb2xvcjogI2YxZjFmMTtcbn1cblxuLnNpZGVuYXYgZGl2IHtcbiAgcGFkZGluZzogNnB4IDZweCA2cHggMzJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXNpemU6IDI1cHg7XG4gIGNvbG9yOiAjODE4MTgxO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLnNpZGVuYXYge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAyMDBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTE7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/create/create.component.html":
/*!**********************************************!*\
  !*** ./src/app/create/create.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <ng-container *ngIf=\"dataClassShow\"> -->\n  <button *ngFor=\"let item of dataClassName\" (click)=\"postClass(item)\">{{ item }}</button>\n  <br>\n  <br>\n<app-generate-form [generate_form_receive]=\"receive\"></app-generate-form>\n<!-- </ng-container>> -->"

/***/ }),

/***/ "./src/app/create/create.component.ts":
/*!********************************************!*\
  !*** ./src/app/create/create.component.ts ***!
  \********************************************/
/*! exports provided: CreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateComponent", function() { return CreateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _create_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create.service */ "./src/app/create/create.service.ts");
/* harmony import */ var _form_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../form-data.service */ "./src/app/form-data.service.ts");




var CreateComponent = /** @class */ (function () {
    function CreateComponent(createService, data) {
        var _this = this;
        this.createService = createService;
        this.data = data;
        this.createService.getClassName().subscribe(function (response) {
            _this.dataClassName = Object.values(response);
        });
    }
    CreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentStorage.subscribe(function (storageIn) { return _this.receive = storageIn; });
    };
    /* if user choose the different class, re-get from the server, and pass to the generate-form component
     * item: the object which user clicked, { name: classname }
     */
    CreateComponent.prototype.postClass = function (item) {
        var _this = this;
        var obItem = { 'name': item };
        console.log(obItem);
        this.createService.postClass(obItem).subscribe(function (response) {
            console.log('response: ', response);
            _this.receive = response.body; // [] consist of three object from server： {defaultValue}, {styleNode}, {typeNode}
            console.log('receive.body: ', _this.receive);
        });
    };
    CreateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-create',
            template: __webpack_require__(/*! ./create.component.html */ "./src/app/create/create.component.html"),
            providers: [_create_service__WEBPACK_IMPORTED_MODULE_2__["CreateService"]],
            styles: [__webpack_require__(/*! ./create.component.css */ "./src/app/create/create.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_create_service__WEBPACK_IMPORTED_MODULE_2__["CreateService"],
            _form_data_service__WEBPACK_IMPORTED_MODULE_3__["FormDataService"]])
    ], CreateComponent);
    return CreateComponent;
}());



/***/ }),

/***/ "./src/app/create/create.service.ts":
/*!******************************************!*\
  !*** ./src/app/create/create.service.ts ***!
  \******************************************/
/*! exports provided: CreateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateService", function() { return CreateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



/*@Injectable({
  providedIn: 'root'
})*/
var CreateService = /** @class */ (function () {
    function CreateService(http) {
        this.http = http;
        this.createUrl = '/ngClassNames';
        this.sendUrl = '/ngNameCreateForm';
    }
    CreateService.prototype.getClassName = function () {
        return this.http.get(this.createUrl);
    };
    CreateService.prototype.postClass = function (input) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'text/plain' });
        return this.http.post(this.sendUrl, input, { headers: httpHeaders, observe: 'response' });
    };
    CreateService.prototype.ngOnInit = function () {
    };
    CreateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], CreateService);
    return CreateService;
}());



/***/ }),

/***/ "./src/app/edit/edit.component.css":
/*!*****************************************!*\
  !*** ./src/app/edit/edit.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* ProfileEditorComponent's private CSS styles */\n:host {\n  display: flex;\n  flex-direction: column;\n  padding-top: 24px;\n}\nlabel {\n  display: block;\n  width: 6em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n/*\nCopyright 2017-2018 Google Inc. All Rights Reserved.\nUse of this source code is governed by an MIT-style license that\ncan be found in the LICENSE file at http://angular.io/license\n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWRpdC9lZGl0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0RBQWdEO0FBQ2hEO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLGNBQWM7RUFDZCxVQUFVO0VBQ1YsY0FBYztFQUNkLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFHQTs7OztDQUlDIiwiZmlsZSI6InNyYy9hcHAvZWRpdC9lZGl0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBQcm9maWxlRWRpdG9yQ29tcG9uZW50J3MgcHJpdmF0ZSBDU1Mgc3R5bGVzICovXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmctdG9wOiAyNHB4O1xufVxuXG5sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogNmVtO1xuICBtYXJnaW46IC41ZW0gMDtcbiAgY29sb3I6ICM2MDdEOEI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5pbnB1dCB7XG4gIGhlaWdodDogMmVtO1xuICBmb250LXNpemU6IDFlbTtcbiAgcGFkZGluZy1sZWZ0OiAuNGVtO1xufVxuXG5idXR0b24ge1xuICBmb250LWZhbWlseTogQXJpYWw7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xufVxuXG5idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBjb2xvcjogI2NjYztcbiAgY3Vyc29yOiBhdXRvO1xufVxuXG5cbi8qXG5Db3B5cmlnaHQgMjAxNy0yMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5Vc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0XG5jYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwOi8vYW5ndWxhci5pby9saWNlbnNlXG4qLyJdfQ== */"

/***/ }),

/***/ "./src/app/edit/edit.component.html":
/*!******************************************!*\
  !*** ./src/app/edit/edit.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Get from JSON file</h3>\n<div>\n  <button (click)=\"clear(); showConfigResponse()\">getResponse</button>\n  <button (click)=\"clear()\">clear</button>\n  <button (click)=\"clear(); getData()\">Data</button>\n  <span *ngIf = \"edit\">\n    <div *ngIf = \"headers\">\n      Response headers:\n      <ul>\n        <li *ngFor = \"let header of headers\">{{ header }}</li>\n      </ul>\n    </div>\n  </span>\n</div>\n\n<nav>\n    <a routerLink=\"/uploader\">uploader</a>\n</nav>\n\n<!-- <router-outlet></router-outlet> -->\n\n<form [formGroup]=\"dataForm\" (ngSubmit)=\"onSubmit()\">\n    <ng-container *ngFor=\"let key of dataKeys\">\n        <label *ngIf=\"key!=='@id' && key!=='@type'\">\n            {{ key }} : \n            <input type=\"text\" formControlName=\"{{ key }}\">\n        </label>\n    </ng-container>\n\n    <button type=\"submit\">Submit and Store</button>\n</form>\n\n<p>\n    Form Value: {{ dataForm.value | json }}\n</p>\n\n\n<!--<input type=\"text\" [(ngModel)]=\"data.age\">\n<input type=\"text\" value=\"{{data.firstName}}\">\n<input type=\"text\" value=\"{{data.lastName}}\">-->"

/***/ }),

/***/ "./src/app/edit/edit.component.ts":
/*!****************************************!*\
  !*** ./src/app/edit/edit.component.ts ***!
  \****************************************/
/*! exports provided: EditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditComponent", function() { return EditComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _edit_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit.service */ "./src/app/edit/edit.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");




var EditComponent = /** @class */ (function () {
    function EditComponent(editService, fb) {
        this.editService = editService;
        this.fb = fb;
        this.dataForm = this.fb.group({});
    }
    EditComponent.prototype.clear = function () {
        this.edit = undefined;
        this.headers = undefined;
        this.dataKeys = undefined;
        this.dataForm.reset();
    };
    EditComponent.prototype.ngOnInit = function () { };
    EditComponent.prototype.showConfigResponse = function () {
        var _this = this;
        this.editService.getEditResponse()
            // resp is of type `HttpResponse<Edit>`
            .subscribe(function (resp) {
            // display its headers
            var keys = resp.headers.keys();
            _this.headers = keys.map(function (key) {
                return key + ": " + resp.headers.get(key);
            });
            // access the body directly, which is typed as `Config`.
            _this.edit = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, resp.body);
        });
    };
    EditComponent.prototype.getData = function () {
        var _this = this;
        this.editService.getEditData()
            .subscribe(function (response) {
            _this.dataTypes = response[0];
            _this.dataKeys = Object.keys(response[1]);
            _this.data = response[1];
            console.log(response[0]);
            console.log(response[1]);
            _this.FormView = response[0];
            _this.dataForm = _this.fb.group(response[1]);
        });
    };
    // write submit event here
    EditComponent.prototype.onSubmit = function () {
        console.log(this.dataForm.value);
    };
    EditComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit',
            template: __webpack_require__(/*! ./edit.component.html */ "./src/app/edit/edit.component.html"),
            providers: [_edit_service__WEBPACK_IMPORTED_MODULE_2__["EditService"]],
            styles: [__webpack_require__(/*! ./edit.component.css */ "./src/app/edit/edit.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_edit_service__WEBPACK_IMPORTED_MODULE_2__["EditService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], EditComponent);
    return EditComponent;
}());



/***/ }),

/***/ "./src/app/edit/edit.service.ts":
/*!**************************************!*\
  !*** ./src/app/edit/edit.service.ts ***!
  \**************************************/
/*! exports provided: EditService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditService", function() { return EditService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



/*@Injectable({
  providedIn: 'root'
})*/
// get data from server
var EditService = /** @class */ (function () {
    function EditService(http) {
        this.http = http;
        this.editUrl = '/ngEdit';
    }
    EditService.prototype.getEditResponse = function () {
        return this.http.get(this.editUrl, { observe: 'response' });
    };
    EditService.prototype.getEditData = function () {
        return this.http.get(this.editUrl);
    };
    EditService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], EditService);
    return EditService;
}());



/***/ }),

/***/ "./src/app/form-data.service.ts":
/*!**************************************!*\
  !*** ./src/app/form-data.service.ts ***!
  \**************************************/
/*! exports provided: FormDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormDataService", function() { return FormDataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



/*@Injectable({
  providedIn: 'root'
})*/
var FormDataService = /** @class */ (function () {
    function FormDataService() {
        this.storageSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]); // ng-tree -> create
        this.currentStorage = this.storageSource.asObservable();
        this.dragdropNode = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]); // drag & drop, pass the value
        this.currentNode = this.dragdropNode.asObservable();
        this.flagSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]); // form finish edit and switch the flag
        this.currentFlag = this.flagSource.asObservable();
    }
    FormDataService.prototype.editSessionStorage = function (storageInput) {
        this.storageSource.next(storageInput);
    };
    FormDataService.prototype.passNodeVal = function (nodeVal) {
        this.dragdropNode.next(nodeVal);
    };
    FormDataService.prototype.changeFlag = function (flagInput) {
        this.flagSource.next(flagInput);
    };
    FormDataService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FormDataService);
    return FormDataService;
}());



/***/ }),

/***/ "./src/app/generate-form/generate-form.component.css":
/*!***********************************************************!*\
  !*** ./src/app/generate-form/generate-form.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* ProfileEditorComponent's private CSS styles */\n:host {\n  display: flex;\n  flex-direction: column;\n  padding-top: 24px;\n}\nlabel {\n  display: block;\n  width: 15em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n/*\nCopyright 2017-2018 Google Inc. All Rights Reserved.\nUse of this source code is governed by an MIT-style license that\ncan be found in the LICENSE file at http://angular.io/license\n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2VuZXJhdGUtZm9ybS9nZW5lcmF0ZS1mb3JtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0RBQWdEO0FBQ2hEO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsY0FBYztFQUNkLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFHQTs7OztDQUlDIiwiZmlsZSI6InNyYy9hcHAvZ2VuZXJhdGUtZm9ybS9nZW5lcmF0ZS1mb3JtLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBQcm9maWxlRWRpdG9yQ29tcG9uZW50J3MgcHJpdmF0ZSBDU1Mgc3R5bGVzICovXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmctdG9wOiAyNHB4O1xufVxuXG5sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTVlbTtcbiAgbWFyZ2luOiAuNWVtIDA7XG4gIGNvbG9yOiAjNjA3RDhCO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaW5wdXQge1xuICBoZWlnaHQ6IDJlbTtcbiAgZm9udC1zaXplOiAxZW07XG4gIHBhZGRpbmctbGVmdDogLjRlbTtcbn1cblxuYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6IEFyaWFsO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcbn1cblxuYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgY29sb3I6ICNjY2M7XG4gIGN1cnNvcjogYXV0bztcbn1cblxuXG4vKlxuQ29weXJpZ2h0IDIwMTctMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdFxuY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cDovL2FuZ3VsYXIuaW8vbGljZW5zZVxuKi8iXX0= */"

/***/ }),

/***/ "./src/app/generate-form/generate-form.component.html":
/*!************************************************************!*\
  !*** ./src/app/generate-form/generate-form.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p *ngIf = \" className !== '' \">Form of {{ className }}</p>\n\n<form [formGroup] = \"form_receive\" (ngSubmit) = \"output()\">\n  <ng-container *ngFor = \"let key of MemberKey\">\n    <label *ngIf = \"key!=='@id' && key!=='@type'\">\n      {{ key }} :\n    <input *ngIf = \" MemberStyle[key] !== 'textarea' \" type = {{MemberStyle[key]}} formControlName = {{key}} droppable (onDrop) = \" onNodeDrop($event) \">\n    <textarea *ngIf = \" MemberStyle[key] ==='textarea' \" formControlName = {{key}} droppable (onDrop) = \" onNodeDrop($event) \"></textarea>\n    </label>\n  </ng-container>\n  <button type = \"submit\">Output Object</button>\n</form>\n<br>\n<br>\n<button (click) = \"store()\">store</button>\n<br>\n<button (click) = \"clearForm()\">Clear Form</button>\n\n\n<p>\n  Form Value: {{ form_receive.value | json }}\n</p>\n\n\n<button (click) = \"clearSession()\">Clear Session Storage</button>"

/***/ }),

/***/ "./src/app/generate-form/generate-form.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/generate-form/generate-form.component.ts ***!
  \**********************************************************/
/*! exports provided: GenerateFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateFormComponent", function() { return GenerateFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _generate_form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generate-form.service */ "./src/app/generate-form/generate-form.service.ts");
/* harmony import */ var _form_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../form-data.service */ "./src/app/form-data.service.ts");





var GenerateFormComponent = /** @class */ (function () {
    function GenerateFormComponent(fb, subCreate, formDataService) {
        this.fb = fb;
        this.subCreate = subCreate;
        this.formDataService = formDataService;
        this.MemberKey = []; // defaultValue: generate_form_receive[0]
        this.MemberStyle = {}; // styleNode
        this.MemberType = {}; // typeNode. use for list
        this.form_receive = this.fb.group({});
        this.className = '';
        this.storageIndex = 1;
        this.storageMap = new Map(); // <class-name, count>: record class' count
        this.idMap = new Map(); // <sessionStorage-key, @id>: store id for @ref-using
        this.checkMap = new Map(); // <sessionStorage-key, used/wait>: for @ref, if used then just put @ref & @type
        this.storageTypeMap = new Map(); // <element-name, memberType>: for jsog generate list, need to check if type is list or not
    }
    GenerateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formDataService.currentNode.subscribe(function (nodeIn) { return _this.dropNodeVal = nodeIn; });
    };
    GenerateFormComponent.prototype.CheckStrToNum = function (input) {
        for (var key in this.MemberType) { // change string default value to number
            if (this.MemberType[key] === 'byte' || this.MemberType[key] === 'short' || this.MemberType[key] === 'int' ||
                this.MemberType[key] === 'long' || this.MemberType[key] === 'float' || this.MemberType[key] === 'double' ||
                this.MemberType[key] === 'Byte' || this.MemberType[key] === 'Short' || this.MemberType[key] === 'Integer' ||
                this.MemberType[key] === 'Long' || this.MemberType[key] === 'Float' || this.MemberType[key] === 'Double') {
                input[key] = +input[key]; // string to number
            }
        }
        return input;
    };
    GenerateFormComponent.prototype.onNodeDrop = function (e) {
        e.dragData = this.dropNodeVal;
        var nodeName = e.nativeEvent.target.attributes['ng-reflect-name'].nodeValue;
        // console.log('e.nativeEvent.target.attributes: ', e.nativeEvent.target.attributes['ng-reflect-name'].nodeValue);
        var tempType = this.MemberType[nodeName];
        console.log('tempType: ', tempType);
        var tempTypeArray = tempType.split(' ');
        if (tempTypeArray[0] === 'List') {
            if (e.nativeEvent.target.type === 'text' || e.nativeEvent.target.type === 'textarea') {
                if (e.nativeEvent.target.value === '') {
                    e.nativeEvent.target.value = this.dropNodeVal;
                    this.form_receive.value[nodeName] = e.nativeEvent.target.value;
                }
                else {
                    var str = ', '.concat(this.dropNodeVal);
                    e.nativeEvent.target.value = e.nativeEvent.target.value + str;
                    this.form_receive.value[nodeName] = e.nativeEvent.target.value;
                }
            }
        }
        else {
            e.nativeEvent.target.value = this.dropNodeVal;
            this.form_receive.value[nodeName] = e.nativeEvent.target.value;
        }
        console.log('e: ', e);
    };
    // receieve the class info form create component
    GenerateFormComponent.prototype.ngOnChanges = function () {
        this.MemberKey = Object.keys(this.generate_form_receive[0]); // for html, don't delete
        this.MemberStyle = this.generate_form_receive[1]; // styleNode
        this.MemberType = this.generate_form_receive[2]; // typeNode
        this.className = this.generate_form_receive[3];
        this.form_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('MemberKey: ', this.MemberKey);
        console.log('MemberStyle: ', this.MemberStyle);
        console.log('MemberType: ', this.MemberType);
        console.log('className: ', this.className);
    };
    GenerateFormComponent.prototype.jsogForSessionStorage = function (jsonInput, typeCheck) {
        // jsonInput-> { name: yang } typeCheck-> { age: long }
        // jsonInput-> { children:[p1, p2] } typeCheck-> { children: list PersonDemo }
        console.log('jsonInput: ', jsonInput);
        var tempKey = Object.keys(jsonInput); //  age, children
        var tempVal = Object.values(jsonInput); // 1, [p1, p2], [1, 2], ["1", "2"]
        var tempType = typeCheck[tempKey.toString()]; // long, list PersonDemo, list int, list string
        if (tempVal.toString() === '') { // no value, put null
            return null;
        }
        if (tempType === 'byte' || tempType === 'short' || tempType === 'int' || tempType === 'long' // number, output directly
            || tempType === 'float' || tempType === 'double' || tempType === 'Byte' || tempType === 'Short'
            || tempType === 'Integer' || tempType === 'Long' || tempType === 'Float' || tempType === 'Double') {
            return +tempVal;
        }
        else if (tempType === 'boolean' || tempType === 'Boolean') { // true & false
            if (tempVal.toString() === 'true') {
                return true;
            }
            else {
                return false;
            }
        }
        else { // list or string
            var tempTypeArray = tempType.split(' '); // split the type value to array
            if (tempTypeArray[0] === 'List') { // list variable
                var tempListVal = [];
                var tempSingleVal = tempVal.toString().split(', '); // value split with ', '
                if ((tempSingleVal.length === 1) && (tempSingleVal[0] === '')) {
                    return tempListVal; // list have nothing, return empty list
                }
                for (var i = 0; i < tempSingleVal.length; i++) {
                    if (sessionStorage.getItem(tempSingleVal[i]) !== null) { // sessionStorage has it. [p1, p2] list persondemo
                        if (this.checkMap.has(tempSingleVal[i])) { // used, add as @ref
                            var temp = {};
                            var refType = JSON.parse(sessionStorage.getItem(tempSingleVal[i]))['@type'];
                            temp['@ref'] = this.idMap.get(tempSingleVal[i]);
                            temp['@type'] = refType;
                            tempListVal[i] = temp;
                            // console.log('tempListVal[i]: ', tempListVal[i]);
                        }
                        else { // haven't used it yet, set checkMap to true, and write it
                            this.checkMap.set(tempSingleVal[i], true);
                            var typein = this.storageTypeMap.get(tempSingleVal[i]);
                            tempListVal[i] = this.jsogGen(JSON.parse(sessionStorage.getItem(tempSingleVal[i])), typein);
                            // console.log('checkMap', this.checkMap);
                        }
                    }
                    else if (tempTypeArray[1] === 'byte' || tempTypeArray[1] === 'short' || tempTypeArray[1] === 'int'
                        || tempTypeArray[1] === 'long' || tempTypeArray[1] === 'float' || tempTypeArray[1] === 'double'
                        || tempTypeArray[1] === 'Byte' || tempTypeArray[1] === 'Short' || tempTypeArray[1] === 'Integer'
                        || tempTypeArray[1] === 'Long' || tempTypeArray[1] === 'Float' || tempTypeArray[1] === 'Double') {
                        // [1, 2] list int
                        tempListVal[i] = +tempSingleVal[i];
                    }
                    else if (tempTypeArray[1] === 'Boolean' || tempTypeArray[1] === 'boolean') { // [t, f, t, f] list boolean
                        console.log('tempSingleVal.toString: ', tempSingleVal[i].toString());
                        if (tempSingleVal[i].toString() === 'true') {
                            tempListVal[i] = true;
                        }
                        else {
                            tempListVal[i] = false;
                        }
                    }
                    else { // ["1", "2"] list string
                        tempListVal[i] = tempSingleVal[i];
                        // console.log('tempListVal: ', tempListVal);
                    }
                }
                console.log('tempListVal: ', tempListVal);
                return tempListVal;
            }
            else { // string
                var StrTempVal = tempVal.toString();
                if (sessionStorage.getItem(StrTempVal) !== null) { // sessionStorage has it.
                    var reVal = void 0;
                    if (this.checkMap.has(StrTempVal)) { // used, add as @ref
                        var temp = {};
                        var refType = JSON.parse(sessionStorage.getItem(StrTempVal))['@type'];
                        temp['@ref'] = this.idMap.get(StrTempVal);
                        temp['@type'] = refType;
                        reVal = temp;
                    }
                    else { // haven't used it yet, set checkMap to true, and write it
                        this.checkMap.set(StrTempVal, true);
                        var typein = this.storageTypeMap.get(StrTempVal);
                        reVal = this.jsogGen(JSON.parse(sessionStorage.getItem(StrTempVal)), typein);
                        // console.log('checkMap', this.checkMap);
                    }
                    // console.log('reVal: ', reVal);
                    return reVal;
                }
                else {
                    return StrTempVal;
                }
            }
        }
    };
    GenerateFormComponent.prototype.jsogGen = function (formInput, typein) {
        var jsogS = {};
        for (var i = 0; i < Object.keys(formInput).length; i++) {
            var tempKey = Object.keys(formInput)[i];
            if ((tempKey !== '@id') && (tempKey !== '@type')) {
                var single_KV_pair = {};
                single_KV_pair[tempKey] = formInput[tempKey];
                formInput[tempKey] = this.jsogForSessionStorage(single_KV_pair, typein);
            }
            jsogS[tempKey] = formInput[tempKey];
        }
        return jsogS;
    };
    // output object and transmit sessionStorage value & form value to server
    GenerateFormComponent.prototype.output = function () {
        for (var i = 0; i < sessionStorage.length; i++) {
            this.idMap.set(Object.keys(sessionStorage)[i], JSON.parse(Object.values(sessionStorage)[i])['@id']);
            // this.checkMap.set(Object.keys(sessionStorage)[i], false);
        }
        console.log('idMap ', this.idMap);
        console.log('checkMap', this.checkMap);
        console.log('length ', this.form_receive.value);
        /* tempType: sessionStorage's class type and index;
           key: split temp and use the last one be the real key */
        /*const tempType = this.form_receive.value['@type'].concat(
            this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
        const key = tempType.split('.')[tempType.split('.').length - 1];*/
        var tempType = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
        var key = tempType.split('.')[tempType.split('.').length - 1];
        console.log('key: ', key); // print object with class and its class' count
        this.checkMap.set(key, true);
        console.log('storageTypeMap.get(key): ', this.storageTypeMap.get(key));
        this.jsog = this.jsogGen(this.form_receive.value, this.storageTypeMap.get(key));
        this.checkMap.clear();
        console.log('jsog ', this.jsog);
        // output form value to server ngFormOutput
        this.subCreate.ouputObject(this.jsog).subscribe(function (response) {
            console.log('output', response);
        });
        // sessionStorage pass to server ngSessionStorage
        this.subCreate.outputsessionStorage(sessionStorage).subscribe(function (response) {
            console.log('ngSessionStorage response', response);
        });
    };
    // sessionStorage just accept string type key/value
    GenerateFormComponent.prototype.store = function ($event) {
        console.log('this.form_receive @type: ', JSON.stringify(this.form_receive.value['@type']));
        /* get object type => store object use its type-name and index
         * storageMap: count the same class-name object
         */
        var aaa = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
        var bbb = aaa.split('.')[aaa.split('.').length - 1];
        if (sessionStorage.getItem(bbb) === null) { // sessionStorage don't have this item, create object
            if (this.storageMap.has(JSON.stringify(this.form_receive.value['@type']))) { // already had the same class object
                var value = this.storageMap.get(JSON.stringify(this.form_receive.value['@type']));
                value++;
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), value);
                // this.form_receive.value['@id'] = value; // modified @id with class count
            }
            else { // first object of this class
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), 1);
                // this.form_receive.value['@id'] = 1;
            }
            this.form_receive.value['@id'] = this.storageIndex.toString();
            /* temp: sessionStorage's class type and index;
               key: split temp and use the last one be the tree-root/sessionStorage key */
            /*const temp = this.form_receive.value['@type'].concat(
                this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));*/
            var temp = this.form_receive.value['@type'].concat(this.storageIndex); // use storage count as id postfix
            var key = temp.split('.')[temp.split('.').length - 1];
            this.ValueTemp = this.CheckStrToNum(this.form_receive.value);
            sessionStorage.setItem(key, JSON.stringify(this.ValueTemp));
            // sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
            this.storageTypeMap.set(key, this.MemberType);
            console.log('this.storageTypeMap: ', this.storageTypeMap);
            this.storageIndex++;
        }
        else { // sessioinStorage had this item, edit object, overwrite old value
            var temp = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
            var key = temp.split('.')[temp.split('.').length - 1];
            this.ValueTemp = this.CheckStrToNum(this.form_receive.value);
            sessionStorage.setItem(key, JSON.stringify(this.ValueTemp));
            // sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
        }
        this.clearForm();
        this.formDataService.changeFlag(true);
        this.className = '';
        this.MemberKey = []; // defaultValue: generate_form_receive[0]
        this.MemberStyle = {}; // styleNode
        this.MemberType = {}; // typeNode. use for list
    };
    // clear the form data
    GenerateFormComponent.prototype.clearForm = function () {
        this.MemberKey = [];
        this.generate_form_receive.value = undefined;
        // this.generate_form_receive = {};
        this.form_receive = this.fb.group({});
        this.className = '';
    };
    GenerateFormComponent.prototype.clearSession = function () {
        sessionStorage.clear();
        this.storageMap.clear();
        this.storageIndex = 1;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GenerateFormComponent.prototype, "generate_form_receive", void 0);
    GenerateFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-generate-form',
            template: __webpack_require__(/*! ./generate-form.component.html */ "./src/app/generate-form/generate-form.component.html"),
            styles: [__webpack_require__(/*! ./generate-form.component.css */ "./src/app/generate-form/generate-form.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _generate_form_service__WEBPACK_IMPORTED_MODULE_3__["GenerateFormService"],
            _form_data_service__WEBPACK_IMPORTED_MODULE_4__["FormDataService"]])
    ], GenerateFormComponent);
    return GenerateFormComponent;
}());



/***/ }),

/***/ "./src/app/generate-form/generate-form.service.ts":
/*!********************************************************!*\
  !*** ./src/app/generate-form/generate-form.service.ts ***!
  \********************************************************/
/*! exports provided: GenerateFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateFormService", function() { return GenerateFormService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var GenerateFormService = /** @class */ (function () {
    function GenerateFormService(http) {
        this.http = http;
        this.outputUrl = '/ngFormOutput';
        this.sessionStorageUrl = '/ngSessionStorage';
        this.httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'text/plain' });
    }
    GenerateFormService.prototype.ouputObject = function (output) {
        return this.http.post(this.outputUrl, output, { headers: this.httpHeaders, observe: 'response' });
    };
    GenerateFormService.prototype.outputsessionStorage = function (session) {
        return this.http.post(this.sessionStorageUrl, session, { headers: this.httpHeaders, observe: 'response' });
    };
    GenerateFormService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], GenerateFormService);
    return GenerateFormService;
}());



/***/ }),

/***/ "./src/app/jstree/jstree.component.css":
/*!*********************************************!*\
  !*** ./src/app/jstree/jstree.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2pzdHJlZS9qc3RyZWUuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/jstree/jstree.component.html":
/*!**********************************************!*\
  !*** ./src/app/jstree/jstree.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"using_json\"></div>\n"

/***/ }),

/***/ "./src/app/jstree/jstree.component.ts":
/*!********************************************!*\
  !*** ./src/app/jstree/jstree.component.ts ***!
  \********************************************/
/*! exports provided: JstreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JstreeComponent", function() { return JstreeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var JstreeComponent = /** @class */ (function () {
    function JstreeComponent() {
    }
    JstreeComponent.prototype.ngOnInit = function () { };
    JstreeComponent.prototype.ngAfterViewInit = function () {
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
    };
    JstreeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-jstree',
            template: __webpack_require__(/*! ./jstree.component.html */ "./src/app/jstree/jstree.component.html"),
            styles: [__webpack_require__(/*! ./jstree.component.css */ "./src/app/jstree/jstree.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], JstreeComponent);
    return JstreeComponent;
}());



/***/ }),

/***/ "./src/app/uploader/uploader.component.css":
/*!*************************************************!*\
  !*** ./src/app/uploader/uploader.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VwbG9hZGVyL3VwbG9hZGVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/uploader/uploader.component.html":
/*!**************************************************!*\
  !*** ./src/app/uploader/uploader.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<form [formGroup]=\"uploaderForm\" (change)=\"ubmit( $event.target.files )\">\n    <label>\n      choose json file :\n        <input type=\"file\" size=\"60\" accept=\".json\">\n    </label>\n    <button type=\"submit\">Submit and Store</button>\n</form>-->\n\n\n<form [formGroup]=\"uploader\" (change)=\"fileChange( $event.target.files )\" (ngSubmit)=\"submit()\">\n  <label>\n    choose json file :\n    <input type=\"file\" size=\"80\" accept=\".json\" />\n  </label>\n  <button type=\"submit\">Form it</button>\n</form>\n<br>\n\n<app-generate-form [generate_form_receive]=\"fileForm\"></app-generate-form>\n"

/***/ }),

/***/ "./src/app/uploader/uploader.component.ts":
/*!************************************************!*\
  !*** ./src/app/uploader/uploader.component.ts ***!
  \************************************************/
/*! exports provided: UploaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploaderComponent", function() { return UploaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _uploader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uploader.service */ "./src/app/uploader/uploader.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var UploaderComponent = /** @class */ (function () {
    function UploaderComponent(fb, uploaderService, http) {
        this.fb = fb;
        this.uploaderService = uploaderService;
        this.http = http;
        this.uploader = this.fb.group({});
    }
    UploaderComponent.prototype.ngOnInit = function () { };
    UploaderComponent.prototype.fileChange = function (fileList) {
        this.fileList = fileList;
        console.log('fileList', this.fileList);
    };
    UploaderComponent.prototype.submit = function () {
        var _this = this;
        console.log('fileList', this.fileList);
        this.fileToUpload = this.fileList[0];
        console.log('this.fileToUpload.name ', this.fileToUpload.name);
        var formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        console.log('formData', formData);
        this.uploaderService.uploadFile(formData).subscribe(function (response) {
            console.log('response', response);
            console.log('response.body', response.body);
            // this.fileForm = this.fb.group(response.body);
            _this.fileForm = response.body;
        });
    };
    UploaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-uploader',
            template: __webpack_require__(/*! ./uploader.component.html */ "./src/app/uploader/uploader.component.html"),
            styles: [__webpack_require__(/*! ./uploader.component.css */ "./src/app/uploader/uploader.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _uploader_service__WEBPACK_IMPORTED_MODULE_3__["UploaderService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], UploaderComponent);
    return UploaderComponent;
}());



/***/ }),

/***/ "./src/app/uploader/uploader.service.ts":
/*!**********************************************!*\
  !*** ./src/app/uploader/uploader.service.ts ***!
  \**********************************************/
/*! exports provided: UploaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploaderService", function() { return UploaderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var UploaderService = /** @class */ (function () {
    function UploaderService(http) {
        this.http = http;
        this.uploadUrl = '/ngUploader';
    }
    UploaderService.prototype.uploadFile = function (upload) {
        return this.http.post(this.uploadUrl, upload, { observe: 'response' });
    };
    UploaderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UploaderService);
    return UploaderService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yang/eclipse-workspace/embedded-jetty-jsp-develop/frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map