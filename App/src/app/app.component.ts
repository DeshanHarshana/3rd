import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';

  constructor(public _authService:AuthService

    ){}


}
