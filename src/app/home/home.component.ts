import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

products = [];

constructor(private productService : ProductService, private auth: AuthService){

}

ngOnInit(): void {

  this.list();
}


list(){
  this.productService.list()
  .then(products => this.products = products);

}
usuarioLogado = this.auth.jwtPayload?.nome;
}
