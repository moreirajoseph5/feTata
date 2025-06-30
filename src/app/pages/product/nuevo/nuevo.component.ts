import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../../shared/services/product.service';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private producService: ProductService) {
    const hoy = new Date();
    const hoyString = hoy.toISOString().split('T')[0];
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: [],
      descripcion: ['', Validators.required],
      logo: ['', Validators.required],
      fechaLiberacion: [hoyString],
      fechaRevision: [hoyString]
    });
  }

  onReset() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.producService.createProducts(formData).subscribe({
        next: (productos) => {
         console.log(productos);
        },
        error: (err) => {
          console.error('Error al obtener productos:', err);
        }
      });

    }
  }
}
