import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './security/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory-ui';

  usuariologado : string = '';
  constructor(private router: Router, private auth: AuthService){

  }
  displayNavbar() {
    return this.router.url !== '/login';
  }


}
