import { Component, Input } from '@angular/core';
import { InputType } from './input.types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input()
  inputType: InputType = 'input';
}
