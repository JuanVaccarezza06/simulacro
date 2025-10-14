import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  imports: [ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css'
})
export class ProductoForm {

  form : FormGroup;
  id : string;
  name : FormControl;
  price : FormControl;
  category : FormControl;
  stock : FormControl;

  constructor(
    private router : Router
    private route : Route
  ){
    this.id = "";
    this.name = new FormControl('')
    this.price = new FormControl('')
    this.category = new FormControl('')
    this.stock = new FormControl('')

    this.form = new FormGroup({
      name : this.name,
      price : this.price,
      category : this.category,
      stock : this.stock
    })
  }

  validarOperacion(){
    if(this.router.url.includes("editar")) return this.router
  }

}
