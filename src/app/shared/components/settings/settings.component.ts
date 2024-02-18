import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @Output() public processingModChanged: EventEmitter<void> = new EventEmitter<void>();
  @Output() public currencyChanged: EventEmitter<void> = new EventEmitter<void>();
  @Output() public openReport: EventEmitter<void> = new EventEmitter<void>();
  public connected: boolean = false;

  constructor(private localStorageService: LocalStorageService) {
    this.updateStatus().then( (): void => {} );
  }

  public async updateStatus(): Promise<void> {
    this.connected = !!await this.localStorageService.getItem('sessionToken');
  }
}
