import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-setting-theme',
  templateUrl: './setting-theme.component.html',
  styleUrls: ['../settings.component.scss'],
})
export class SettingThemeComponent {

  public themeIndicator: boolean = false;
  private theme: 'light' | 'dark' = 'light';

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.getItem('theme').then((value: string | null): void => {
      //TODO THEME ENUM
      this.theme = value as 'light' | 'dark';
      this.theme === 'light' ? this.themeIndicator = false : this.themeIndicator = true;
    });
  }

  public async toggleChange(): Promise<void> {
    if (this.theme === 'light') {
      await this.setDarkTheme();
    } else {
      await this.setLightTheme();
    }
  }

  private async setDarkTheme(): Promise<void> {
    this.theme = 'dark';
    document.body.classList.add('dark');
    await this.localStorageService.setItem('theme', this.theme);
  }

  private async setLightTheme(): Promise<void> {
    this.theme = 'light';
    document.body.classList.remove('dark');
    await this.localStorageService.setItem('theme', this.theme);
  }

}
