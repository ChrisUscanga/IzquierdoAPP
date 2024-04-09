import { CartItemComponent } from './cart-item.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
    declarations: [CartItemComponent],
    imports: [CommonModule, IonicModule],
    exports: [CartItemComponent],
})
export class CartItemModule {}