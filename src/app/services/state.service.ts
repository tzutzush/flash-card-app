import { Injectable } from '@angular/core';
import { Card } from '../cards/card.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { UserComponent } from '../cards/user/user.component';

export type GlobalState = {
  category: string;
  studyCardIndex: number;
  inquiry: {
    currentCards: Card[];
    remainingCards: Card[];
  };
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public globalStateSubject: BehaviorSubject<GlobalState>;

  constructor(private localStorageService: LocalStorageService) {
    const globalState = localStorageService.getStateFromLocalStorage(
      'globalState',
      () => {
        return {
          category: '',
          studyCardIndex: 0,
          inquiry: {
            currentCards: [],
            remainingCards: [],
          },
        };
      }
    );
    this.globalStateSubject = new BehaviorSubject<GlobalState>(globalState);
    this.globalStateSubject.subscribe((newState) => {
      this.onGlobalStateChange(newState);
    });
    UserComponent.categorySubject.subscribe((category) => {
      this.onGlobalStateChange({ ...globalState, category });
      console.log(globalState);
    });
  }

  onGlobalStateChange(globalState: GlobalState) {
    this.localStorageService.setStateToLocalStorage('globalState', globalState);
  }
}
