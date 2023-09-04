import { Injectable } from '@angular/core';
import { Card } from '../cards/card.model';
import { ReplaySubject, Subject } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public selectedCard = new ReplaySubject<Card>(1);
  public cardsChanged = new Subject<Card[]>();
  public category = new ReplaySubject<string>(1);
  private cards: Card[] = [];

  constructor(private firestore: Firestore) {
    this.initCards();
  }

  private async initCards(): Promise<void> {
    try {
      const cards = await this.getCardsFromFireBase();
      this.cards = cards;
      this.cardsChanged.next(this.cards);
    } catch (error) {
      console.error('Error initializing cards:', error);
    }
  }

  private async getCardsFromFireBase(): Promise<Card[]> {
    const collectionInstance = collection(this.firestore, 'cards');
    try {
      const cardsSnapshot = await getDocs(collectionInstance);
      const cards: Card[] = [];

      cardsSnapshot.forEach((doc) => {
        const cardData = doc.data();
        const cardId = doc.id;
        const cardWithId = { id: cardId, ...cardData } as unknown as Card;
        cards.push(cardWithId);
      });

      return cards;
    } catch (error) {
      console.error('Error fetching cards from Firebase:', error);
      return [];
    }
  }

  editCard(oldCard: Card, originValue: string, targetValue: string) {
    const docInstance = doc(this.firestore, 'cards', oldCard.id);
    const updateData = {
      origin: originValue,
      target: targetValue,
      flipped: false,
      category: oldCard.category,
      thrownIntoBucket: false,
    };

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Successfully modified');
      })
      .catch((err) => {
        console.log(err);
      });
    this.initCards();
  }

  deleteCard(id: string) {
    const docInstance = doc(this.firestore, 'cards', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Successfully deleted');
      })
      .catch((err) => {
        console.log(err);
      });
    this.initCards();
  }

  createCard(originValue: string, targetValue: string, category: string) {
    const collectionInstance = collection(this.firestore, 'cards');
    addDoc(collectionInstance, {
      origin: originValue,
      target: targetValue,
      flipped: false,
      category: category,
      thrownIntoBucket: false,
    }).then(() => {
      console.log('Saved successfully');
    });
    this.initCards();
  }

  getCards(): Card[] {
    return this.cards;
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
