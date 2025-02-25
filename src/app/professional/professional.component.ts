import { Component, OnInit, ViewChild } from '@angular/core';
import { Professional } from '../core/model';
import { ProductsFilter, ProfessionalService } from './professional.service';
import { ErrorHandlerService } from '../error-handler.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

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

      showDialog(){
        this.visible = true;
        this.professional = new Professional();
      }
}
