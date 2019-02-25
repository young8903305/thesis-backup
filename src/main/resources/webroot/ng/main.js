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

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAvYW5ndWxhci10cmVlL2FuZ3VsYXItdHJlZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/angular-tree/angular-tree.component.html":
/*!**********************************************************!*\
  !*** ./src/app/angular-tree/angular-tree.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tree-root [nodes]=\"nodes\" [options]=\"options\" ></tree-root>\n<button *ngIf=\"storageLength!==0\" (click)=\"onEditClick()\">Edit sessionStorage</button>\n"

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
var a;
var AngularTreeComponent = /** @class */ (function () {
    function AngularTreeComponent(data) {
        this.data = data;
        this.storageLength = 0;
        this.contextMenu = null;
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
                    contextMenu: function (tree, node, $event) {
                        // In case you want to open your own context menu, you must first run $event.preventDefault() within the callback.
                        $event.preventDefault();
                        if (node.isRoot) {
                            var x = confirm('Delete ?');
                            if (x) {
                                // remove from original nodes array
                                // _.remove(node.parent.data.children, node.data);
                                sessionStorage.removeItem(node.data.name);
                            }
                        }
                        tree.update();
                    },
                    click: function (tree, node, $event) {
                        $event.preventDefault();
                        if (node.isRoot) {
                            angular_tree_component__WEBPACK_IMPORTED_MODULE_2__["TREE_ACTIONS"].TOGGLE_ACTIVE(tree, node, $event);
                            var xhttp_1 = new XMLHttpRequest();
                            xhttp_1.onreadystatechange = function () {
                                if (this.readyState === 4 && this.status === 200) {
                                    a = xhttp_1.responseText; // a: universal variable for catch the response, then form the sessionStorage
                                }
                            };
                            xhttp_1.open('POST', '/ngEditSessionStorage', true);
                            xhttp_1.send(sessionStorage.getItem(node.data.name));
                        }
                    }
                }
            },
            allowDrag: function (node) { return node.isRoot; },
        };
    }
    AngularTreeComponent.prototype.ngOnInit = function () {
    };
    AngularTreeComponent.prototype.ngDoCheck = function () {
        if (this.storageLength !== sessionStorage.length) {
            // console.log('length: ', this.temp);
            this.nodes = [];
            for (var i = 0; i < sessionStorage.length; i++) {
                // console.log('Key: ', Object.keys(sessionStorage)[i]);
                var parent_1 = { name: '', 'children': [] };
                parent_1['name'] = Object.keys(sessionStorage)[i];
                for (var _i = 0, _a = Object.keys(JSON.parse(Object.values(sessionStorage)[i])); _i < _a.length; _i++) {
                    var item = _a[_i];
                    // console.log('content: ', item, '\nvalue: ', item.toString());
                    parent_1.children.push({ name: item, val: item.toString() });
                }
                this.nodes.push(parent_1);
            }
        }
        this.storageLength = sessionStorage.length;
    };
    AngularTreeComponent.prototype.onEditClick = function () {
        this.sessionStorageTemp = a;
        this.data.changeMessage(JSON.parse(this.sessionStorageTemp.toString()));
    };
    AngularTreeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-angular-tree',
            template: __webpack_require__(/*! ./angular-tree.component.html */ "./src/app/angular-tree/angular-tree.component.html"),
            styles: [__webpack_require__(/*! ./angular-tree.component.css */ "./src/app/angular-tree/angular-tree.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_form_data_service__WEBPACK_IMPORTED_MODULE_3__["FormDataService"]])
    ], AngularTreeComponent);
    return AngularTreeComponent;
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

