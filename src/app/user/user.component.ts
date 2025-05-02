import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../core/model';
import { ProductsFilter, UserService } from './user.service';
import { ErrorHandlerService } from '../error-handler.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  person = new Person();
  filter = new ProductsFilter();
  totalRegisters = 0;
  persons = [];
  permissions = [];
  visible?: boolean;
  selected: string = "";

  @ViewChild('table') table: any;

  constructor(private handle: ErrorHandlerService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.list();
  }

  list(page = 0) {
    this.filter.page = page;
    this.userService.list(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.persons = result.users;
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
    this.person = new Person();
  }

  /*listPermissions(){
    this.userService.listPermissions()
    .then((result: any)=>{
      this.permissions = result;
      })
  }*/

  addUser(form: NgForm) {
    this.person.name = form.value.name;
    this.person.mail = form.value.email;
    this.person.password = form.value.password;
    if (this.selected === "option1") {

      this.person.permissionsIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
    } else {
      this.person.permissionsIds = [5, 6, 7, 8];
    }

    this.userService.addUser(this.person)
      .then(() => {
        form.reset();
        this.visible = false;
        this.list();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'L\'utilisateur a été ajouter avec succès !' });
      }).catch(erro => this.handle.handle(erro));
  }

  removePerson(person: any) {
    this.userService.removePerson(person.id)
      .then(() => {
        this.list();
        this.table.first = 0;
        this.messageService.add({ severity: 'success', detail: 'L\'utilisateur a été bien supprimé !' })
      }
      ).catch(erro => this.handle.handle(erro));
  }
  removeConfirm(person: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer?',
      accept: () => {
        this.removePerson(person);
      }
    })
  }
}
