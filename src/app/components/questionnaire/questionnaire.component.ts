import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentRoute,
  selectQuestionnaireData,
} from 'src/app/state/selectors/cigarStore.selector';
import { IQuestionnaireGroup, QuestionnaireStep } from './questionnaire.types';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { initialQuestionnaireState as init } from 'src/app/state/reducers/questionnaire.reducer';
import { Observable, map, takeUntil } from 'rxjs';
import { clearResults } from 'src/app/state/actions/cigarStore.actions';
import { DestroyService } from 'src/app/services/destroy.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent implements OnInit {
  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private readonly destroy$: DestroyService
  ) {}

  currentRoute$ = this.store
    .select(selectCurrentRoute)
    .pipe(map(({ routeConfig: { path } }) => path));
  name$: Observable<string> = this.store
    .select(selectQuestionnaireData)
    .pipe(map(({ name }) => name || 'stranger'));

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

  ngOnInit(): void {
    this.store
      .select(selectCurrentRoute)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ routeConfig: { path } }) => (this.currentRoute = path));

    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.questionnaireForm.patchValue(data);
      });
  }

  getStep(next: boolean): string {
    const currentIndex = this.order.findIndex(
      (path) => this.currentRoute === path
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

  getFormControl(name: keyof IQuestionnaireGroup): FormControl {
    return this.questionnaireForm.controls[name];
  }
}
