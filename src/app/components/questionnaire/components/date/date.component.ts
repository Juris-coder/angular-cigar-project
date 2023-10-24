import { Component } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss', '../../questionnaire.component.scss'],
})
export class DateComponent {
  faCalendarDays = faCalendarDays;
}
