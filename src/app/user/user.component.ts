import { Component, OnInit } from '@angular/core';
import { Person } from '../core/model';
import { ProductsFilter, UserService } from './user.service';
import { ErrorHandlerService } from '../error-handler.service';
import { LazyLoadEvent } from 'primeng/api';


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

  constructor( private handle: ErrorHandlerService, private userService: UserService) { }

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

}
