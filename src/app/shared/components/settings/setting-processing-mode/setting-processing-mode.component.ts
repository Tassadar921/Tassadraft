import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from "../../../services/localStorage/local-storage.service";
import { ProcessingModeEnum } from "../../../types/ProcessingModeEnum";
import { GetCardsNameService } from "../../../services/get-cards-name/get-cards-name.service";

@Component({
  selector: 'app-setting-processing-mode',
  templateUrl: './setting-processing-mode.component.html',
  styleUrls: ['../settings.component.scss'],
})
export class SettingProcessingModeComponent {

  @Output() public processingModChanged: EventEmitter<void> = new EventEmitter<void>();
  protected readonly ProcessingModeEnum: typeof ProcessingModeEnum = ProcessingModeEnum;
  protected readonly Object: ObjectConstructor = Object;
  public selectedProcessingMode: ProcessingModeEnum = ProcessingModeEnum.local;

  constructor(
    private localStorageService: LocalStorageService,
    private getCardsNameService: GetCardsNameService
  ) {
    this.localStorageService.getItem('processingMode').then((processingMode: string | null): void => {
      this.selectedProcessingMode = processingMode as ProcessingModeEnum ?? ProcessingModeEnum.local;
    });
  }

  public async newModeSelected(): Promise<void> {
    await this.localStorageService.setItem('processingMode', this.selectedProcessingMode);
    if (this.selectedProcessingMode === ProcessingModeEnum.local) {
      if (!this.getCardsNameService.getWordsDataBase().length) {
        await this.getCardsNameService.setWordsDataBase();
      }
      if (!this.getCardsNameService.getCardNamesDataBase().length) {
        await this.getCardsNameService.setCardNamesDataBase();
      }
    }
    this.processingModChanged.emit();
  }
}
