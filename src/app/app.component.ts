import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ComponentService } from './component.service';
import { Customer } from './customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  customers: Customer[];
  errorMessage: String;
  name: String;
  lastname: String;
  customer = new Customer();

  constructor(private componentService: ComponentService) { }

  ngOnInit(): void {
    this.fetchCustomers();
  }
  fetchCustomers(): void {
    this.componentService.getCustomersWithObservable()
      .subscribe(customers => this.customers = customers,
      error => this.errorMessage = <any>error);
  }
  addCustomer(): void {
    this.componentService.addCustomerWithObservable(this.customer)
      .subscribe(customer => {
        this.fetchCustomers();
        this.reset();
        this.name = customer.name;
        this.lastname = customer.lastname;
      },
      error => this.errorMessage = <any>error);
  }
  private reset() {
    this.customer.id = null;
    this.customer.name = null;
    this.customer.lastname = null;
    this.name = null;
    this.lastname = null;
    this.errorMessage = null;
  }
}
