import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { authGuard } from './services/auth-guard';

import { Dashboard } from './dashboard/dashboard';
import { CustomersComponent } from './customers/customers';
import { CategoriesComponent } from './categories/categories';
import { ProductsComponent } from './products/products';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { ProductEditComponent } from './product-edit/product-edit';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },


    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'customers', component: CustomersComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'products', component: ProductsComponent },
            
            { path: 'products/create', component: ProductEditComponent },
            { path: 'products/edit/:id', component: ProductEditComponent }
        ]
    }
];
