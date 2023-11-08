import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { CigarStrength } from 'src/app/app.types';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styleUrls: ['./strength.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  ngDestroyed$ = new Subject<boolean>();

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
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(({ strength }) => {
        this.selectedStrength = this.strengthDictionary.indexOf(strength);
      });
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next(false);
  }

  updateStrengthValue(value: number) {
    this.store.dispatch(
      createUpdatePropertyAction('strength')(this.strengthDictionary[value])
    );
  }
}
