import { Injectable } from "@angular/core";
import { Food } from "../models/food.model";

@Injectable ({
    providedIn: "root"
})
export class FoodService {
    getFoods(): Food[] {
        return [
            {
                id: 1,
                title: 'Champú diario para el pelo',
                price: 150,
                image: 'assets/imagen/corte/1.png',
                description: 
                    'Limpia, Hidrata, Refresca y estimula el cuero cabelludo\n' +
                    'Daily Shampoo está impregnado de nuestra Formula Tonic Blend de Witch Hazel, ortiga'
            },
            {
                id: 2,
                title: 'Peine Pompadour para el pelo',
                price: 100,
                image: 'assets/imagen/corte/2.png',
                description: 
                    'Peine ahuecador de alta calidad de 8 púas muy separadas. Ideal Pompadour.\n'
            },
            {
                id: 3,
                title: 'SUPERSTRONG HEY JOE',
                price: 170,
                image: 'assets/imagen/corte/3.png',
                description: 
                    'Para que en tu barbería nunca te falte HEY JOE! hemos creado el formato profesional XXL, 1000 gramos de nuestra mejor pomada. '
            },
            {
                id: 4,
                title: 'Tarro desinfectante',
                price: 500,
                image: 'assets/imagen/corte/4.png',
                description: 
                    'VASO de VIDRIO,\n\n' +
                    'Hecho de vidrio duradero de alta calidad con tapa de acero inoxidable.\n' +
                    '8 cm de altura y 7 cm de diámetro. Capacidad 160 ml.\n\n'
            },
        ];
    }

    getFood(id: number): Food | undefined {
        return this.getFoods().find((food) => food.id == id);
    }
    
}