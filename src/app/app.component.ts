import { Component, inject, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalComponent } from "./cal/cal.component";
import { PhotoService } from './data/Photo.Service';


@Component({
  selector: 'app-root',
  imports: [CalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test1';

  private readonly photos = inject(PhotoService);
  public readonly photosList = this.photos.photosList;

  public readonly aspect = model<"appl" | "accueil">("accueil");

  uploadMode() {
    this.aspect.update(() => "appl");
  }
}
