import { Usability } from './../core/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class UsabilityFilter{

  page =0;
  itemsPage = 4;
}

@Injectable({
  providedIn: 'root'
})
export class UsabilityService {

  constructor(private http: HttpClient) { }

   usabilitiesUrl = 'http://localhost:8080/usabilities';

    list(filter: UsabilityFilter): Promise<any> {

      let params = new HttpParams();
      params = params.set('page', filter.page);
      params = params.set('size', filter.itemsPage);

      return this.http.get(`${this.usabilitiesUrl}`, { params })
        .toPromise()
        .then((response: any) => {
          const usabilities = response['content'];
          const result = {
            usabilities,
            total: response['totalElements']
          };
          return result;
        });
    }

    addUsability(usability: any): Promise<any> {
        const headers = new HttpHeaders()
          .append('Content-Type', 'application/json');


        return this.http.post(this.usabilitiesUrl, usability, { headers })
          .toPromise();
      }

      removeUsability(id: number): Promise<any> {

        return this.http.delete(`${this.usabilitiesUrl}/${id}`)
          .toPromise();
      }
}
