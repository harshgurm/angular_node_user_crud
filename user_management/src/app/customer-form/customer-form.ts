import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomerI } from '../interfaces/customer-i';
import { Customer } from '../services/customer';
import { Message } from '../services/message';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.css'],
})
export class CustomerForm implements OnInit {
  @Input() customer: CustomerI | null = null;
  router = inject(Router);
  route = inject(ActivatedRoute);
  customerId = 0;

  customerForm = new FormGroup({
    customer_first_name: new FormControl('', Validators.required),
    customer_last_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  private customerService = inject(Customer);
  private messageService = inject(Message);

  ngOnInit() {
    this.customerId = Number(this.route.snapshot.params['id']);
    if (this.customerId > 0) {
      this.customerService.getCustomerById(this.customerId).subscribe((data) => {
        const customer = Array.isArray(data) ? data[0] : data;
        if (customer) {
          this.customer = customer;
          this.customerForm.patchValue(customer);
        }
      });
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value as CustomerI;
      if (this.customerId) { // Check if we are in edit mode by using the ID from the route
        this.customerService.updateCustomer(this.customerId, formData).subscribe(() => {
          this.customerForm.reset(); // Reset form after update
          this.router.navigate(['/customers']);
          this.messageService.showSuccess('Customer updated successfully!');
        });
      } else {
        this.customerService.addCustomers(formData).subscribe(() => {
          this.customerForm.reset(); // Reset form after add
          this.router.navigate(['/customers']);
          this.messageService.showSuccess('Customer added successfully!');
        });
      }
    }
  }

  onCancel() {
    this.customerForm.reset(); // Reset form
    this.router.navigate(['/customers']);
  }
}