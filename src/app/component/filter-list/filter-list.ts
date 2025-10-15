import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoList } from '../../pages/producto-list/producto-list';

@Component({
  selector: 'app-filter-list',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-list.html',
  styleUrl: './filter-list.css'
})
export class FilterList {

  formFilter : FormGroup;
  filter : FormControl;

  constructor(private lista : ProductoList){

    this.filter = new FormControl('');

    this.formFilter =  new FormGroup({
      filter : this.filter
    })
  }

   buscarPorFiltro(){

    let lista = this.lista.listaProductos.filter(p => 
      p.name.toLowerCase().includes(this.filter.value.toLowerCase()) ||
      p.category.toLowerCase().includes(this.filter.value.toLowerCase())  
    );

    if (lista) {
      this.lista.listaProductos = lista;
    }    
  }
  refrescarLista(){
    this.lista.refrescarLista();
  }

}
