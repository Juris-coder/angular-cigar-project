import { Routes } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { DateComponent } from './components/date/date.component';
import { CountryComponent } from './components/country/country.component';
import { ColorComponent } from './components/color/color.component';
import { StrengthComponent } from './components/strength/strength.component';

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
    component: CountryComponent,
  },
  {
    path: QuestionnaireStep.Color,
    component: ColorComponent,
  },
  {
    path: QuestionnaireStep.Strength,
    component: StrengthComponent,
  },
];

export type QuestionnaireStepType = QuestionnaireStep;
