import { Routes } from '@angular/router';
import { ProductoList } from './pages/producto-list/producto-list';
import { ProductoForm } from './pages/producto-form/producto-form';
import { ProductoDetail } from './pages/producto-detail/producto-detail';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'productos', component: ProductoList},
    {path: 'productos/nuevo', component: ProductoForm},
    {path: 'productos/:id/editar', component: ProductoForm},
    {path: 'productos/:id', component: ProductoDetail},
];
