import { Component, inject } from '@angular/core';
import { Customer } from '../services/customer';
import { CustomerI } from '../interfaces/customer-i';
import { catchError, Observable, of, tap } from 'rxjs';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Message } from '../services/message';

@Component({
  selector: 'app-customers',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customerService: Customer = inject(Customer);
  messageService: Message = inject(Message);
  error: string | null = null;
  customers$!: Observable<CustomerI[] | any>;

  constructor() {
    this.getCustomers();
  }

  getCustomers() {
    this.customers$ = this.customerService.getAllCustomers().pipe(
      catchError((err) => {
        this.error = 'Failed to load customers.';
        this.messageService.showError('Could not load customer data.');
        console.error(err);
        return of([]); // Return empty array on error to prevent breaking the template
      })
    );
  }

  delCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.messageService.showSuccess('Customer deleted successfully!');
        this.getCustomers();
      },
      error: (error) => {
        this.messageService.showError('Failed to delete customer.');
        console.error(error);
      },
    });
  }
}
