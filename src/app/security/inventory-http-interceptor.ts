import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { from, mergeMap, Observable } from "rxjs";

export class NotAuthenticatedError { }


@Injectable()
export class InventoryHttpInterceptor implements HttpInterceptor{

  constructor(private auth : AuthService){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalid()){
      return from(this.auth.procureNewAccessToken())
      .pipe(
        mergeMap(()=>{
          if (this.auth.isAccessTokenInvalid()) {
            throw new NotAuthenticatedError();
          }

          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          return next.handle(req);
        })
      );
    }
    return next.handle(req);
  }
}
