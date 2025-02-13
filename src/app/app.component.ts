import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './security/auth.service';
import {MenuItem} from 'primeng/api';
import { ErrorHandlerService } from './error-handler.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'inventory-ui';





  constructor(private router: Router, private auth: AuthService,
    private handle: ErrorHandlerService

  ){

  }

ngOnInit(): void {

}



displayMenubar(){
  return this.router.url !== '/login' && this.router.url !== '/barcode';
}

}
