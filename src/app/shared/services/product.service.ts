import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductResponse} from '../interfaces/product-response.inteface';
import {Product} from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}`);
  }

  createProducts(producto: Product): Observable<Product> {
    return this.http.post<any>(`${this.apiUrl}`,producto);
  }

}
