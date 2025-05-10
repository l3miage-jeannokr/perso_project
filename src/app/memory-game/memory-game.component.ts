import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./memory-game.Component.html' ,
  styleUrls: ['./memory-game.Component.css']

})
export class MemoryGameComponent {
  placeholder = 'https://via.placeholder.com/100?text=?';
  
  cards = [
    { url: 'assets/images/im1.jpg', revealed: false },
    { url: 'assets/photo2.jpg', revealed: false },
    { url: 'assets/photo3.jpg', revealed: false },
    { url: 'assets/photo4.jpg', revealed: false },
    { url: 'assets/photo5.jpg', revealed: false },
    { url: 'assets/photo6.jpg', revealed: false },
    { url: 'assets/photo1.jpg', revealed: false },
    { url: 'assets/photo2.jpg', revealed: false },
    { url: 'assets/photo3.jpg', revealed: false },
    { url: 'assets/photo4.jpg', revealed: false },
    { url: 'assets/photo5.jpg', revealed: false },
    { url: 'assets/photo6.jpg', revealed: false },
  ];

  revealCard(index: number): void {
    this.cards[index].revealed = true;
  }
}
