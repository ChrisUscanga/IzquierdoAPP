import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage  {
  email: string | undefined;
  password: string | undefined;
  nombreCompleto: string | undefined;

  constructor(private authService: AuthService) { } // Inyecta AuthService

  
  register() {
    if (this.email && this.password && this.nombreCompleto) {
      this.authService.register(this.email, this.password, this.nombreCompleto);
    } else {
      console.error('Por favor, rellena todos los campos');
    }
  }
}
