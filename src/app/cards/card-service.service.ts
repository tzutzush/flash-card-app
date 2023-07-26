import { EventEmitter, Injectable } from '@angular/core';
import { Card } from './card.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public selectedCard = new EventEmitter<Card>();
  public cardsChanged = new Subject<Card[]>();
  private cardsByCategory: { [key: string]: Card[] } = {};
  private cards: Card[] = [
    {
      origin: 'apple',
      target: 'alma',
      flipped: false,
      category: 'noun',
    },
    {
      origin: 'pear',
      target: 'körte',
      flipped: false,
      category: 'noun',
    },
    {
      origin: 'obnoxious',
      target: 'visszataszító',
      flipped: false,
      category: 'adjective',
    },
    {
      origin: 'traitorous',
      target: 'áruló',
      flipped: false,
      category: 'adjective',
    },
    {
      origin: 'turncoat',
      target: 'köpönyegforgató',
      flipped: false,
      category: 'adjective',
    },
    {
      origin: 'disdain',
      target: 'lenézés',
      flipped: false,
      category: 'noun',
    },
    {
      origin: 'modus operandi',
      target: 'elkövetés módja',
      flipped: false,
      category: 'noun',
    },
    {
      origin: 'horse',
      target: 'ló',
      flipped: false,
      category: 'noun',
    },
    {
      origin: 'duck',
      target: 'kacsa',
      flipped: false,
      category: 'noun',
    },
    {
      origin: 'rabbit',
      target: 'nyúl',
      flipped: false,
      category: 'noun',
    },
    {
      origin: 'Vanity Fair',
      target: 'A Hiúság Vására',
      flipped: false,
      category: 'noun',
    },
  ];

  editCard(oldCard: Card, originValue: string, targetValue: string) {
    const indexToModify = this.cards.indexOf(oldCard);
    this.cards[indexToModify].origin = originValue;
    this.cards[indexToModify].target = targetValue;
    this.cardsChanged.next([...this.cards]);
  }

  deleteCard(index: number) {
    this.cards.splice(index, 1);
    this.cardsChanged.next([...this.cards]);
  }

  createCard(originValue: string, targetValue: string, category: string) {
    const newCard = new Card(originValue, targetValue, false, category);
    this.cards.push(newCard);
    this.cardsChanged.next([...this.cards]);
  }

  getCards() {
    return [...this.cards];
  }

  sortByCategory(category: string) {
    for (const card of this.cards) {
      const category = card.category;
      if (!this.cardsByCategory[category]) {
        this.cardsByCategory[category] = [];
      }
      this.cardsByCategory[category].push(card);
    }

    return this.cardsByCategory[category];
  }
}
