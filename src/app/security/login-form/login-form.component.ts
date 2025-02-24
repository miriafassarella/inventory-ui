

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email: string = '';
  senha: string = '';
  lembrarMe: boolean = false;

  constructor(
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }


  ngOnInit(): void {
    const emailSalvo = localStorage.getItem('email');
    if (emailSalvo) {
      this.email = emailSalvo;
      this.lembrarMe = true;
    }

  }

  onLogin() {
    if (this.lembrarMe) {
      localStorage.setItem('email', this.email); // Salva o e-mail
    } else {
      localStorage.removeItem('email'); // Remove o e-mail salvo se desmarcar
    }

    console.log('Login realizado!');
  }

login(usuario: string, senha: string){
  this.auth.login(usuario, senha)
  .then(()=>{

    this.router.navigate(['/inventaire']);

  })
  .catch(erro => {
    this.errorHandler.handle(erro);
  })
}

}
