import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



export class ProductsFilter {
  page = 0;
  itemsPage = 4;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  personsUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  list(filter: ProductsFilter): Promise<any> {

      let params = new HttpParams();
      params = params.set('page', filter.page);
      params = params.set('size', filter.itemsPage);

      return this.http.get(`${this.personsUrl}`, { params })
        .toPromise()
        .then((response: any) => {
          const users = response['content'];
          const result = {
            users,
            total: response['totalElements']
          };
          return result;
        });
    }
}

