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
  '[Results] Load',
  props<{ page: number }>()
);
export const loadResultsError = createAction('[Results] Load FAILED');

export const resultsLoaded = createAction(
  '[Results] Load Success',
  props<{ results: ICigarsDatabaseState }>()
);

export const clearState = createAction('[State] Clear state');
