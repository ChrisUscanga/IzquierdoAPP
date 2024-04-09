import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage  {

  services = [
    { name: 'Corte 1', duration: '30 min', price: 16, image: 'image1.jpg' },
    { name: 'Corte 2', duration: '30 min', price: 15, image: 'image2.jpg' },
    { name: 'Corte 3', duration: '30 min', price: 14, image: 'image3.jpg' },
    { name: 'Corte 4', duration: '30 min', price: 12, image: 'image4.jpg' },
  ];
  buttons = [
    { label: 'Reservar', icon: 'calendar' },
    { label: 'Servicios', icon: 'cut' },
    { label: 'Barberos', icon: 'people' },
    { label: 'Productos', icon: 'cart' },
    { label: 'Mis reservas', icon: 'book' },
    { label: 'Mis pedidos', icon: 'list' },
    { label: 'Tarjeta cliente', icon: 'card' },
    { label: 'Contacto', icon: 'mail' },
  ];

  constructor() { }


}
