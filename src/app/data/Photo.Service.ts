import { Injectable, signal } from "@angular/core";
import { Photo } from "./Photo";

@Injectable({
        providedIn: 'root'
    })

export class PhotoService {
    private readonly _PhotosList= signal<readonly Photo[]>([
        
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoTitle: 'Photo1',
            PhotoDate: new Date(2021, 1, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoTitle: 'Photo2',
            PhotoDate: new Date(2021, 2, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoTitle: 'Photo3',
            PhotoDate: new Date(2021, 3, 1)
        },
        {
            PhotoURL: 'https://thispersondoesnotexist.com/',
            PhotoTitle: 'Photo4',
            PhotoDate: new Date(2021, 4, 1)
        },
    ]);

    public readonly photosList = this._PhotosList.asReadonly();
}