module.exports = "h1 {\n  font-size: 1.2em;\n  color: #999;\n  margin-bottom: 0;\n}\n\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0;\n}\n\nnav a {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px;\n}\n\nnav a:visited,\na:link {\n  color: #607d8b;\n}\n\nnav a:hover {\n  color: #039be5;\n  background-color: #cfd8dc;\n}\n\nnav a.active {\n  color: #039be5;\n}\n\n.main {\n  margin-left: 200px;\n  /* Same as the width of the sidenav */\n}\n\n.sidenav div:hover {\n  color: #f1f1f1;\n}\n\n.sidenav div {\n  padding: 6px 6px 6px 32px;\n  text-decoration: none;\n  font-size: 16px;\n  color: #818181;\n  display: block;\n}\n\n.sidenav {\n  height: 100%;\n  width: 200px;\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: #111;\n  overflow-x: hidden;\n  padding-top: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7O0VBRUUsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFDQUFxQztBQUN2Qzs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixjQUFjO0VBQ2QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osZUFBZTtFQUNmLFVBQVU7RUFDVixNQUFNO0VBQ04sT0FBTztFQUNQLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25CIiwiZmlsZSI6ImFwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImgxIHtcbiAgZm9udC1zaXplOiAxLjJlbTtcbiAgY29sb3I6ICM5OTk7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbmgyIHtcbiAgZm9udC1zaXplOiAyZW07XG4gIG1hcmdpbi10b3A6IDA7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuXG5uYXYgYSB7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG5uYXYgYTp2aXNpdGVkLFxuYTpsaW5rIHtcbiAgY29sb3I6ICM2MDdkOGI7XG59XG5cbm5hdiBhOmhvdmVyIHtcbiAgY29sb3I6ICMwMzliZTU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XG59XG5cbm5hdiBhLmFjdGl2ZSB7XG4gIGNvbG9yOiAjMDM5YmU1O1xufVxuXG4ubWFpbiB7XG4gIG1hcmdpbi1sZWZ0OiAyMDBweDtcbiAgLyogU2FtZSBhcyB0aGUgd2lkdGggb2YgdGhlIHNpZGVuYXYgKi9cbn1cblxuLnNpZGVuYXYgZGl2OmhvdmVyIHtcbiAgY29sb3I6ICNmMWYxZjE7XG59XG5cbi5zaWRlbmF2IGRpdiB7XG4gIHBhZGRpbmc6IDZweCA2cHggNnB4IDMycHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogIzgxODE4MTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zaWRlbmF2IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMjAwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTExO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<head>\n    <title>Frontend</title>\n\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n</head>\n\n<div class=\"sidenav\">\n    <nav >\n        <!--<a routerLink=\"/edit\" (click)=\"noWelcome()\">Edit</a>\n        <br>-->\n        <a routerLink=\"/create\">Create</a>\n        <br>\n        <a routerLink=\"/uploader\">Uploader</a>\n        <br>\n        <a routerLink=\"/\" (click)=\"gotoindex()\">Home</a>\n    </nav>\n</div>\n\n<div class=\"main\">\n    <h1>Welcome!!</h1>\n    <router-outlet></router-outlet>\n<!--\n    <div ng-controller='myCtrl'>\n        <div js-tree=\"treeConfig\" ng-model=\"treeData\" should-apply=\"ignoreModelChanges()\" tree=\"treeInstance\" tree-events=\"ready:readyCB;create_node:createNodeCB\"></div>\n    </div>\n-->\n\n<!--<app-angular-tree (sessionStorageEditInfo)=\"childEventClicked($event)\"></app-angular-tree>-->\n    <app-angular-tree></app-angular-tree>\n    <app-contextmenu></app-contextmenu>\n</div>\n"

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
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
            ],
            providers: [_form_data_service__WEBPACK_IMPORTED_MODULE_14__["FormDataService"]],
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
            template: './contextmenu.component.html',
            styles: ["./contextmenu.component.css"]
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

