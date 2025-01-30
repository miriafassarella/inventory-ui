import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Injectable } from '@angular/core';


export class ProductsFilter{
page = 0;
itemsPage = 7;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  productsUrl= 'http://localhost:8080/products';
  sectorsUrl= 'http://localhost:8080/sectors';

  constructor(private http : HttpClient) { }

    list(filter : ProductsFilter) : Promise<any> {

      let params = new HttpParams();
      params = params.set('page', filter.page);
      params = params.set('size', filter.itemsPage);

      return this.http.get(`${this.productsUrl}`, {params})
      .toPromise()
      .then((response : any) => {
        const products = response['content'];
        const result = {
          products,
          total: response['totalElements']
        };
        return result;
    });
}

listSectors() :Promise<any>{

  let params = new HttpParams();
  return this.http.get(`${this.sectorsUrl}`, {params})
    .toPromise();
     }
}
