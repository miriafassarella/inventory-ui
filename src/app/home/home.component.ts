import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService, ProductsFilter } from './product.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../security/auth.service';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';
import { Owner, Product, Professional, Sector, Usability } from '../core/model';
import { NgForm } from '@angular/forms';
import { BarcodeComponent } from '../barcode/barcode.component';


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
  @Output() product = new Product();
  AjoutProduct: any[] = [];


  /*Pour l'ajout du numéro de série*/
  serialNumber: string[] = [];
  newCode: string = '';
  dbSerie?: boolean;


  productsAll: any[] = [];
  establishmentsAll!: any[];
  professionals!: any[];
  usabilities!: any[];
  owners: any[] = [];

  @ViewChild('table') table: any;


  clickedButton: string = ''; //variavel de controle para rastrear o botao



  visible: boolean = false;
  displayBasic: boolean = false;
  displayBasic2: boolean = false;
  stock: any = [{ name: 'Centre de services East-Angus - 099', id: 22 }, { name: 'Centre de services Coatikook - 097', id: 33 }, { name: 'Centre de services Lac-Mégantic - 098', id: 13 }

  ];


  constructor(private productService: ProductService,
    private auth: AuthService,
    private handle: ErrorHandlerService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

    this.sectorSelected = 0;
    this.establishmentsSelected = 0;
    this.clickedButton = "list all";
  }

  addProduct() {
    console.log(this.AjoutProduct);
    if (this.modelSelected) {
      this.productService.addProduct(this.AjoutProduct)
        .then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Les produits ont été ajoutés avec succès !' });
          this.closeModal();

        }).catch(erro => this.handle.handle(erro));
    } else {
      this.messageService.add({ severity: 'error', summary: 'Attention', detail: 'Il faut ajouter au moins un produit !' });
    }
    console.log(this.AjoutProduct);



  }

  listProductsAll() {
    this.productService.listProductsAll()
      .then((response: any) => {
        this.productsAll = response;

      })
  }





  listProductForEstablischment(page = 0) {

    this.filter.page = page;
    this.productService.listProductForEstablishment(this.filter, this.establishmentsSelected)
      .then(result => {
        this.totalRegisters = result.total;
        this.products = result.products;
        this.clickedButton = "list establishment"
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

  listModels() {
    this.productService.listModels()
      .then(models => {
        this.models = models.map((m: any) => ({ name: m.name, id: m.id }));
      })
  }


  listEstablishmentsAll() {
    this.productService.listEstablishmentsAll()
      .then(establishment => {
        this.establishmentsAll = establishment.map((e: any) => ({ name: e.name, id: e.id }));
      })
  }
  get productArray(): any[] {
    return this.product ? [this.product] : [];
  }


  showDialog() {
    this.visible = true;
  }
  showBasicDialog(id: number) {
    this.displayBasic = true;

    this.listEstablishmentsAll();


    this.listProfessionals();
    this.listUsabilities();
    this.listOwners();

    this.listForId(id);

  }
  showDialog2(id: number) {
    this.displayBasic2 = true;
    this.listForId(id);

  }

  listForId(id: number) {
    this.productService.searchById(id)
      .then(product => {

        if (product.name) {
          this.product.name = product.name;
        } else {
          this.product.name = null;
        }
        if (product.owner) {
          this.product.owner = product.owner;
        } else {
          this.product.owner = new Owner();
        }
        if (product.professional) {
          this.product.professional = product.professional;
        } else {
          this.product.professional = new Professional();
        }

        if (product.usability) {
          this.product.usability = product.usability
        } else {
          this.product.usability = new Usability();
        }
        if (product.establishment) {
          this.product.establishment = product.establishment;
        }
        this.product.serialNumber = product.serialNumber;
        this.product.id = product.id;
        this.product.model = product.model;
        this.product.dpurchase = product.dpurchase;



      }).catch(erro => this.handle.handle(erro));

  }

  listProfessionals() {
    this.productService.listProfessionals()
      .then(professional => {
        this.professionals = professional.map((e: any) => ({ name: e.name, id: e.id })

        );
      }).catch(erro => this.handle.handle(erro));


  }

  listUsabilities() {
    this.productService.listUsabilities()
      .then(usability => {
        this.usabilities = usability.map((e: any) => ({ name: e.name, id: e.id })

        );
      }).catch(erro => this.handle.handle(erro));


  }

  listOwners() {
    this.productService.listOwners()
      .then(owner => {
        this.owners = owner.map((e: any) => ({ name: e.name, id: e.id })

        );
      }).catch(erro => this.handle.handle(erro));

  }




  /*Méthodes pour l'ajout du numéro de série */
  codeAdd() {

    if (!this.newCode) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Le champ (Número de Série) ne peut pas être vide !' });
      return;
    }
    this.listProductsAll();
    const existingSerie = this.AjoutProduct.find(b => b.serialNumber === this.newCode);
    for (let i = 0; i < this.productsAll.length; i++) {
      if (this.productsAll[i].serialNumber === this.newCode) {
        this.dbSerie = true;
      }
    }
    if (existingSerie || this.dbSerie) {
      this.newCode = '';
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Numéro de série já existe!' });
      this.dbSerie = false;
    } else if (!this.modelSelected) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Il faut ajouter le modèle du produit !' });
    } else if (!this.stockSelected) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Il faut ajouter le Secteur !' });
    } else {
      this.product.serialNumber = this.newCode.trim();
      this.product.model.id = this.modelSelected;
      this.product.establishment.id = this.stockSelected;

      const partialProduct = {
        serialNumber: this.product.serialNumber,
        model: { id: this.product.model.id, name: this.models[(this.modelSelected - 1)].name },
        establishment: { id: this.product.establishment.id }
      }
      this.AjoutProduct.push(partialProduct);

      this.newCode = ''; // Limpa o campo de input

    }
  }

  codeRemove(index: number) {
    this.AjoutProduct.splice(index, 1);

  }

  updateProduct(form: NgForm) {

    let productUpdate = {
      id: this.product.id,
      name: form.value.name,
      serialNumber: this.product.serialNumber,
      owner: form.value.owner,
      model: this.product.model,
      usability: form.value.usability,
      professional: form.value.professional,
      establishment: this.product.establishment
    };




    if (productUpdate.owner === undefined) {
      productUpdate.owner = null;

    } else {
      productUpdate.owner = { id: this.product.owner.id };

    }

    if (form.value.usability === undefined) {
      productUpdate.usability = null;
    } else {

      productUpdate.usability = { id: this.product.usability.id };
    }
    if (form.value.professional === undefined) {
      productUpdate.professional = null;
    } else {

      productUpdate.professional = { id: this.product.professional.id };
    }





    this.productService.updateProduct(productUpdate)
      .then((product) => {
        //this.product = product;

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le produit a été modifié avec succès !' });
        this.displayBasic = false;
        if (this.clickedButton === 'list all') {
          this.list();
          this.table.first = 0;
        } else {
          this.listProductForEstablischment();
          this.table.first = 0; //usado para ir para a pagina 1 quando o produto for alterado.
        }


      }).catch(erro => this.handle.handle(erro));
  }


  removeProduct(product: any) {
    this.productService.removeProduct(product.id)
      .then(() => {
        if (this.clickedButton === "list all") {
          this.list();
          this.table.first = 0;
        } else {
          this.listProductForEstablischment();
          this.table.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Le produit a été bien supprimé !' })
      }
      )
  };


  removeConfirm(product: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer?',
      accept: () => {
        this.removeProduct(product);

      }
    })

  }
}
