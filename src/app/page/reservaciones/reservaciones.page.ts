import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/SharedData.service';
import { ReservasService } from '../../services/reservas.service';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { jsPDF } from 'jspdf'; // Importa jsPDF para generar el PDF

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {
  selectedDate: string | undefined;
  selectedDateText: string | undefined;
  serviceMessage: string | undefined;
  timeMessage: string | undefined;

  reservas: any[] = []; // Array para almacenar las reservas

  constructor(
    private sharedDataService: SharedDataService,
    private reservasService: ReservasService,
    private router: Router // Inyecta el Router
  ) { }

  ngOnInit() {
    this.sharedDataService.currentDate.subscribe(date => {
      this.selectedDate = date;
      if (date) {
        let dateObj = new Date(date);
        this.selectedDateText = `Fecha para reservación: ${dateObj.toLocaleDateString()} a las ${dateObj.toLocaleTimeString()}`;
      }
    });
  }

  public pickerColumns = [
    {
      name: 'servicio',
      options: [
        {
          text: 'Corte basico',
          value: '30',
        },
        {
          text: 'Corte Moderno',
          value: '30',
        },
        {
          text: 'Corte Vip',
          value: '60',
        },
      ],
    },
    {
      name: 'servicioExtra',
      options: [
        {
          text: 'Barba Basica',
          value: '30',
        },
        {
          text: 'Barba Vip',
          value: '30',
        },
        {
          text: 'Sin barba',
          value: '0',
        },
      ],
    },
    
  ];

   // Modifica el handler del botón 'Confirmar' para guardar la reserva en el array
   public pickerButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Confirmar',
      handler: (value: { servicio: { text: any; value: string; }; servicioExtra: { text: any; value: string; }; }) => {
        let totalTime = parseInt(value.servicio.value) + parseInt(value.servicioExtra.value);
        this.serviceMessage = `Usted ha seleccionado el servicio de ${value.servicio.text} con ${value.servicioExtra.text}`;
        this.timeMessage = `El tiempo total del servicio es de ${totalTime} minutos`;

        let reserva = {
          servicio: value.servicio.text,
          horaLlegada: this.selectedDate,
          minTotal: totalTime,
          servicioExtra: value.servicioExtra.text,
          fecha: this.selectedDate
        };

        // Guarda la reserva en el array en lugar de crearla inmediatamente
        this.reservas.push(reserva);
      },
    },
  ];

  // Agrega un nuevo método para manejar la navegación y la creación de reservas
  enviarReservas() {
    // Aquí puedes iterar sobre el array 'reservas' y crear cada reserva
    this.reservas.forEach(reserva => {
      this.reservasService.createReserva(reserva).subscribe(
        _res => console.log('Reserva creada con éxito'),
        err => console.error('Error al crear la reserva', err)
      );
    });
    // Imprime la información de todas las reservas en la consola
    console.log('Todas las reservas:', this.reservas);
    // Navega a la página deseada después de crear las reservas
    this.router.navigateByUrl('/home');
  }

  generarPDF() {
    let doc = new jsPDF();
  
    // Cambia el tamaño y el tipo de fuente
    doc.setFontSize(20);
    doc.setFont("Poppions", "normal");
  
    // Añade un encabezado a la primera página
    doc.text("IZQUIERDO BARBAR SHOP", 10, 10);
  
    this.reservas.forEach((reserva, index) => {
      let reservaTexto = `Reserva ${index + 1}:\nServicio: ${reserva.servicio}\nHora de llegada: ${reserva.horaLlegada}\nDuración total: ${reserva.minTotal} minutos\nServicio extra: ${reserva.servicioExtra}\nFecha: ${reserva.fecha}\n\n`;
  
      // Añade el texto de la reserva al PDF
      doc.text(reservaTexto, 10, 30 + index * 20);
  
      // Si el PDF se está volviendo demasiado largo, añade una nueva página
      if (30 + index * 20 > 250) {
        doc.addPage();
      }
    });
    
    doc.save('reservas.pdf');
  }
  
}