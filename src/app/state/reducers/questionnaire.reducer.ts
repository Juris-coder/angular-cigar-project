import { createReducer, on } from '@ngrx/store';
import { IQuestionnaireState } from './index';
import { createUpdatePropertyAction } from '../actions/cigarStore.actions';

export const initialQuestionnaireState: IQuestionnaireState = {
  dateOfBirth: '',
  name: '',
  email: '',
  country: '',
  color: '',
  strength: '',
};

export const questionnaireReducer = createReducer(
  initialQuestionnaireState,
  ...Object.keys(initialQuestionnaireState).map((property) =>
    on(
      createUpdatePropertyAction(property as keyof IQuestionnaireState),
      (state: IQuestionnaireState, { value }) => ({
        ...state,
        [property]: value,
      })
    )
  )
);
