import { createReducer, on } from '@ngrx/store';
import { createUpdatePropertyAction } from '../actions/cigarStore.actions';
import { IQuestionnaireState } from 'src/app/app.types';

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
