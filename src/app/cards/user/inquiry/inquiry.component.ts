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
  private category = '';
  public currentCards: Card[] = [];
  public correctGuess = 0;
  public wrongGuess = 0;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.category.subscribe((category) => {
      this.category = category;
    });
    this.cards = this.cardService.getCardsByCategory(this.category);
    this.currentCards = this.getNextNineCards();
  }

  private getNextNineCards(): Card[] {
    if (this.cards.length === 0) {
      this.cards = this.cardService.getCardsByCategory(this.category);
    }
    let nextNineCards;
    if (this.cards.length < 9) {
      nextNineCards = this.cards.splice(0, this.cards.length);
    } else {
      nextNineCards = this.cards.splice(0, 9);
    }
    return nextNineCards;
  }

  nextCards() {
    this.currentCards = this.getNextNineCards();
    this.correctGuess = 0;
    this.wrongGuess = 0;
  }

  flipCard(card: Card) {
    card.flipped = true;
  }

  onCorrectGuess(card: Card) {
    card.thrownIntoBucket = true;
    this.correctGuess++;
  }

  onWrongGuess(card: Card) {
    card.thrownIntoBucket = true;
    this.wrongGuess++;
  }
}
