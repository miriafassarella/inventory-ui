import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { SecurityRoutingModule } from './security/security-routing.module';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { ProductService } from './home/product.service';

import {MenubarModule} from 'primeng/menubar';



const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: 'home', component: HomeComponent}

  ];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent


],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SecurityModule,
    SecurityRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastModule,
    TableModule,
    MenubarModule



],

providers: [ErrorHandlerService, MessageService,ProductService],
bootstrap: [AppComponent]
})
export class AppModule { }
