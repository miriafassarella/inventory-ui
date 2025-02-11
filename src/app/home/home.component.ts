import { Component, Input, OnInit } from '@angular/core';
import { ProductService, ProductsFilter } from './product.service';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../security/auth.service';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';
import { Product, Sector } from '../core/model';


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
  stockSelected!: number;
  product = new Product();
  AjoutProduct: any[] = [];


  /*Pour l'ajout du numéro de série*/
  serialNumber: string[] = [];
  newCode: string = '';
  dbSerie?: boolean;


  productsAll: any[] = [];

  visible: boolean = false;
  stock: any = [{name:'Centre de services East-Angus - 099', id: 22}, {name: 'Centre de services Coatikook - 097', id: 33}, {name: 'Centre de services Lac-Mégantic - 098', id: 13}

  ];


  constructor(private productService: ProductService,
    private auth: AuthService,
    private handle: ErrorHandlerService,
    private router: Router,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.listSectors();
    this.listModels();

  }

  closeModal() {
    this.visible = false;
    this.modelSelected = 0;
    this.newCode = '';
    this.stockSelected = 0;
    this.AjoutProduct = []; //limpando o array para envio do produto
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

  addProduct() {
    console.log(this.AjoutProduct);
    if(this.modelSelected){
      this.productService.addProduct(this.AjoutProduct)
        .then(() => {
          this.messageService.add({ severity:'success', summary:'Success', detail:'Les produits ont été ajoutés avec succès !' });
          this.closeModal();

        }).catch(erro => this.handle.handle(erro));
      }else{
        this.messageService.add({ severity:'error', summary:'Attention', detail:'Il faut ajouter au moins un produit !' });
      }
      console.log(this.AjoutProduct);



  }

  listProductsAll(){
    this.productService.listProductsAll()
     .then((response: any)=> {
      this.productsAll = response;

     })
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

  /*Pas necessaire pour l'instant*/
 /*listEstablishmentsAll(){
    this.productService.listEstablishmentsAll()
    .then(establishment=> {
      this.establishments = establishment.map((e: any) => ({ name: e.name, id: e.id }));
    })
  }*/

  showDialog() {
    this.visible = true;
  }


/*Méthodes pour l'ajout du numéro de série */
  codeAdd() {

    if (!this.newCode) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Le champ (Número de Série) ne peut pas être vide !' });
      return;
    }
    this.listProductsAll();
    const existingSerie = this.AjoutProduct.find(b => b.serialNumber === this.newCode);
    for(let i= 0; i < this.productsAll.length; i++){
      if(this.productsAll[i].serialNumber === this.newCode){
          this.dbSerie = true;
      }
    }
    if (existingSerie || this.dbSerie) {
      this.newCode = '';
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Numéro de série já existe!' });
      this.dbSerie = false;
    } else if (!this.modelSelected) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Il faut ajouter le modèle du produit !' });
    }else if(!this.stockSelected){
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Il faut ajouter le Secteur !' });
    }else {
      this.product.serialNumber = this.newCode.trim();
      this.product.model.id = this.modelSelected;
      this.product.establishment.id = this.stockSelected;

      const partialProduct = {
        serialNumber: this.product.serialNumber,
        model: {id: this.product.model.id, name: this.models[(this.modelSelected - 1)].name},
        establishment: {id: this.product.establishment.id}
      }
      this.AjoutProduct.push(partialProduct);

      this.newCode = ''; // Limpa o campo de input

    }
  }

  codeRemove(index: number) {
    this.AjoutProduct.splice(index, 1);

  }
}
