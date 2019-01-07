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







var routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'create', component: _create_create_component__WEBPACK_IMPORTED_MODULE_3__["CreateComponent"] },
    {
        path: 'edit',
        component: _edit_edit_component__WEBPACK_IMPORTED_MODULE_4__["EditComponent"],
    },
    { path: 'uploader', component: _uploader_uploader_component__WEBPACK_IMPORTED_MODULE_5__["UploaderComponent"] }
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

module.exports = "h1 {\n  font-size: 1.2em;\n  color: #999;\n  margin-bottom: 0;\n}\n\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0;\n}\n\nnav a {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px;\n}\n\nnav a:visited,\na:link {\n  color: #607d8b;\n}\n\nnav a:hover {\n  color: #039be5;\n  background-color: #cfd8dc;\n}\n\nnav a.active {\n  color: #039be5;\n}\n\n.main {\n  margin-left: 200px;\n  /* Same as the width of the sidenav */\n}\n\n.sidenav div:hover {\n  color: #f1f1f1;\n}\n\n.sidenav div {\n  padding: 6px 6px 6px 32px;\n  text-decoration: none;\n  font-size: 16px;\n  color: #818181;\n  display: block;\n}\n\n.sidenav {\n  height: 100%;\n  width: 200px;\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: #111;\n  overflow-x: hidden;\n  padding-top: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGlCQUFpQjtDQUNsQjs7QUFFRDtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2QsZUFBZTtDQUNoQjs7QUFFRDtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0NBQ3BCOztBQUVEOztFQUVFLGVBQWU7Q0FDaEI7O0FBRUQ7RUFDRSxlQUFlO0VBQ2YsMEJBQTBCO0NBQzNCOztBQUVEO0VBQ0UsZUFBZTtDQUNoQjs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixzQ0FBc0M7Q0FDdkM7O0FBRUQ7RUFDRSxlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsMEJBQTBCO0VBQzFCLHNCQUFzQjtFQUN0QixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGVBQWU7Q0FDaEI7O0FBRUQ7RUFDRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsT0FBTztFQUNQLFFBQVE7RUFDUix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGtCQUFrQjtDQUNuQiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDEge1xuICBmb250LXNpemU6IDEuMmVtO1xuICBjb2xvcjogIzk5OTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaDIge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luLXRvcDogMDtcbiAgcGFkZGluZy10b3A6IDA7XG59XG5cbm5hdiBhIHtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbm5hdiBhOnZpc2l0ZWQsXG5hOmxpbmsge1xuICBjb2xvcjogIzYwN2Q4Yjtcbn1cblxubmF2IGE6aG92ZXIge1xuICBjb2xvcjogIzAzOWJlNTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcbn1cblxubmF2IGEuYWN0aXZlIHtcbiAgY29sb3I6ICMwMzliZTU7XG59XG5cbi5tYWluIHtcbiAgbWFyZ2luLWxlZnQ6IDIwMHB4O1xuICAvKiBTYW1lIGFzIHRoZSB3aWR0aCBvZiB0aGUgc2lkZW5hdiAqL1xufVxuXG4uc2lkZW5hdiBkaXY6aG92ZXIge1xuICBjb2xvcjogI2YxZjFmMTtcbn1cblxuLnNpZGVuYXYgZGl2IHtcbiAgcGFkZGluZzogNnB4IDZweCA2cHggMzJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiAjODE4MTgxO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLnNpZGVuYXYge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAyMDBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTE7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<head>\n    <title>Frontend</title>\n\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n</head>\n\n<div class=\"sidenav\">\n    <nav>\n        <!--<a routerLink=\"/edit\" (click)=\"noWelcome()\">Edit</a>\n        <br>-->\n        <a routerLink=\"/create\">Create</a>\n        <br>\n        <a routerLink=\"/uploader\">uploader</a>\n    </nav>\n</div>\n\n<div class=\"main\">\n    <h3 >Welcome!!</h3>\n    <router-outlet></router-outlet>\n    \n    <p>\n        <button (click)=\"gotoindex()\">Home</button>\n    </p>\n    <div ng-controller='myCtrl'>\n        <div js-tree=\"treeConfig\" ng-model=\"treeData\" should-apply=\"ignoreModelChanges()\" tree=\"treeInstance\" tree-events=\"ready:readyCB;create_node:createNodeCB\"></div>\n    </div>\n</div>\n\n\n\n<!--\n<form action=\"/Edit1Servlet\" method=\"post\">\n  <table class=\"table table-hover\">\n    <tbody>\n      <tr>\n        <td><input type=\"button\" name=\"path-input\" value=\"choose path\" size=\"24\" (click)=\"path(this)\">\n            <input id=\"pathInput\" type=\"text\" name=\"path-text\" [(ngModel)]=\"pathValue\"></td>\n      </tr>\n    </tbody>\n  </table>\n  <input type=\"submit\" value=\"submit\" />\n</form>\n-->\n<!--\n<table>\n    <tr>\n        <app-string></app-string>\n    </tr>\n    <tr>\n        <app-string></app-string>\n    </tr>\n    <tr>\n        <app-string></app-string>\n    </tr>\n</table>\n-->"

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
        this.router.navigate(['/']);
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
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
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

