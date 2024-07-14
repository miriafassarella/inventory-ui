import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';

import {InputTextModule} from 'primeng/inputtext'
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {FormsModule, NgForm} from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';




@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    InputTextModule,
    TabViewModule,
    ButtonModule,
    CardModule,
    FormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=> {
          return '';
        }
      }
    })
  ],
  providers: [AuthService, JwtHelperService],
  exports :[LoginFormComponent]
})
export class SecurityModule { }
