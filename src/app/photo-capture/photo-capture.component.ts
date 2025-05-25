import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Photo } from '../data/Photo';
import { PhotoService } from '../service/photo-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-photo-capture',
  imports: [FormsModule, CommonModule],
  templateUrl: './photo-capture.component.html',
  styleUrls: ['./photo-capture.component.css']
})
export class PhotoCaptureComponent implements OnInit {


  @Output() photoCaptured = new EventEmitter<string>();

  photosList: Photo[] = [];
  photo: string | null = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    // Chargement initial des photos
    this.photoService.photosList$.subscribe((photos: Photo[]) => {
      this.photosList = photos;
    });

    this.photoService.loadPhotosFromAPI();
    this.startCamera();
  }

  startCamera(): void {
    const videoElement = document.querySelector('video') as HTMLVideoElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error("Erreur d'accès à la caméra :", error);
        });
    } else {
      alert("La capture vidéo n'est pas supportée par ce navigateur.");
    }
  }

  capturePhoto(): void {
    const videoElement = document.querySelector('video') as HTMLVideoElement;
    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');

    if (videoElement && context) {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      this.photo = canvasElement.toDataURL('image/png');

      // Émet l'image capturée vers le parent (AppComponent)
      this.photoCaptured.emit(this.photo);
    }
  }


}
