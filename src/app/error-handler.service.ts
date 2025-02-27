import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotAuthenticatedError } from './security/inventory-http-interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      console.log('erro refresh');

      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

      /*Modificar pois ficou muito geral - usei para o delete do owner na api*/
    }else if(errorResponse instanceof HttpErrorResponse && errorResponse.status == 500){
      msg = 'Le proprietaire ne peut pas être supprimé car il y a des produits que lui appartiennent !';
      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg });
  }
}
