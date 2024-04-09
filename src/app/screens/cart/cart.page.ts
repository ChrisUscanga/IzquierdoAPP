
import { Component, OnInit, ViewChild } from '@angular/core';
import { CartItem } from '../../models/cart.item.model';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  totalAmount$: Observable<number> | undefined;
  showPaymentSummaryModal: boolean = false;
  paymentForm: FormGroup;

  @ViewChild(IonModal, { static: true, read: IonModal }) paymentSummaryModal?: IonModal;

  constructor(private cartService: CartService, private modalController: ModalController, private pdfGenerator: PdfGeneratorService,
    private alertCtrl: AlertController) {
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl(''),
      expDate: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      cvc: new FormControl(''),
    });
  }

  ngOnInit() {
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id);
  }

  onDecrease(item: CartItem) {
    if (item.quantity === 1) this.removeFromCart(item);
    else this.cartService.changeQty(-1, item.id);
  }

  processPayment() {
    forkJoin([this.cartService.getCart(), this.cartService.getTotalAmount()])
      .subscribe(([cartItems, totalAmount]) => {
        this.pdfGenerator.generateTicket(totalAmount, cartItems);
      });
  }

  showPaymentSummary() {
    this.showPaymentSummaryModal = true;
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: 'Estas seguro de eliminar este producto...',
      buttons: [
        {
          text: 'Si',
          handler: () => this.cartService.removeItem(item.id)
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  dismissModal() {
    // Implementa el método para cerrar el modal aquí
    console.log('Modal cerrado');
    this.modalController.dismiss();
  }

  presentPaymentSummaryModal() {
    if (this.paymentSummaryModal) {
      this.paymentSummaryModal.present();
    }
  }
}