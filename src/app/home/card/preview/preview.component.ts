import { Component, Input, OnInit } from '@angular/core';
import Card from "../../../shared/types/Card";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent  implements OnInit {

  @Input() card: Card | undefined;

  constructor() { }

  ngOnInit(): void { }

}
