import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Photo } from '../data/Photo';
import { PhotoService } from '../service/photo-service.service';

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.component.html',
  imports : [CommonModule],
  styleUrls: ['./photo-capture.component.css']
})
export class PhotoCaptureComponent implements OnInit{
// app.component.ts

  photosList: Photo[] = [];
  photo: string | null = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.photoService.getPhotos().subscribe((photos: Photo[]) => {
      this.photosList = photos;
      this.startCamera();
    });
  }


  startCamera(): void {
    const videoElement = document.querySelector('video') as HTMLVideoElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error('Erreur lors de l\'accès à la caméra :', error);
        });
    } else {
      alert('La capture vidéo n\'est pas supportée par ce navigateur.');
    }
  }

  onPhotoUpload(event: any): void {
    const photo = event.target.files[0];
    if (photo) {
      this.photoService.uploadPhoto(photo).subscribe(response => {
        console.log('Photo téléchargée avec succès', response);
        // Une fois la photo téléchargée, on réactualise la liste des photos
        this.photoService.getPhotos().subscribe((photos: Photo[]) => {
          this.photosList = photos;
        });
      });
    }
  }
      // Méthode de capture de photo à partir de la vidéo
      capturePhoto(): void {
        const videoElement = document.querySelector('video') as HTMLVideoElement;
        const canvasElement = document.createElement('canvas');
        const context = canvasElement.getContext('2d');
    
        if (videoElement && context) {
          // Ajuste la taille du canvas en fonction de la vidéo
          canvasElement.width = videoElement.videoWidth;
          canvasElement.height = videoElement.videoHeight;
    
          // Dessine la vidéo sur le canvas
          context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    
          // Capture l'image en base64
          this.photo = canvasElement.toDataURL('image/png');
    
          // Ajoute la photo capturée au service
          const newPhoto: Photo = {
            IdP: this.photosList.length+1,  // L'ID sera dynamique, mais ici, c'est pour l'exemple
            PhotoURL: this.photo,
            PhotoDescription: 'Photo capturée',
            PhotoDate: new Date()
          };
    
          this.photoService.addPhoto(newPhoto);
        }
      }

}


