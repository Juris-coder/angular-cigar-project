import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { IStoreState } from '.';
import { clearState } from '../actions/cigarStore.actions';
import { initialQuestionnaireState } from './questionnaire.reducer';
import { resultsInitialState } from './results.reducer';

export const localStorageSyncReducer = (
  reducer: ActionReducer<IStoreState>
): ActionReducer<IStoreState> =>
  localStorageSync({
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

export const clearStateMetaReducer =
  (reducer: ActionReducer<IStoreState>): ActionReducer<IStoreState> =>
  (state, action) => {
    if (state && action.type === clearState.type) {
      return reducer(
        {
          questionnaire: initialQuestionnaireState,
          results: resultsInitialState,
          router: { ...state.router },
        },
        action
      );
    }
    return reducer(state, action);
  };
