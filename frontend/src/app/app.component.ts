import { Component, OnChanges, DoCheck} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules, ConditionalExpr } from '@angular/compiler';
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

export class AppComponent implements OnChanges, DoCheck {

    title = 'ng-test';
    pathValue = '';
    dataClass: any;
    welcomeMessage = true;
    dataClassShow = false;
    storageLength = 0;

    clickedEvent: Event;

    constructor(
        private router: Router,
        private appService: AppService
    ) {
        sessionStorage.clear();
    }

    gotoindex() {
        this.welcomeMessage = true;
        sessionStorage.clear();
        this.router.navigate(['/']);
    }

    ngOnChanges() {
    }

    childEventClicked(event: Event) {
        this.clickedEvent = event;
        console.log('app print: ', this.clickedEvent);
    }

    ngDoCheck() {
        this.storageLength = sessionStorage.length;
    }

    outputAll() {
        const all = [];
        for (const value of Object.values(sessionStorage)) {
            all.push(JSON.parse(value));
        }
        console.log('length: ', all.length);
        this.appService.outputAll(JSON.stringify(all)).subscribe(response => {
            console.log('output', response);
        });
    }

    clearSession() {
        sessionStorage.clear();
    }

}
