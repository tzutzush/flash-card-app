import { Component } from '@angular/core';
import { CardService } from '../card-service.service';
import { Card } from '../card.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(public cardService: CardService) {}

  onDisplayDetails(card: Card) {
    this.cardService.selectedCard.next(card);
  }

  onDeleteCard(id: string) {
    this.cardService.deleteCard(id);
  }
}
