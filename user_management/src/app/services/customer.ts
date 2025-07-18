import { Injectable, inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CustomerI } from '../interfaces/customer-i';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Customer {

  http:HttpClient = inject(HttpClient);

  apiUrl:string = "http://localhost:3000/";

  getCustomerById(customer_id:number) : Observable<CustomerI>{
    // const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':  this.token ? this.token : ''});
    // const options = {headers:headers};
    // return this.http.get(`${this.apiUrl}customers/${customer_id}`, options);
    return this.http.get<CustomerI>(`${this.apiUrl}customers/${customer_id}`);
  }

  getAllCustomers() : Observable<CustomerI[]>{

    // const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':  this.token ? this.token : ''});
    // const options = {headers:headers};
    // return this.http.get('${this.apiUrl}customers/', options);
    return this.http.get<CustomerI[]>(`${this.apiUrl}customers/`);
  }

  addCustomers(data: CustomerI){
    return this.http.post<CustomerI>(`${this.apiUrl}customers/`, data);
  }

  deleteCustomer(id:number){
    return this.http.delete(`${this.apiUrl}delete/${id}`);
  }

  updateCustomer(id:number, data: CustomerI){
    return this.http.put<CustomerI>(`${this.apiUrl}update/${id}`, data);
  }
}
