import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../models/customer.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'phoneNumber', 'email', 'actions'];
  data: Customer[] = [];
  isLoadingResults = true;

  constructor( private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  deleteProduct(id) {
    this.isLoadingResults = true;
    this.customerService.deleteCustomer(id)
      .subscribe(_ => {
          this.isLoadingResults = false;
          this.ngOnInit();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
