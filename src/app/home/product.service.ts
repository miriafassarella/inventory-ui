import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Establishment, Model, Product, Sector } from '../core/model';


export class ProductsFilter {
  page = 0;
  itemsPage = 7;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  productsUrl = 'http://localhost:8080/products';
  sectorsUrl = 'http://localhost:8080/sectors';
  establishmentsUrl = 'http://localhost:8080/establishments';
  modelsUrl = 'http://localhost:8080/models';
  variousProductsUrl = 'http://localhost:8080/products/add';


  constructor(private http: HttpClient) { }

  list(filter: ProductsFilter): Promise<any> {

    let params = new HttpParams();
    params = params.set('page', filter.page);
    params = params.set('size', filter.itemsPage);

    return this.http.get(`${this.productsUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const products = response['content'];
        const result = {
          products,
          total: response['totalElements']
        };
        return result;
      });
  }



  addProduct(products: any[]): Promise<any> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');


    return this.http.post(this.variousProductsUrl, products, { headers })
      .toPromise();
  }


  listProductForEstablishment(filter: ProductsFilter, establishmentId: any) {
    let params = new HttpParams();
    params = params.set('page', filter.page);
    params = params.set('size', filter.itemsPage);
    params = params.set('establishment', establishmentId)

    return this.http.get(`${this.productsUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const products = response['content'];
        const result = {
          products,
          total: response['totalElements']
        };
        return result;
      });
  }

  listProductsAll(): Promise<any> {//sem pageable, apenas para conferir o numero de serie
    return this.http.get(`${this.productsUrl}`)
    .toPromise()
    .then((response: any) => {
      const products = response;

      return products;
    })

}


  listSectors(): Promise<any> {

    const params = new HttpParams();
    return this.http.get<Sector[]>(`${this.sectorsUrl}`, { params })
      .toPromise();
  }

  listEstablishments(sectorId: number): Promise<any> {
    const params = new HttpParams()
      .set('sector', sectorId);
    return this.http.get<Establishment[]>(this.establishmentsUrl, { params })
      .toPromise();
  }

  /*Pas necessaire pour l'instant
  listEstablishmentsAll() :Promise<any>{
    return this.http.get<Establishment[]>(`${this.establishmentsUrl}`)
      .toPromise();
  }*/

  listModels(): Promise<any> {
    return this.http.get<Model[]>(`${this.modelsUrl}`)
      .toPromise();
  }
}


