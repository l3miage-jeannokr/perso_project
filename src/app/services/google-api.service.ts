import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAPIService {

  private clientId = '243438076747-tqp9g3dfq57c73180m49rp4kcjf8ets4.apps.googleusercontent.com';
  private apiKey = 'AIzaSyAi-5kCOpFN0BB2RpeD-TUD27_gs7EODWY';

  public photos: any[] = [];

  constructor() {
  }

  initGoogleApi() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.apiKey,
        clientId: this.clientId,
        scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
        discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1']
      }).then(() => {
        console.log('Google API initialized');
      }).catch((err: any) => {
        console.error('Google API init error:', err);
      });
    });
  }

  authenticate() {
    return gapi.auth2.getAuthInstance().signIn();
  }

  getPhotos() {
    return gapi.client.photoslibrary.mediaItems.list({
      pageSize: 10
    }).then((response: any) => {
      this.photos = response.result.mediaItems || [];
      return this.photos;
    });
  }

  requeteAPI(url: string) {
    console.log('API request with URL:', url);
    // Ici tu peux faire un traitement sur l'URL, comme déclencher un accès ou une requête API
  }
}
