import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICardItem } from './cards.types';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss', '../../questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  @Input()
  title: string = '';

  @Input()
  items: ICardItem[] = [];

  @Input()
  selected: ICardItem['name'] | undefined;

  @Output()
  selectedChange = new EventEmitter<ICardItem['name']>();
}
