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

@NgModule({
    declarations: [
        AppComponent,
        EditComponent,
        CreateComponent,
        UploaderComponent,
        GenerateFormComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
