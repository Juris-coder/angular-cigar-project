import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { takeUntil } from 'rxjs';
import { colors } from './color.model';
import { DestroyService } from 'src/app/services/destroy.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent {
  constructor(
    private store: Store,
    private readonly destroy$: DestroyService
  ) {}

  selectedColor: string | undefined;
  colors = colors;

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ color }) => (this.selectedColor = color));
  }

  emitColorSelection(name: string): void {
    this.store.dispatch(createUpdatePropertyAction('color')(name));
  }
}
