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

  pageSize: number = 5; // Número seleccionado por el usuario
  currentPage: number = 1;
  pagedProductos: Product[] = [];

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
        this.updatePagedProductos();
        console.log(this.filteredProductos);
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
    this.currentPage = 1;
    this.updatePagedProductos();
  }

  updatePagedProductos(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProductos = this.filteredProductos.slice(startIndex, endIndex);
    console.log('Mostrando:', this.pagedProductos);
  }
  onPageSizeChange(size: number): void {
    this.pageSize = +size;
    this.currentPage = 1;
    this.updatePagedProductos();
  }
}
