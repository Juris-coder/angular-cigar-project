import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { colors } from './color.model';
import { map } from 'rxjs';

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ColorComponent {
  readonly colors = colors;

  private readonly store = inject(Store);

  readonly selectedColor$ = this.store
    .select(selectQuestionnaireData)
    .pipe(map(({ color }) => color));

  emitColorSelection(name: string): void {
    this.store.dispatch(createUpdatePropertyAction('color')(name));
  }
}
