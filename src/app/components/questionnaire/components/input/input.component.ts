import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { IQuestionnaireState } from 'src/app/state/reducers/types';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputComponent {
  private readonly store = inject(Store);

  questionnaireData$: Observable<IQuestionnaireState> = this.store.select(
    selectQuestionnaireData,
  );

  updatePropValue({ target }: Event, field: keyof IQuestionnaireState) {
    const { value } = target as HTMLInputElement;
    this.store.dispatch(createUpdatePropertyAction(field)(value));
  }
}
