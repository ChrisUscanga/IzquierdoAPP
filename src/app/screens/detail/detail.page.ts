import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { FoodService } from '../../services/food.service';
import { CartItem } from 'src/app/models/cart.item.model';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: number;
  food: Food | undefined;
  slider: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private toasCtrl: ToastController,
    ) {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
  }

  ngOnInit() {
    this.food = this.foodService.getFood(this.id);
    if (!this.food) {
      console.error('Error al encontrar el objecto', this.id);
    }
  }
  sliderBanner(): void{
    this.slider = [
      {banner: 'assets/imagen/icons/-IZQUIERDO-.png'},
      {banner: 'assets/imagen/icons/banner2.png'},
      {banner: 'assets/imagen/icons/banner3.png'}
    ];
  }

  addItemtoCart() {
    if (!this.food) {
      console.error('Error en el detail.page.ts en el card item');
      return;
    }
  
    const cartitem: CartItem = {
      id: this.food.id,
      name: this.food.title,
      price: this.food.price,
      image: this.food.image || '',
      quantity: 1,
    };

    this.cartService.addToCart(cartitem);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toasCtrl.create({
      message: 'Se ha agregado al carrito',
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });

    toast.present();
  }
  
  }
