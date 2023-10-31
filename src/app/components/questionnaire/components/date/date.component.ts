import { Component, OnInit } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss', '../../questionnaire.component.scss'],
})
export class DateComponent implements OnInit {
  constructor(private store: Store) {}
  faCalendarDays = faCalendarDays;

  day: string = '';
  month: string = '';
  year: string = '';

  ngOnInit(): void {
    this.store.select(selectQuestionnaireData).subscribe(({ dateOfBirth }) => {
      if (dateOfBirth) {
        this.day = dateOfBirth.getDate().toString().padStart(2, '0');
        this.month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
        this.year = dateOfBirth.getFullYear().toString();
      }
    });
  }

  validateInput({ target }: Event): void {
    if (!(target instanceof HTMLInputElement) || !target.value) {
      return;
    }

    target.value = target.value
      .replace(/[^0-9]/g, '')
      .slice(0, target.maxLength);

    const isFull = target.value.length >= target.maxLength;

    if (parseInt(target.value) < parseInt(target.min) && isFull) {
      target.value = target.min;
    }

    if (parseInt(target.value) > parseInt(target.max)) {
      target.value = target.max;
    }
  }

  onInput({ target, key }: KeyboardEvent) {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const isCorrectKey = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      ' ',
      'Enter',
    ].includes(key);

    const isFull = target.value.length >= target.maxLength;

    if (
      isCorrectKey &&
      isFull &&
      target.nextElementSibling instanceof HTMLInputElement
    ) {
      target.nextElementSibling.focus();
    }
  }

  onDelete({ target, code }: KeyboardEvent) {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const isBackspace = code === 'Backspace';
    const isEmpty = target.value.length == 0;

    if (
      isBackspace &&
      isEmpty &&
      target.previousElementSibling instanceof HTMLInputElement
    ) {
      target.previousElementSibling.focus();
    }
  }

  onFocusOut({ target }: Event, field: string): void {
    if (!(target instanceof HTMLInputElement) || !target.value) {
      return;
    }

    if (target.value.length && target.value.length < target.maxLength) {
      target.value =
        target.value === '0' ? target.min : target.value.padStart(2, '0');
    }

    switch (field) {
      case 'day':
        this.day = target.value;
        break;
      case 'month':
        this.month = target.value;
        break;
      case 'year':
        this.year = target.value;
        break;
    }

    this.validateDate();
  }

  validateDate(): void {
    const day = Number(this.day);
    const month = Number(this.month);
    const year = Number(this.year);

    if (!day || !month || !year) {
      return;
    }

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      this.store.dispatch(createUpdatePropertyAction('dateOfBirth')(date));
    }
  }
}
