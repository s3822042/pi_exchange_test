import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {Gif} from "../giphy/giphy";

@Component({
  selector: 'app-gif-item',
  standalone: true,
  templateUrl: './gif-item.component.html',
  styleUrls: ['./gif-item.component.scss'],
  imports: [
    NgIf
  ]
})
export class GifItemComponent {
  @Input() gif: Gif | undefined;
  @Output() openModal = new EventEmitter<Gif>();
  isHovered: boolean = false;

  constructor() {
  }
}
