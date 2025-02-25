import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProductsFilter {
  page = 0;
  itemsPage = 4;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  constructor(private http: HttpClient) { }

  professionalsUrl = 'http://localhost:8080/professionals';

     list(filter: ProductsFilter): Promise<any> {

          let params = new HttpParams();
          params = params.set('page', filter.page);
          params = params.set('size', filter.itemsPage);

          return this.http.get(`${this.professionalsUrl}`, { params })
            .toPromise()
            .then((response: any) => {
              const professionals = response['content'];
              const result = {
                professionals,
                total: response['totalElements']
              };
              return result;
            });
        }
}
