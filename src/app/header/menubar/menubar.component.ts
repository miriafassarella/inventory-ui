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

  usuarioLogado: any;
  items!: MenuItem[];
  constructor(
    private auth: AuthService,
    private handle: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [

      {
        label: 'Quit',
        icon:'pi pi-fw pi-power-off',
        command : ()=> this.logout()
      }
    ]

  this.usuarioLogado = this.auth.jwtPayload?.name;
}

  logout(){
    this.auth.logout()
    .then(()=> {
      this.router.navigate(['/login']);
    }).catch(erro => this.handle.handle(erro));
  }

}
