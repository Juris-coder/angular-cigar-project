import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICardItem } from './card.types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  items: ICardItem[] = [];

  @Input()
  selected: ICardItem['name'] | undefined;

  @Output()
  selectedChange = new EventEmitter<ICardItem['name']>();
}
