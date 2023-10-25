import { Component, Input } from '@angular/core';
import { ICardItem } from './card.types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  items: ICardItem[] = [];
}
