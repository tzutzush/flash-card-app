import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../card-service.service';
import { Card } from '../card.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public cards: Card[] = [];
  private cardChangeSubscription!: Subscription;

  constructor(private cardService: CardService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
    this.cardService.cardsChanged.subscribe((cards: Card[]) => {
      this.cards = cards;
    });
  }

  ngOnDestroy(): void {
    this.cardChangeSubscription.unsubscribe();
  }

  onDisplayDetails(card: Card) {
    this.cardService.selectedCard.emit(card);
  }

  onDeleteCard(index: number) {
    this.cardService.deleteCard(index);
  }
}
