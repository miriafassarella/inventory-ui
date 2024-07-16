import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl= 'http://localhost:8080/products';

  constructor(private http : HttpClient) { }

list(): Promise<any>{

  return firstValueFrom(
    this.http.get(`${this.productsUrl}`)
  )
}

}
