import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerI } from '../customer-i';
import { Customer } from '../services/customer';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-customer',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './edit-customer.html',
  styleUrl: './edit-customer.css',
})
export class EditCustomer {
  route = inject(ActivatedRoute);
  router = inject(Router);
  customerService = inject(Customer);
  customerId = 0;

  customer$!: Observable<any>;

  ngOnInit() {
    this.customerId = Number(this.route.snapshot.params['id']);
    if (this.customerId > 0) {
      this.customer$ = this.customerService.getCustomerById(this.customerId);
    }
  }

  editCustomer(form: any) {
    if (form.valid) {
      this.customerService
        .updateCustomer(this.customerId, form.form.value)
        .subscribe((result) => {
          if (result) {
            this.router.navigate(['/customers']);
          }
        });
    }
  }
}
