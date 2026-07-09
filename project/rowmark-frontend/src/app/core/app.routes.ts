import { Routes } from '@angular/router';
import { HomeSectionComponent } from '../shared/public-layout/home-section.component/home-section.component';
import { PublicLayoutComponent } from './layouts/public-layout.component/public-layout.component';
import { HomePublicPage } from '../pages/home-public.page/home-public.page';
import { AuthLayoutComponent } from './layouts/auth-layout.component/auth-layout.component';
import { AuthPrivatePage } from '../pages/auth-private.page/auth-private.page';
import { MyProfilePage } from '../pages/my-profile.page/my-profile.page';
import { AdminLayoutComponent } from './layouts/admin-layout.component/admin-layout.component';
import { ShoppingCartPage } from '../pages/shopping-cart.page/shopping-cart.page';
import { MaterialManagementComponent } from '../shared/admin-layout/material-management.component/material-management.component';
import { ColorManagementComponent } from '../shared/admin-layout/color-management.component/color-management.component';
import { FinishManagementComponent } from '../shared/admin-layout/finish-management.component/finish-management.component';
import { CapabilityManagementComponent } from '../shared/admin-layout/capability-management.component/capability-management.component';
import { DeepthManagementComponent } from '../shared/admin-layout/deepth-management.component/deepth-management.component';
import { RoleManagementComponent } from '../shared/roles/role-management.component/role-management.component';
import { CreateRoleComponent } from '../shared/roles/create-role.component/create-role.component';
import { UserManagementComponent } from '../shared/roles/user-management.component/user-management.component';
import { AttributesManagementComponent } from '../shared/admin-layout/attributes-management.component/attributes-management.component';
import { SheetSizeManagementComponent } from '../shared/admin-layout/sheet-size-management.component/sheet-size-management.component';
import { AddProductFormComponent } from '../shared/admin-layout/add-product-form.component/add-product-form.component';
import { ProductManagementComponent } from '../shared/admin-layout/product-management.component/product-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'auth/private', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{ path: 'private', component: AuthPrivatePage }],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'my-profile', component: MyProfilePage },
      { path: 'profiles/all', component: UserManagementComponent },
      { path: 'roles', component: RoleManagementComponent },
      { path: 'roles/create', component: CreateRoleComponent },
      { path: 'product', component: AddProductFormComponent },
      { path: 'product/:id', component: AddProductFormComponent },
      { path: 'stock', component: ProductManagementComponent },
      { path: 'attributes/material', component: MaterialManagementComponent },
      { path: 'attributes/color', component: ColorManagementComponent },
      { path: 'attributes/finish', component: FinishManagementComponent },
      { path: 'attributes', component: AttributesManagementComponent },
      { path: 'attributes/capability', component: CapabilityManagementComponent },
      { path: 'attributes/dimension', component: SheetSizeManagementComponent },
      { path: 'attributes/engravingDepth', component: DeepthManagementComponent },
    ],
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'home', component: HomePublicPage },
      { path: 'cart', component: ShoppingCartPage },
    ],
  },
];
