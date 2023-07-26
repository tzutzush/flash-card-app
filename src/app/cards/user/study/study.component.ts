import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card-service.service';
import { Card } from '../../card.model';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  private cards: Card[] = [];
  public currentCard: Card | null = null;
  private currentIndex = 0;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
    this.currentCard = this.cards[this.currentIndex];
  }

  onNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
    }
    this.currentCard = this.cards[this.currentIndex];
  }
}
