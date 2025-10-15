import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Producto } from '../../models/Producto';
import { ProductoServicio } from '../../services/producto-servicio';
import { empty } from 'rxjs';

@Component({
  selector: 'app-producto-detail',
  imports: [],
  templateUrl: './producto-detail.html',
  styleUrl: './producto-detail.css'
})
export class ProductoDetail implements OnInit {

  producto!: Producto;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    public servicio : ProductoServicio
  ){}

  ngOnInit(): void {
      this.servicio.getProducto(this.route.snapshot.params["id"]).subscribe({
      next: (producto) => this.producto = producto,
      error: (e) => console.log(e)
    })
  }

  editarProducto(id : string){
    return this.router.navigate(['productos',id,'editar']);
  }

  eliminarProducto(id : string){
    return this.servicio.delete(id).subscribe({
      next: () => this.router.navigate(['productos']),
      error: (e) => console.log(e)
    });
  }

  



}
