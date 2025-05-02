import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProductsFilter {
  page = 0;
  itemsPage = 4;
}

@Injectable({
  providedIn: 'root'
})

export class OwnerService {

  constructor(private http: HttpClient) { }

  ownersUrl = 'http://3.95.208.110:8080/owners';

  list(filter: ProductsFilter): Promise<any> {

    let params = new HttpParams();
    params = params.set('page', filter.page);
    params = params.set('size', filter.itemsPage);

    return this.http.get(`${this.ownersUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const owners = response['content'];
        const result = {
          owners,
          total: response['totalElements']
        };
        return result;
      });
  }

  addOwner(owner: any): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post(this.ownersUrl, owner, { headers })
      .toPromise();
  }

  removeOwner(id: number): Promise<any> {
    return this.http.delete(`${this.ownersUrl}/${id}`)
      .toPromise();
  }
}
