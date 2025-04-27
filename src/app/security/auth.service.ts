import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokensRevokeUrl = 'http://3.95.208.110:8080/tokens/revoke';
  oauthTokenUrl = 'http://3.95.208.110:8080/oauth/token';
  jwtPayload : any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loadtoken();
   }

  login(person: string, password: string): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${person}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {

        this.storeToken(response ['access_token']);
      })
      .catch((response) => {
        if(response.status === 400){

          if(response.error.error === 'invalid_grant'){
            return Promise.reject("L'utilisateur n'existe pas ou le mot de passe est invalide !");

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

  procureNewAccessToken() : Promise<void>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body, {headers, withCredentials : true})
            .toPromise()
            .then((response: any) => {
              this.storeToken(response['access_token']);

              console.log('Novo access token criado!');

              return Promise.resolve();
            })
            .catch(response => {
              console.error('Erro ao renovar token.', response);
              return Promise.resolve();
            });


  }

  isAccessTokenInvalid(){
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  cleanAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  logout(){

    return this.http.delete(this.tokensRevokeUrl, {withCredentials: true})
    .toPromise()
    .then(()=> {
      this.cleanAccessToken();
    });
  }

  havePermission(permission: string){

    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }
}
