import { Component } from '@angular/core';
import {ListarComponent} from './listar/listar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ListarComponent,
    RouterOutlet
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
