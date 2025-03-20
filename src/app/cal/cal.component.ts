import { Component, input, model } from '@angular/core';
import { Photo } from '../data/Photo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cal',
  imports: [CommonModule],
  templateUrl: './cal.component.html',
  styleUrl: './cal.component.css'
})
export class CalComponent {

  public readonly photos = input<Photo>();
  
  public readonly mode = model<"edit" | "display">("display");

  uploadMode() {
    this.mode.update(() => "edit");
    }  

  changeModel() {
    this.mode.update(() => "display");
  }
}
