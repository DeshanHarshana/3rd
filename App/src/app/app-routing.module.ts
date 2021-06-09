import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RootComponent } from './components/root/root.component';

const routes: Routes = [
  {path: '', component:RootComponent },
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppRoutingComponent=[
  LoginComponent,
  RegisterComponent,
  RootComponent
]
