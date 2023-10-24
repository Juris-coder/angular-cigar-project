import { createAction } from '@ngrx/store';
import { IQuestionnaireState } from '../reducers';

export const createUpdatePropertyAction = (key: keyof IQuestionnaireState) =>
  createAction(`[Questionnaire] Update ${key}`, (value) => ({
    value,
  }));
