import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  isLoadingResults = false;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  id: string;
  customer: Customer;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern('^\\+?[0-9]{3}-?[0-9]{6,12}$')]],
      email: [null, [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]]
    });
    this.id = this.route.snapshot.params.id;
    if (this.id != null) {
      this.initCustomer(this.id);
    }
  }

  initCustomer(id) {
    this.customerService.getCustomer(id).subscribe(data => {
        this.customerForm.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email
        });
        this.isLoadingResults = false;
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    if (this.id != null) {
      this.customerService.updateCustomer(this.id, form).subscribe(_ => {
          this.isLoadingResults = false;
          this.router.navigate(['/customers']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
    } else {
      this.customerService.addCustomer(form)
        .subscribe(_ => {
          this.isLoadingResults = false;
          this.router.navigate(['/customers']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }
}
