import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card-service.service';
import { Card } from '../../card.model';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit {
  private cards: Card[] = [];
  public currentCard: Card | null = null;
  private currentIndex = 0;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
    this.currentCard = this.cards[this.currentIndex];
  }

  turnCard() {
    if (this.currentCard) {
      this.currentCard.flipped = true;
    }
  }

  onRightGuess() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
    }
    this.currentCard = this.cards[this.currentIndex];
  }

  onWrongGuess() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
    }
    this.currentCard = this.cards[this.currentIndex];
  }
}
