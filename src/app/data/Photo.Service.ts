import { Injectable, signal } from "@angular/core";
import { Photo } from "./Photo";

@Injectable({
        providedIn: 'root'
    })

export class PhotoService {
    private readonly _PhotosList= signal<readonly Photo[]>([
        
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo1',
            PhotoDate: new Date(2021, 1, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo2',
            PhotoDate: new Date(2021, 2, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo3',
            PhotoDate: new Date(2021, 3, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo4',
            PhotoDate: new Date(2021, 4, 1)
        },

        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo5',
            PhotoDate: new Date(2021, 1, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo6',
            PhotoDate: new Date(2021, 2, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo7',
            PhotoDate: new Date(2021, 3, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo8',
            PhotoDate: new Date(2021, 4, 1)
        },

        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo9',
            PhotoDate: new Date(2021, 1, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo10',
            PhotoDate: new Date(2021, 2, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo11',
            PhotoDate: new Date(2021, 3, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoDescription: 'Photo12',
            PhotoDate: new Date(2021, 4, 1)
        },
        
    ]);

    public readonly photosList = this._PhotosList.asReadonly();
}