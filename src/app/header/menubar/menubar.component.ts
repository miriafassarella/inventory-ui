import { AuthService } from 'src/app/security/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MenuItem} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/error-handler.service';



@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  loggedUser: any;
  items!: MenuItem[];

  sidebarVisible: boolean = false;

  selectedButton: string = ''; // Variável para armazenar o botão selecionado

  constructor(
    private auth: AuthService,
    private handle: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {


  this.loggedUser = this.auth.jwtPayload?.name;

}



selectButton(button: string) {
    this.selectedButton = button;
}

logout(){
  this.auth.logout()
  .then(()=> {
    this.router.navigate(['/login']);
  }).catch(erro => this.handle.handle(erro));
}

}
