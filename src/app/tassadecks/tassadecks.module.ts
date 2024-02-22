import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TassadecksPageRoutingModule } from './tassadecks-routing.module';

import { TassadecksPage } from './tassadecks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TassadecksPageRoutingModule
  ],
  declarations: [TassadecksPage]
})
export class TassadecksPageModule {}
