import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServiciosCardComponent } from './servicios-card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServiciosCardComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [ServiciosCardComponent],
})
export class ServiciosCardModule {}