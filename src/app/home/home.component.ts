import { Component, Input, OnInit } from '@angular/core';
import { ProductService, ProductsFilter } from './product.service';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../security/auth.service';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
totalRegisters = 0;
filter = new ProductsFilter();
products = [];




constructor(private productService : ProductService,
  private auth: AuthService,
  private handle: ErrorHandlerService,
  private router: Router){

}

ngOnInit(): void {

}


list(page = 0){
  this.filter.page = page;
  this.productService.list(this.filter)
  .then(result => {
    this.totalRegisters = result.total;
    this.products = result.products;
  })
  .catch(erro => this.handle.handle(erro));

}

whenChangingPage(event : LazyLoadEvent){
  const page = event.first! / event.rows!;
  this.list(page);

}



}
