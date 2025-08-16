import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { CigarStrength } from 'src/app/app.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-strength',
    templateUrl: './strength.component.html',
    styleUrls: ['./strength.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class StrengthComponent implements OnInit {
  constructor(
    private store: Store,
    private readonly destroyRef: DestroyRef,
  ) {}

  selectedStrength = 0;
  strengthDictionary: CigarStrength[] = [
    '',
    'Mild',
    'Mild-Medium',
    'Medium',
    'Medium-Full',
    'Full',
  ];

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ strength }) => {
        this.selectedStrength = this.strengthDictionary.indexOf(strength);
      });
  }

  updateStrengthValue(value: number) {
    this.store.dispatch(
      createUpdatePropertyAction('strength')(this.strengthDictionary[value]),
    );
  }
}
