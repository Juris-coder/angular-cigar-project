import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadResultsAction } from 'src/app/state/actions/cigarStore.actions';
import { IQuestionnaireState } from 'src/app/state/reducers';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(private store: Store) {}

  questionnaireData: IQuestionnaireState | undefined;

  flavours: string[] = [
    'Fruity',
    'Spicy',
    'Sweet',
    'Acid',
    'Coffee',
    'Creamy',
    'Chocolate',
    'Honey',
    'Earthy',
    'Herbal',
  ];

  pairings: string[] = ['Scotch', 'Whisky', 'Cognac', 'Rum'];

  get randomBool(): boolean {
    return Math.random() < 0.5;
  }

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .subscribe((data) => (this.questionnaireData = data));

    this.store.dispatch(loadResultsAction({ page: 1 }));
  }
}
