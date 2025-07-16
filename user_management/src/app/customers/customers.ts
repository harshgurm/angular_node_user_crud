import { Component, inject } from '@angular/core';
import { Customer } from '../services/customer';
import { CustomerI } from '../customer-i';
import { catchError, Observable, of } from 'rxjs';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [JsonPipe, AsyncPipe, RouterModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customerService: Customer = inject(Customer);
  error: string | null = null;
  customers$!: Observable<CustomerI[] | any>;

  constructor() {
    this.getCustomers();
  }

  getCustomers() {
    this.customers$ = this.customerService.getAllCustomers().pipe(
      catchError((error) => {
        console.log(typeof error);
        return of({ error });
      })
    );
  }

  delCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getCustomers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