module.exports = ".sidenav div:hover {\n  color: #f1f1f1;\n}\n\n.sidenav div {\n  padding: 6px 6px 6px 32px;\n  text-decoration: none;\n  font-size: 25px;\n  color: #818181;\n  display: block;\n}\n\n.sidenav {\n  height: 100%;\n  width: 200px;\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: #111;\n  overflow-x: hidden;\n  padding-top: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsY0FBYztFQUNkLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGVBQWU7RUFDZixVQUFVO0VBQ1YsTUFBTTtFQUNOLE9BQU87RUFDUCxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJhcHAvY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZGVuYXYgZGl2OmhvdmVyIHtcbiAgY29sb3I6ICNmMWYxZjE7XG59XG5cbi5zaWRlbmF2IGRpdiB7XG4gIHBhZGRpbmc6IDZweCA2cHggNnB4IDMycHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgZm9udC1zaXplOiAyNXB4O1xuICBjb2xvcjogIzgxODE4MTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zaWRlbmF2IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMjAwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTExO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xufVxuIl19 */"

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
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../form-data.service */ "./src/app/form-data.service.ts");





var CreateComponent = /** @class */ (function () {
    function CreateComponent(createService, fb, data) {
        var _this = this;
        this.createService = createService;
        this.fb = fb;
        this.data = data;
        this.createService.getClassName()
            .subscribe(function (response) {
            _this.dataClassName = Object.values(response);
            // console.log('classNames', this.dataClassName);
        });
    }
    CreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentMessage.subscribe(function (message) { return _this.receive = message; });
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
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _form_data_service__WEBPACK_IMPORTED_MODULE_4__["FormDataService"]])
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

module.exports = "/* ProfileEditorComponent's private CSS styles */\n:host {\n  display: flex;\n  flex-direction: column;\n  padding-top: 24px;\n}\nlabel {\n  display: block;\n  width: 6em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n/*\nCopyright 2017-2018 Google Inc. All Rights Reserved.\nUse of this source code is governed by an MIT-style license that\ncan be found in the LICENSE file at http://angular.io/license\n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9lZGl0L2VkaXQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnREFBZ0Q7QUFDaEQ7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0UsY0FBYztFQUNkLFVBQVU7RUFDVixjQUFjO0VBQ2QsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjtBQUVBO0VBQ0UseUJBQXlCO0FBQzNCO0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7QUFDZDtBQUdBOzs7O0NBSUMiLCJmaWxlIjoiYXBwL2VkaXQvZWRpdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogUHJvZmlsZUVkaXRvckNvbXBvbmVudCdzIHByaXZhdGUgQ1NTIHN0eWxlcyAqL1xuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwYWRkaW5nLXRvcDogMjRweDtcbn1cblxubGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDZlbTtcbiAgbWFyZ2luOiAuNWVtIDA7XG4gIGNvbG9yOiAjNjA3RDhCO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaW5wdXQge1xuICBoZWlnaHQ6IDJlbTtcbiAgZm9udC1zaXplOiAxZW07XG4gIHBhZGRpbmctbGVmdDogLjRlbTtcbn1cblxuYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6IEFyaWFsO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcbn1cblxuYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgY29sb3I6ICNjY2M7XG4gIGN1cnNvcjogYXV0bztcbn1cblxuXG4vKlxuQ29weXJpZ2h0IDIwMTctMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdFxuY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cDovL2FuZ3VsYXIuaW8vbGljZW5zZVxuKi8iXX0= */"

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
        this.messageSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this.currentMessage = this.messageSource.asObservable();
    }
    FormDataService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
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

