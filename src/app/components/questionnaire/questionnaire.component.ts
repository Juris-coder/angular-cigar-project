import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentRoute,
  selectQuestionnaireData,
} from 'src/app/state/selectors/cigarStore.selector';
import { IQuestionnaireGroup, QuestionnaireStep } from './questionnaire.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initialQuestionnaireState as init } from 'src/app/state/reducers/questionnaire.reducer';
import { map, tap } from 'rxjs';
import { clearResults } from 'src/app/state/actions/cigarStore.actions';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class QuestionnaireComponent {
  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) {}

  readonly currentRoute$ = this.store.select(selectCurrentRoute).pipe(
    map(({ routeConfig: { path } }) => path),
    tap((path) => (this.currentRoute = path)),
  );
  readonly name$ = this.store.select(selectQuestionnaireData).pipe(
    tap((data) => this.questionnaireForm.patchValue(data)),
    map(({ name }) => name || 'stranger'),
  );

  QuestionnaireStep = QuestionnaireStep;
  currentRoute: string | undefined;
  questionnaireForm: FormGroup<IQuestionnaireGroup> = this.formBuilder.group({
    dateOfBirth: [init.dateOfBirth, Validators.required],
    name: [init.name, [Validators.required]],
    email: [init.email, [Validators.email, Validators.required]],
    country: init.country,
    color: init.color,
    strength: init.strength,
  });

  private readonly order: QuestionnaireStep[] = [
    QuestionnaireStep.DateOfBirth,
    QuestionnaireStep.Name,
    QuestionnaireStep.Country,
    QuestionnaireStep.Color,
    QuestionnaireStep.Strength,
  ];

  get isCurrentStepValid(): boolean {
    if (!this.currentRoute) {
      return false;
    }

    const { dateOfBirth, name, email, country, color, strength } =
      this.questionnaireForm.controls;

    switch (this.currentRoute) {
      case QuestionnaireStep.DateOfBirth:
        return dateOfBirth.valid;
      case QuestionnaireStep.Name:
        return name.valid && email.valid;
      case QuestionnaireStep.Country:
        return country.valid;
      case QuestionnaireStep.Color:
        return color.valid;
      case QuestionnaireStep.Strength:
        return strength.valid;
      default:
        return false;
    }
  }

  get isFormValid(): boolean {
    return this.questionnaireForm.valid;
  }

  get isLastStep(): boolean {
    return this.currentRoute === this.order[this.order.length - 1];
  }

  get isRestricted(): boolean {
    return this.currentRoute === 'restricted';
  }

  get isModifiedAppearance(): boolean {
    return (
      this.currentRoute !== QuestionnaireStep.DateOfBirth &&
      this.currentRoute !== QuestionnaireStep.Name
    );
  }

  getStep(next: boolean): string {
    const currentIndex = this.order.findIndex(
      (path) => this.currentRoute === path,
    );
    const isStepLast = this.order.length === currentIndex + 1;
    if (next) {
      if (isStepLast) {
        return '/results';
      }

      return this.order[currentIndex + 1];
    }

    if (currentIndex < 1) {
      return '/';
    }

    return this.order[currentIndex - 1];
  }

  clearResults(): void {
    this.store.dispatch(clearResults());
  }
}
