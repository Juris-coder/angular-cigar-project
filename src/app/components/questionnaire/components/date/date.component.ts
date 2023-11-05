import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import {
  dateValidator,
  maxLengthValidator,
  minMaxValidator,
  numberPatternValidator,
} from 'src/app/utils/validators';
import { IDateOfBirthGroup } from './date.types';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss', '../../questionnaire.component.scss'],
})
export class DateComponent implements OnInit {
  constructor(private store: Store, private formBuilder: FormBuilder) {}
  faCalendarDays = faCalendarDays;

  dateOfBirthGroup = this.formBuilder.group(
    {
      day: [
        '',
        [
          Validators.required,
          numberPatternValidator(),
          maxLengthValidator(2),
          minMaxValidator(1, 31, 2),
        ],
      ],
      month: [
        '',
        [
          Validators.required,
          numberPatternValidator(),
          maxLengthValidator(2),
          minMaxValidator(1, 12, 2),
        ],
      ],
      year: [
        '',
        [
          Validators.required,
          numberPatternValidator(),
          maxLengthValidator(4),
          minMaxValidator(1900, new Date().getFullYear(), 4),
        ],
      ],
    },
    { validators: dateValidator() }
  );

  getControl(controlName: keyof IDateOfBirthGroup): AbstractControl {
    return this.dateOfBirthGroup.controls[controlName];
  }

  @ViewChild('year')
  year?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.store.select(selectQuestionnaireData).subscribe(({ dateOfBirth }) => {
      if (dateOfBirth) {
        this.dateOfBirthGroup.controls.day.setValue(
          dateOfBirth.getDate().toString().padStart(2, '0')
        );
        this.dateOfBirthGroup.controls.month.setValue(
          (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
        );
        this.dateOfBirthGroup.controls.year.setValue(
          dateOfBirth.getFullYear().toString()
        );
      }
    });

    this.dateOfBirthGroup.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe((status) => {
        if (status === 'VALID') {
          const { day, month, year } = this.dateOfBirthGroup.controls;
          this.store.dispatch(
            createUpdatePropertyAction('dateOfBirth')(
              new Date(
                Number(year.value),
                Number(month.value) - 1,
                Number(day.value)
              )
            )
          );
        } else {
          this.store.dispatch(
            createUpdatePropertyAction('dateOfBirth')(undefined)
          );
        }
      });
  }

  focusOnInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      return;
    }

    const targetElem = document.querySelector('input.ng-invalid');

    if (targetElem) {
      (targetElem as HTMLInputElement).focus();
    } else {
      this.year?.nativeElement.focus();
    }
  }
}
