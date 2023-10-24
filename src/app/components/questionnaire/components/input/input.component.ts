import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss', '../../questionnaire.component.scss'],
})
export class InputComponent {
  constructor(private store: Store) {}
}
