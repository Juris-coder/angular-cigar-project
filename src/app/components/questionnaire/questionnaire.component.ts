import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentRoute,
  selectQuestionnaireData,
} from 'src/app/state/selectors/cigarStore.selector';
import { QuestionnaireStep } from './questionnaire.types';
import { FormBuilder, Validators } from '@angular/forms';
import { initialQuestionnaireState as init } from 'src/app/state/reducers/questionnaire.reducer';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  constructor(private store: Store, private formBuilder: FormBuilder) {}

  title = '';
  isLastStep = false;
  isRestricted = false;
  modifiedAppearance = false;

  private name: string | undefined;
  private currentRoute: string | undefined;
  private questionnaireForm = this.formBuilder.group({
    dateOfBirth: [init.dateOfBirth, Validators.required],
    name: [init.name, [Validators.maxLength(50), Validators.required]],
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

  ngOnInit(): void {
    this.store.select(selectQuestionnaireData).subscribe(({ name }) => {
      this.name = name || 'stranger';
      this.modifyTitle();
    });

    this.store
      .select(selectCurrentRoute)
      .subscribe(({ routeConfig: { path } }) => {
        this.currentRoute = path;
        this.modifyTitle();
      });

    this.store
      .select(selectQuestionnaireData)
      .subscribe((data) => this.questionnaireForm.patchValue(data));
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

  private modifyTitle(): void {
    this.isLastStep = false;
    this.isRestricted = false;
    switch (this.currentRoute) {
      case QuestionnaireStep.DateOfBirth:
        this.title = 'What is your age?';
        this.modifiedAppearance = false;
        break;
      case QuestionnaireStep.Name:
        this.title = 'Tell us your name';
        this.modifiedAppearance = false;
        break;
      case QuestionnaireStep.Country:
        this.title = `G'day, ${this.name}`;
        this.modifiedAppearance = true;
        break;
      case QuestionnaireStep.Color:
        this.title = `Great choice so far, ${this.name}`;
        this.modifiedAppearance = true;
        break;
      case QuestionnaireStep.Strength:
        this.title = `Nicely done, ${this.name}`;
        this.modifiedAppearance = true;
        this.isLastStep = true;
        break;
      case 'restricted':
        this.title = `oops, sorry...`;
        this.isRestricted = true;
        break;
    }
  }
}
