
// photo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../data/Photo';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'http://localhost:3000/api/photos';  // URL de ton API Node.js

  private readonly _PhotosList = new BehaviorSubject<Photo[]>([
    {
        IdP: 1,
        PhotoURL: "assets/images/im1.jpg",
        PhotoDescription: 'Photo1',
        PhotoDate: new Date(2021, 0, 1)  // 1er janvier 2021
    },
    {
        IdP: 2,
        PhotoURL: 'assets/images/im2.jpg',
        PhotoDescription: 'Photo2',
        PhotoDate: new Date(2021, 1, 1)  // 1er février 2021
    },
    {
        IdP: 3,
        PhotoURL: 'assets/images/im3.jpg',
        PhotoDescription: 'Photo3',
        PhotoDate: new Date(2021, 2, 1)  // 1er mars 2021
    },
    {
        IdP: 4,
        PhotoURL: 'assets/images/im4.jpg',
        PhotoDescription: 'Photo4',
        PhotoDate: new Date(2021, 0, 1)  // 1er janvier 2021
    },
    {
        IdP: 5,
        PhotoURL: 'assets/images/im5.jpg',
        PhotoDescription: 'Photo5',
        PhotoDate: new Date(2021, 1, 1)  // 1er février 2021
    },
    {
        IdP: 6,
        PhotoURL: 'assets/images/im6.jpg',
        PhotoDescription: 'Photo6',
        PhotoDate: new Date(2021, 2, 1)  // 1er mars 2021
    },
    {
        IdP: 7,
        PhotoURL: 'assets/images/im7.jpg',
        PhotoDescription: 'Photo7',
        PhotoDate: new Date(2021, 3, 1)  // 1er avril 2021
    },
    {
        IdP: 8,
        PhotoURL: 'assets/images/im8.jpg',
        PhotoDescription: 'Photo8',
        PhotoDate: new Date(2021, 0, 1)  // 1er janvier 2021
    },
    {
        IdP: 9,
        PhotoURL: 'assets/images/im9.jpg',
        PhotoDescription: 'Photo9',
        PhotoDate: new Date(2021, 1, 1)  // 1er février 2021
    },
    {
        IdP: 10,
        PhotoURL: 'assets/images/im10.jpg',
        PhotoDescription: 'Photo10',
        PhotoDate: new Date(2021, 2, 1)  // 1er mars 2021
    },
    {
        IdP: 11,
        PhotoURL: 'assets/images/im11.jpg',
        PhotoDescription: 'Photo11',
        PhotoDate: new Date(2021, 3, 1)  // 1er avril 2021
    },
    {
        IdP: 12,
        PhotoURL: 'assets/images/im12.jpg',
        PhotoDescription: 'Photo12',
        PhotoDate: new Date(2021, 4, 1)  // 1er mai 2021
    }
]);

  constructor(private http: HttpClient) {}

  public photosList$ = this._PhotosList.asObservable();

  // Méthode pour uploader une photo
  uploadPhoto(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photo);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
  // Méthode pour ajouter une photo à la liste locale
  addPhoto(newPhoto: Photo): void {
    this.http.post<Photo>(this.apiUrl, newPhoto) // Ajoute la photo à la liste
  }

  // Méthode pour récupérer les photos depuis l'API
  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);  // Récupère les photos depuis l'API
  }

  // Méthode pour récupérer les photos locales (depuis BehaviorSubject)
  getLocalPhotos(): Photo[] {
    return this._PhotosList.value;  // Retourne la liste des photos locales
  }

  // Méthode pour initialiser la liste des photos avec celles provenant de l'API
  loadPhotosFromAPI(): void {
    this.getPhotos().subscribe((photos: Photo[]) => {
      this._PhotosList.next(photos);  // Met à jour la liste des photos avec celles récupérées depuis l'API
    });
  }
}
