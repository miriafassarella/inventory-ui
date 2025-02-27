import { Component, OnInit, ViewChild } from '@angular/core';
import { Professional } from '../core/model';
import { ProductsFilter, ProfessionalService } from './professional.service';
import { ErrorHandlerService } from '../error-handler.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {
  professional = new Professional();
  visible?: boolean;
  professionals: any = [];
  filter = new ProductsFilter();
  totalRegisters = 0;

  selected: string = "";

  @ViewChild('table') table: any;
  constructor(
    private handle: ErrorHandlerService,
    private professionalService: ProfessionalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(page = 0) {

    this.filter.page = page;
    this.professionalService.list(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.professionals = result.professionals;

      })
      .catch(erro => this.handle.handle(erro));


  }

  whenChangingPage(event: LazyLoadEvent) {
    const page = event.first! / event.rows!;
    this.list(page);


  }

  closeModal() {
    this.visible = false;

  }

  showDialog() {
    this.visible = true;
    this.professional = new Professional();
  }

  addProfessional(form: NgForm) {
    this.professional.name = form.value.name;
    this.professional.registration = form.value.registration;
    console.log(this.professional);
    this.professionalService.addProfessional(this.professional)
      .then(() => {
        form.reset();
        this.visible = false;
        this.list();
        this.table.first = 0;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Le professionnel a été ajouter avec succès !' });
      })

  }

  removeProfessional(professional: any) {

    this.professionalService.removeProfessional(professional.id)
      .then(() => {

        this.list();
        this.table.first = 0;
        this.messageService.add({ severity: 'success', detail: 'Le professional a été bien supprimé !' })
      }
      ).catch(erro => this.handle.handle(erro));

  }
  removeConfirm(professional: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer?',
      accept: () => {
        this.removeProfessional(professional);

      }
    })

  }

}
