import { Routes } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire.component';

export const questionnaireRoute: Routes = [
  {
    path: 'dateOfBirthInput',
    component: QuestionnaireComponent,
  },
  {
    path: 'nameInput',
    component: QuestionnaireComponent,
  },
  {
    path: 'countrySelection',
    component: QuestionnaireComponent,
  },
  {
    path: 'colorSelection',
    component: QuestionnaireComponent,
  },
  {
    path: 'strengthSelection',
    component: QuestionnaireComponent,
  },
];

export type QuestionnaireStepType = QuestionnaireStep;

export enum QuestionnaireStep {
  DateOfBirth = 'dateOfBirthInput',
  Name = 'nameInput',
  Country = 'countrySelection',
  Color = 'colorSelection',
  Strength = 'strengthSelection',
}
