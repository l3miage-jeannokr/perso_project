import { Component, Inject, inject, input, model, signal } from '@angular/core';
import { Photo } from '../data/Photo';
import { PhotoService } from '../service/photo-service.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jeux',
  imports: [CommonModule],
  templateUrl: './jeux.component.html',
  styleUrl: './jeux.component.css'
})
export class JeuxComponent {


  private readonly photoService = inject(PhotoService);

  photosWithState: (Photo & { isRevealed: boolean })[] = [];

  constructor() {
    // Abonnement pour copier la liste des photos et ajouter une propriété "isRevealed"
    this.photoService.getPhotosSatic().subscribe((photos) => {
      this.photosWithState = photos.map(photo => ({
        ...photo,
        isRevealed: false
      }));
    });
  }

  revealPhoto(photo: Photo & { isRevealed: boolean }) {
    photo.isRevealed = true;
  }

}
