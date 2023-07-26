import { EventEmitter, Injectable } from '@angular/core';
import { Card } from './card.model';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public selectedCard = new EventEmitter<Card>();
  public cardsChanged = new Subject<Card[]>();
  public category = new ReplaySubject<string>();
  private cardsByCategory: { [key: string]: Card[] } = {};
  private cards: Card[] = [
    {
      origin: 'apple',
      target: 'alma',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
    },
    {
      origin: 'pear',
      target: 'körte',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
    },
    {
      origin: 'obnoxious',
      target: 'visszataszító',
      flipped: false,
      category: 'adjective',
      thrownIntoBucket: false,
    },
    {
      origin: 'traitorous',
      target: 'áruló',
      flipped: false,
      category: 'adjective',
      thrownIntoBucket: false,
    },
    {
      origin: 'turncoat',
      target: 'köpönyegforgató',
      flipped: false,
      category: 'adjective',
      thrownIntoBucket: false,
    },
    {
      origin: 'disdain',
      target: 'lenézés',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
    },
    {
      origin: 'modus operandi',
      target: 'elkövetés módja',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
    },
    {
      origin: 'horse',
      target: 'ló',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
    },
    {
      origin: 'duck',
      target: 'kacsa',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
    },
    {
      origin: 'rabbit',
      target: 'nyúl',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
    },
    {
      origin: 'Vanity Fair',
      target: 'A Hiúság Vására',
      flipped: false,
      category: 'noun',
      thrownIntoBucket: false,
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
    const newCard = new Card(originValue, targetValue, false, category, false);
    this.cards.push(newCard);
    this.cardsChanged.next([...this.cards]);
  }

  getCards() {
    return JSON.parse(JSON.stringify(this.cards));
  }

  getCardsByCategory(category: string) {
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
