import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Gif} from "../giphy/giphy";

@Component({
  selector: 'app-gif-modal',
  standalone: true,
  imports: [],
  templateUrl: './gif-modal.component.html',
  styleUrl: './gif-modal.component.scss'
})
export class GifModalComponent {
  @Input() gif: Gif | undefined;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
