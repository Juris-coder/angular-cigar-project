import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSyncReducer } from './localStorage.reducer';
import { CigarCountry, CigarColor, CigarStrength } from 'src/app/utils/types';
import { questionnaireReducer } from './questionnaire.reducer';
import { QuestionnaireStep } from 'src/app/components/questionnaire/questionnaire.types';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface IStoreState {
  questionnaire: IQuestionnaireState;
  router: RouterReducerState;
  // results: Partial<ICigarSearchResult>[];
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
  // results: cigarStoreReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<IStoreState>[] = [
  localStorageSyncReducer,
];
