import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductoServicio } from '../../services/producto-servicio';

@Component({
  selector: 'app-producto-form',
  imports: [ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css'
})
export class ProductoForm implements OnInit {

  form: FormGroup;
  id: string;
  name: FormControl;
  price: FormControl;
  category: FormControl;
  stock: FormControl;

  esUpdate: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicio: ProductoServicio
  ) {
    this.id = "";
    this.name = new FormControl('',[Validators.required])
    this.price = new FormControl('',[Validators.required,Validators.min(0),Validators.max(500000)])
    this.category = new FormControl('',[Validators.required])
    this.stock = new FormControl('',[Validators.required])

    this.form = new FormGroup({
      name: this.name,
      price: this.price,
      category: this.category,
      stock: this.stock
    })
  }

  // Simplemente verifica si es un update para realizar el patchValue!!
  ngOnInit(): void { 
    if (this.router.url.includes("editar")) {
      this.esUpdate = true;
      this.id = this.route.snapshot.params['id'];
      

      this.servicio.getProducto(this.id).subscribe({
        next: (data) => {
          this.form.patchValue(data)
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

  // Reedirige segun la operacion!
  validarOperacion() {
    if (this.esUpdate) this.realizarPut()
    else this.realizarPost();
  }

  realizarPut() {

    let productoForm = this.form.value;
    productoForm.id = this.id;

    this.servicio.update(productoForm).subscribe({
      next: (productoActualizado) => {
        console.log(productoActualizado)
        this.router.navigate(["/productos"]);
      },
      error: (e) => console.log(e)
    });
  }

  realizarPost() {
    this.servicio.post(this.form.value).subscribe({
      next: (productoCreado) => {
        console.log(productoCreado)
        this.router.navigate(["/productos"]);
      },
      error: (e) => console.log(e)
    })
  }
}
