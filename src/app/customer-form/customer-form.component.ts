import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {DateValidator} from '../Validators/date.validator';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  isLoadingResults = false;
  firstName: string;
  lastName: string;
  birthday: Date;
  phoneNumber: string;
  email: string;
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required , Validators.maxLength(20)])],
      lastName: [null, Validators.compose([Validators.required , Validators.maxLength(20)])],
      birthday: [null, Validators.compose([Validators.required, DateValidator.dateVaidator])],
      phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern('^\\+?[0-9]{3}-?[0-9]{6,12}$')])],
      email: [null, Validators.compose([Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')])]
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
          birthday: new Date(data.birthday),
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
