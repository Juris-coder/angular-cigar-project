import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { QuestionnaireStep } from './components/questionnaire/questionnaire.types';
import { ResultsComponent } from './components/results/results.component';
import { AgeGuard } from './guards/age.guard';
import { ColorComponent } from './components/questionnaire/components/color/color.component';
import { CountryComponent } from './components/questionnaire/components/country/country.component';
import { DateComponent } from './components/questionnaire/components/date/date.component';
import { InputComponent } from './components/questionnaire/components/input/input.component';
import { RestrictedComponent } from './components/questionnaire/components/restricted/restricted.component';
import { StrengthComponent } from './components/questionnaire/components/strength/strength.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Fumers club welcomes you!',
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    children: [
      {
        path: '',
        redirectTo: QuestionnaireStep.DateOfBirth,
        pathMatch: 'full',
      },
      {
        path: 'restricted',
        component: RestrictedComponent,
        title: 'Fumers club: You’re not of legal smoking age',
      },
      {
        path: QuestionnaireStep.DateOfBirth,
        component: DateComponent,
        title: 'Fumers club: What is your age?',
      },
      {
        path: QuestionnaireStep.Name,
        component: InputComponent,
        canActivate: [AgeGuard],
        title: 'Fumers club: Tell us your name',
      },
      {
        path: QuestionnaireStep.Country,
        component: CountryComponent,
        canActivate: [AgeGuard],
        title: 'Fumers club: Select your preferred region',
      },
      {
        path: QuestionnaireStep.Color,
        component: ColorComponent,
        canActivate: [AgeGuard],
        title: 'Fumers club: Continue with the color selection',
      },
      {
        path: QuestionnaireStep.Strength,
        component: StrengthComponent,
        canActivate: [AgeGuard],
        title: 'Fumers club: Select cigar’s strength',
      },
    ],
  },
  {
    path: 'results',
    canActivate: [AgeGuard],
    component: ResultsComponent,
    title: 'Fumers club: Here are the results!',
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    title: 'Fumers club: This page does not exist',
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
