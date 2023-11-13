import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: [
    './restricted.component.scss',
    '../../questionnaire.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestrictedComponent {}
