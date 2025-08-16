import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { countries } from './country.model';
import { map } from 'rxjs';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CountryComponent {
  readonly countries = countries;

  private readonly store = inject(Store);
  readonly selectedCountry$ = this.store
    .select(selectQuestionnaireData)
    .pipe(map(({ country }) => country));

  emitCountrySelection(name: string): void {
    this.store.dispatch(createUpdatePropertyAction('country')(name));
  }
}