/***/ "./src/app/create/create.component.css":
/*!*********************************************!*\
  !*** ./src/app/create/create.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sidenav div:hover {\n  color: #f1f1f1;\n}\n\n.sidenav div {\n  padding: 6px 6px 6px 32px;\n  text-decoration: none;\n  font-size: 25px;\n  color: #818181;\n  display: block;\n}\n\n.sidenav {\n  height: 100%;\n  width: 200px;\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  background-color: #111;\n  overflow-x: hidden;\n  padding-top: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtDQUNoQjs7QUFFRDtFQUNFLDBCQUEwQjtFQUMxQixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLE9BQU87RUFDUCxRQUFRO0VBQ1IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixrQkFBa0I7Q0FDbkIiLCJmaWxlIjoic3JjL2FwcC9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2lkZW5hdiBkaXY6aG92ZXIge1xuICBjb2xvcjogI2YxZjFmMTtcbn1cblxuLnNpZGVuYXYgZGl2IHtcbiAgcGFkZGluZzogNnB4IDZweCA2cHggMzJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXNpemU6IDI1cHg7XG4gIGNvbG9yOiAjODE4MTgxO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLnNpZGVuYXYge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAyMDBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTE7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG59XG4iXX0= */"

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




var CreateComponent = /** @class */ (function () {
    function CreateComponent(createService, fb) {
        var _this = this;
        this.createService = createService;
        this.fb = fb;
        this.createService.getClassName()
            .subscribe(function (response) {
            _this.dataClassName = Object.values(response);
            console.log('className', _this.dataClassName);
        });
    }
    CreateComponent.prototype.ngOnInit = function () { };
    /*getClass() {
        this.createService.getClassName()
            .subscribe(response => {
                this.dataClassName = Object.keys(response);
                console.log(this.dataClassName);
            });
    }*/
    // if user choose the different class, re-get from the server, and pass to the generate-form component
    CreateComponent.prototype.postClass = function (item) {
        var _this = this;
        var obItem = { 'name': item };
        console.log(obItem);
        this.createService.postClass(obItem).subscribe(function (response) {
            console.log('response: ', response);
            _this.receive = response.body;
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
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
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
        this.createUrl = '/ngClassName';
        this.sendUrl = '/ngNameCreateForm';
    }
    CreateService.prototype.getClassName = function () {
        return this.http.get(this.createUrl);
    };
    CreateService.prototype.postClass = function (input) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'text/plain' });
        return this.http.post(this.sendUrl, input, { headers: httpHeaders, observe: 'response' });
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

module.exports = "/* ProfileEditorComponent's private CSS styles */\n:host {\n  display: flex;\n  flex-direction: column;\n  padding-top: 24px;\n}\nlabel {\n  display: block;\n  width: 6em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n/*\nCopyright 2017-2018 Google Inc. All Rights Reserved.\nUse of this source code is governed by an MIT-style license that\ncan be found in the LICENSE file at http://angular.io/license\n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWRpdC9lZGl0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaURBQWlEO0FBQ2pEO0VBQ0UsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixrQkFBa0I7Q0FDbkI7QUFFRDtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsZUFBZTtFQUNmLGVBQWU7RUFDZixrQkFBa0I7Q0FDbkI7QUFFRDtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsbUJBQW1CO0NBQ3BCO0FBRUQ7RUFDRSxtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtDQUNqQjtBQUVEO0VBQ0UsMEJBQTBCO0NBQzNCO0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGFBQWE7Q0FDZDtBQUdEOzs7O0VBSUUiLCJmaWxlIjoic3JjL2FwcC9lZGl0L2VkaXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFByb2ZpbGVFZGl0b3JDb21wb25lbnQncyBwcml2YXRlIENTUyBzdHlsZXMgKi9cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcGFkZGluZy10b3A6IDI0cHg7XG59XG5cbmxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA2ZW07XG4gIG1hcmdpbjogLjVlbSAwO1xuICBjb2xvcjogIzYwN0Q4QjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmlucHV0IHtcbiAgaGVpZ2h0OiAyZW07XG4gIGZvbnQtc2l6ZTogMWVtO1xuICBwYWRkaW5nLWxlZnQ6IC40ZW07XG59XG5cbmJ1dHRvbiB7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XG59XG5cbmJ1dHRvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGNvbG9yOiAjY2NjO1xuICBjdXJzb3I6IGF1dG87XG59XG5cblxuLypcbkNvcHlyaWdodCAyMDE3LTIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXRcbmNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHA6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiovIl19 */"

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

/***/ "./src/app/generate-form/generate-form.component.css":
/*!***********************************************************!*\
  !*** ./src/app/generate-form/generate-form.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* ProfileEditorComponent's private CSS styles */\n:host {\n  display: flex;\n  flex-direction: column;\n  padding-top: 24px;\n}\nlabel {\n  display: block;\n  width: 6em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n/*\nCopyright 2017-2018 Google Inc. All Rights Reserved.\nUse of this source code is governed by an MIT-style license that\ncan be found in the LICENSE file at http://angular.io/license\n*/\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2VuZXJhdGUtZm9ybS9nZW5lcmF0ZS1mb3JtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaURBQWlEO0FBQ2pEO0VBQ0UsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixrQkFBa0I7Q0FDbkI7QUFFRDtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsZUFBZTtFQUNmLGVBQWU7RUFDZixrQkFBa0I7Q0FDbkI7QUFFRDtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsbUJBQW1CO0NBQ3BCO0FBRUQ7RUFDRSxtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtDQUNqQjtBQUVEO0VBQ0UsMEJBQTBCO0NBQzNCO0FBRUQ7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGFBQWE7Q0FDZDtBQUdEOzs7O0VBSUUiLCJmaWxlIjoic3JjL2FwcC9nZW5lcmF0ZS1mb3JtL2dlbmVyYXRlLWZvcm0uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFByb2ZpbGVFZGl0b3JDb21wb25lbnQncyBwcml2YXRlIENTUyBzdHlsZXMgKi9cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcGFkZGluZy10b3A6IDI0cHg7XG59XG5cbmxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiA2ZW07XG4gIG1hcmdpbjogLjVlbSAwO1xuICBjb2xvcjogIzYwN0Q4QjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmlucHV0IHtcbiAgaGVpZ2h0OiAyZW07XG4gIGZvbnQtc2l6ZTogMWVtO1xuICBwYWRkaW5nLWxlZnQ6IC40ZW07XG59XG5cbmJ1dHRvbiB7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjZmQ4ZGM7XG59XG5cbmJ1dHRvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGNvbG9yOiAjY2NjO1xuICBjdXJzb3I6IGF1dG87XG59XG5cblxuLypcbkNvcHlyaWdodCAyMDE3LTIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXRcbmNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHA6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiovIl19 */"

/***/ }),

/***/ "./src/app/generate-form/generate-form.component.html":
/*!************************************************************!*\
  !*** ./src/app/generate-form/generate-form.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"form_receive\" (ngSubmit)=\"output()\">\n  <ng-container *ngFor=\"let key of classFields\">\n    <label *ngIf=\"key!=='@id' && key!=='@type'\">\n      {{ key }} :\n      <input type=\"{{ fieldStyle[key] }}\" formControlName=\"{{ key }}\">\n    </label>\n  </ng-container>\n  <button type=\"submit\">Output Object</button>\n</form>\n<br>\n<br>\n<button (click)=\"sessionStore()\">store</button>\n<br>\n<button (click)=\"clear()\">clear</button>\n\n<p>\n  Form Value: {{ form_receive.value | json }}\n</p>"

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
        this.storageIndex = 0;
        this.display_storage = sessionStorage;
        this.storageMap = new Map();
    }
    GenerateFormComponent.prototype.ngOnInit = function () {
    };
    // receieve the class info form create component
    GenerateFormComponent.prototype.ngOnChanges = function () {
        // this.classFields = Object.keys( this.sub_receive.value[0] );
        this.classFields = Object.keys(this.generate_form_receive[0]);
        this.fieldStyle = this.generate_form_receive[1];
        this.form_receive = this.fb.group(this.generate_form_receive[0]);
        console.log('generate_form_receive: ', this.generate_form_receive);
        console.log('classFields: ', this.classFields);
        console.log('fieldStyle: ', this.fieldStyle);
        console.log('this.generate_form_receive[0]', this.generate_form_receive[0]);
        console.log('this.generate_form_receive[1]', this.generate_form_receive[1]);
    };
    GenerateFormComponent.prototype.output = function () {
        // simple output form value
        console.log('form.value: ', this.form_receive.value);
        this.subCreate.ouputObject(this.form_receive.value).subscribe(function (response) {
            console.log('output', response);
        });
        // pass the sessionStorage to the server
        console.log('sessionStorage: ', sessionStorage);
        this.subCreate.outputsessionStorage(sessionStorage).subscribe(function (response) {
            console.log('session response', response);
        });
    };
    // sessionStorage just accept string type key/value
    GenerateFormComponent.prototype.sessionStore = function () {
        console.log('this.form_receive.value: ', JSON.stringify(this.form_receive.value));
        // get object type => store object use its type-name and index, storageMap count the same class-name object
        console.log('this.form_receive.get(type)', JSON.stringify(this.form_receive.value['@type']));
        if (this.storageMap.has(JSON.stringify(this.form_receive.value['@type']))) {
            console.log(this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])));
            var value = this.storageMap.get(JSON.stringify(this.form_receive.value['@type']));
            value++;
            this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), value);
            console.log('map', this.storageMap);
        }
        else {
            this.storageMap.set(JSON.stringify(this.form_receive.value['@type']), 1);
        }
        var keytemp = this.form_receive.value['@type'].concat(this.storageMap.get(JSON.stringify(this.form_receive.value['@type'])).toString());
        sessionStorage.setItem(keytemp, JSON.stringify(this.form_receive.value));
        for (var i = 0; i < sessionStorage.length; i++) {
            console.log('display_storage', i, JSON.parse(Object.values(sessionStorage)[i]));
        }
        // this.storageIndex++;
    };
    // clear the form data
    GenerateFormComponent.prototype.clear = function () {
        this.classFields = undefined;
        this.generate_form_receive.value = undefined;
        this.form_receive = this.fb.group({});
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
        // const httpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.post(this.outputUrl, output, { headers: this.httpHeaders, observe: 'response' });
    };
    GenerateFormService.prototype.outputsessionStorage = function (session) {
        // const httpHeaders = new HttpHeaders({ 'Content-Type': 'text/json' });
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

module.exports = "<!--<form [formGroup]=\"uploaderForm\" (change)=\"onSubmit( $event.target.files )\">\n    <label>\n      choose json file :\n        <input type=\"file\" size=\"60\">\n    </label>\n    <button type=\"submit\">Submit and Store</button>\n</form> -->\n\n\n<form [formGroup]=\"uploader\" (change)=\"fileChange( $event.target.files )\" (ngSubmit)=\"submit()\">\n  <label>\n    choose json file :\n    <input type=\"file\" size=\"80\" accept=\".json\" />\n  </label>\n  <button type=\"submit\">Form it</button>\n</form>\n<br>\n\n<app-generate-form [generate_form_receive]=\"fileForm\"></app-generate-form>\n"

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
    UploaderComponent.prototype.ngOnInit = function () {
    };
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