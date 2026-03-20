import { Routes } from '@angular/router';
import { HomeSectionComponent } from '../shared/home-section.component/home-section.component';
import { PublicLayoutComponent } from './layouts/public-layout.component/public-layout.component';
import { HomePublicPage } from '../pages/home-public.page/home-public.page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: 'home', component: HomePublicPage }
        ]
    }
]
