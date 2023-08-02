import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from '../card-service.service';
import { Card } from '../card.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public cards: Card[] = [];
  private cardsSubscription!: Subscription;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
    this.cardsSubscription = this.cardService.cardsChanged.subscribe(
      (cards: Card[]) => {
        this.cards = cards;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.cardsSubscription !== undefined)
      this.cardsSubscription.unsubscribe();
  }

  onDisplayDetails(card: Card) {
    this.cardService.selectedCard.next(card);
  }

  onDeleteCard(index: number) {
    this.cardService.deleteCard(index);
  }
}
