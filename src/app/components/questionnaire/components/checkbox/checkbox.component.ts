import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICardItem } from '../cards/cards.types';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input()
  title: string = '';

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
