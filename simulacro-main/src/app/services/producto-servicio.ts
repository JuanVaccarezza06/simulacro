import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { escapeRegExp } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicio {

  readonly API_URL = "http://localhost:3000/products"

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<Producto[]>(this.API_URL);
  }

  getProducto(id: string) {
    return this.http.get<Producto>(`${this.API_URL}/${id}`);
  }

  post(producto : Producto) {
    return this.http.post<Producto>(this.API_URL,producto);
  }

  delete(id: string) {
    return this.http.delete<Producto>(`${this.API_URL}/${id}`);
  }

  update(productoActualizar: Producto) {
    return this.http.put<Producto>(`${this.API_URL}/${productoActualizar.id}`, productoActualizar);
  }



}
