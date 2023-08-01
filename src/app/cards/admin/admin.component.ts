import { Component, OnInit } from '@angular/core';
import { CardService } from '../card-service.service';
import { Card } from '../card.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public cards: Card[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
    this.cardService.cardsChanged.subscribe((cards: Card[]) => {
      this.cards = cards;
    });
  }

  onDisplayDetails(card: Card) {
    this.cardService.selectedCard.emit(card);
  }

  onDeleteCard(index: number) {
    this.cardService.deleteCard(index);
  }
}
