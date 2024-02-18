import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import Label from '../../types/Label';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalCloseButtonComponent } from '../modal-close-button/modal-close-button.component';
import { GithubLabelComponent } from '../github-label/github-label.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [NgFor, IonicModule, ModalCloseButtonComponent, GithubLabelComponent]
})
export class ReportComponent  implements OnInit {

  public labels: Label[] = [];

  constructor(
    private requestService: RequestService
  ) { }

  async ngOnInit(): Promise<void> {
    this.labels = await this.requestService.prepareReport('Tassadraft');
  }
}
