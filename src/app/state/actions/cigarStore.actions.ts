import { createAction, props } from '@ngrx/store';
import { IQuestionnaireState } from '../reducers';
import { ICigarSearchResult } from 'src/app/utils/types';

export const createUpdatePropertyAction = (key: keyof IQuestionnaireState) =>
  createAction(`[Questionnaire] Update ${key}`, (value: string) => ({
    value,
  }));

export const loadResultsAction = createAction(
  '[Results] Load',
  props<{ page: number }>()
);
export const loadResultsError = createAction('[Results] Load FAILED');

export const resultsLoaded = createAction(
  '[Results] Load Success',
  props<{ results: Partial<ICigarSearchResult>[] }>()
);

export const clearState = createAction('[State] Clear state');
