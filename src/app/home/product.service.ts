import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Establishment, Model, Owner, Product, Professional, Sector, Usability } from '../core/model';


export class ProductsFilter {
  page = 0;
  itemsPage = 7;
  name?:string;
  sNumber?:string;
  modelName?:string;
  professionalName?:string;
  establishmentId?: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  productsUrl = 'http://3.95.208.110:8080/products';
  private apiUrl = 'http://3.95.208.110:8080/products/pdf';
  criteriaListUrl = 'http://3.95.208.110:8080/products/search';
  sectorsUrl = 'http://3.95.208.110:8080/sectors';
  establishmentsUrl = 'http://3.95.208.110:8080/establishments';
  modelsUrl = 'http://3.95.208.110:8080/models';
  variousProductsUrl = 'http://3.95.208.110:8080/products/add';
  professionalsUrl = 'http://3.95.208.110:8080/professionals';
  usabilitiesUrl = 'http://3.95.208.110:8080/usabilities';
  ownersUrl = 'http://3.95.208.110:8080/owners';



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

  downloadPdf(filter: number) {
    let params = new HttpParams();
    if(filter != 0){
      params = params.set('establishmentId', filter);
    }

    return this.http.get(this.apiUrl, { params: params, responseType: 'blob' }); // 'blob' para lidar com arquivos binários
  }

  listWhitCriteria(filter: ProductsFilter): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filter.page);
    params = params.set('size', filter.itemsPage);

    if(filter.name != null && filter.name.length > 0){
      params = params.set('name', filter.name);
    }
    if(filter.sNumber != null && filter.sNumber.length > 0){
      params = params.set('serialNumber', filter.sNumber);
    }
    if(filter.modelName != null && filter.modelName.length > 0){
      params = params.set('modelName', filter.modelName);
    }
    if(filter.professionalName != null && filter.professionalName.length > 0){
      params = params.set('professionalName', filter.professionalName);
    }
    if(filter.establishmentId != null){
      params = params.set('establishmentId', filter.establishmentId);
    }

    return this.http.get(`${this.criteriaListUrl}`, { params })
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
updateProduct(product: any): Promise<any> {
  const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product, { headers })
    .toPromise();
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


  listEstablishmentsAll() :Promise<any>{
    return this.http.get<Establishment[]>(`${this.establishmentsUrl}`)
      .toPromise();
  }

      listProfessionals(): Promise<any> {
        return this.http.get<Professional>(this.professionalsUrl).toPromise();
      }

      listUsabilities(): Promise<any> {
        return this.http.get<Usability>(this.usabilitiesUrl).toPromise();
      }

      listOwners(): Promise<any> {
        return this.http.get<Owner>(this.ownersUrl).toPromise();
      }
      searchById(code: number): Promise<any> {

        return this.http.get(`${this.productsUrl}/${code}`)
        .toPromise()
        .then((response: any) => {
          return response;

        });

    }

    removeProduct(id: number) : Promise<any>{

      return this.http.delete(`${this.productsUrl}/${id}`)
      .toPromise();
    }





  listModels(): Promise<any> {
    return this.http.get<Model[]>(`${this.modelsUrl}`)
      .toPromise();
  }
}


