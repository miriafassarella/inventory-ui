import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload : any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loadtoken();
   }

  login(person: string, password: string): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${person}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then((response: any) => {

        this.storeToken(response ['access_token']);
      })
      .catch((response) => {
        if(response.status === 400){

          if(response.error.error === 'invalid_grant'){
            return Promise.reject('Usuário inexistente ou senha invalida !');

          }
          }
         return Promise.reject(response);
      });
  }

  private storeToken(token : string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  loadtoken(){
    const token = localStorage.getItem('token');

    if(token){
      this.storeToken(token);
    }
  }
}
