import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSyncReducer } from './localStorage.reducer';
import {
  CigarCountry,
  CigarColor,
  CigarStrength,
  ICigarSearchResult,
} from 'src/app/utils/types';
import { questionnaireReducer } from './questionnaire.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { resultsLoadedReducer } from './results.reducer';

export interface IStoreState {
  questionnaire: IQuestionnaireState;
  router: RouterReducerState;
  results: Partial<ICigarSearchResult>[];
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
];
