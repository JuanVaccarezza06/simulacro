import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../../services/producto-servicio';
import { Router } from '@angular/router';
import { Producto } from '../../models/Producto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-list',
  imports: [ReactiveFormsModule],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css'
})
export class ProductoList implements OnInit {

  listaProductos!: Producto[]

  buscador: FormGroup;
  filtro: FormControl;

  constructor(
    public servicio: ProductoServicio,
    private router: Router
  ) {
    this.filtro = new FormControl('', [Validators.required])

    this.buscador = new FormGroup({
      filtro: this.filtro
    })
  }

  ngOnInit(): void {
    this.refrescarLista()
  }

  refrescarLista() {
    this.servicio.getAll().subscribe({
      next: (data) => this.listaProductos = data,
      error: (e) => {
        console.log(e)
      }
    })
  }

  editarProducto(id: string) {
    return this.router.navigate(['productos', id, 'editar']);
  }

  eliminarProducto(id: string) {
    return this.servicio.delete(id).subscribe({
      next: () => this.refrescarLista(),
      error: (e) => console.log(e)
    });
  }

  verDetalle(id: string) {
    return this.router.navigate(['productos', id]);
  }

  buscarPorFiltro() {

    let lista = this.listaProductos.filter(p => 
      p.name.toLowerCase().includes(this.filtro.value.toLowerCase()) ||
      p.category.toLowerCase().includes(this.filtro.value.toLowerCase())  
    );

    if (lista) {
      this.listaProductos = lista;
    }    
  }
}
