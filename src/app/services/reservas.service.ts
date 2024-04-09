import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  checkReserva(fecha: string): Observable<boolean> {
    return this.http.get(`http://localhost:8080/servicios/list`)
      .pipe(
        map((res: any) => {
          const isBooked = res.some((reserva: any) => reserva.fecha === fecha);
          if (isBooked) {
            console.log('Ya existe una reserva en esta fecha. Por favor, elige otro día.');
          } else {
            console.log('Fecha disponible para reservar.');
          }
          return isBooked;
        }),
        catchError(error => {
          console.error('Intento de consulta de fecha fallida', error);
          throw error;
        })
      );
  }
  
  

  createReserva(reserva: any): Observable<any> {
    return this.http.post(`http://localhost:8080/servicios/create`, reserva)
      .pipe(
        tap(() => console.log('Reserva exitosa')),
        catchError(error => {
          console.error('Reserva rechazada', error);
          throw error;
        })
      );
  }
}
