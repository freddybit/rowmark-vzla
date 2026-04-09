import { Routes } from '@angular/router';
import { HomeSectionComponent } from '../shared/home-section.component/home-section.component';
import { PublicLayoutComponent } from './layouts/public-layout.component/public-layout.component';
import { HomePublicPage } from '../pages/home-public.page/home-public.page';
import { AuthLayoutComponent } from './layouts/auth-layout.component/auth-layout.component';
import { AuthPrivatePage } from '../pages/auth-private.page/auth-private.page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'auth', redirectTo: 'auth/private', pathMatch: 'full' },
    {
      path: 'auth',
      component: AuthLayoutComponent,
      children: [
        { path: 'private', component: AuthPrivatePage }
      ]
    },
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: 'home', component: HomePublicPage }
        ]
    }
]
