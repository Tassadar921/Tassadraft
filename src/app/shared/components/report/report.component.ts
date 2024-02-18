import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import Label from '../../types/Label';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalCloseButtonComponent } from '../modal-close-button/modal-close-button.component';
import { GithubLabelComponent } from '../github-label/github-label.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [NgFor, IonicModule, ModalCloseButtonComponent, GithubLabelComponent, NgClass, NgStyle, FormsModule]
})
export class ReportComponent  implements OnInit {

  @Input() public projectName: string = '';
  public githubLabels: Label[] = [];
  public selectedLabels: string[] = [];
  public title: string = '';
  public description: string = '';

  constructor(
    private requestService: RequestService,
    private modalController: ModalController,
  ) { }

  async ngOnInit(): Promise<void> {
    this.githubLabels = await this.requestService.prepareReport(this.projectName);
  }

  labelClicked(label: Label): void {
    if (this.selectedLabels.includes(label.name)) {
      this.selectedLabels = this.selectedLabels.filter((value: string): boolean => value !== label.name);
    } else {
      this.selectedLabels.push(label.name);
    }
  }

  public async sendReport(): Promise<void> {
    if (await this.requestService.sendReport(this.projectName, this.title, this.description, this.selectedLabels)) {
      await this.modalController.dismiss();
    }
  }
}
