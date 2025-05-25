import { DatePipe } from "@angular/common";

export interface Photo {
    IdP: number;
    PhotoURL: string;
    PhotoDescription: string;
    PhotoDate: Date;
    likes?: number;
    comments?: string[];
  }
  