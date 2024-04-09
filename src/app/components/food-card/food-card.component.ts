import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent   {
  @Input() item!: Food;
  @Output() clicked = new EventEmitter();


  slideOptions = {
    slidesPerView: 'auto',
    zoom: false,
    spaceBetween: 10,
    grabCursor: true,
  };
  
}
