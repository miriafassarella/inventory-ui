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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InventoryHttpInterceptor } from './inventory-http-interceptor';
import {CheckboxModule} from 'primeng/checkbox';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    InputTextModule,
    TabViewModule,
    ButtonModule,
    CardModule,
    FormsModule,
    CheckboxModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
          tokenGetter,
          allowedDomains: ['http://3.95.208.110:8080'],
          disallowedRoutes: ['http://3.95.208.110:8080/oauth/token']
        }
    }),
  ],
  providers: [AuthService, JwtHelperService,
    {provide: HTTP_INTERCEPTORS,
      useClass: InventoryHttpInterceptor,
      multi : true
    }
  ],
  exports :[LoginFormComponent]
})
export class SecurityModule { }
