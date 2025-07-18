import { Component, inject } from '@angular/core';
import { Customer } from '../services/customer';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerI } from '../interfaces/customer-i';

@Component({
  selector: 'app-add-customer',
  imports: [FormsModule],
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.css',
})
export class AddCustomer {
  customerService = inject(Customer);
  router = inject(Router);

  customer: CustomerI = {
    customer_first_name: '',
    customer_last_name: '',
    city: '',
    address: '',
  };

  addCustomer(form: any) {
    if (form.valid) {
      console.log(form.form.value);
      this.customerService.addCustomers(form.form.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
