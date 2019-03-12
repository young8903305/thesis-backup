import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { UploaderComponent } from './uploader/uploader.component';
import { GenerateFormComponent } from './generate-form/generate-form.component';
import { JstreeComponent } from './jstree/jstree.component';
import { TreeModule } from 'angular-tree-component';
import { AngularTreeComponent } from './angular-tree/angular-tree.component';
import { FormDataService } from './form-data.service';
import { ContextmenuComponent } from './contextmenu/contextmenu.component';
import { NgDragDropModule } from 'ng-drag-drop';

@NgModule({
    declarations: [
        AppComponent,
        EditComponent,
        CreateComponent,
        UploaderComponent,
        GenerateFormComponent,
        JstreeComponent,
        AngularTreeComponent,
        ContextmenuComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TreeModule.forRoot(),
        NgDragDropModule.forRoot(),
        AppRoutingModule,
    ],
    providers: [
            FormDataService
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
