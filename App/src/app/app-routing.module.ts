import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventsComponent } from './components/events/events.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RootComponent } from './components/root/root.component';
import { SpecialComponent } from './components/special/special.component';
import { VerifiedSuccessComponent } from './components/verified-success/verified-success.component';
import { AuthGuard } from './gurad/auth.guard';

const routes: Routes = [
  {path: '', component:RootComponent },
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path : "events", component:EventsComponent},
  {path:"special", component:SpecialComponent,
canActivate : [AuthGuard]
},
{path:'email-verify', component:VerifiedSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppRoutingComponent=[
  LoginComponent,
  RegisterComponent,
  RootComponent,
  VerifiedSuccessComponent
]
