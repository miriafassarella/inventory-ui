import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { from, mergeMap, Observable } from "rxjs";

export class NotAuthenticatedError { }

@Injectable()
export class InventoryHttpInterceptor implements HttpInterceptor{

  constructor(private auth : AuthService){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isTokenRequest = req.url.includes('/oauth/token'); //ajouté
    const token = localStorage.getItem('token');//ajouté

    //isTokenRequest a été ajouté
    if(!isTokenRequest  && this.auth.isAccessTokenInvalid()){
      return from(this.auth.procureNewAccessToken())
      .pipe(
        mergeMap(()=>{
          const newToken = localStorage.getItem('token'); //ajouté
          if (this.auth.isAccessTokenInvalid()) {
            throw new NotAuthenticatedError();
          }

          const authReq  = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });

          return next.handle(authReq);

        })
      );
    }
    //if ajouté-----------------------------------------
    if (token && !isTokenRequest) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
//partir principal qui a éte modifié en haut
    return next.handle(req);
  }
}
