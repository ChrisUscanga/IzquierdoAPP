import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FoodCardComponent } from "./food-card.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";


@NgModule({
    declarations: [FoodCardComponent],
    exports: [FoodCardComponent],
    imports: [CommonModule, IonicModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    
})
export class FoodCardModule {}