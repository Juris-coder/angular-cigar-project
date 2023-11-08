import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input()
  title: string = '';

  @Input()
  selected: string | undefined;

  @Output()
  selectedChange = new EventEmitter<string>();

  evaluateCheckbox({ target }: Event): void {
    if ((target as HTMLInputElement).checked) {
      this.selectedChange.emit('');
    }
  }
}
