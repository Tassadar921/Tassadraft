import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestService } from '../../../services/request/request.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  @Output() loginEvent: EventEmitter<void> = new EventEmitter<void>();

  public showPassword:boolean = false;
  public identifier:string = '';
  public password:string = '';

  constructor(
    private requestService: RequestService,
    private popoverController: PopoverController,
  ) { }

  ngOnInit(): void {
    document.addEventListener('keydown', async (event: KeyboardEvent): Promise<void> => {
      if(event.key === 'Enter' && this.identifier && this.password){
        await this.login();
      }
    });
  }

  public async login(): Promise<void> {
    await this.requestService.login(this.identifier, this.password);
    this.loginEvent.emit();
    await this.popoverController.dismiss();
  }
}
