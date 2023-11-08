import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { takeUntil } from 'rxjs';
import { countries } from './country.model';
import { DestroyService } from 'src/app/services/destroy.service';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss', '../../questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent implements OnInit {
  constructor(
    private store: Store,
    private readonly destroy$: DestroyService
  ) {}

  selectedCountry: string | undefined;
  countries = countries;

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ country }) => {
        if (country === 'United States of America') {
          this.selectedCountry = 'USA';
          return;
        }
        this.selectedCountry = country;
      });
  }

  emitCountrySelection(name: string): void {
    if (name === 'USA') {
      name = 'United States of America';
    }
    this.store.dispatch(createUpdatePropertyAction('country')(name));
  }
}
