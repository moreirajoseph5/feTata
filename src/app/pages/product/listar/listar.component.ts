import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductResponse} from '../../../shared/interfaces/product-response.inteface';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from '../../../shared/interfaces/products.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  allProductos!:ProductResponse;
  filteredProductos: Product[] = [];
  searchText: string = '';


  constructor(private producService: ProductService) {
  }
  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.producService.getProducts().subscribe({
      next: (productos) => {
        this.allProductos = productos;
        this.filteredProductos = productos.data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  filterProductos(): void {
    const search = this.searchText.toLowerCase().trim();
    this.filteredProductos = this.allProductos.data.filter(product =>
      Object.values(product).some(val =>
        String(val).toLowerCase().includes(search)
      )
    );
  }
}
