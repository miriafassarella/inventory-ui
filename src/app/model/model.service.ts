import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ModelFilter {
  page = 0;
  itemsPage = 4;
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  modelsUrl = 'http://3.95.208.110:8080/models';
  typesUrl = 'http://3.95.208.110:8080/types';

  list(filter: ModelFilter): Promise<any> {

    let params = new HttpParams();
    params = params.set('page', filter.page);
    params = params.set('size', filter.itemsPage);

    return this.http.get(`${this.modelsUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const models = response['content'];
        const result = {
          models,
          total: response['totalElements']
        };
        return result;
      });
  }

  listTypes(): Promise<any> {
    return this.http.get(`${this.typesUrl}`)
      .toPromise()
      .then((response: any) => {
        const types = response;
        return types;
      })
  }

  addModel(model: any): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.post(this.modelsUrl, model, { headers })
      .toPromise();
  }

  removeModel(id: number): Promise<any> {
    return this.http.delete(`${this.modelsUrl}/${id}`)
      .toPromise();
  }
}
