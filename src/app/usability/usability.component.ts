import { Component, OnInit, ViewChild } from '@angular/core';
import { UsabilityFilter, UsabilityService } from './usability.service';
import { Usability } from '../core/model';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-usability',
  templateUrl: './usability.component.html',
  styleUrls: ['./usability.component.css']
})
export class UsabilityComponent implements OnInit {

  usability = new Usability();
  visible: boolean = false;
  totalRegisters = 0;
  filter = new UsabilityFilter();
  usabilities = [];

  @ViewChild('table') table: any;

  constructor(private usabilityService: UsabilityService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private handle: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(page = 0) {
    this.filter.page = page;
    this.usabilityService.list(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.usabilities = result.usabilities;
      }).catch(erro => this.handle.handle(erro));
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
    this.usability = new Usability();
  }

  addUsability(form: NgForm) {
    this.usability.name = form.value.name;
    this.usabilityService.addUsability(this.usability)
      .then(() => {
        form.reset();
        this.visible = false;
        this.list();
        this.table.first = 0;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Le type d'utilisation a été ajouter avec succès !" });
      }).catch(erro => this.handle.handle(erro));
  }

  removeUsability(usability: any) {
    this.usabilityService.removeUsability(usability.id)
      .then(() => {
        this.list();
        this.table.first = 0;
        this.messageService.add({ severity: 'success', detail: "Le type d'utilisation a été bien supprimé !" })
      }
      ).catch(erro => this.handle.handle(erro));
  }

  removeConfirm(usability: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer?',
      accept: () => {
        this.removeUsability(usability);
      }
    })
  }
}
