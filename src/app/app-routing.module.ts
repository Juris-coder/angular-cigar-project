import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import {
  questionnairePath,
  questionnaireRoute,
} from './components/questionnaire/questionnaire.types';

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
  // {
  //   path: 'results',
  //   canActivate: [AuthGuard],
  //   // component: Todo
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
