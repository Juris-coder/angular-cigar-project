import { Component } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IQuestionnaireState } from 'src/app/app.types';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss', '../../questionnaire.component.scss'],
})
export class DateComponent {
  constructor(private store: Store) {}
  faCalendarDays = faCalendarDays;

  questionnaireData$: Observable<IQuestionnaireState> = this.store.select(
    selectQuestionnaireData
  );

  updateDateValue({ target }: Event) {
    const date = (target as HTMLInputElement).value;
    this.store.dispatch(createUpdatePropertyAction('dateOfBirth')(date));
  }
}
