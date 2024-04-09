import { Injectable } from "@angular/core";
import { Servicios } from "../models/servicios.model";


@Injectable ({
    providedIn: "root"
})
export class ServiciosService {
    getServicios(): Servicios[] {
        return [
            {
                id: 1,
                title: 'Corte de pelo Normal',
                price: 150,
                image: 'assets/imagen/corte/s1.png',
                description: 
                    'Manten tu esensia limbia y mas si es con nosotros\n' +
                    'el corte de pelo incluyue corte de cabello y barba'
            },
            {
                id: 2,
                title: 'Corte de pelo Estudiante',
                price: 100,
                image: 'assets/imagen/corte/s2.png',
                description: 
                    'si eres estuduiante no esperes mas y te esperamos para tu corte de cabello.\n' +
                    'Solo es valido si al orte de cabello muestras tu credencial de estudiante vigente.'
            },
            {
                id: 3,
                title: 'Tinte de pelo mas corte',
                price: 400,
                image: 'assets/imagen/corte/s3.png',
                description: 
                    'No esperes mas con un corte de cabello moderno y con un tinte de cabello. '
            },
            {
                id: 4,
                title: 'Corte de pelo mas risos ',
                price: 400,
                image: 'assets/imagen/corte/s4.png',
                description: 
                    'NO ESPERES MAS,\n\n' +
                    'De los mejores estilos para este 2024,\n' +
                    'con un corte de cabello al estilo Izquierdo.\n\n' +
                    'con unos risos permanentes.\n'
            },
        ];
    }

    getFood(id: number): Servicios | undefined {
        return this.getServicios().find((servicios) => servicios.id == id);
    }
    
}