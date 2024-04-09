import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth.service'; // Asegúrate de importar AuthService desde la ubicación correcta

@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.page.html',
  styleUrls: ['./inicio-session.page.scss'],
})
export class InicioSessionPage implements OnInit {
  contrasena: string = '';
  formulario: FormGroup = new FormGroup({});
  email: string | undefined;
  password: string | undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password);
    } else {
      alert('Por favor, introduce tu correo electrónico y contraseña');
    }
  }
}
