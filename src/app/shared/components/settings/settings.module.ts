import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { SettingThemeComponent } from './setting-theme/setting-theme.component';
import { SettingCurrencyComponent } from "./setting-currency/setting-currency.component";
import { LogoutComponent } from '../logout/logout.component';
import { LoginComponent } from '../login/login.component';
import { SettingProcessingModeComponent } from "./setting-processing-mode/setting-processing-mode.component";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";


@NgModule({
  providers: [LogoutComponent],
  declarations: [
    SettingsComponent,
    SettingThemeComponent,
    SettingCurrencyComponent,
    SettingProcessingModeComponent,
    CapitalizePipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LoginComponent,
    LogoutComponent,
  ],
  exports: [
    SettingsComponent,
    SettingThemeComponent,
    SettingCurrencyComponent,
    CapitalizePipe,
  ]
})
export class SettingsModule { }
