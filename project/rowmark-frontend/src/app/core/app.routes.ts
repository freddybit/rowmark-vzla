import { Routes } from '@angular/router';
import { HomeSectionComponent } from '../shared/home-section.component/home-section.component';
import { PublicLayoutComponent } from './layouts/public-layout.component/public-layout.component';
import { HomePublicPage } from '../pages/home-public.page/home-public.page';
import { AuthLayoutComponent } from './layouts/auth-layout.component/auth-layout.component';
import { AuthPrivatePage } from '../pages/auth-private.page/auth-private.page';
import { MyProfilePage } from '../pages/my-profile.page/my-profile.page';
import { AdminLayoutComponent } from './layouts/admin-layout.component/admin-layout.component';
import { AddStockPage } from '../pages/add-stock.page/add-stock.page';
import { LookStockPage } from '../pages/look-stock.page/look-stock.page';
import { ShoppingCartPage } from '../pages/shopping-cart.page/shopping-cart.page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'auth', redirectTo: 'auth/private', pathMatch: 'full' },
    { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    {
      path: 'auth',
      component: AuthLayoutComponent,
      children: [
        { path: 'private', component: AuthPrivatePage }
      ]
    },
    {
      path: 'admin',
      component: AdminLayoutComponent,
      children: [
        { path: 'my-profile', component: MyProfilePage },
        { path: 'product', component: AddStockPage },
        { path: 'stock', component: LookStockPage }
      ]
    },
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: 'home', component: HomePublicPage },
            { path: 'cart', component: ShoppingCartPage}
        ]
    }
]
