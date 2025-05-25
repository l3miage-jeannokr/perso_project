import { Component, inject } from '@angular/core';
import { Photo } from '../data/Photo';
import { PhotoService } from '../service/photo-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jeux',
  standalone: true, // ✅ si tu veux l’utiliser sans module
  imports: [CommonModule],
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css'] // ✅ corrigé
})
export class JeuxComponent {
  private readonly photoService = inject(PhotoService);

  // Liste des photos avec état d'affichage
  photosWithState: (Photo & { isRevealed: boolean })[] = [];

  constructor() {
    // Charger les photos statiques et ajouter la propriété "isRevealed"
    this.photoService.getPhotosStatic().subscribe((photos) => {
      this.photosWithState = photos.map(photo => ({
        ...photo,
        isRevealed: false
      }));
    });
  }

  // Révéler une seule photo au clic
  revealPhoto(photo: Photo & { isRevealed: boolean }) {
    photo.isRevealed = true;
  }
}
