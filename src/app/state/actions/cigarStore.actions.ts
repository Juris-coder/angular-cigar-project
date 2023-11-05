import { createAction, props } from '@ngrx/store';
import { ICigarsDatabaseState, IQuestionnaireState } from 'src/app/app.types';

export const createUpdatePropertyAction = (key: keyof IQuestionnaireState) =>
  createAction(
    `[Questionnaire] Update ${key}`,
    (value: IQuestionnaireState[keyof IQuestionnaireState]) => ({
      value,
    })
  );

export const loadResultsAction = createAction(
  '[Results] Load results',
  props<{ page: number }>()
);

export const loadResultsError = createAction(
  '[Results] Load FAILED',
  props<{ error: any }>()
);

export const loadResultsSuccess = createAction(
  '[Results] Load Success',
  props<{ results: ICigarsDatabaseState }>()
);

export const clearResults = createAction('[Results] Clear previous results');

export const clearState = createAction('[State] Clear state');
