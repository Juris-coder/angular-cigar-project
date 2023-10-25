import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICardItem } from './cards.types';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
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

  evaluateCheckbox({ target }: Event): void {
    if ((target as HTMLInputElement).checked) {
      this.selectedChange.emit('');
    }
  }
}