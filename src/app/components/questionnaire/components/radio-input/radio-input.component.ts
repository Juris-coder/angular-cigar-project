import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
})
export class RadioInputComponent {
  @Input()
  title: string = '';

  @Input()
  selected: boolean = false;

  @Output()
  selectionChange = new EventEmitter<Event>();
}
