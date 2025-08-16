import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { colors } from './color.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ColorComponent {
  constructor(
    private store: Store,
    private readonly destroyRef: DestroyRef,
  ) {}

  selectedColor: string | undefined;
  colors = colors;

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ color }) => (this.selectedColor = color));
  }

  emitColorSelection(name: string): void {
    this.store.dispatch(createUpdatePropertyAction('color')(name));
  }
}
