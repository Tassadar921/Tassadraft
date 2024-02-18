import { Component, EventEmitter, Output } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class LogoutComponent {

  @Output() public logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private requestService: RequestService,
    private popoverController: PopoverController,
  ) { }

  public async logout(): Promise<void> {
    await this.requestService.logout();
    this.logoutEvent.emit();
    await this.popoverController.dismiss();
  }

}
