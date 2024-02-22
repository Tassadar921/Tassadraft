import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TassacardsPageRoutingModule } from './tassacards-routing.module';

import { TassacardsPage } from './tassacards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TassacardsPageRoutingModule
  ],
  declarations: [TassacardsPage]
})
export class TassacardsPageModule {}
