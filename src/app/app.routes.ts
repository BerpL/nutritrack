import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/main/main.component').then((m) => m.MainComponent),
    children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      {
        path: 'upload',
        loadComponent: () =>
          import('./features/main/upload/upload.component').then(
            (m) => m.UploadComponent
          ),
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./features/main/form/form.component').then(
            (m) => m.FormComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
