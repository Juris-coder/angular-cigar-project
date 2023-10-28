import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { IStoreState } from '.';

export const localStorageSyncReducer = (
  reducer: ActionReducer<IStoreState>
): ActionReducer<IStoreState> => {
  return localStorageSync({
    keys: [
      {
        questionnaire: [
          'dateOfBirth',
          'name',
          'email',
          'country',
          'color',
          'strength',
        ],
      },
    ],
    rehydrate: true,
  })(reducer);
};
