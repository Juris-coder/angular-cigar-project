import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IQuestionnaireState } from 'src/app/app.types';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss', '../../questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  constructor(private store: Store) {}

  questionnaireData$: Observable<IQuestionnaireState> = this.store.select(
    selectQuestionnaireData
  );

  updateNameValue({ target }: Event) {
    const name = (target as HTMLInputElement).value;
    this.store.dispatch(createUpdatePropertyAction('name')(name));
  }

  updateEmailValue({ target }: Event) {
    const email = (target as HTMLInputElement).value;
    this.store.dispatch(createUpdatePropertyAction('email')(email));
  }
}
