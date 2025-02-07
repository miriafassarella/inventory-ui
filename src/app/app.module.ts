import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';



import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { SecurityRoutingModule } from './security/security-routing.module';
import { HomeComponent } from './home/home.component';
import { ErrorHandlerService } from './error-handler.service';
import { ProductService } from './home/product.service';



import { FormsModule } from '@angular/forms';


import { DropdownModule } from 'primeng/dropdown';
import { MessageService, MenuItem } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import { MenubarComponent } from './header/menubar/menubar.component';
import { ToolbarModule } from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import { PanelModule } from 'primeng/panel';






const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: 'inventaire', component: HomeComponent},


  ];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenubarComponent,


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
    MenubarModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToolbarModule,
    DropdownModule,
    FormsModule,
    PanelModule

],

providers: [ErrorHandlerService, MessageService,ProductService],
bootstrap: [AppComponent]
})
export class AppModule { }
