import { NgModule, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { UploaderComponent } from './uploader/uploader.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ContextmenuComponent } from './contextmenu/contextmenu.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'create', component: CreateComponent },
    {
        path: 'edit',
        component: EditComponent,
        /*children: [
            { path: 'uploader', component: UploaderComponent }
        ]*/
    },
    { path: 'uploader', component: UploaderComponent },
    { path: 'contextmenu', component: ContextmenuComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy} ]
})
export class AppRoutingModule {
}
