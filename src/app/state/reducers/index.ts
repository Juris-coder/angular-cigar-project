import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  clearStateMetaReducer,
  localStorageSyncReducer,
} from './localStorage.reducer';
import {
  CigarCountry,
  CigarColor,
  CigarStrength,
  ICigarsDatabase,
} from 'src/app/utils/types';
import { questionnaireReducer } from './questionnaire.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { resultsLoadedReducer } from './results.reducer';

export interface IStoreState {
  questionnaire: IQuestionnaireState;
  router: RouterReducerState;
  results: ICigarsDatabase;
}

export interface IQuestionnaireState {
  dateOfBirth: string;
  name: string;
  email: string;
  country: CigarCountry;
  color: CigarColor;
  strength: CigarStrength;
}

export const reducers: ActionReducerMap<IStoreState> = {
  questionnaire: questionnaireReducer,
  router: routerReducer,
  results: resultsLoadedReducer,
};

export const metaReducers: MetaReducer<IStoreState>[] = [
  localStorageSyncReducer,
  clearStateMetaReducer,
];