module.exports = "/* ProfileEditorComponent's private CSS styles */\n:host {\n  display: flex;\n  flex-direction: column;\n  padding-top: 24px;\n}\nlabel {\n  display: block;\n  width: 6em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n/*\nCopyright 2017-2018 Google Inc. All Rights Reserved.\nUse of this source code is governed by an MIT-style license that\ncan be found in the LICENSE file at http://angular.io/license\n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9nZW5lcmF0ZS1mb3JtL2dlbmVyYXRlLWZvcm0uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnREFBZ0Q7QUFDaEQ7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0UsY0FBYztFQUNkLFVBQVU7RUFDVixjQUFjO0VBQ2QsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjtBQUVBO0VBQ0UseUJBQXlCO0FBQzNCO0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7QUFDZDtBQUdBOzs7O0NBSUMiLCJmaWxlIjoiYXBwL2dlbmVyYXRlLWZvcm0vZ2VuZXJhdGUtZm9ybS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogUHJvZmlsZUVkaXRvckNvbXBvbmVudCdzIHByaXZhdGUgQ1NTIHN0eWxlcyAqL1xuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwYWRkaW5nLXRvcDogMjRweDtcbn1cblxubGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDZlbTtcbiAgbWFyZ2luOiAuNWVtIDA7XG4gIGNvbG9yOiAjNjA3RDhCO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaW5wdXQge1xuICBoZWlnaHQ6IDJlbTtcbiAgZm9udC1zaXplOiAxZW07XG4gIHBhZGRpbmctbGVmdDogLjRlbTtcbn1cblxuYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6IEFyaWFsO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcbn1cblxuYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgY29sb3I6ICNjY2M7XG4gIGN1cnNvcjogYXV0bztcbn1cblxuXG4vKlxuQ29weXJpZ2h0IDIwMTctMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdFxuY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cDovL2FuZ3VsYXIuaW8vbGljZW5zZVxuKi8iXX0= */"

/***/ }),

