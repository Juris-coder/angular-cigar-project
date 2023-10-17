import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrentStep } from 'src/app/state/selectors/cigarStore.selector';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  // increaseStep(): void {
  //   this.store.dispatch(increaseCurrentStep());
  // }

  // decreaseStep(): void {
  //   this.store.dispatch(decreaseCurrentStep());
  // }

  step$ = this.store.select(selectCurrentStep);

  // private formInit({ data }: IQuestionnaireState): FormGroup {
  //   return new FormGroup({
  //     dateOfBirth: new FormControl<string>(
  //       data.dateOfBirth,
  //       Validators.required
  //     ),
  //     name: new FormControl<string>(data.name, [
  //       Validators.maxLength(50),
  //       Validators.required,
  //     ]),
  //     email: new FormControl<string>(data.email, [
  //       Validators.email,
  //       Validators.required,
  //     ]),
  //     country: new FormControl<CigarCountry | ''>(
  //       data.country,
  //       Validators.required
  //     ),
  //     color: new FormControl<CigarColor | ''>(data.color, Validators.required),
  //     strength: new FormControl<CigarStrength | ''>(
  //       data.strength,
  //       Validators.required
  //     ),
  //   });
  // }
}
