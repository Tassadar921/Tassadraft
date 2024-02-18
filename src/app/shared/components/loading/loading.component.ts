import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    IonicModule
  ]
})
export class LoadingComponent {

  constructor(
    public loadingService: LoadingService,
  ) { }
}
