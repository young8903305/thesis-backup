import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from './app.service';

declare var jquery: any; // 這邊用 var
// declare let $: any; // 當然 let 也可以

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ AppService ]
})

export class AppComponent {

    title = 'ng-test';
    pathValue = '';
    dataClass: any;
    welcomeMessage = true;
    dataClassShow = false;

    constructor(
        private router: Router,
        private appService: AppService
    ) {
        sessionStorage.clear();
    }

    gotoindex() {
        this.welcomeMessage = true;
        this.router.navigate(['/']);
    }

}
