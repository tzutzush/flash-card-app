import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public selectedCard = new ReplaySubject<Card>(1);
  public cardsChanged = new Subject<Card[]>();
  public category = new ReplaySubject<string>(1);
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
    const oldCardOrigin = oldCard.origin;
    const [cardToModify] = this.cards.filter(
      (card) => card.origin === oldCardOrigin
    );
    cardToModify.origin = originValue;
    cardToModify.target = targetValue;

    this.cardsChanged.next(this.cards);
  }

  deleteCard(index: number) {
    this.cards.splice(index, 1);
    this.cardsChanged.next(this.cards);
  }

  createCard(originValue: string, targetValue: string, category: string) {
    const newCard = new Card(originValue, targetValue, false, category, false);
    this.cards.push(newCard);
    this.cardsChanged.next(this.cards);
  }

  getCards(): Card[] {
    return JSON.parse(JSON.stringify(this.cards));
  }

  getCardsByCategory(category: string): Card[] {
    const cards = this.getCards();
    const cardsByCategory = [];

    for (const card of cards) {
      if (card.category === category) {
        cardsByCategory.push(card);
      }
    }
    return cardsByCategory;
  }
}
