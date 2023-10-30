import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { CigarStrength } from 'src/app/app.types';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styleUrls: ['./strength.component.scss'],
})
export class StrengthComponent implements OnInit {
  constructor(private store: Store) {}

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
    this.store.select(selectQuestionnaireData).subscribe(({ strength }) => {
      this.selectedStrength = this.strengthDictionary.indexOf(strength);
    });
  }

  updateStrengthValue(value: number) {
    this.store.dispatch(
      createUpdatePropertyAction('strength')(this.strengthDictionary[value])
    );
  }
}
