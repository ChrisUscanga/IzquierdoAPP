import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSessionPageRoutingModule } from './inicio-session-routing.module';

import { InicioSessionPage } from './inicio-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSessionPageRoutingModule
  ],
  declarations: [InicioSessionPage]
})
export class InicioSessionPageModule {}
