import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../../services/producto-servicio';
import { Router } from '@angular/router';
import { Producto } from '../../models/Producto';

@Component({
  selector: 'app-producto-list',
  imports: [],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css'
})
export class ProductoList implements OnInit{

  constructor(
    public servicio : ProductoServicio,
    private router : Router
  ){}

  ngOnInit(): void {
    this.refrescarLista()
  }

  refrescarLista(){
    this.servicio.getAll().subscribe({
      next: (data) => this.servicio.listaProductos = data,
      error: (e) => {
        console.log(e)
      }
    })
  }

  editarProducto(id : string){
    return this.router.navigate(['productos',id,'editar']);
  }

  eliminarProducto(id : string){
    return this.servicio.delete(id).subscribe({
      next: () => this.refrescarLista(),
      error: (e) => console.log(e)
    });
  }

  

}
