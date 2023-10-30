import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  clearStateMetaReducer,
  localStorageSyncReducer,
} from './localStorage.reducer';
import { questionnaireReducer } from './questionnaire.reducer';
import { routerReducer } from '@ngrx/router-store';
import { resultsLoadedReducer } from './results.reducer';
import { IStoreState } from 'src/app/app.types';

export const reducers: ActionReducerMap<IStoreState> = {
  questionnaire: questionnaireReducer,
  router: routerReducer,
  results: resultsLoadedReducer,
};

export const metaReducers: MetaReducer<IStoreState>[] = [
  localStorageSyncReducer,
  clearStateMetaReducer,
];
