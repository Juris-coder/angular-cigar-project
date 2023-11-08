import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { Subject, takeUntil } from 'rxjs';
import { colors } from './color.model';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss', '../../questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent implements OnDestroy {
  constructor(private store: Store) {}

  ngDestroyed$ = new Subject<boolean>();

  selectedColor: string | undefined;
  colors = colors;

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(({ color }) => (this.selectedColor = color));
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next(false);
  }

  emitColorSelection(name: string): void {
    this.store.dispatch(createUpdatePropertyAction('color')(name));
  }
}
