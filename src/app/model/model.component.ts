import { Component, OnInit, ViewChild } from '@angular/core';
import { Model } from '../core/model';
import { ModelFilter, ModelService } from './model.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

    model = new Model();
    visible?: boolean;
    models: any = [];
    filter = new ModelFilter();
    totalRegisters = 0;
    types = [];

    selected!: number;


    @ViewChild('table') table: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private handle: ErrorHandlerService,
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.list();
    this.listTypes();
  }

  list(page = 0){
    this.filter.page = page;
    this.modelService.list(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.models = result.models;

      })
      .catch(erro => this.handle.handle(erro));
  }

  listTypes(){
    this.modelService.listTypes()
    .then(result=>{
      this.types = result;
    })
  }

   whenChangingPage(event: LazyLoadEvent) {
          const page = event.first! / event.rows!;
          this.list(page);


        }

        closeModal() {
          this.visible = false;

        }

        showDialog(){
          this.visible = true;
          this.model = new Model();
        }

        addModel(form: NgForm) {
            this.model.name = form.value.name;
            this.model.type.id = this.selected;
            console.log(this.selected);

            this.modelService.addModel(this.model)
              .then(() => {
                form.reset();
                this.visible = false;
                this.list();
                this.table.first = 0;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le modèle de produit a été ajouter avec succès !' });
              })

          }
}
