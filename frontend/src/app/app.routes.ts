import { Routes } from '@angular/router';
import { AuthGuard } from './screens/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./screens/home/home.component').then(m => m.HomeComponent  ),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./screens/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./screens/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
];