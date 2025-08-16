import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import {
  dateValidator,
  maxLengthValidator,
  minMaxValidator,
  numberPatternValidator,
} from 'src/app/utils/validators';
import { IDateOfBirthGroup } from './date.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DateComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  faCalendarDays = faCalendarDays;
  dateOfBirthGroup: FormGroup<IDateOfBirthGroup> | undefined;

  ngOnInit(): void {
    this.initFormGroup();
  }

  getRequiredState(
    control: IDateOfBirthGroup[keyof IDateOfBirthGroup],
  ): boolean {
    return control.touched && control.hasError('required');
  }

  focusOnInput(event: Event, year: HTMLInputElement): void {
    if (event.target instanceof HTMLInputElement) {
      return;
    }

    const targetElem = document.querySelector('input.ng-invalid');

    if (targetElem) {
      (targetElem as HTMLInputElement).focus();
    } else {
      year.focus();
    }
  }

  private initFormGroup(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(
        distinctUntilChanged(
          (a, b) => a.dateOfBirth?.getTime() === b.dateOfBirth?.getTime(),
        ),
        switchMap(({ dateOfBirth }) => {
          this.dateOfBirthGroup = this.createFormGroup(dateOfBirth);
          return this.subscribeToStatusChange(this.dateOfBirthGroup);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private createFormGroup(
    dateOfBirth: Date | undefined,
  ): FormGroup<IDateOfBirthGroup> {
    const day = dateOfBirth
      ? dateOfBirth.getDate().toString().padStart(2, '0')
      : '';
    const month = dateOfBirth
      ? (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
      : '';
    const year = dateOfBirth ? dateOfBirth.getFullYear().toString() : '';
    return this.formBuilder.group(
      {
        day: [
          day,
          [
            Validators.required,
            numberPatternValidator(),
            maxLengthValidator(2),
            minMaxValidator(1, 31, 2),
          ],
        ],
        month: [
          month,
          [
            Validators.required,
            numberPatternValidator(),
            maxLengthValidator(2),
            minMaxValidator(1, 12, 2),
          ],
        ],
        year: [
          year,
          [
            Validators.required,
            numberPatternValidator(),
            maxLengthValidator(4),
            minMaxValidator(1900, new Date().getFullYear(), 4),
          ],
        ],
      },
      { validators: dateValidator() },
    );
  }

  private subscribeToStatusChange(
    form: FormGroup<IDateOfBirthGroup>,
  ): Observable<FormControlStatus> {
    return form.statusChanges.pipe(
      startWith(form.status),
      distinctUntilChanged(),
      tap((status) => {
        if (status === 'VALID') {
          const { day, month, year } = form.controls;
          this.store.dispatch(
            createUpdatePropertyAction('dateOfBirth')(
              new Date(
                Number(year.value),
                Number(month.value) - 1,
                Number(day.value),
              ),
            ),
          );
        } else {
          this.store.dispatch(
            createUpdatePropertyAction('dateOfBirth')(undefined),
          );
        }
      }),
    );
  }
}
