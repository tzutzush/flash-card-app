import { Injectable } from '@angular/core';
import { GlobalState } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    ('');
  }

  setStateToLocalStorage(storageKey: string, state: GlobalState) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  getStateFromLocalStorage<GlobalState>(
    storageKey = 'globalState',
    fallbackValueProvider: () => GlobalState
  ): GlobalState {
    const state = localStorage.getItem(storageKey);
    if (!state) return fallbackValueProvider();
    return JSON.parse(state);
  }
}
