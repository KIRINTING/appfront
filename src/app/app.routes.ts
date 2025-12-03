import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { authGuard } from './services/auth-guard';

import { Dashboard } from './Admin/dashboard/dashboard';
import { CustomersComponent } from './Admin/customers/customers';
import { CategoriesComponent } from './Admin/categories/categories';
import { ProductsComponent } from './Admin/products/products';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { ProductEditComponent } from './Admin/products/product-edit';
import { CartComponent } from './cart/cart';
import { Marketdashboard } from './marketdashboard/marketdashboard';
import { OrdersComponent } from './Admin/order/order';
import { BillComponent } from './Admin/bill/bill';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'marketdashboard', component: Marketdashboard },
    { path: 'cart', component: CartComponent },
    {
        path: 'Admin',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'customers', component: CustomersComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'order', component: OrdersComponent },

            { path: 'products/create', component: ProductEditComponent },
            { path: 'products/edit/:id', component: ProductEditComponent },
            { path: 'bill', component: BillComponent },
        ]
    }
];