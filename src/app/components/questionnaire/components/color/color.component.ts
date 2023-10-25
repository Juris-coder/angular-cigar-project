import { Component } from '@angular/core';
import { ICardItem } from '../cards/cards.types';
import { Store } from '@ngrx/store';
import { CigarColor } from 'src/app/utils/types';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss', '../../questionnaire.component.scss'],
})
export class ColorComponent {
  constructor(private store: Store) {}

  selectedColor: string | undefined;

  colors: ICardItem<CigarColor>[] = [
    {
      name: 'Double Claro',
      url: 'assets/images/double-claro.jpg',
    },
    {
      name: 'Claro',
      url: 'assets/images/claro.jpg',
    },
    {
      name: 'Colorado Claro',
      url: 'assets/images/colorado-claro.jpg',
    },
    {
      name: 'Naturale',
      url: 'assets/images/naturale.jpg',
    },
    {
      name: 'Colorado',
      url: 'assets/images/colorado.jpg',
    },
    {
      name: 'Rosado',
      url: 'assets/images/rosado.jpg',
    },
    {
      name: 'Colorado Maduro',
      url: 'assets/images/colorado-maduro.jpg',
    },
    {
      name: 'Maduro',
      url: 'assets/images/maduro.jpg',
    },
    {
      name: 'Oscuro',
      url: 'assets/images/oscuro.jpg',
    },
    {
      name: 'Barber Pole',
      url: 'assets/images/barber-pole.jpg',
    },
    {
      name: 'Multiple',
      url: 'assets/images/multiple.jpg',
    },
  ];

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .subscribe(({ color }) => (this.selectedColor = color));
  }

  emitColorSelection(name: string): void {
    this.store.dispatch(createUpdatePropertyAction('color')(name));
  }
}
