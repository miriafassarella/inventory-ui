import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FilterService } from 'primeng/api';




import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { SecurityRoutingModule } from './security/security-routing.module';
import { HomeComponent } from './home/home.component';
import { ErrorHandlerService } from './error-handler.service';
import { ProductService } from './home/product.service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



import { FormsModule } from '@angular/forms';


import { DropdownModule } from 'primeng/dropdown';
import {ConfirmationService, MessageService, MenuItem } from 'primeng/api';
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
import { BarcodeComponent } from './barcode/barcode.component';
import { SidebarModule } from 'primeng/sidebar';
import { UserComponent } from './user/user.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { OwnerComponent } from './owner/owner.component';
import { ProfessionalComponent } from './professional/professional.component';

import { ProfessionalService } from './professional/professional.service';
import { OwnerService } from './owner/owner.service';
import { UsabilityComponent } from './usability/usability.component';
import { ModelComponent } from './model/model.component';





const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: 'inventaire', component: HomeComponent},
  {path: 'barcode', component: BarcodeComponent},
  {path: 'users', component: UserComponent},
  {path: 'owners', component: OwnerComponent},
  {path: 'professionals', component: ProfessionalComponent},
  {path: 'usabilities', component: UsabilityComponent},
  {path: 'models', component: ModelComponent},


  ];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenubarComponent,
    BarcodeComponent,
    UserComponent,
    OwnerComponent,
    ProfessionalComponent,
    UsabilityComponent,
    ModelComponent


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
    PanelModule,
    DialogModule,
    ConfirmDialogModule,
    SidebarModule,
    CheckboxModule,
    RadioButtonModule,
    TagModule,
    FileUploadModule,
    DividerModule

],

providers: [ErrorHandlerService, MessageService,ProductService, ConfirmationService, ProfessionalService,
  OwnerService, FilterService
],
bootstrap: [AppComponent]
})
export class AppModule { }
