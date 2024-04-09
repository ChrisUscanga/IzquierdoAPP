import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service'; // Asegúrate de que la ruta sea correcta
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage  implements OnInit, OnDestroy {
  email: string | undefined;
  password: string | undefined;
  nombreCompleto: string | undefined;
  userSubscription: Subscription | undefined;

  constructor(private alertController: AlertController, private router: Router, private authService: AuthService) { } // Inyecta AuthService

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.email = user.correoElectronico;
        this.password = user.contrasenia;
        this.nombreCompleto = user.nombreCompleto;
      }
    });
}


  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.router.navigateByUrl('/inicio');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cerrar sesión cancelada');
          }
        }
      ]
    });
  
    await alert.present();
  }

  update() {
    if (this.email && this.password && this.nombreCompleto) {
      this.authService.update(this.email, this.password, this.nombreCompleto);
    } else {
      console.error('Por favor, rellena todos los campos');
    }
  }
}
