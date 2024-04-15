import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: HomeComponent, 
    children: [
      { 
        path: '', 
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
        canActivate: [authGuard] 
      }
    ]
  }, {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate : [authGuard] },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
