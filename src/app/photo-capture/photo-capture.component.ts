import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../service/photo-service.service';
import { Photo } from '../data/Photo';

@Component({
  selector: 'app-photo-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-capture.component.html',
  styleUrls: ['./photo-capture.component.css']
})
export class PhotoCaptureComponent implements OnInit {
  photosList: Photo[] = [];
  photo: string | null = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadPhotos();
    this.startCamera();
  }

  loadPhotos() {
    this.photoService.getPhotos().subscribe(photos => this.photosList = photos);
  }

  startCamera() {
    const video = document.querySelector('video') as HTMLVideoElement;

    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream;
      }).catch(err => console.error('Caméra indisponible :', err));
    }
  }

  capturePhoto() {
    const video = document.querySelector('video') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    this.photo = dataUrl;

    const newPhoto: Photo = {
      IdP: Date.now(),
      PhotoURL: dataUrl,
      PhotoDescription: 'Photo capturée',
      PhotoDate: new Date()
    };

    this.photoService.addPhoto(newPhoto);
    this.photosList.push(newPhoto);
  }

  onPhotoUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.photoService.uploadPhoto(file).subscribe(() => {
      this.loadPhotos();
    });
  }
}
