import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectCurrentRoute,
  selectQuestionnaireData,
} from 'src/app/state/selectors/cigarStore.selector';
import { QuestionnaireStep, questionnaireRoute } from './questionnaire.types';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss', '../../../styles.scss'],
})
export class QuestionnaireComponent {
  currentRoute: QuestionnaireStep | undefined;
  title: string = '';
  isLastStep = false;
  name: string = 'stranger';

  constructor(private store: Store) {
    this.store.select(selectQuestionnaireData).subscribe(({ name }) => {
      if (name) {
        this.name = name;
      }
    });

    this.store
      .select(selectCurrentRoute)
      .subscribe(({ routeConfig: { path } }) => {
        this.currentRoute = path;
        this.isLastStep = false;
        switch (path as QuestionnaireStep) {
          case QuestionnaireStep.DateOfBirth:
            this.title = 'What is your age?';
            break;
          case QuestionnaireStep.Name:
            this.title = 'Tell us your name';
            break;
          case QuestionnaireStep.Country:
            this.title = `G'day, ${this.name}`;
            break;
          case QuestionnaireStep.Color:
            this.title = `Great choice so far, ${this.name}`;
            break;
          case QuestionnaireStep.Strength:
            this.title = `Nicely done, ${this.name}`;
            this.isLastStep = true;
            break;
        }
      });
  }

  getStep(next: boolean): string {
    const currentIndex = questionnaireRoute.findIndex(
      ({ path }: Route) => this.currentRoute === path
    );
    const isStepLast = questionnaireRoute.length === currentIndex + 1;
    if (next) {
      if (isStepLast) {
        return '/results';
      }

      return questionnaireRoute[currentIndex + 1].path as QuestionnaireStep;
    }

    if (currentIndex <= 1) {
      return '/';
    }

    return questionnaireRoute[currentIndex - 1].path as QuestionnaireStep;
  }
}
