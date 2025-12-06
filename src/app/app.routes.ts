import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';


export const routes: Routes = [
  { path: '', component: Home, title: 'Pabs & Revs Laptops' },
  { path: 'details/:id', component: Details, title: 'Laptop Details' },
];
