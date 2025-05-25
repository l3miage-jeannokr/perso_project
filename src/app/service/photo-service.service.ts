import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../data/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'http://localhost:3000/api/photos'; // Backend Express

  // --- CÔTÉ JEU (local, statique) ---
  private readonly staticPhotos: Photo[] = [
    {
      IdP: 1,
      PhotoURL: "assets/images/im1.jpg",
      PhotoDescription: 'Photo 1',
      PhotoDate: new Date(2021, 0, 1)
    },
    {
      IdP: 2,
      PhotoURL: "assets/images/im2.jpg",
      PhotoDescription: 'Photo 2',
      PhotoDate: new Date(2021, 1, 1)
    },
    {
      IdP: 3,
      PhotoURL: "assets/images/im3.jpg",
      PhotoDescription: 'Photo 3',
      PhotoDate: new Date(2021, 2, 1)
    },
    {
      IdP: 4,
      PhotoURL: "assets/images/im4.jpg",
      PhotoDescription: 'Photo 4',
      PhotoDate: new Date(2021, 3, 1)
    },
    {
      IdP: 5,
      PhotoURL: "assets/images/im5.jpg",
      PhotoDescription: 'Photo 5',
      PhotoDate: new Date(2021, 4, 1)
    },
    {
      IdP: 6,
      PhotoURL: "assets/images/im6.jpg",
      PhotoDescription: 'Photo 6',
      PhotoDate: new Date(2021, 5, 1)
    }
  ];

  getPhotosStatic(): Observable<Photo[]> {
    return new BehaviorSubject<Photo[]>(this.staticPhotos).asObservable();
  }

  // --- CÔTÉ APPLICATION (upload/capture utilisateur) ---

  private readonly _PhotosList = new BehaviorSubject<Photo[]>([]);
  public readonly photosList$ = this._PhotosList.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Charge les photos persistées depuis l’API
   */
  loadPhotosFromAPI(): void {
    this.http.get<Photo[]>(this.apiUrl).subscribe({
      next: (photos) => {
        const parsed = photos.map(p => ({
          ...p,
          PhotoDate: new Date(p.PhotoDate),
          likes: p.likes ?? 0,
          comments: p.comments ?? []
        }));
        this._PhotosList.next(parsed);
      },
      error: (err) => {
        console.error('Erreur de chargement des photos :', err);
      }
    });
  }
  
  

  /**
   * Demande une description à l'utilisateur et envoie le fichier
   */
  uploadPhoto(file: File): Observable<Photo> {
    const description = window.prompt('Entrez une description pour cette photo :', file.name);
    if (!description) throw new Error('Aucune description fournie.');

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('description', description);

    return this.uploadPhotoWithForm(formData);
  }

  /**
   * Upload d’une photo capturée (base64) + prompt pour description
   */
  uploadCapturedPhoto(dataUrl: string, defaultDesc = 'Photo capturée'): Observable<Photo> {
    const description = window.prompt('Entrez une description pour cette photo :', defaultDesc);
    if (!description) throw new Error('Aucune description fournie.');

    const blob = this.dataURLToBlob(dataUrl);
    const file = new File([blob], 'captured.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('description', description);

    return this.uploadPhotoWithForm(formData);
  }

  /**
   * Méthode générique pour envoyer une photo avec FormData
   */
  uploadPhotoWithForm(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(this.apiUrl, formData);
  }

  /**
   * Convertit une image base64 en blob
   */
  private dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }
  updatePhoto(photo: Photo): Observable<Photo> {
    return this.http.patch<Photo>(`${this.apiUrl}/${photo.IdP}`, {
      likes: photo.likes,
      comments: photo.comments
    });
  }
  


}
