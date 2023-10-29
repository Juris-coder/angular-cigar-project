import { Routes } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { DateComponent } from './components/date/date.component';
import { CountryComponent } from './components/country/country.component';
import { ColorComponent } from './components/color/color.component';
import { StrengthComponent } from './components/strength/strength.component';
import { AgeGuard } from 'src/app/state/guards/age.guard';
import { RestrictedComponent } from './components/restricted/restricted.component';

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
    path: 'restricted',
    component: RestrictedComponent,
  },
  {
    path: QuestionnaireStep.DateOfBirth,
    component: DateComponent,
  },
  {
    path: QuestionnaireStep.Name,
    component: InputComponent,
    canActivate: [AgeGuard],
  },
  {
    path: QuestionnaireStep.Country,
    component: CountryComponent,
    canActivate: [AgeGuard],
  },
  {
    path: QuestionnaireStep.Color,
    component: ColorComponent,
    canActivate: [AgeGuard],
  },
  {
    path: QuestionnaireStep.Strength,
    component: StrengthComponent,
    canActivate: [AgeGuard],
  },
];

export type QuestionnaireStepType = QuestionnaireStep;
