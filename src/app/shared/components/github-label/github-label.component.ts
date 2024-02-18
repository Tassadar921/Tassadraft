import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import Label from '../../types/Label';
import { NgIf, NgStyle } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-github-label',
  templateUrl: './github-label.component.html',
  styleUrls: ['./github-label.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    IonicModule,
    NgStyle
  ]
})
export class GithubLabelComponent implements OnInit {

  @Input() public label: Label | undefined;
  @Output() public labelClick: EventEmitter<Label> = new EventEmitter<Label>();

  public backgroundColor: string = '';
  public textColor: string = '';
  public borderColor: string = '';

  constructor() { }

  public ngOnInit(): void {
    this.setBackgroundColor();
  }

  public setBackgroundColor(): void {
    const r: number = parseInt(this.label?.color.slice(0, 2) ?? '', 16);
    const g: number = parseInt(this.label?.color.slice(2, 4) ?? '', 16);
    const b: number = parseInt(this.label?.color.slice(4, 6) ?? '', 16);

    this.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
    this.textColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
    this.borderColor = `rgba(${r}, ${g}, ${b}, 0.7)`;
  }
}
