import { DatePipe } from "@angular/common";

export interface Photo {
    readonly IdP : number;
    readonly PhotoURL: string;
    readonly PhotoDescription: string;
    readonly  PhotoDate: Date;
}