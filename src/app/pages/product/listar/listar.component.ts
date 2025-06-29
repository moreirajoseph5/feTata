import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {

  constructor(private producService: ProductService) {
  }
  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.producService.getProducts().subscribe({
      next: (productos) => {
        console.log(productos);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

}
