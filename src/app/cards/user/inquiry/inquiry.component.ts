import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../../card-service.service';
import { Card } from '../../card.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit, OnDestroy {
  private cards: Card[] = [];
  private category = '';
  private categorySubscription!: Subscription;
  public currentCards: Card[] = [];
  public correctGuess = 0;
  public wrongGuess = 0;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.categorySubscription = this.cardService.category.subscribe(
      (category) => {
        this.category = category;
        this.cards = this.cardService.getCardsByCategory(this.category);
        this.currentCards = this.getNextNineCards();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.categorySubscription !== undefined) {
      this.categorySubscription.unsubscribe();
    }
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
    console.log('Next');
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
