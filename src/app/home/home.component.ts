import { Component, Input, OnInit } from '@angular/core';
import { ProductService, ProductsFilter } from './product.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../security/auth.service';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';
import { Sector } from '../core/model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalRegisters = 0;
  filter = new ProductsFilter();
  products = [];
  sectors = [];
  models: any = [];

  establishments = [];
  sectorSelected?: number;
  establishmentsSelected?: number;
  modelSelected!: number;

  /*Pour l'ajout du numéro de série*/
  serialNumber: string[] = [];
  newCode: string = '';


  visible: boolean = false;

  constructor(private productService: ProductService,
    private auth: AuthService,
    private handle: ErrorHandlerService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.listSectors();
    this.listModels();
    this.listEstablishmentsAll();
  }


  list(page = 0) {

    this.filter.page = page;
    this.productService.list(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.products = result.products;
      })
      .catch(erro => this.handle.handle(erro));


  }

  listProductForEstablischment(page = 0) {

    this.filter.page = page;
    this.productService.listProductForEstablishment(this.filter, this.establishmentsSelected)
      .then(result => {
        this.totalRegisters = result.total;
        this.products = result.products;

      })
      .catch(erro => this.handle.handle(erro));
  }

  whenChangingPage(event: LazyLoadEvent) {
    const page = event.first! / event.rows!;
    if (!this.establishmentsSelected) {
      this.list(page);
    } else {
      this.listProductForEstablischment(page);
    }
  }

  listSectors() {
    this.productService.listSectors()
      .then(result => {
        this.sectors = result.map((s: any) => ({ name: s.name, id: s.id }));
      })
  }

  listEstablishments() {
    this.productService.listEstablishments(this.sectorSelected!)
      .then(establishments => {
        this.establishments = establishments.map((e: any) => ({ name: e.name, id: e.id }));
      })
  }

  listModels(){
    this.productService.listModels()
    .then(models=>{
      this.models = models.map((m: any) => ({ name: m.name, id: m.id }));
    })
  }

  listEstablishmentsAll(){
    this.productService.listEstablishmentsAll()
    .then(establishment=> {
      this.establishments = establishment.map((e: any) => ({ name: e.name, id: e.id }));
    })
  }

  showDialog() {
    this.visible = true;
  }


/*Méthodes pour l'ajout du numéro de série */
  codeAdd() {
    if (this.newCode.trim()) {
      this.serialNumber.push(this.newCode.trim());
      this.newCode = ''; /* Nettoyer le champ (input) après l'avoir ajouter*/
    }
  }

  codeRemove(index: number) {
    this.serialNumber.splice(index, 1);
  }
}
