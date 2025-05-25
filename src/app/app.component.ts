import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Photo } from './data/Photo';
import { PhotoService } from './service/photo-service.service';
import { Subscription } from 'rxjs';
import { PhotoCaptureComponent } from './photo-capture/photo-capture.component';
import { JeuxComponent } from './jeux/jeux.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from './shared/description-dialog/description-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    HttpClientModule,
    PhotoCaptureComponent,
    JeuxComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'test1';

  photosList: Photo[] = [];
  aspect: 'appl' | 'accueil' | 'jeux' = 'accueil';

  private readonly photosService = inject(PhotoService);
  private readonly dialog = inject(MatDialog);
  private photosSubscription?: Subscription;

  ngOnInit(): void {
    this.photosService.loadPhotosFromAPI();
    this.photosSubscription = this.photosService.photosList$.subscribe(photos => {
      this.photosList = photos;
    });
  }

  ngOnDestroy(): void {
    this.photosSubscription?.unsubscribe();
  }

  uploadMode(): void {
    this.aspect = 'appl';
  }

  uploadJeux(): void {
    this.aspect = 'jeux';
  }

  trackById(index: number, photo: Photo): number {
    return photo.IdP;
  }

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const description = await this.promptForDescription();
      if (!description) return;

      const formData = new FormData();
      formData.append('photo', file);
      formData.append('description', description);

      this.photosService.uploadPhotoWithForm(formData).subscribe(() => {
        this.photosService.loadPhotosFromAPI();
      });
    }
  }
  
  async onPhotoTaken(dataUrl: string): Promise<void> {
    const description = await this.promptForDescription();
    if (!description) return;
  
    this.photosService.uploadCapturedPhoto(dataUrl, description).subscribe(() => {
      this.photosService.loadPhotosFromAPI();
    });
  }
  

  async promptForDescription(): Promise<string | null> {
    const dialogRef = this.dialog.open(DescriptionDialogComponent, {
      width: '400px'
    });
    return dialogRef.afterClosed().toPromise();
  }

  onCapture(): void {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (event: any) => this.onFileSelected(event);
    input.click();
  }

  commentInputs: { [photoId: number]: string } = {};
  likePhoto(photo: Photo): void {
    photo.likes = (photo.likes || 0) + 1;
    this.photosService.updatePhoto(photo).subscribe(() => {
      this.photosService.loadPhotosFromAPI(); // recharge l'état
    });
  }
  
  addComment(photo: Photo): void {
    const comment = this.commentInputs[photo.IdP]?.trim();
    if (comment) {
      photo.comments = photo.comments || [];
      photo.comments.push(comment);
      this.commentInputs[photo.IdP] = '';
      this.photosService.updatePhoto(photo).subscribe(() => {
        this.photosService.loadPhotosFromAPI(); // recharge
      });
    }
  }
    
}
