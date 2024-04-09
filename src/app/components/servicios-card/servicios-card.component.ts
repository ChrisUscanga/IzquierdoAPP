import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/SharedData.service';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-servicios-card',
  templateUrl: './servicios-card.component.html',
  styleUrls: ['./servicios-card.component.scss'],
})
export class ServiciosCardComponent {
  minDate: string;
  maxDate: string;
  selectedDate: string | undefined;
  selectedTime: string | undefined; // Asegúrate de tener un selector de tiempo en tu HTML

  constructor(private router: Router,  private sharedDataService: SharedDataService, private reservasService: ReservasService) {
    let today = new Date();
    this.minDate = today.toISOString();
    this.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();
  }

  onButtonClick() {
  if (this.selectedDate && this.selectedTime) { 
    console.log(this.selectedDate);
    this.sharedDataService.setDate(this.selectedDate);
    this.reservasService.checkReserva(this.selectedDate)
      .subscribe(isBooked => {
        if (isBooked) {
          console.log('Ya hay una reserva en esta fecha y hora');
        } else {
          this.router.navigate(['/home/reservaciones']);
        }
      });
  } else {
    console.log('Te faltó la fecha o la hora');
  }
}

}
