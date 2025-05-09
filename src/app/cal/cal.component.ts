import { Component, inject, input, model } from '@angular/core';
import { Photo } from '../data/Photo';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-cal',
  imports: [CommonModule],
  templateUrl: './cal.component.html',
  styleUrl: './cal.component.css'
})
export class CalComponent {

//  constructor (private api: GoogleAPIService){}
    
  
  public readonly photos = input<Photo>();
  public readonly mode = model<"edit" | "display">("display");

  getImageSource(url: string): string {
    // Vérifie si l'URL est déjà un lien complet (absolu) ou si elle est relative
    if (!url) {
      return 'images/im1.jpg'
    }
    else if (url.startsWith('https://')) {
      return url; // L'URL est déjà absolue (Google Photos ou autre)
    } else {
      return '/assets' + url; // Les images locales sont sous /assets
    }
  }  

  uploadMode() {
    this.mode.update(() => "edit");
    }  

  // requete(URL: string){
  //   this.API.requeteAPI(URL);
  // }

  changeModel() {
    this.mode.update(() => "display");
  }
}
