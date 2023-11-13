import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { CigarStrength } from 'src/app/app.types';
import { DestroyService } from 'src/app/services/destroy.service';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styleUrls: [
    './strength.component.scss',
    '../../questionnaire.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthComponent implements OnInit {
  constructor(
    private store: Store,
    private readonly destroy$: DestroyService
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ strength }) => {
        this.selectedStrength = this.strengthDictionary.indexOf(strength);
      });
  }

  updateStrengthValue(value: number) {
    this.store.dispatch(
      createUpdatePropertyAction('strength')(this.strengthDictionary[value])
    );
  }
}
