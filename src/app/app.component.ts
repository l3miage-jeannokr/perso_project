import { Component, OnInit } from '@angular/core';
import { Photo } from './data/Photo';
import { PhotoService } from './service/photo-service.service';
import { PhotoCaptureComponent } from './photo-capture/photo-capture.component';
import { CommonModule } from '@angular/common';
import { MemoryGameComponent } from "./memory-game/memory-game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PhotoCaptureComponent, MemoryGameComponent],
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  aspect: 'accueil' | 'app' = 'accueil';
  page: 'photo' | 'galerie' | 'jeu' = 'photo';

  photosList: Photo[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.photosList$.subscribe(photos => {
      this.photosList = photos;
    });
    this.photoService.loadPhotosFromAPI();
  }

  goToApp(): void {
    this.aspect = 'app';
    this.page = 'photo';
  }

  setPage(p: 'photo' | 'galerie' | 'jeu'): void {
    this.page = p;
  }

  trackById(index: number, photo: Photo): number {
    return photo.IdP;
  }
}

// implements OnInit, OnDestroy{  title = 'test1';
//   photosList: Photo[] = [];
//   private photosSubscription: Subscription | undefined;

//   public aspect: "appl" | "accueil" = "accueil";

//   // Injection du service PhotoService
//   private readonly photosService = inject(PhotoService);

//   ngOnInit(): void {
//     // S'abonner à photosList$ pour recevoir les mises à jour des photos
//     this.photosSubscription = this.photosService.photosList$.subscribe(photos => {
//       this.photosList = photos;
//     });

//     // Charger les photos depuis l'API
//     this.photosService.loadPhotosFromAPI();
//   }

//   ngOnDestroy(): void {
//     // Se désabonner pour éviter les fuites de mémoire
//     if (this.photosSubscription) {
//       this.photosSubscription.unsubscribe();
//     }
//   }

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         const newPhoto: Photo = {
//           IdP: this.photosList.length + 1, // Génère un ID unique
//           PhotoURL: e.target.result, // L'URL de l'image en base64
//           PhotoDescription: file.name, // Utilise le nom du fichier pour la description
//           PhotoDate: new Date() // Date de la prise de la photo
//         };

//         // Ajoute la nouvelle photo à la liste via le service
//         this.photosService.addPhoto(newPhoto);
//       };
//       reader.readAsDataURL(file); // Convertit l'image en URL base64
//     }
//   }

//   uploadMode(): void {
//     // Logique pour changer de mode, par exemple :
//     this.aspect = 'appl'; // Change le mode selon ton besoin
//   }

//   trackById(index: number, photo: Photo): number {
//     return photo.IdP;  // Utilise l'ID de chaque photo pour le suivi
//   }

//   onCapture(): void {
//     const input: HTMLInputElement = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.capture = 'camera'; // Utilisation de la caméra pour la capture
//     input.onchange = (event: any) => this.onFileSelected(event); // Gère la photo après capture
//     input.click(); // Ouvre la fenêtre de sélection
//   }

//   onPhotoTaken(dataUrl: string): void {
//     console.log('Photo capturée :', dataUrl);
//     const newPhoto: Photo = {
//       IdP: this.photosList.length + 1,
//       PhotoURL: dataUrl,
//       PhotoDescription: 'Photo capturée',
//       PhotoDate: new Date()
//     };

//     // Ajoute la nouvelle photo au service
//     this.photosService.addPhoto(newPhoto);
//   }
  
// }
