import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { CigarStrength } from 'src/app/app.types';
import { map } from 'rxjs';

@Component({
    selector: 'app-strength',
    templateUrl: './strength.component.html',
    styleUrls: ['./strength.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class StrengthComponent {
  private readonly store = inject(Store);

  readonly selectedStrength$ = this.store
    .select(selectQuestionnaireData)
    .pipe(map(({ strength }) => this.strengthDictionary.indexOf(strength)));

  strengthDictionary: CigarStrength[] = [
    '',
    'Mild',
    'Mild-Medium',
    'Medium',
    'Medium-Full',
    'Full',
  ];

  updateStrengthValue(value: number) {
    this.store.dispatch(
      createUpdatePropertyAction('strength')(this.strengthDictionary[value]),
    );
  }
}