/***/ "./src/app/generate-form/generate-form.component.html":
/*!************************************************************!*\
  !*** ./src/app/generate-form/generate-form.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup] = \"form_receive\" (ngSubmit) = \"output()\">\n  <ng-container *ngFor = \"let key of Member\">\n    <label *ngIf = \"key!=='@id' && key!=='@type'\">\n      {{ key }} :\n    <input  type={{MemberStyle[key]}} formControlName={{key}}>\n    <textarea *ngIf=\" MemberStyle[key] =='textarea'\"></textarea>\n    </label>\n  </ng-container>\n  <button type=\"submit\">Output Object</button>\n</form>\n<br>\n<br>\n<button (click)=\"store()\">store</button>\n<br>\n<button (click)=\"clearForm()\">Clear Form</button>\n\n<p>\n  Form Value: {{ form_receive.value | json }}\n</p>\n<button (click)=\"clearSession()\">clear sessionStorage</button>"

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




var GenerateFormComponent = /** @class */ (function () {
    function GenerateFormComponent(fb, subCreate) {
        this.fb = fb;
        this.subCreate = subCreate;
        this.form_receive = this.fb.group({});
        this.storageIndex = 1;
        this.storageMap = new Map(); // <class-name, count> : record class' count
        this.idMap = new Map(); // <sessionStorage-key, @id>
        this.checkMap = new Map(); // <sessionStorage-key, used/wait>
    }
    GenerateFormComponent.prototype.ngOnInit = function () {
    };
    // receieve the class info form create component
    GenerateFormComponent.prototype.ngOnChanges = function () {
        this.Member = Object.keys(this.generate_form_receive[0]); // defaultValueNode
        this.MemberStyle = this.generate_form_receive[1]; // styleNode
        this.MemberType = this.generate_form_receive[2]; // typeNode
        this.form_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('Member: ', this.Member);
        console.log('MemberStyle: ', this.MemberStyle);
        console.log('MemberType: ', this.MemberType);
    };
    GenerateFormComponent.prototype.jsogGen = function (form) {
        var jsogS = {};
        for (var i = 0; i < Object.keys(form).length; i++) {
            var tempKey = Object.keys(form)[i];
            if ((tempKey !== '@id') && (tempKey !== '@type')) {
                if (sessionStorage.getItem(form[tempKey]) !== null) { // sessionStorage has it.
                    if (this.checkMap.has(form[tempKey])) { // used
                        var temp = {};
                        temp['@ref'] = this.idMap.get(form[tempKey]);
                        temp['@type'] = 'jetty.demo.PersonDemo'; // sessionStorage.getItem(form[tempKey]);
                        form[tempKey] = temp;
                        console.log('form[tempKey]: ', form[tempKey]);
                    }
                    else { // haven't used it yet
                        console.log('PersonDemo1 ', sessionStorage.getItem(form[tempKey]));
                        this.checkMap.set(form[tempKey], true);
                        form[tempKey] = this.jsogGen(JSON.parse(sessionStorage.getItem(form[tempKey])));
                        // form[tempKey] = JSON.parse(sessionStorage.getItem(form[tempKey]));
                        console.log('checkMap', this.checkMap);
                    }
                }
            }
            jsogS[tempKey] = form[tempKey];
        }
        return jsogS;
    };
    // output object and transmit sessionStorage/form value to server
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
        var tempType = this.form_receive.value['@type'].concat(this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
        var key = tempType.split('.')[tempType.split('.').length - 1];
        console.log('key: ', key);
        this.checkMap.set(key, true);
        this.jsog = this.jsogGen(this.form_receive.value);
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
    GenerateFormComponent.prototype.store = function () {
        console.log('this.form_receive.value: ', JSON.stringify(this.form_receive.value['@type']));
        /* get object type => store object use its type-name and index
         * storageMap count the same class-name object
         */
        var aaa = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
        console.log('aaa: ', aaa);
        var bbb = aaa.split('.')[aaa.split('.').length - 1];
        console.log('bbb: ', bbb);
        console.log('storage: ', sessionStorage.getItem(bbb));
        if (sessionStorage.getItem(bbb) === null) {
            if (this.storageMap.has(JSON.stringify(this.form_receive.value['@type']))) {
                // console.log(this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
                var value = this.storageMap.get(JSON.stringify(this.form_receive.value['@type']));
                value++;
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), value);
                // this.form_receive.value['@id'] = value; // modified @id with class count
            }
            else {
                this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), 1);
                // this.form_receive.value['@id'] = 1;
            }
            this.form_receive.value['@id'] = this.storageIndex.toString();
            /* temp: sessionStorage's class type and index;
            key: split temp and use the last one be the tree-root/sessionStorage key */
            /*const temp = this.form_receive.value['@type'].concat(
                this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));*/
            var temp = this.form_receive.value['@type'].concat(this.storageIndex);
            var key = temp.split('.')[temp.split('.').length - 1];
            sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
            this.storageIndex++;
        }
        else {
            var temp = this.form_receive.value['@type'].concat(this.form_receive.value['@id']);
            var key = temp.split('.')[temp.split('.').length - 1];
            sessionStorage.setItem(key, JSON.stringify(this.form_receive.value));
        }
    };
    // clear the form data
    GenerateFormComponent.prototype.clearForm = function () {
        this.Member = undefined;
        this.generate_form_receive.value = undefined;
        this.form_receive = this.fb.group({});
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
            _generate_form_service__WEBPACK_IMPORTED_MODULE_3__["GenerateFormService"]])
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

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAvanN0cmVlL2pzdHJlZS5jb21wb25lbnQuY3NzIn0= */"

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

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAvdXBsb2FkZXIvdXBsb2FkZXIuY29tcG9uZW50LmNzcyJ9 */"

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
    // fileForm;
    function UploaderComponent(fb, uploaderService, http) {
        this.fb = fb;
        this.uploaderService = uploaderService;
        this.http = http;
        this.uploader = this.fb.group({});
        this.fileForm = this.fb.group({});
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
        var formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        console.log('formData', formData);
        this.uploaderService.uploadFile(formData).subscribe(function (response) {
            console.log('response', response);
            console.log('response.body', response.body);
            _this.fileForm = _this.fb.group(response.body);
            // this.fileForm = response.body;
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