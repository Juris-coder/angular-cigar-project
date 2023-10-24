import { Routes } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { DateComponent } from './components/date/date.component';

export enum QuestionnaireStep {
  DateOfBirth = 'dateOfBirthInput',
  Name = 'nameInput',
  Country = 'countrySelection',
  Color = 'colorSelection',
  Strength = 'strengthSelection',
}

export const questionnairePath = 'questionnaire';

export const questionnaireRoute: Routes = [
  {
    path: '',
    redirectTo: QuestionnaireStep.DateOfBirth,
    pathMatch: 'full',
  },
  {
    path: QuestionnaireStep.DateOfBirth,
    component: DateComponent,
  },
  {
    path: QuestionnaireStep.Name,
    component: InputComponent,
  },
  {
    path: QuestionnaireStep.Country,
    component: InputComponent,
  },
  {
    path: QuestionnaireStep.Color,
    component: InputComponent,
  },
  {
    path: QuestionnaireStep.Strength,
    component: InputComponent,
  },
];

export type QuestionnaireStepType = QuestionnaireStep;
