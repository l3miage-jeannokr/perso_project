import { DatePipe } from "@angular/common";

export interface Photo {
    readonly PhotoURL: string;
    readonly PhotoTitle: string;
    readonly  PhotoDate: Date;
}