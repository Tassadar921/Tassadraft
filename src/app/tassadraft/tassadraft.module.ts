import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TassadraftPage } from './tassadraft.page';

import { TassadraftPageRoutingModule } from './tassadraft-routing.module';
import { ModalCloseButtonComponent } from '../shared/components/modal-close-button/modal-close-button.component';

import { SettingsModule } from '../shared/components/settings/settings.module';
import { PhotoComponent } from '../shared/components/photo/photo.component';
import { CameraComponent } from '../shared/components/camera/camera.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { PreviewComponent } from '../shared/components/preview/preview.component';
import { CardComponent } from '../shared/components/card/card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TassadraftPageRoutingModule,
    SettingsModule,
    ModalCloseButtonComponent,
    PhotoComponent,
    CameraComponent,
    LoadingComponent,
    PreviewComponent,
    CardComponent,
  ],
    declarations: [
      TassadraftPage,
    ],
})
export class TassadraftPageModule {}
