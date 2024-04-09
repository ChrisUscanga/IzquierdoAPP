import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { Servicios } from 'src/app/models/servicios.model';
import { FoodService } from 'src/app/services/food.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  categories: Category[] = [];
  foods: Food[] = [];
  servicios: Servicios[] = [];
  pageTitle: string = 'Productos';

  // Add new properties to control content display
  productosToggle: boolean = true;
  serviciosToggle: boolean = false;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private serviciosService: ServiciosService) { }

  ngOnInit() {
    this.getCategories();
    this.foods = this.foodService.getFoods();
    this.servicios = this.serviciosService.getServicios();
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        label: 'Maquina',
        image: 'assets/imagen/icons/pro1.png',
        active: true
      },
      {
        id: 2,
        label: 'Cera',
        image: 'assets/imagen/icons/cera.jpeg',
        active: false
      },
      {
        id: 3,
        label: 'Arte',
        image: 'assets/imagen/icons/pro1.png',
        active: false
      },
      {
        id: 4,
        label: 'Cortes de pelo',
        image: 'assets/imagen/icons/pro1.png',
        active: false
      },
    ];
  }

  showProducts() {
    this.pageTitle = 'Productos';
    this.productosToggle = true;
    this.serviciosToggle = false;
  }

  showServices() {
    this.pageTitle = 'Servicios';
    this.productosToggle = false;
    this.serviciosToggle = true;
  }

  toggleContent() {
    if (this.productosToggle) {
      this.showServices();
    } else {
      this.showProducts();
    }
  }

  onSegmentChanged(event: any) {
    this.productosToggle = event.detail.value === 'true';
    this.serviciosToggle = !this.productosToggle;
  }

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }

  // Add goToServiceDetailPage function if needed
  goToServiceDetailPage(id: number) {
    this.router.navigate(['detailSer', id]);
  }
}