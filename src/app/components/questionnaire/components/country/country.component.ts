import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestionnaireData } from 'src/app/state/selectors/cigarStore.selector';
import { createUpdatePropertyAction } from 'src/app/state/actions/cigarStore.actions';
import { countries } from './country.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent implements OnInit {
  constructor(
    private store: Store,
    private readonly destroyRef: DestroyRef,
  ) {}

  selectedCountry: string | undefined;
  countries = countries;

  ngOnInit(): void {
    this.store
      .select(selectQuestionnaireData)
      .pipe(takeUntilDestroyed(this.destroyRef))
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
