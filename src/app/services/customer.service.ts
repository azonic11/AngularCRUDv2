import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(apiUrl)
      .pipe(
        tap(customer => console.log('Fetch customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => console.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  addCustomer(customer): Observable<Customer> {
    return this.http.post<Customer>(apiUrl, customer, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((customer1: Customer) => console.log(`added customer w/ id=${customer1.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  updateCustomer(id, customer): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, customer, httpOptions).pipe(
      tap(_ => console.log(`updated customer id=${id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  deleteCustomer(id): Observable<Customer> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Customer>(url).pipe(
      tap(_ => console.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
