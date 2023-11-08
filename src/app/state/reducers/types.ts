import { RouterReducerState } from '@ngrx/router-store';
import { CigarCountry, CigarColor, CigarStrength } from 'src/app/app.types';
import { ICigarsDatabaseState } from 'src/app/services/types';

export interface IStoreState {
  questionnaire: IQuestionnaireState;
  router: RouterReducerState;
  results: ICigarsDatabaseState;
}

export interface IQuestionnaireState {
  dateOfBirth: Date | undefined;
  name: string;
  email: string;
  country: CigarCountry;
  color: CigarColor;
  strength: CigarStrength;
}
