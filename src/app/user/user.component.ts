import { Component, OnInit } from '@angular/core';
import { Person } from '../core/model';
import { ProductsFilter, UserService } from './user.service';
import { ErrorHandlerService } from '../error-handler.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
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
  visible?: boolean;
  selected: string = "";




  constructor( private handle: ErrorHandlerService,
              private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.list();
  }

  list(page = 0) {

    this.filter.page = page;
    this.userService.list(this.filter)
      .then(result => {
        this.totalRegisters = result.total;
        this.persons = result.users;
        console.log(this.persons);
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
    }

    addUser(form: NgForm){
     this.person.name = form.value.name;
     this.person.mail = form.value.email;
     this.person.password = form.value.password;
     if(this.selected === "option1"){
      this.person.permissionsIds = [1, 2, 3, 4, 5, 6, 7, 8]; /*API - à changer*/
     }else{
      this.person.permissionsIds = [5, 6, 7, 8];/*API - à changer */
     }
     this.userService.addUser(this.person)
     .then(()=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'L\'utilisateur a été ajouter avec succès !' });
     })
    }


}
