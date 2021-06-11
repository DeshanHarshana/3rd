import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './components/login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RootComponent } from './components/root/root.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventsComponent } from './components/events/events.component';
import { SpecialComponent } from './components/special/special.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';

import { EventService } from './services/event.service';
import { AuthGuard } from './gurad/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RootComponent,
    DashboardComponent,
    EventsComponent,
    SpecialComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressSpinnerModule
  ],
  providers: [AuthService, EventService, AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
