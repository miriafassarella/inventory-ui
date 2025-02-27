import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';
import { OwnerService, ProductsFilter } from './owner.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Owner, Person } from '../core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  owner = new Owner();
  visible?: boolean;
  owners: any = [];
  filter = new ProductsFilter();
  totalRegisters = 0;



  @ViewChild('table') table: any;

  constructor(
    private handle: ErrorHandlerService,
                  private ownerService: OwnerService,
                  private messageService: MessageService,
                  private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(page = 0) {

    this.filter.page = page;
    this.ownerService.list(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.owners = result.owners;

      })
      .catch(erro => this.handle.handle(erro));


  }

  addOwner(form: NgForm){
       this.owner.name = form.value.name;

       this.ownerService.addOwner(this.owner)
      .then(()=>{
       form.reset();
       this.visible = false;
       this.list();
       this.table.first = 0;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le propriétaire a été ajouter avec succès !' });
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
        this.owner = new Owner();
      }

      removeOwner(owner: any) {

        this.ownerService.removeOwner(owner.id)
          .then(() => {

            this.list();
            this.table.first = 0;
            this.messageService.add({ severity: 'success', detail: 'Le propriétaire a été bien supprimé !' })
          }
          ).catch(erro => this.handle.handle(erro));

      }

      removeConfirm(owner: any) {
        this.confirmationService.confirm({
          message: 'Etes-vous sûr de vouloir supprimer?',
          accept: () => {
            this.removeOwner(owner);

          }
        })

      }



}
