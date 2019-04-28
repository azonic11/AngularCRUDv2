import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerAddComponent } from './customer-form/customer-add.component';
const routes: Routes = [
  {
    path: 'customers',
    component: CustomersListComponent,
    data: { title: 'List of Customers' }
  },
  {
    path: 'customer-form',
    component: CustomerAddComponent,
    data: { title: 'Add Customer' }
  },
  {
    path: 'customer-form/:id',
    component: CustomerAddComponent,
    data: { title: 'Edit Customer' }
  },
  { path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
