import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetalleServicios {
    id: number;
    minutosTotal: number;
    servicio1: string;
    precio1: number;
    servicio2: string;
    precio2: number;
    fecha: Date;
    horaDeLLegada: string;
}

@Injectable({
    providedIn: 'root'
})
export class DetalleReservaService {

    private apiUrl = 'http://localhost:8080/DetalleServicios';

    constructor(private http: HttpClient) { }

    getDetalleServicios(): Observable<DetalleServicios[]> {
        console.log('Obteniendo la lista de DetalleServicios...');
        return this.http.get<DetalleServicios[]>(this.apiUrl + '/list');
    }

    createDetalleServicio(detalleServicio: DetalleServicios): void {
        console.log('Verificando disponibilidad de la reserva...');
        this.getDetalleServicios().subscribe(servicios => {
            if (servicios.some(s => s.fecha === detalleServicio.fecha && s.horaDeLLegada === detalleServicio.horaDeLLegada)) {
                console.log('La fecha y hora seleccionadas ya han sido reservadas.');
                alert('La fecha y hora seleccionadas ya han sido reservadas.');
            } else {
                console.log('Creando un nuevo DetalleServicio...');
                this.http.post<DetalleServicios>(this.apiUrl + '/create', detalleServicio).subscribe(newServicio => {
                    console.log('DetalleServicio creado:', newServicio);
                });
            }
        });
    }
}
