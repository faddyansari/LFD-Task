import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './helpers/AuthGuard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


 const routes: Routes = [
  {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent
},

  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
