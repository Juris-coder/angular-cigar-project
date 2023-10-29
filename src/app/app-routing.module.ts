import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import {
  questionnairePath,
  questionnaireRoute,
} from './components/questionnaire/questionnaire.types';
import { ResultsComponent } from './components/results/results.component';
import { AgeGuard } from './state/guards/age.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: questionnairePath,
    component: QuestionnaireComponent,
    children: questionnaireRoute,
  },
  {
    path: 'results',
    canActivate: [AgeGuard],
    component: ResultsComponent,
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
